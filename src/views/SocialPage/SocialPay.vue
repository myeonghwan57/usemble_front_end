<template>
    <div class="container">
        <div>
            <h1>선택한 남의 집</h1>
            <div class="mt-4">
                <div class="d-flex justify-content-between mb-4">
                    <div class="d-flex flex-column justify-content-between">
                        <h2>{{ spayInfo.stitle }}</h2>
                        <div>
                            <div class="d-flex">
                                <p class="subtext">날짜&nbsp;&nbsp;</p>
                                <p>{{ socialDate.date }} {{ socialDate.time }}</p>
                            </div>
                            <div class="d-flex">
                                <p class="subtext">장소&nbsp;&nbsp;</p>
                                <p>{{ spayInfo.saddress }}</p>
                            </div>
                        </div>
                    </div>
                    <img :src="`${axios.defaults.baseURL}/social/sthumb/${sno}`" width="30%" />
                </div>
            </div>
        </div>
        <hr />
        <div class="mt-4 mb-5">
            <h2>결제금액</h2>
            <div>
                <div class="d-flex justify-content-between">
                    <p class="subtext">결제금액</p>
                    <p class="paytext">{{ Number(spayInfo.sfee).toLocaleString() }}원</p>
                </div>
                <div class="d-flex justify-content-between">
                    <p class="subtext">총 금액</p>
                    <p class="subtext">{{ Number(spayInfo.sfee).toLocaleString() }}원</p>
                </div>
            </div>
        </div>
        <button class="btn paybtn" @click="joinSocial">결제하기</button>
        <JoinSuccessModal id="joinSuccessModal" @close="hideJoinSuccessModal" />
        <JoinFailureModal id="joinFailureModal" :message="message" @close="hideJoinFailureModal" />
    </div>
</template>

<script setup>
import JoinSuccessModal from "./JoinSuccessModal.vue";
import JoinFailureModal from "./JoinFailureModal.vue";
import { onMounted } from "vue";
import { Modal } from "bootstrap";
import { ref } from "vue";
import socialAPI from "@/apis/socialAPI";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";

let joinSuccessModal = null;
let joinFailureModal = null;

const route = useRoute();
const router = useRouter();
const store = useStore();
const sno = ref(route.query.sno || 0);
const reason = ref("");

const spayInfo = ref({
    sno: "",
    stitle: "",
    sstartDate: "",
    sstartTime: "",
    saddress: "",
    sfee: 0,
});

const sjoin = ref({
    sno: "",
    mid: "",
});

onMounted(() => {
    joinSuccessModal = new Modal(document.getElementById("joinSuccessModal"));
    joinFailureModal = new Modal(document.getElementById("joinFailureModal"));
});

function showJoinSuccessModal() {
    joinSuccessModal.show();
}

function hideJoinSuccessModal() {
    joinSuccessModal.hide();
}

function showJoinFailureModal() {
    joinFailureModal.show();
}

function hideJoinFailureModal() {
    joinFailureModal.hide();
}

async function getSocialPay(sno) {
    try {
        const response = await socialAPI.getSpayInfo(sno);
        if (response.data.response == "success") {
            spayInfo.value.sno = response.data.spayInfo.sno;
            spayInfo.value.stitle = response.data.spayInfo.stitle;
            spayInfo.value.sstartDate = response.data.spayInfo.sstartDate;
            spayInfo.value.sstartTime = response.data.spayInfo.sstartTime;
            spayInfo.value.saddress = response.data.spayInfo.saddress;
            spayInfo.value.sfee = response.data.spayInfo.sfee;

            sjoin.value.mid = store.state.mid;
            sjoin.value.sno = spayInfo.value.sno;
        } else {
            router.push("/notFound");
        }

        changeDateFormat();
    } catch (error) {
        console.log(error);
    }
}

getSocialPay(sno.value);

const socialDate = ref({
    date: "",
    time: "",
});

function changeDateFormat() {
    const day = ["일", "월", "화", "수", "목", "금", "토"];
    let originDateFormat = new Date(spayInfo.value.sstartDate);

    let resultDateFormat =
        originDateFormat.getFullYear() +
        "년 " +
        (originDateFormat.getMonth() + 1) +
        "월 " +
        originDateFormat.getDate() +
        "일 (" +
        day[originDateFormat.getDay()] +
        ")";

    socialDate.value.date = resultDateFormat;

    let timeList = spayInfo.value.sstartTime.split(":");

    socialDate.value.time = timeList[0] + "시 " + timeList[1] + "분";
}

async function joinSocial() {
    try {
        const response = await socialAPI.joinSocial(JSON.parse(JSON.stringify(sjoin.value)));
        if (response.data.response == "success") {
            showJoinSuccessModal();
        } else {
            reason.value = response.data.reason;
            showMessage();
            showJoinFailureModal();
        }
    } catch (error) {
        console.log(error);
    }
}

const message = ref("");

function showMessage() {
    if (reason.value == "full") {
        message.value = "참여 인수가 가득찬 어셈블입니다.";
    } else if (reason.value == "accessDenied") {
        message.value = "참여가 불가능한 어셈블입니다.";
    } else if (reason.value == "same") {
        message.value = "본인이 직접 작성한 어셈블에는 참여하실 수 없습니다.";
    } else if (reason.value == "alreadyJoin") {
        message.value = "이미 참여한 어셈블에는 중복 참여하실 수 없습니다.";
    } else {
        message.value = "잘못된 접근입니다.";
    }
}
</script>

<style scoped>
.container {
    width: 70%;
}

p {
    margin: auto 0;
}

hr {
    color: #707070;
}

h1 {
    font-size: 26px;
    font-weight: 700;
}

h2 {
    font-size: 22px;
    font-weight: 600;
}

.container {
    width: 50%;
    min-width: 700px;
    margin: 0 auto;
    padding-top: 5%;
}

.subtext {
    color: #707070;
}

.paytext {
    color: #558ccf;
    font-size: 22px;
}

.paybtn {
    width: 100%;
    padding: 0 45%;
    height: 60px;
    color: #fff;
    background-color: #558ccf;
    font-weight: 700;
    font-size: 18px;
    line-height: 90%;
    margin-top: 20px;
}
</style>

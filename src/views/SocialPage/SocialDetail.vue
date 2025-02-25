<template>
    <div id="container">
        <div id="detail_content">
            <img class="sthumbImage" id="sthumb" :src="``" />
            <div id="title">{{ social.stitle }}</div>
            <div id="address">{{ social.saddress }}</div>
            <div id="date">{{ socialDate.date }} {{ socialDate.time }}</div>

            <hr />
            <UserProfile v-if="social.mid !== ''" :mid="social.mid"></UserProfile>

            <h4 id="content-title">모임 일정</h4>
            <div class="mt-3 mb-4" id="join">
                <CalendarRead v-if="social.sstartDate !== ''" :sstartDate="social.sstartDate" />
                <div id="join-right">
                    <div id="join-right-detail">
                        <div>
                            <div id="notice">
                                <span id="notice1"
                                    >방문 일정에 따라 세부 정보가 달라질수 있습니다.</span
                                >
                                <span id="notice2"
                                    >날짜에 따라 게스트님을 위한 준비가 달라질 수 있어요.</span
                                >
                                <span id="notice3"
                                    >일정을 변경한 경우 세부 정보를 다시 한번 확인해 주세요.</span
                                >
                            </div>
                            <div id="join-info">
                                <div id="join-info-txt">
                                    <div class="d-flex">
                                        <div class="me-5">
                                            <span class="date">{{ socialDate.date }} </span>

                                            <div>
                                                <span id="info-txt-time">{{
                                                    socialDate.time
                                                }}</span>
                                                <span class="mx-2" id="info-txt-fee"
                                                    >{{
                                                        Number(social.sfee).toLocaleString()
                                                    }}원</span
                                                >
                                            </div>
                                        </div>
                                        <div class="mb-auto mt-auto">
                                            <i id="checkicon" class="bi bi-check-circle-fill"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="usbtn" v-if="$store.state.mrole != 'ROLE_ADMIN'">
                            <button
                                v-if="!isDeadline && isJoin && !isAlreadyJoin"
                                id="btn_us"
                                class="btn mb-3"
                                @click="joinSocial"
                            >
                                {{ social.sjoinCnt }} / {{ social.smemberCount }}인 참여하기
                            </button>

                            <button
                                v-if="!isDeadline && isFull && !isWriter && !isAlreadyJoin"
                                id="btn_us"
                                class="btn mb-3"
                                disabled
                            >
                                인원이 가득찬 어셈블입니다.
                            </button>
                            <button
                                v-if="!isDeadline && isAlreadyJoin"
                                id="btn_us"
                                class="btn mb-3"
                                @click="showCancelSocialJoinModal"
                            >
                                취소하기
                            </button>
                            <button
                                v-if="!isDeadline && isWriter && social.sstatus != 'cancel'"
                                id="btn_us"
                                class="btn mb-3"
                                @click="showCancelSocialModal"
                            >
                                취소하기
                            </button>
                            <button
                                v-if="isDeadline || social.sstatus == 'cancel'"
                                id="btn_us"
                                class="btn mb-3"
                                disabled
                            >
                                현재 참여하실 수 없는 어셈블입니다.
                            </button>
                        </div>
                        <div id="usbtn" v-if="$store.state.mrole == 'ROLE_ADMIN'">
                            <button
                                id="btn_us"
                                class="btn mb-3"
                                v-if="social.sstatus != 'cancel'"
                                @click="cancelSocialAdmin(social.sno)"
                            >
                                취소하기
                            </button>
                            <button
                                id="btn_us"
                                class="btn mb-3"
                                v-if="social.sstatus == 'cancel'"
                                disabled
                            >
                                이미 취소된 어셈블입니다.
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <h4 id="content-title">오시는 길</h4>
                <div class="content">
                    <h5 id="location">{{ social.saddress }}</h5>
                    <p id="subtext">*정확한 위치는 호스트의 사정에 의해 변경될 수 있습니다.</p>
                    <KakaoMap
                        v-if="social.saddress !== ''"
                        ref="kakaoMap"
                        :saddress="social.saddress"
                    />
                </div>
            </div>
            <hr />
            <div>
                <h4 id="content-title" class="mb-3">어셈블 소개</h4>
                <div id="social-detail" class="d-flex flex-column content"></div>
            </div>
            <hr />
        </div>
        <CancelSocialJoinModal
            id="cancelSocialJoinModal"
            @close="hideCancelSocialJoinModal"
            @cancel="cancelSocialJoin"
        />
        <CancelSocialModal
            id="cancelSocialModal"
            @close="hideCancelSocialModal"
            @cancel="cancelSocial"
        />
    </div>
</template>
<script setup>
import KakaoMap from "@/components/KakaoMap.vue";
import UserProfile from "@/components/UserProfile.vue";
import CalendarRead from "@/components/CalendarRead.vue";
import CancelSocialJoinModal from "@/components/Social/CancelSocialJoinModal.vue";
import CancelSocialModal from "@/components/Social/CancelSocialModal.vue";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import socialAPI from "@/apis/socialAPI";
import axios from "axios";
import { useStore } from "vuex";
import { Modal } from "bootstrap";
import adminAPI from "@/apis/adminAPI";

const router = useRouter();
const route = useRoute();
const kakaoMap = ref(null);
const store = useStore();

const sno = ref(route.query.sno);
const isWriter = ref(false);
const isDeadline = ref(false);
const isFull = ref(false);
const isJoin = ref(false);
const isAlreadyJoin = ref(false);

const social = ref({
    sno: "",
    mid: "",
    ctno: "",
    stitle: "",
    scontent: "",
    swriteDate: "",
    sdeadline: "",
    sstartDate: "",
    sstartTime: "",
    sfee: "",
    smemberCount: "",
    saddress: "",
    sstatus: "",
    sjoinCnt: 0,
});

const sjoin = ref({
    sno: "",
    mid: "",
});

async function getSocialDetail(sno) {
    try {
        const response = await socialAPI.getSocial(sno);
        social.value.sno = response.data.social.sno;
        social.value.mid = response.data.social.mid;
        social.value.ctno = response.data.social.ctno;
        social.value.stitle = response.data.social.stitle;
        social.value.scontent = response.data.social.scontent;
        social.value.swriteDate = response.data.social.swriteDate;
        social.value.sdeadline = response.data.social.sdeadline;
        social.value.sstartDate = response.data.social.sstartDate;
        social.value.sstartTime = response.data.social.sstartTime;
        social.value.sfee = response.data.social.sfee;
        social.value.smemberCount = response.data.social.smemberCount;
        social.value.sstatus = response.data.social.sstatus;
        social.value.saddress = response.data.social.saddress;

        document.getElementById(
            "sthumb"
        ).src = `${axios.defaults.baseURL}/social/sthumb/${social.value.sno}`;

        sjoin.value.mid = store.state.mid;
        sjoin.value.sno = social.value.sno;

        const joinCheckResponse = await socialAPI.getSjoinState(sjoin.value.mid, sjoin.value.sno);
        isAlreadyJoin.value = joinCheckResponse.data.sjoinState;

        const sjoinResponse = await socialAPI.getSjoinCnt(sno);
        social.value.sjoinCnt = sjoinResponse.data.sjoinCnt;

        isWriter.value = social.value.mid == store.state.mid;
        isDeadline.value = new Date(social.value.sdeadline) < new Date();
        isFull.value = social.value.sstatus == "full";
        isJoin.value =
            !isWriter.value && !isDeadline.value && social.value.sstatus == "recruitment"
                ? true
                : false;

        changeDateFormat();
        showContent();
    } catch (error) {
        console.log(error);
    }
}

getSocialDetail(sno.value);

const socialDate = ref({
    date: "",
    time: "",
});

function changeDateFormat() {
    const day = ["일", "월", "화", "수", "목", "금", "토"];
    let originDateFormat = new Date(social.value.sstartDate);

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

    let timeList = social.value.sstartTime.split(":");

    socialDate.value.time = timeList[0] + "시 " + timeList[1] + "분";
}

function showContent() {
    document.getElementById("social-detail").innerHTML = social.value.scontent;
}

function joinSocial() {
    router.push("/social/payinfo?sno=" + sno.value);
}

let cancelSocialJoinModal = null;
let cancelSocialModal = null;

onMounted(() => {
    cancelSocialJoinModal = new Modal(document.getElementById("cancelSocialJoinModal"));
    cancelSocialModal = new Modal(document.getElementById("cancelSocialModal"));
});

function showCancelSocialJoinModal() {
    cancelSocialJoinModal.show();
}

function hideCancelSocialJoinModal() {
    cancelSocialJoinModal.hide();
}

function showCancelSocialModal() {
    cancelSocialModal.show();
}

function hideCancelSocialModal() {
    cancelSocialModal.hide();
}

async function cancelSocialJoin() {
    try {
        await socialAPI.cancelSocialJoin(sjoin.value.mid, sjoin.value.sno);
        cancelSocialJoinModal.hide();
    } catch (error) {
        console.log(error);
    }
    router.go();
}

async function cancelSocial() {
    try {
        await socialAPI.deleteSocial(sno.value);
        cancelSocialModal.hide();
    } catch (error) {
        console.log(error);
    }
    router.go();
}

async function cancelSocialAdmin(sno) {
    try {
        await adminAPI.updateSocialStatus(sno);
    } catch (error) {
        console.log(error);
    }
    router.go();
}
</script>

<style scoped>
#container {
    width: 70%;
    min-width: 700px;
    margin: 0 auto;
}
#detail_content {
    width: 60%;
    margin: 0 auto;
}

img {
    width: 100%;
}
.sthumbImage {
    height: 450px;
    object-fit: cover;
}
#title {
    font-size: 30px;
    margin: 30px 0;
    font-weight: 600;
}
#address {
    font-weight: 800;
    color: rgba(116, 110, 110, 0.986);
}
#date {
    font-weight: 800;
    color: rgba(116, 110, 110, 0.986);
    margin-bottom: 30px;
}

#line {
    margin: 0 auto;
}
#usbtn {
    display: flex;
    width: 100%;
    bottom: 0px;
}

#btn_us {
    width: 100%;
    background-color: #558ccf;
    color: white;
    margin: 0 auto;
}
#join {
    display: flex;
    margin-top: 10px;
    width: 90%;
    height: 100%;
    margin: 0 auto;
}
#join-right {
    width: 100%;
    border: 1px rgb(230, 230, 233) solid;
    border-radius: 5px;
}
#notice {
    margin-top: 15px;
}
#notice1 {
    display: block;
    font-size: 16px;
    font-weight: 900;
}
#notice2 {
    display: block;
    font-size: 14px;
    font-weight: 900;
    color: rgb(146, 143, 143);
}
#notice3 {
    display: block;
    font-size: 14px;
    font-weight: 900;
    color: rgb(146, 143, 143);
}
#join-info {
    display: flex;
    border: 2px #57b17f solid;
    background-color: #dff7ea;
    justify-content: space-evenly;
    padding: 15px;
    margin-top: 20px;
}
#join-info-txt {
    display: flex;
}
#checkicon {
    color: #558ccf;
    font-size: 22px;
}
#join-right-detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 90%;
    height: 100%;
    margin: 0 auto;
}
#info-txt-time {
    color: rgb(0, 0, 0);
    font-weight: 900;
}
#info-txt-fee {
    color: rgb(0, 0, 0);
    font-weight: 900;
}
#info-txt-member {
    color: rgb(0, 0, 0);
    font-weight: 900;
}
#content-title {
    margin-top: 30px;
    font-weight: 900;
    font-size: 25px;
}

#location {
    margin-top: 20px;
    font-weight: 600;
    font-size: 20px;
}

#contentimg {
    width: 100%;
    height: 350px;
    object-fit: cover;
    margin-bottom: 10px;
}
.content {
    font-weight: 500;
    margin: 0 auto;
    width: 90%;
}
#subtext {
    color: #707070;
    font-weight: 600;
}
</style>

<template>
    <div class="d-flex">
        <div class="text-start" id="privacyInfoForm">
            <div class="mb-4">
                <h4><strong>개인정보 수정</strong></h4>
            </div>
            <hr />
            <div class="mt-4 text-start">
                <h5 class="mb-5"><strong>로그인 정보</strong></h5>
                <div class="d-flex mb-4 row">
                    <h6 class="col-3"><strong>아이디</strong></h6>
                    <div id="mid" class="col-9" style="color: gray">{{ member.mid }}</div>
                </div>
                <div class="d-flex mb-5 row">
                    <h6 class="col-3"><strong>비밀번호 변경</strong></h6>
                    <div class="col-9">
                        <RouterLink to="./passwordUpdate">
                            <button class="btn btn-outline-secondary" id="update-btn">
                                <strong>변경하기</strong>
                            </button>
                        </RouterLink>
                    </div>
                </div>
            </div>
            <hr />
            <div class="mt-4 mb-5">
                <h5 class="mb-5"><strong>회원 정보</strong></h5>
                <div class="d-flex mb-4 row">
                    <h6 class="col-3"><strong>이름</strong></h6>
                    <div class="col-9" id="mname" style="color: gray">{{ member.mname }}</div>
                </div>
                <div class="d-flex mb-4 row">
                    <h6 class="col-3"><strong>전화번호</strong></h6>
                    <div class="d-flex col-9" id="pnum">
                        <div class="d-flex flex-column">
                            <div class="d-flex">
                                <input
                                    class="form-control"
                                    id="mphone"
                                    style="color: gray"
                                    type="tel"
                                    v-model="mphone1"
                                />
                                <input
                                    class="form-control"
                                    id="mphone"
                                    style="color: gray"
                                    type="tel"
                                    v-model="mphone2"
                                />
                                <input
                                    class="form-control"
                                    id="mphone"
                                    style="color: gray"
                                    type="tel"
                                    v-model="mphone3"
                                />
                            </div>

                            <div
                                id="phone_warning1"
                                class="text-danger"
                                style="font-size: 13px"
                            ></div>
                        </div>
                    </div>
                </div>
                <div class="d-flex mb-4 row">
                    <h6 class="col-3"><strong>생년월일</strong></h6>
                    <div class="col-9">
                        {{
                            member.mbirth.slice(0, 2) +
                            "년 " +
                            member.mbirth.slice(2, 4) +
                            "월 " +
                            member.mbirth.slice(4, 6) +
                            "일"
                        }}
                    </div>
                </div>
                <div class="d-flex mb-4 row">
                    <h6 class="col-3"><strong>성별</strong></h6>
                    <div class="col-9" style="color: gray">{{ member.msex }}</div>
                </div>
                <div class="d-flex mb-4 row">
                    <h6 class="col-3"><strong>계좌정보</strong></h6>
                    <div class="d-flex col-9">
                        <div class="me-2">
                            <input
                                style="color: gray"
                                type="text"
                                class="form-control"
                                id="form-account"
                                name="form-account1"
                                v-model="member.mbankName"
                                @change="validateBank"
                            />
                            <div
                                id="bank_warning"
                                class="text-danger"
                                style="font-size: 13px"
                            ></div>
                        </div>

                        <div class="">
                            <input
                                style="color: gray"
                                type="text"
                                class="form-control"
                                id="form-account"
                                name="form-account2"
                                v-model="member.mpayAccount"
                                @change="validateAccount"
                            />
                            <div
                                id="account_warning"
                                class="text-danger"
                                style="font-size: 13px"
                            ></div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end mb-4">
                    <button
                        class="btn btn-outline-secondary"
                        id="update-btn"
                        @click="updatePrivacy"
                    >
                        <strong>수정하기</strong>
                    </button>
                </div>
            </div>
            <hr />
            <div class="d-flex mt-4 mb-4 row">
                <div class="col-3">
                    <h5><strong>마케팅 정보 수신 및</strong></h5>
                    <h5><strong> 활용 동의 여부</strong></h5>
                </div>
                <div class="form-check mb-4 col-9">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="agree2"
                        name="agree2"
                        v-model="member.agree"
                        @click="updateAgree"
                    />
                    <label class="form-check-label mt-1 fw-bold" for="agree2">
                        (선택) 마케팅 정보 수신 동의
                    </label>
                    <div class="mt-3" style="color: gray">
                        <div>어셈블 소식과 이벤트에 대한 내용을 받아보세요.</div>
                        <div>
                            서비스의 주요 안내 및 결제/모임에 대한 안내는 수신 여부와 관계없이
                            발송됩니다.
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="mt-4 mb-5">
                <div class="d-flex mb-4 row">
                    <h5 class="col-3"><strong>회원 탈퇴</strong></h5>
                    <div class="col-9">
                        <p style="font-size: 18px"><strong>탈퇴시 주의사항</strong></p>
                        <div>
                            · 탈퇴 후에도 작성한 리뷰와 신청서의 내용은 서비스 내 계속 표시될 수
                            있습니다.
                        </div>
                        <div>
                            · 탈퇴 후에는 동일한 계정으로
                            <span style="color: red">재가입이 불가</span>합니다.
                        </div>
                        <br />
                        <br />
                        <div style="text-align: right">
                            <button
                                style="border: none; background-color: #fff"
                                @click="showWithdrawModal"
                            >
                                탈퇴하기
                            </button>
                            <WithdrawModal
                                id="#withdrawModal"
                                @close="hideWithdrawModal"
                                @withdraw="submitWithdraw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Modal } from "bootstrap";
import WithdrawModal from "./WithdrawModal.vue";
import memberAPI from "@/apis/memberAPI";

const emit = defineEmits(["close"]);

let withdrawModal = null;

const store = useStore();
const router = useRouter();

onMounted(() => {
    withdrawModal = new Modal(document.getElementById("#withdrawModal"));
});

function showWithdrawModal() {
    withdrawModal.show();
}

function hideWithdrawModal() {
    withdrawModal.hide();
}

//회원 탈퇴
async function submitWithdraw(mid) {
    //회원 탈퇴 후 로그인 해제 및 메인 페이지 이동
    await memberAPI.withdrawMember(mid);
    store.dispatch("deleteAuth");
    router.push("/");
}

const member = ref({
    mid: "",
    mname: "",
    mphone: "",
    msex: "",
    mbirth: "",
    mbankName: "",
    mpayAccount: "",
    agree: false,
});

const mphone1 = ref(null);
const mphone2 = ref(null);
const mphone3 = ref(null);

//개인정보 가져오기
async function getPrivacy(mid) {
    const response = await memberAPI.getPrivacy(mid);
    member.value.mid = response.data.mid;
    member.value.mname = response.data.mname;
    member.value.mphone = response.data.mphone;
    member.value.msex = response.data.msex;
    member.value.mbirth = response.data.mbirth.toString();
    member.value.mbankName = response.data.mbankName;
    member.value.mpayAccount = response.data.mpayAccount;
    member.value.agree = response.data.agree;

    mphone1.value = member.value.mphone.slice(0, 3);
    mphone2.value = member.value.mphone.slice(3, 7);
    mphone3.value = member.value.mphone.slice(7, 11);

    return member;
}

getPrivacy(store.state.mid);
// 유효성검사
function validateBank() {
    let flag = true;
    const bank_warning = document.getElementById("bank_warning");
    const validate_bank = /^[가-힣]{2,7}$/;
    if (!validate_bank.test(member.value.mbankName) || !member.value.mbankName) {
        bank_warning.innerHTML = "은행명을 형식(한글)에 맞게 입력해주세요.";
        flag = false;
    } else {
        bank_warning.innerHTML = " ";
        flag = true;
    }
    return flag;
}
function validateAccount() {
    let flag = true;
    const account_warning = document.getElementById("account_warning");
    const validate_account = /^[0-9]{1,17}$/;
    if (!validate_account.test(member.value.mpayAccount) || !member.value.mpayAccount) {
        flag = false;
        account_warning.innerHTML = "계좌번호를 형식(숫자)에 맞게 입력해주세요.";
    } else {
        flag = true;
        account_warning.innerHTML = " ";
    }
    console.log(flag);
    return flag;
}
function validatePhone1() {
    let flag = true;
    const validate_phone_network = /^010$/;
    const validate_phone = /^[0-9]{4}$/;
    const phone_warning1 = document.getElementById("phone_warning1");

    if (
        !validate_phone_network.test(mphone1.value) ||
        !mphone1.value ||
        !validate_phone.test(mphone2.value) ||
        !mphone2.value ||
        !validate_phone.test(mphone3.value) ||
        !mphone3.value
    ) {
        flag = false;
        phone_warning1.innerHTML = "형식(010.xxxx.xxxx)에 맞게 입력하세요.";
    } else {
        flag = true;
        phone_warning1.innerHTML = " ";
    }
    console.log(flag);
    return flag;
}

//개인정보 변경
async function updatePrivacy() {
    //바뀐 전화번호 Concat
    if ((validateAccount() & validateBank() & validatePhone1()) == true) {
        member.value.mphone = mphone1.value + mphone2.value + mphone3.value;
        await memberAPI
            .updatePrivacy(JSON.parse(JSON.stringify(member.value)))
            .then(() => alert("회원정보 수정이 완료되었습니다."));
    }
}

//동의사항 변경
function updateAgree() {
    member.value.agree = !member.value.agree;

    const nmember = {
        mid: member.value.mid,
        agree: member.value.agree,
    };

    memberAPI.updateAgree(nmember);
}
</script>

<style scoped>
#privacyInfoForm {
    width: 100%;
    margin: 0 auto;
}

#update-btn {
    width: 120px;
    height: 45px;
    border-radius: 5%;
    font-size: 15px;
    border-color: #a29e9a;
}

#mintroduce {
    /* width: 70%; */
    height: 100px;
    padding: 10px;
    resize: none;
    color: gray;
}

input::placeholder {
    text-align: start;
    padding-left: 20px;
    color: #a29e9a;
    font-size: 14px;
    width: 100%;
    overflow-wrap: break-word;
}

input[type="checkbox"] {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 10px;
    border: solid 0.3px #cecac8;
}

input[type="checkbox"]:checked {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 10px;
    border: solid 0.3px #558ccf;
    background-color: #558ccf;
}
#mphone {
    height: 30px;
    width: 70px;
    margin-right: 10px;
}
</style>

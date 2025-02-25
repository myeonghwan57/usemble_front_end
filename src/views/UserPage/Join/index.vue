<template>
    <form @submit.prevent="handleSubmit">
        <div v-show="isStep1" class="my-5" id="joinForm">
            <div class="d-flex mb-2" id="join-step">
                <div>
                    <h6><strong>1. 회원정보 입력</strong></h6>
                </div>
                <div style="color: #cecac8">
                    <h6><strong>&nbsp; > &nbsp;2. 카테고리 선택</strong></h6>
                </div>
            </div>

            <div class="mb-4 d-flex">
                <div id="email-bold"><span class="highlight">회원가입</span></div>
                <div id="step1-title">하기</div>
            </div>

            <div class="mb-4">
                <div class="mb-2 fs-6 fw-bold">프로필 이미지 등록</div>

                <input id="file" type="file" @change="loadThumb" />
                <label class="mb-2" for="file">
                    <img type="button" :src="thumbnailSrc" class="thumbnail" id="thumbnail" />
                    <div type="button" id="camera">
                        <i id="camicon" class="bi bi-camera-fill text-white"></i>
                    </div>
                </label>
                <div id="img_warning" class="text-danger" style="font-size: 13px"></div>
            </div>
            <div class="mt-4">
                <div class="mb-2 fs-6 fw-bold">자기소개 입력</div>
                <div class="rounded fw-bold">
                    <textarea
                        type="text"
                        id="text-box"
                        placeholder="예) OOO에서 그래픽 디자이너로 일하고 있습니다. 일상의 무료함을 달래며 영감을 얻기 위해 어셈블을 시작하게 됐어요! 좋은 분들을 만나 즐거운 시간을 보낼 수 있었으면 좋겠습니다."
                        v-model="member.mintroduce"
                        @change="validateIntro"
                        @input="limitText"
                    />
                </div>
                <div>{{ member.mintroduce.length }}/250</div>
                <div id="intro_warning" class="text-danger" style="font-size: 13px"></div>
            </div>
            <div class="mb-3 mt-3 fs-6 fw-bold">아이디/비밀번호 입력</div>
            <div class="d-flex flex-column mb-2">
                <div class="d-flex">
                    <div class="input-group me-2">
                        <input
                            type="text"
                            id="form-email"
                            class="form-control d-flex"
                            placeholder="이메일주소 입력"
                            v-model="member.mid"
                            @change="validateEmail"
                        />
                    </div>

                    <button
                        type="button"
                        :class="idCheckBtn"
                        :style="idCheckBtnStyle"
                        id="check-btn"
                        @click="IdCheck"
                    >
                        중복 확인
                    </button>
                </div>
                <div id="id_warning" :class="idWarningClass" style="font-size: 13px"></div>
            </div>

            <div class="input-group">
                <input
                    type="password"
                    id="form-input"
                    class="form-control"
                    placeholder="비밀번호 (8자 이상)"
                    v-model="mpwd.mpwd1"
                    @change="validatePwd1"
                />
            </div>
            <div id="pwd_warning" class="text-danger" style="font-size: 13px"></div>

            <div class="input-group mt-2">
                <input
                    type="password"
                    id="form-input"
                    class="form-control"
                    placeholder="비밀번호 재입력"
                    v-model="mpwd.mpwd2"
                    @change="validatePwd2"
                />
            </div>
            <div id="pwd2_warning" class="text-danger" style="font-size: 13px"></div>

            <div class="mt-4 mb-3 fs-6"><strong>이름</strong></div>
            <div class="input-group">
                <span
                    ><input
                        type="text"
                        id="form-input"
                        class="form-control"
                        placeholder="이름"
                        v-model="member.mname"
                        @change="validateName"
                /></span>
            </div>
            <div id="name_warning" class="text-danger" style="font-size: 13px"></div>

            <div class="mt-4 mb-3 fs-6"><strong>생년월일</strong></div>
            <div class="input-group d-flex mb-4">
                <div>
                    <span
                        ><input
                            type="text"
                            id="form-input"
                            class="form-control fw-bold"
                            placeholder="YYMMDD"
                            v-model="member.mbirth"
                            @change="validateBirth"
                    /></span>
                    <div id="birth_warning" class="text-danger" style="font-size: 13px"></div>
                </div>
                <div class="d-flex align-items-center ms-5">
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio1"
                            value="남"
                            v-model="member.msex"
                            @change="validateSex"
                        />
                        <label class="form-check-label" for="inlineRadio1">남</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio2"
                            value="여"
                            v-model="member.msex"
                            @change="validateSex"
                        />
                        <label class="form-check-label" for="inlineRadio2">여</label>
                    </div>
                    <div id="sex_warning" class="text-danger" style="font-size: 13px"></div>
                </div>
            </div>

            <div class="mt-4 mb-3 fs-6"><strong>휴대전화</strong></div>
            <div class="input-group">
                <div class="d-flex">
                    <div class="me-2">
                        <span>
                            <input
                                type="text"
                                class="form-control fw-bold"
                                id="form-input"
                                name="form-mphone"
                                v-model="mph.m1"
                                @change="validatePhone"
                            />
                        </span>
                        <div id="phone_warning" class="text-danger" style="font-size: 13px"></div>
                    </div>
                    <div class="me-2">
                        <span
                            ><input
                                type="text"
                                class="form-control"
                                id="form-input"
                                name="form-mphone"
                                v-model="mph.m2"
                                @change="validatePhone1"
                        /></span>
                        <div id="phone_warning1" class="text-danger" style="font-size: 13px"></div>
                    </div>
                    <div class="mb-4">
                        <span
                            ><input
                                type="text"
                                class="form-control"
                                id="form-input"
                                name="form-mphone"
                                v-model="mph.m3"
                                @change="validatePhone2"
                        /></span>
                        <div id="phone_warning2" class="text-danger" style="font-size: 13px"></div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="mt-5 mb-3 fs-6"><strong>계좌정보</strong></div>
            <div class="d-flex">
                <div class="me-2">
                    <input
                        type="text"
                        class="form-control"
                        id="form-input"
                        name="form-account1"
                        placeholder="은행명"
                        v-model="member.mbankName"
                        @change="validateBank"
                    />
                    <div id="bank_warning" class="text-danger" style="font-size: 13px"></div>
                </div>
                <div>
                    <input
                        type="text"
                        class="form-control"
                        id="form-input"
                        name="form-account2"
                        placeholder="계좌번호"
                        v-model="member.mpayAccount"
                        @change="validateAccount"
                    />
                    <div id="account_warning" class="text-danger" style="font-size: 13px"></div>
                </div>
            </div>
            <div class="text-center">
                <button type="button" id="sub-btn" @click="nextStep"><strong>다음</strong></button>
            </div>
        </div>
        <!-- ------------------------------------------------------------------ -->
        <div v-show="isStep2" class="mt-5" id="joinForm">
            <div class="d-flex my-2" id="join-step">
                <div style="color: #cecac8">
                    <h6><strong>1. 회원정보 입력&nbsp; > &nbsp;</strong></h6>
                </div>
                <div>
                    <h6><strong>2. 카테고리 선택</strong></h6>
                </div>
            </div>
            <div class="mt-4 mb-3">
                <h2>회원가입 마지막 단계!</h2>
                <h2>관심있는 카테고리를 선택하세요</h2>
                <p style="color: gray">취향에 맞게 추천해드려요.</p>
            </div>
            <div class="form-control border-0 mb-2">
                <div class="d-flex">
                    <div v-for="(cate, index) in category" :key="index">
                        <input
                            type="button"
                            :value="cate.ctname"
                            :mcategory="mcategory.ctname"
                            class="btn ct-btn me-2"
                            :class="{
                                'ct-btn': !selected[index],
                                'ct-btn-select': selected[index],
                            }"
                            @click="selectCategory(index)"
                        />
                    </div>
                </div>
            </div>
            <div id="ct-select">*최대 3개({{ cnt }}/3)</div>
            <div id="mcategory_warning" class="text-danger" style="font-size: 13px"></div>

            <div class="mt-5 mb-5">
                <div class="form-check mb-4">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="agreeAll"
                        v-model="agreeAll"
                        @click="checkAll"
                        @change="validateAgree"
                    />
                    <label class="form-check-label mt-1" for="agreeAll"> 전체 동의하기 </label>
                </div>
                <hr style="color: gray" />
                <div class="form-check mb-4">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="agree1"
                        v-model="agree.agree1"
                        @change="validateAgree"
                    />
                    <label class="form-check-label mt-1" for="agree1"> 이용약관 동의 (필수) </label>
                </div>
                <div class="form-check mb-4">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="agree2"
                        v-model="agree.agree2"
                        @change="validateAgree"
                    />
                    <label class="form-check-label mt-1" for="agree2">
                        개인정보처리방침 동의 (필수)
                    </label>
                </div>
                <div class="form-check mb-4">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="agree3"
                        v-model="agree.agree3"
                    />
                    <label class="form-check-label mt-1" for="agree3">
                        마케팅 정보 수신 동의 (선택)
                    </label>
                </div>
                <div id="agree_warning" class="text-danger" style="font-size: 13px"></div>
            </div>
            <div class="text-center">
                <button type="submit" id="join-btn">
                    <strong>가입하기</strong>
                </button>
                <JoinModal id="joinModal" v-if="isModalVisible" @close="hideJoinModal" />
            </div>
        </div>
    </form>
</template>

<script setup>
import memberAPI from "@/apis/memberAPI";
import { ref, watch } from "vue";
import JoinModal from "./JoinModal.vue";

import { onMounted } from "vue";
import { Modal } from "bootstrap";

let joinModal = null;

onMounted(() => {
    joinModal = new Modal(document.querySelector("#joinModal"));
    thumbnailSrc.value = defaultImg;
});
function showJoinModal() {
    joinModal.show();
}

function hideJoinModal() {
    joinModal.hide();
}

let isStep1 = ref(true);
let isStep2 = ref(false);

const mph = ref({
    m1: "",
    m2: "",
    m3: "",
});

const mpwd = ref({
    mpwd1: "",
    mpwd2: "",
});
// const mattach = ref(null);
const member = ref({
    mid: "",
    mname: "",
    mpassword: "",
    mbirth: "",
    msex: "",
    mphone: "",
    mbankName: "",
    mpayAccount: "",
    mintroduce: "",
});
const limitText = () => {
    if (member.value.mintroduce.length > 250) {
        member.value.mintroduce = member.value.mintroduce.slice(0, 250);
    }
};

watch([() => mph.value.m1, () => mph.value.m2, () => mph.value.m3], ([newM1, newM2, newM3]) => {
    member.value.mphone = newM1 + newM2 + newM3;
});
watch([() => mpwd.value.mpwd1, () => mpwd.value.mpwd2], ([newM1, newM2]) => {
    if (newM1 == newM2) {
        member.value.mpassword = newM1;
    }
});
const category = ref([]);

async function getCategoryList() {
    try {
        const response = await memberAPI.getCategory();
        category.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

// 가져온 카테고리의 값들을 false로 설정
const mcategory = ref([]);
const selected = ref([false, false, false, false, false]);
// true의 개수를 세는 cnt
const cnt = ref(0);

function selectCategory(index) {
    if (cnt.value == 3) {
        // 카테고리를 3개 선택하면 더이상 선택할 수 없도록 하고, 선택된 카테고리를 선택 취소하면 true -> false
        if (selected.value[index] == false) {
            selected.value[index] = false;
        } else {
            selected.value[index] = false;
            cnt.value = cnt.value - 1;
            const delValue = mcategory.value.indexOf(category.value[index].ctno);
            mcategory.value.splice(delValue, 1);
        }
    } else if (cnt.value < 3) {
        // 선택된 카테고리가 3개 이하이면 다시 선택할 때 true, false 값을 바꿔주고 cnt를 더하거나 뺌
        if (selected.value[index] == false) {
            selected.value[index] = true;
            mcategory.value.push(category.value[index].ctno);
            cnt.value = cnt.value + 1;
        } else {
            selected.value[index] = false;
            cnt.value = cnt.value - 1;
            const delValue = mcategory.value.indexOf(category.value[index].ctno);
            mcategory.value.splice(delValue, 1);
        }
    }
}

getCategoryList();
const resultcate = ref([]);

function putMcategory() {
    let flag = true;
    const mcategory_warning = document.getElementById("mcategory_warning");

    for (let i = 0; i < mcategory.value.length; i++) {
        let mcate = { mid: "", ctno: "" };
        mcate.mid = member.value.mid;
        mcate.ctno = mcategory.value[i];
        resultcate.value.push(mcate);
    }

    if (resultcate.value.length == 0) {
        flag = false;
        mcategory_warning.innerHTML = "최소 1개 이상의 카테고리를 골라주세요.";
    } else {
        flag = true;
        mcategory_warning.innerHTML = " ";
    }
    return flag;
}

const agree = ref({
    agree1: false,
    agree2: false,
    agree3: false,
});

const agreeAll = ref(false);

function checkAll() {
    // 버튼 클릭시 개별 카테고리가 전체 선택되거나 해제
    if (agreeAll.value == false) {
        agree.value.agree1 = true;
        agree.value.agree2 = true;
        agree.value.agree3 = true;
    } else if (agreeAll.value == true) {
        agree.value.agree1 = false;
        agree.value.agree2 = false;
        agree.value.agree3 = false;
    }
}

// 모든 개별 카테고리를 선택, 해제됨에 따라 전체 선택 버튼이 true, false로 바뀜
watch(
    [() => agree.value.agree1, () => agree.value.agree2, () => agree.value.agree3],
    ([check1, check2, check3]) => {
        if (check1 && check2 && check3 == true) {
            agreeAll.value = !agreeAll.value;
        } else {
            agreeAll.value = false;
        }
    }
);

// 이미지 미리보기
// Define reactive properties
const defaultImg = "/images/admin.c79df4dc.png";
const thumbnailSrc = ref(defaultImg);

// Method to load thumbnail
function loadThumb() {
    let flag = true;
    const img_warning = document.getElementById("img_warning");
    const input = document.getElementById("file");

    if (input.files && input.files[0]) {
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (!validImageTypes.includes(input.files[0].type)) {
            img_warning.innerHTML = "프로필 이미지를 이미지 파일로 등록해주세요.(gif/jpeg/png)";
            input.value = "";
            return;
        } else {
            img_warning.innerHTML = "";
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            thumbnailSrc.value = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
        img_warning.innerHTML = " ";
        flag = true;
    } else {
        thumbnailSrc.value = defaultImg;
        img_warning.innerHTML = "프로필 이미지를 설정해주세요.";
        flag = false;
    }
    return flag;
}
function validateEmail() {
    let flag = true;
    const id_warning = document.getElementById("id_warning");
    const validate_id = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!validate_id.test(member.value.mid) || !member.value.mid) {
        flag = false;
        id_warning.innerHTML = "아이디(메일)형식을 지켜서 입력해주세요.";
    } else {
        flag = true;
        id_warning.innerHTML = " ";
    }
    return flag;
}

const emailCheckFlag = ref(false);
const idCheckResult = ref(null);
const idWarningClass = ref("text-danger");
const idCheckBtn = ref("btn btn-secondary");
const idCheckBtnStyle = ref("opacity = '0.4'");
async function IdCheck() {
    const response = await memberAPI.idCheck(member.value.mid);
    const id_warning = document.getElementById("id_warning");
    idCheckResult.value = response.data;
    if (idCheckResult.value == 0 && (validateEmail() & true) == true) {
        emailCheckFlag.value = true;
        id_warning.innerHTML = "사용 가능한 아이디 입니다.";
        idWarningClass.value = "text-success";
        idCheckBtn.value = "btn btn-dark";
        idCheckBtnStyle.value = "opacity = '1.0'";
    } else if (idCheckResult.value == 0 && (validateEmail() & true) == false) {
        emailCheckFlag.value = false;
        id_warning.innerHTML = "아이디(메일)형식을 지켜서 입력해주세요.";
        idWarningClass.value = "text-danger";
        idCheckBtn.value = "btn btn-secondary";
        idCheckBtnStyle.value = "opacity = '0.4'";
    } else {
        emailCheckFlag.value = false;
        id_warning.innerHTML = "이미 존재하는 아이디 입니다.";
        idWarningClass.value = "text-danger";
        idCheckBtn.value = "btn btn-secondary";
        idCheckBtnStyle.value = "opacity = '0.4'";
    }
}
function validateIntro() {
    let flag = true;
    const intro_warning = document.getElementById("intro_warning");
    if (!member.value.mintroduce) {
        flag = false;
        intro_warning.innerHTML = "자기소개를 입력해 주세요.";
    } else {
        flag = true;
        intro_warning.innerHTML = " ";
    }
    return flag;
}
function validatePwd1() {
    let flag = true;
    const pwd_warning = document.getElementById("pwd_warning");
    const validate_pwd = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (!validate_pwd.test(mpwd.value.mpwd1) || !mpwd.value.mpwd1) {
        flag = false;
        pwd_warning.innerHTML =
            "비밀번호 형식(특수문자, 영어 대/소문자, 숫자를 혼합해 8~16글자)에 맞게 입력해주세요.";
    } else {
        flag = true;
        pwd_warning.innerHTML = " ";
    }

    return flag;
}
function validatePwd2() {
    let flag = true;
    const pwd2_warning = document.getElementById("pwd2_warning");
    if (mpwd.value.mpwd1 != mpwd.value.mpwd2) {
        flag = false;
        pwd2_warning.innerHTML = "비밀번호가 일치하지 않습니다.";
    } else {
        flag = true;
        pwd2_warning.innerHTML = " ";
    }

    return flag;
}
function validateName() {
    let flag = true;
    const name_warning = document.getElementById("name_warning");
    const validate_name = /^[가-힣]{2,6}$/;
    if (!validate_name.test(member.value.mname) || !member.value.mname) {
        flag = false;
        name_warning.innerHTML = "이름을 형식에 맞게 입력해주세요.";
    } else {
        flag = true;
        name_warning.innerHTML = " ";
    }
    return flag;
}
function validateBirth() {
    let flag = true;
    const birth_warning = document.getElementById("birth_warning");
    const validate_birth = /^([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))$/;
    if (!validate_birth.test(member.value.mbirth) || !member.value.mbirth) {
        flag = false;
        birth_warning.innerHTML = "생년월일(YYMMDD)을 형식에 맞게 입력해주세요.";
    } else {
        flag = true;
        birth_warning.innerHTML = " ";
    }
    return flag;
}
function validateSex() {
    let flag = true;
    const sex_warning = document.getElementById("sex_warning");
    const is_check_m = document.getElementById("inlineRadio1").checked;
    const is_check_w = document.getElementById("inlineRadio2").checked;
    if (is_check_m == false && is_check_w == false) {
        flag = false;
        sex_warning.innerHTML = "성별을 선택해 주세요.";
    } else {
        flag = true;
        sex_warning.innerHTML = " ";
    }
    return flag;
}
function validatePhone() {
    let flag = true;
    const validate_phone = /(010)/;
    const phone_warning = document.getElementById("phone_warning");

    if (!validate_phone.test(mph.value.m1) || !mph.value.m1) {
        flag = false;
        phone_warning.innerHTML = "형식(010)에 맞게 입력하세요.";
    } else {
        flag = true;
        phone_warning.innerHTML = " ";
    }
    return flag;
}

function validatePhone1() {
    let flag = true;
    const validate_phone = /^[0-9]{4}$/;
    const phone_warning1 = document.getElementById("phone_warning1");

    if (!validate_phone.test(mph.value.m2) || !mph.value.m2) {
        flag = false;
        phone_warning1.innerHTML = "형식(숫자4개)에 맞게 입력하세요.";
    } else {
        flag = true;
        phone_warning1.innerHTML = " ";
    }
    return flag;
}
function validatePhone2() {
    let flag = true;
    const validate_phone = /^[0-9]{4}$/;

    const phone_warning2 = document.getElementById("phone_warning2");

    if (!validate_phone.test(mph.value.m3) || !mph.value.m3) {
        flag = false;
        phone_warning2.innerHTML = "형식(숫자4개)에 맞게 입력하세요.";
    } else {
        flag = true;
        phone_warning2.innerHTML = " ";
    }
    return flag;
}
function validateBank() {
    let flag = true;
    const bank_warning = document.getElementById("bank_warning");
    const validate_bank = /^[가-힣]{2,7}$/;
    if (!validate_bank.test(member.value.mbankName) || !member.value.mbankName) {
        flag = false;
        bank_warning.innerHTML = "은행명을 형식(한글)에 맞게 입력해주세요.";
    } else {
        flag = true;
        bank_warning.innerHTML = " ";
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
    return flag;
}

function nextStep() {
    //유효성 검사 작성.

    if (
        (loadThumb() &
            validateIntro() &
            validateAccount() &
            validateName() &
            validateEmail() &
            validateBank() &
            validateBirth() &
            validatePhone() &
            validatePhone1() &
            validatePhone2() &
            validatePwd1() &
            validatePwd2() &
            validateSex()) ==
        true
    ) {
        if (emailCheckFlag.value == false) {
            const id_warning = document.getElementById("id_warning");
            id_warning.innerHTML = "아이디 중복을 확인해 주세요.";
        } else {
            isStep1.value = !isStep1.value;
            isStep2.value = !isStep2.value;
        }
    }
}

function validateAgree() {
    let flag = true;
    const agree_warning = document.getElementById("agree_warning");
    const is_check_agree = document.getElementById("agreeAll").checked;
    const is_check_agree1 = document.getElementById("agree1").checked;
    const is_check_agree2 = document.getElementById("agree2").checked;
    if (is_check_agree == true) {
        agree_warning.innerHTML = "";
        flag = true;
    } else {
        if (is_check_agree1 == true && is_check_agree2 == true) {
            agree_warning.innerHTML = "";
            flag = true;
        } else {
            agree_warning.innerHTML = "필수 약관을 모두 동의해주세요.";
            flag = false;
        }
    }
    return flag;
}

// 약관 동의 유효성 검사 결과에 따라 모달을 띄우기
function isModalVisible() {
    if (validateAgree() == true) {
        showJoinModal();
    } else if (validateAgree() == false) {
        hideJoinModal();
    }
}

//가입 버튼 클릭시 실행
async function handleSubmit() {
    let flag = true;
    flag &= putMcategory();
    flag &= validateAgree();

    if (flag) {
        const formData = new FormData();
        formData.append("mid", member.value.mid);
        formData.append("mname", member.value.mname);
        formData.append("mpassword", member.value.mpassword);
        formData.append("mbirth", member.value.mbirth);
        formData.append("msex", member.value.msex);
        formData.append("mphone", member.value.mphone);
        formData.append("mbankName", member.value.mbankName);
        formData.append("mpayAccount", member.value.mpayAccount);
        formData.append("mintroduce", member.value.mintroduce);
        formData.append("agree", agree.value.agree3);

        const elMattach = document.getElementById("file");
        if (elMattach.files.length != 0) {
            formData.append("mattach", elMattach.files[0]);
        }
        try {
            const response = await memberAPI.join(formData);
            const response_cate = await memberAPI.putMcategory(
                JSON.parse(JSON.stringify(resultcate.value))
            );
            showJoinModal();
        } catch (error) {
            console.log(error);
        }
    } else {
        resultcate.value = [];
    }
}
</script>

<style scoped>
#joinForm {
    width: 50%;
    margin: 0 auto;
}

#form-email {
    margin-bottom: 5px;
    height: 50px;
    font-weight: bold;
}

#form-input {
    margin-bottom: 5px;
    height: 50px;
    font-weight: bold;
}

#email-bold {
    font-weight: bolder;
    font-size: 24px;
}

#step1-title {
    font-size: 24px;
}

.highlight {
    display: inline;
    box-shadow: inset 0 -10px 0 #57b17f;
}

input::placeholder {
    color: #a29e9a;
    font-size: 14px;
}

#check-btn {
    border: none;
    width: 100px;
    height: 50px;
    font-size: 16px;
    font-weight: bolder;
}

#sub-btn {
    text-align: center;
    margin-top: 100px;
    width: 450px;
    height: 45px;
    background-color: #558ccf;
    border: none;
    color: white;
    font-size: 15px;
    border-radius: 7px 7px;
}

#thumbnail {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
}

#camera {
    width: 30px;
    height: 30px;
    background-color: #558ccf;
    border: none;
    border-radius: 50%;
    position: absolute;
    transform: translate(220%, -90%);
}
#camicon {
    position: absolute;
    transform: translate(47%, 15%);
}
#text-box {
    width: 100%;
    font-size: 14px;
    padding: 20px 20px;
}

textarea {
    resize: none;
    border-color: lightgray;
    border-radius: 7px;
}
#file {
    display: none;
}

#joinForm {
    width: 50%;
    margin: 0 auto;
    text-align: left;
}
#test {
    width: 70%;
    margin: 0 auto;
}
h2 {
    font-weight: bolder;
    text-align: left;
}

.ct-btn {
    border-color: #cecac8;
    padding: 12px 25px;
    border-radius: 50px;
    opacity: 70%;
    font-size: 14px;
    font-weight: bolder;
}

.ct-btn:hover {
    border-color: #cecac8;
    padding: 12px 25px;
    border-radius: 50px;
    opacity: 70%;
    font-size: 14px;
    font-weight: bolder;
}

.ct-btn-select {
    color: white;
    border-color: #57b17f;
    background-color: #57b17f;
    padding: 12px 25px;
    border-radius: 50px;
    opacity: 70%;
    font-size: 14px;
    font-weight: bolder;
}

#ct-select {
    color: gray;
    font-size: 14px;
}

.form-check {
    font-weight: bolder;
}

input[type="checkbox"] {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 8px;
    border: solid 0.3px #cecac8;
}

input[type="checkbox"]:checked {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    margin-right: 8px;
    border: solid 0.3px #558ccf;
    background-color: #558ccf;
}

#join-btn {
    margin-top: 40px;
    width: 450px;
    height: 45px;
    background-color: #558ccf;
    border: none;
    color: white;
    font-size: 15px;
    border-radius: 7px 7px;
}
</style>

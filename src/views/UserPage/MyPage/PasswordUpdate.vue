<template>
    <div>
        <div class="mb-4 d-flex">
            <div class="fs-4 fw-bold"><span class="highlight">비밀번호 변경</span></div>
            <div class="fs-4">하기</div>
        </div>

        <div class="input-group mb-2">
            <input
                type="password"
                id="form-input"
                class="form-control p-2"
                placeholder="기존 비밀번호"
                v-model="passwordCheck"
            />
        </div>

        <div class="input-group">
            <input
                type="password"
                id="form-input"
                class="form-control p-2"
                placeholder="비밀번호 (특수문자, 영어 대/소문자, 숫자를 혼합해 8~16글자)"
                v-model="password"
            />
        </div>
        <span id="warning" style="color: red; font-size: 14px"></span>
        <div class="mt-3 text-end">
            <button class="btn" id="update-btn" @click="updatePassword">
                <strong>변경하기</strong>
            </button>
        </div>
    </div>
</template>

<script setup>
import memberAPI from "@/apis/memberAPI";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const password = ref("");
const passwordCheck = ref("");

//비밀번호 변경
async function updatePassword() {
    //TODO: 유효성 검사 추가

    const member = {
        mid: store.state.mid,
        newPassword: password.value,
        originPassword: passwordCheck.value,
    };
    const validate_pwd = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    const warning = document.getElementById("warning");

    if (!validate_pwd.test(member.newPassword) || !member.newPassword) {
        warning.innerHTML =
            "비밀번호 형식(특수문자, 영어 대/소문자, 숫자를 혼합해 8~16글자)에 맞게 입력해주세요.";
        return;
    }

    const response = await memberAPI.updatePassword(member);

    //비밀번호 변경 성공 시
    if (response.data.response == "success") {
        //로그인 해제 후 메인페이지 이동
        store.dispatch("deleteAuth");
        router.push("/");
    } else {
        //문제 발생 시 정보를 보여줄 element

        if (response.data.reason == "originPassword") {
            //기존 비밀번호가 틀렸을 시
            warning.innerHTML = "기존 비밀번호와 맞지 않습니다.";
        } else {
            //같은 비밀번호로 변경 시도 시
            warning.innerHTML = "같은 비밀번호로는 변경하실 수 없습니다.";
        }
    }
}
</script>

<style scoped>
.highlight {
    display: inline;
    box-shadow: inset 0 -10px 0 #57b17f;
}

input::placeholder {
    text-align: start;
    color: #a29e9a;
    font-size: 14px;
    width: 100%;
    overflow-wrap: break-word;
}

#update-btn {
    justify-content: center;
    background-color: #558ccf;
    border: none;
    color: white;
    font-weight: bolder;
    width: 120px;
    height: 40px;
    font-size: 15px;
}
</style>

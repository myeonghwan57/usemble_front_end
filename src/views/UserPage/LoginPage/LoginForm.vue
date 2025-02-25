<template>
    <div class="mt-5" id="loginForm">
        <div class="mb-5 d-flex">
            <div id="email-bold"><span class="highlight">이메일</span></div>
            <div id="login-title">로 로그인하기</div>
        </div>

        <form>
            <div class="d-flex mb-2">
                <div class="input-group">
                    <input
                        type="email"
                        id="form-email"
                        class="form-control d-flex"
                        placeholder="이메일주소 입력"
                        v-model="member.mid"
                    />
                </div>
            </div>
            <div class="input-group mb-2">
                <input
                    type="password"
                    id="form-input"
                    class="form-control"
                    placeholder="비밀번호 (8자 이상)"
                    v-model="member.mpassword"
                />
            </div>
        </form>

        <div class="d-flex justify-content-between mb-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="1" id="autoLogin" />
                <label class="form-check-label" for="autoLogin"> 자동 로그인 </label>
            </div>
            <div class="">
                혹시, <a id="findpassword-btn" href="./findPassword">비밀번호</a>를 잊으셨나요?
            </div>
        </div>
        <div id="loginWarn" class="text-danger" style="font-size: 13px"></div>

        <div class="text-center">
            <button type="submit" id="sub-btn" @click.prevent="handleLogin">
                <strong>로그인</strong>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import memberAPI from "@/apis/memberAPI";

const store = useStore();
const router = useRouter();

const member = ref({
    mid: "",
    mpassword: "",
});

async function handleLogin() {
    //문제 발생시 정보를 보여줄 element
    const warning = document.getElementById("loginWarn");

    //유효성 검사
    //아이디를 입력안했을 때
    if (member.value.mid.length == 0) {
        warning.innerHTML = "아이디를 입력해주세요.";
        //비밀번호를 입력 안했을 떄
    } else if (member.value.mpassword.length == 0) {
        warning.innerHTML = "비밀번호를 입력해주세요.";
    } else {
        try {
            const data = JSON.parse(JSON.stringify(member.value));
            const response = await memberAPI.login(data);

            //로그인 성공 시
            if (response.data.result == "success") {
                //payload 데이터
                const payload = {
                    mid: response.data.mid,
                    mname: response.data.mname,
                    mrole: response.data.mrole,
                    accessToken: response.data.accessToken,
                };
                //자동 로그인 체크시
                if (document.getElementById("autoLogin").checked) {
                    //로컬스토리지 저장
                    store.dispatch("saveAuthLocal", payload);
                    const responseAlarm = await memberAPI.isAlarm(payload.mid);
                    store.commit("changeIsAlarm", responseAlarm.data.isAlarm);
                } else {
                    //세션스토리지 저장
                    store.dispatch("saveAuthSession", payload);
                    const responseAlarm = await memberAPI.isAlarm(payload.mid);
                    store.commit("changeIsAlarm", responseAlarm.data.isAlarm);
                }
                router.push("/");
            } else {
                if (response.data.reason == "id") {
                    //아이디가 존재하지 않는다면
                    warning.innerHTML = "존재하지 않는 아이디입니다.";
                } else {
                    //비밀번호가 틀릴 시
                    warning.innerHTML = "잘못된 비밀번호를 입력하셨습니다.";
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}
</script>

<style scoped>
#loginForm {
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
    width: 700px;
    height: 50px;
    font-weight: bold;
}

#email-bold {
    font-weight: bolder;
    font-size: 24px;
}

input::placeholder {
    color: #a29e9a;
    font-size: 14px;
}

#login-title {
    font-size: 24px;
}

.highlight {
    display: inline;
    box-shadow: inset 0 -10px 0 #57b17f;
}

#findpassword-btn {
    text-decoration-line: none;
    color: #558ccf;
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
</style>

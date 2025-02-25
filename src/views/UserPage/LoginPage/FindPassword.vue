<template>
    <div class="mt-5" id="findPassword">
        <div class="mb-5 d-flex">
            <div id="title-bold"><span class="highlight">비밀번호</span></div>
            <div id="find-title">&nbsp;찾기</div>
        </div>

        <form @submit.prevent="handleFindPassword">
            <div class="d-flex mb-2">
                <div class="input-group me-2">
                    <input
                        type="email"
                        id="form-email"
                        class="form-control d-flex"
                        placeholder="이메일주소 입력"
                        v-model="mid"
                    />
                </div>
            </div>
        </form>
        <span id="warning" style="color: red; font-size: 14px">&nbsp;</span>
        <div class="text-center">
            <button type="submit" id="sub-btn" @click="handleFindPassword">
                <strong>전송하기</strong>
            </button>
            <FindModal id="findModal" :mpassword="mpassword" @close="hideFindModal" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import memberAPI from "@/apis/memberAPI";
import FindModal from "./FindModal.vue";

const mid = ref("");
const mpassword = ref("");

//비밀번호 찾기
async function handleFindPassword() {
    //문제 발생 시 정보를 보여줄 element
    const warning = document.getElementById("warning");
    try {
        const response = await memberAPI.findPassword(mid.value);
        //비밀번호 찾기 성공 시
        if (response.data.result == "success") {
            mpassword.value = response.data.mpassword;
            showFindModal();
        } else {
            //아이디가 존재하지 않는다면
            warning.innerHTML = "존재하지 않는 아이디입니다.";
        }
    } catch (error) {
        console.log("error내용: ", error);
    }
}

let findModal = null;

onMounted(() => {
    findModal = new Modal(document.getElementById("findModal"));
});

function showFindModal() {
    findModal.show();
}

function hideFindModal() {
    findModal.hide();
}
</script>

<style scoped>
#findPassword {
    width: 50%;
    margin: 0 auto;
}

.highlight {
    display: inline;
    box-shadow: inset 0 -10px 0 #57b17f;
}

#title-bold {
    font-weight: bolder;
    font-size: 24px;
}

#find-title {
    font-size: 24px;
}

#form-email {
    margin-bottom: 5px;
    height: 50px;
    font-weight: bold;
}

input::placeholder {
    color: #a29e9a;
    font-size: 14px;
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

<template>
    <form @submit.prevent="handleSubmit">
        <div class="d-flex">
            <div class="text-start" id="profileInfoUpdate">
                <div class="mb-2 fs-4 fw-bold">프로필</div>
                <div class="mb-3 text-secondary">
                    낯선 어셈블로 초대를 받기 위해 어떤 일/공부를 하고 계시는지 회원님에 대해
                    알려주세요.
                </div>
                <hr />
                <img class="mt-2" id="proimg" :src="mattach" alt="" />
                <div id="img_warning" class="text-danger" style="font-size: 13px"></div>
                <div class="mx-2 my-3">
                    <input id="file" type="file" @change="loadProfileImg" />
                    <label for="file">
                        <div class="d-flex" id="imgbtn">
                            <span class="mx-2">프로필 이미지 수정</span>
                        </div>
                    </label>
                </div>

                <div>
                    <div class="mt-4 mb-1 fs-6 fw-bold text-black">자기소개 입력</div>
                    <div class="rounded p-3 text-secondary fw-bold">
                        <textarea
                            type="text"
                            id="text-box"
                            placeholder="예) OOO에서 그래픽 디자이너로 일하고 있습니다. 일상의 무료함을 달래며 영감을 얻기 위해 어셈블을 시작하게 됐어요! 좋은 분들을 만나 즐거운 시간을 보낼 수 있었으면 좋겠습니다."
                            v-model="member.mintroduce"
                            @change="validateIntroduce"
                            @input="limitText"
                        />
                        <div id="intro-box">{{ member.mintroduce.length }}/250</div>
                    </div>
                    <div
                        id="intro_warning"
                        class="text-danger"
                        style="font-size: 13px; padding-left: 16px"
                    ></div>
                </div>
                <div class="mt-5 text-center">
                    <button id="sub-btn" @click="updateProfile">등록하기</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import memberAPI from "@/apis/memberAPI";
import router from "@/router";

const mattach = ref(null);

const member = ref({
    mid: "",
    mintroduce: "",
});

const limitText = () => {
    if (member.value.mintroduce.length > 250) {
        member.value.mintroduce = member.value.mintroduce.slice(0, 250);
    }
};

//유저 프로필 가져오기
async function getUserProfile(mid) {
    const response = await memberAPI.getUserProfile(mid);
    if (response.data.response == "success") {
        member.value.mid = response.data.member.mid;
        member.value.mintroduce = response.data.member.mintroduce;
    }
}

//유저 프로필 이미지 가져오기
async function getAttach(mid) {
    try {
        const response = await memberAPI.memberAttachDownload(mid);
        const blob = response.data;
        mattach.value = URL.createObjectURL(blob);
    } catch (error) {
        console.log(error);
    }
}

const store = useStore();

getUserProfile(store.state.mid);

getAttach(store.state.mid);

//이미지 변경 시 예시 이미지 보여주기
function loadProfileImg() {
    //파일 element
    const input = document.getElementById("file");
    const img_warning = document.getElementById("img_warning");

    //파일이 추가됐을 때
    if (input.files && input.files[0]) {
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (!validImageTypes.includes(input.files[0].type)) {
            img_warning.innerHTML = "프로필 이미지를 이미지 파일로 등록해주세요.(gif/jpeg/png)";
            input.value = "";
            return;
        } else {
            img_warning.innerHTML = "";
        }
        //이미지 예시 보여주기
        const reader = new FileReader();
        const file = input.files[0];
        reader.onload = function (e) {
            document.getElementById("proimg").src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        //이미지 삭제
        document.getElementById("proimg").src = "";
    }
}

//유저 프로필 변경
async function updateProfile() {
    //파일 element
    const input = document.getElementById("file");

    //폼 데이터 생성
    const formData = new FormData();
    formData.append("mid", member.value.mid);
    formData.append("mintroduce", member.value.mintroduce);
    if (input.files.length != 0) {
        formData.append("mattach", input.files[0]);
    }

    try {
        const response = await memberAPI.updateProfile(formData);
        router.push("/mypage");
    } catch (error) {
        console.log(error);
    }
}
function validateIntroduce() {
    const intro_warning = document.getElementById("intro_warning");
    if (!member.value.mintroduce) {
        intro_warning.innerHTML = "자기소개를 입력해 주세요.";
    } else {
        intro_warning.innerHTML = " ";
    }
}
</script>

<style scoped>
#profileInfoUpdate {
    width: 100%;
    margin: 0 auto;
}

#text-box {
    width: 100%;
    height: 500px;
    font-size: 14px;
    padding: 20px 20px;
}

#sub-btn {
    align-items: center;
    width: 50%;
    height: 45px;
    background-color: #558ccf;
    border: none;
    color: white;
    font-size: 15px;
    border-radius: 7px 7px;
    font-weight: bold;
}
#proimg {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
}
#file {
    display: none;
}
#imgbtn {
    align-items: center;
    height: 45px;
    background-color: #57b17f;
    color: white;
    border: none;
    border-radius: 7px 7px;
    font-weight: bold;
    font-size: 14px;
    padding: 5px 7px;
}

textarea {
    resize: none;
}

#intro-box {
    word-break: keep-all;
}
</style>

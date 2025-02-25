<template>
    <ModalTemplate>
        <template v-slot:header><span class="header"></span></template>
        <template v-slot:body
            ><p style="font-size: 20px">
                회원님의 임시 비밀번호는
                <span style="color: red; font-weight: 700">{{ props.mpassword }}</span>
                입니다.
            </p></template
        >
        <template v-slot:footer>
            <button
                type="button"
                class="btn btn-secondary"
                style="margin-left: auto"
                @click="goUrlHome"
                data-bs-dismiss="modal"
            >
                메인 화면으로 가기
            </button>
            <button
                type="button"
                class="btn btn-secondary"
                style="margin-right: auto"
                @click="goUrlLogin"
                data-bs-dismiss="modal"
            >
                로그인 화면으로 가기
            </button>
        </template>
    </ModalTemplate>
</template>

<script setup>
import ModalTemplate from "@/components/ModalTemplate.vue";
import { useRouter } from "vue-router";

const props = defineProps(["mpassword"]);
const emit = defineEmits(["close"]);

const router = useRouter();

//메인으로 가기
function goUrlHome() {
    router.push("/");
}

//로그인으로 가기
function goUrlLogin() {
    router.push("/login");
}
</script>

<style scoped>
.header {
    font-weight: 600;
    color: black;
    font-size: 18px;
}

.btn-delete {
    color: black;
    background-color: white;
}
</style>

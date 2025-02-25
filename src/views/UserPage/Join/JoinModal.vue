<template>
    <ModalTemplate>
        <template v-slot:header>
            <i id="check" class="bi bi-check-circle-fill"></i>
        </template>

        <template v-slot:body
            ><h4>축하드립니다!</h4>
            <h5 class="text-secondary">회원가입을 완료했습니다!</h5></template
        >

        <template v-slot:footer>
            <button type="button" class="btn" @click="goHome">홈으로</button>
            <button type="button" class="btn" @click="goLogin">로그인</button>
        </template>
    </ModalTemplate>
</template>
<script setup>
import ModalTemplate from "@/components/ModalTemplate.vue";
import { useRouter } from "vue-router";

const emit = defineEmits(["close"]);
const router = useRouter();
function goHome() {
    emit("close");
    router.push("/");
}
function goLogin() {
    emit("close");
    router.push("./login");
}
</script>
<style scoped>
#check {
    color: #57b17f;
    font-size: 50px;
}
h5 {
    text-align: center;
}
</style>

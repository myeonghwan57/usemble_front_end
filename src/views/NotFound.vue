<template>
    <div style="position: relative; height: 500px">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">
            <img src="../../public/images/logo.png" width="25%" />
            <h4 class="mb-5" style="font-weight: 600">접근하실 수 없는 페이지입니다.</h4>
            <button @click="goMain()" class="rounded mainbtn">홈으로</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function goMain() {
    router.push("/");
}
</script>

<style scoped>
.mainbtn {
    padding: 0 130px;
    height: 60px;
    color: #fff;
    background-color: black;
    font-weight: 700;
    font-size: 18px;
    line-height: 90%;
}
</style>

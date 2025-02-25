<template>
    <ModalTemplate>
        <template v-slot:header>
            <div class="p-1">
                <h5 class="fw-bold">어셈블 실패</h5>
            </div>
        </template>
        <template v-slot:body>
            <div>
                <h5>{{ message }}</h5>
            </div>
        </template>
        <template v-slot:footer>
            <button class="btn" @click="goUrlBack" data-bs-dismiss="modal">뒤로가기</button>
        </template>
    </ModalTemplate>
</template>

<script setup>
import ModalTemplate from "@/components/ModalTemplate.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["message"]);
const emit = defineEmits(["close"]);

function goUrlBack() {
    emit("close");
    router.back();
}
</script>

<style scoped>
.btn {
    background-color: #558ccf;
    border: none;
    color: #ebf0f7;
    font-size: 16px;
    padding: 10px 25px;
    height: 50px;
    display: flex;
    text-align: center;
    align-items: center;
    word-break: keep-all;
    font-size: 16px;
    font-weight: 600;
}
.btnCancel {
    background-color: #ebf0f7;
    border: none;
    color: #558ccf;
    font-size: 16px;
    padding: 10px 25px;
    height: 50px;
    display: flex;
    text-align: center;
    align-items: center;
    word-break: keep-all;
    border-radius: 8%;
}
</style>

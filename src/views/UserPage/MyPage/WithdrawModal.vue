<template>
    <ModalTemplate>
        <template v-slot:header>
            <div class="p-1">
                <h5 class="fw-bold">정말 회원탈퇴 하시겠습니까?</h5>
            </div>
        </template>
        <template v-slot:body>
            <div></div>
        </template>
        <template v-slot:footer>
            <button class="btnCancel" @click="emit('close')" data-bs-dismiss="modal">
                취소할게요
            </button>
            <button class="btn" @click="emit('withdraw', $store.state.mid)" data-bs-dismiss="modal">
                탈퇴할게요
            </button>
        </template>
    </ModalTemplate>
</template>

<script setup>
import ModalTemplate from "@/components/ModalTemplate.vue";

const emit = defineEmits(["close", "withdraw"]);
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

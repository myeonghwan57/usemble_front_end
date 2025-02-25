<template>
    <ModalTemplate>
        <template v-slot:header
            ><span class="header"><h4>어셈블 취소</h4></span></template
        >
        <template v-slot:body><h5>정말로 어셈블을 취소하시겠습니까?</h5></template>
        <template v-slot:footer>
            <button
                type="button"
                class="btn btn-secondary"
                @click="emit('close')"
                data-bs-dismiss="modal"
            >
                닫기
            </button>
            <button type="button" class="btn btn-delete" @click="emit('cancel')">취소하기</button>
        </template>
    </ModalTemplate>
</template>

<script setup>
import ModalTemplate from "@/components/ModalTemplate.vue";

const emit = defineEmits(["close", "cancel"]);
</script>

<style scoped>
.header {
    font-weight: 600;
    color: black;
    font-size: 18px;
}

.btn-delete {
    color: white;
    background-color: rgb(254, 100, 100);
}
</style>

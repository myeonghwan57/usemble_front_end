<template>
    <ModalTemplate>
        <template v-slot:header>
            <div class="d-flex fw-bold mb-2">
                <div class="fs-5">작성을 모두 완료하셨네요!</div>
                <div>🎉</div>
            </div>
            <h5 class="fw-bold">작성하신 내용으로 어셈블 하시겠어요?</h5>
        </template>
        <template v-slot:body>
            <div class="text-secondary">
                <h6>* 어셈블 등록 후에는 내용 수정이 되지 않습니다.</h6>
                <h6>번거로우시더라도 꼼꼼한 확인을 부탁드릴게요 :)</h6>
            </div>
        </template>
        <template v-slot:footer>
            <div>
                <button
                    type="button"
                    class="btn me-3"
                    id="back-btn"
                    @click="emit('close')"
                    data-bs-dismiss="modal"
                >
                    내용 다시 확인하기
                </button>
                <button class="btn" id="sub-btn" @click.prevent="emit('submit')">
                    어셈블 하기!
                </button>
            </div>
        </template>
    </ModalTemplate>
</template>

<script setup>
import ModalTemplate from "@/components/ModalTemplate.vue";

const emit = defineEmits(["close", "submit"]);
</script>

<style scoped>
.btn {
    border: 0.5px solid #558ccf;
    font-size: 16px;
    width: 225px;
    height: 50px;
}

#back-btn {
    color: #558ccf;
}

#sub-btn {
    background-color: #558ccf;
    color: white;
}
</style>

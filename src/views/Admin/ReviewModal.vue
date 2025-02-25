<template>
    <ModalTemplate>
        <template v-slot:header><span class="header fs-4">리뷰 상세</span></template>
        <template v-slot:body>
            <div class="d-flex flex-column">
                <span>어셈블 제목: {{ props.review.stitle }}</span>
                <span class="mt-2"
                    >날짜: {{ new Date(props.review.rdate).toLocaleDateString() }}</span
                >
                <pre id="rcontent" class="mt-4">{{ props.review.rcontent }}</pre>
            </div>
        </template>
        <template v-slot:footer>
            <button
                type="button"
                class="btn btn-secondary"
                @click="emit('close')"
                data-bs-dismiss="modal"
            >
                닫기
            </button>
            <button type="button" @click="deleteReview" class="btn btn-delete">삭제하기</button>
        </template>
    </ModalTemplate>
</template>

<script setup>
import ModalTemplate from "@/components/ModalTemplate.vue";
import adminAPI from "@/apis/adminAPI";

const props = defineProps(["review"]);
const emit = defineEmits(["close", "reload"]);

async function deleteReview() {
    try {
        await adminAPI.deleteReview(props.review.mid, props.review.sno);
        emit("close");
        emit("reload");
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
.header {
    font-weight: 600;
    color: black;
    font-size: 18px;
}

.btn-update {
    color: white;
    background-color: #558ccf;
}

.btn-delete {
    color: white;
    background-color: rgb(254, 100, 100);
}

pre {
    width: 100%;
    white-space: pre-wrap;
    font-family: "NanumSquare", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>

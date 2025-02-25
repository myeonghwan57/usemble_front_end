<template>
    <ModalTemplate>
        <template v-slot:header><span class="header fs-4">리뷰 수정</span></template>
        <template v-slot:body>
            <textarea
                id="rcontent"
                class="p-3"
                placeholder="리뷰를 작성해주세요."
                v-model="review.rcontent"
            ></textarea>
            <span id="warning" v-if="warning" style="color: red">{{ warnMessage }}</span>
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
            <button type="button" @click="updateReview" class="btn btn-update">수정하기</button>
        </template>
    </ModalTemplate>
</template>

<script setup>
import ModalTemplate from "@/components/ModalTemplate.vue";
import reviewAPI from "@/apis/reviewAPI";
import { inject, ref } from "vue";

const emit = defineEmits(["close", "reload"]);
const warning = ref(false);
const warnMessage = ref("");
const review = inject("review");

async function deleteReview() {
    try {
        await reviewAPI.deleteReview(review.value.mid, review.value.sno);
        review.value.rcontent = "";
        emit("reload");
        emit("close");
    } catch (error) {
        console.log(error);
    }
}

async function updateReview() {
    try {
        if (validateReview()) {
            await reviewAPI.updateReview(JSON.parse(JSON.stringify(review.value)));
            emit("close");
        }
    } catch (error) {
        console.log(error);
    }
}

function validateReview() {
    const hyperLink = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
    const reviewCopy = { ...review.value };

    if (reviewCopy.rcontent.replace(/[^a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "").length == 0) {
        warning.value = true;
        warnMessage.value = "한글 또는 영어를 이용해서 리뷰를 작성해주세요.";
        return false;
    } else if (hyperLink.test(reviewCopy.rcontent)) {
        warning.value = true;
        warnMessage.value = "하이퍼링크는 리뷰에 포함하실 수 없습니다.";
        return false;
    } else if (reviewCopy.rcontent.length > 100) {
        warning.value = true;
        warnMessage.value = "리뷰는 100자 이내로 작성해주세요.";
        return false;
    } else {
        warning.value = false;
        warnMessage.value = "";
        return true;
    }
}
</script>

<style scoped>
.header {
    font-weight: 600;
    color: black;
    font-size: 18px;
}

textarea {
    width: 100%;
    height: 300px;
    resize: none;
}

.btn-update {
    color: white;
    background-color: #558ccf;
}

.btn-delete {
    color: white;
    background-color: rgb(254, 100, 100);
}
</style>

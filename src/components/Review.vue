<template>
    <div class="px-3 pt-3">
        <div>
            <div class="d-flex justify-content-between">
                <RouterLink
                    style="text-decoration: none"
                    :to="`/social/detail?sno=${props.review.sno}`"
                    ><p class="theme-color-text mb-2 me-2">{{ props.review.stitle }}</p></RouterLink
                >
                <div class="d-flex" v-if="isReview">
                    <span style="cursor: pointer" @click="showUpdateReviewModal">수정하기</span>
                    <span>&nbsp;|&nbsp;</span>
                    <span style="cursor: pointer" @click="showDeleteReviewModal">삭제하기</span>
                </div>
            </div>
            <p class="subtext">
                {{ props.review.mname }} |
                {{ new Date(props.review.sstartDate).toLocaleDateString() }} 참여
            </p>
        </div>
        <pre class="review-text">{{ props.review.rcontent }}</pre>
        <hr />
    </div>
</template>

<script setup>
import { inject, ref } from "vue";

const props = defineProps(["review", "isReview"]);
const emit = defineEmits(["showUpdateReviewModal", "showDeleteReviewModal"]);

const selectSno = inject("selectSno", () => 0);
const review = inject("review", () => {});
const isReview = ref(props.isReview || false);

function showUpdateReviewModal() {
    selectSno.value = props.review.sno;
    review.value = props.review;
    emit("showUpdateReviewModal");
}

function showDeleteReviewModal() {
    selectSno.value = props.review.sno;
    emit("showDeleteReviewModal");
}
</script>

<style scoped>
.subtext {
    color: #707070;
    font-weight: 700;
    font-size: 15px;
}

.theme-color-text {
    color: #558ccf;
    font-weight: 700;
    font-size: 16px;
}

pre {
    color: black;
    font-family: "NanumSquare", sans-serif;
    font-size: 14px;
}

.review-text {
    /* 한 줄 자르기 */
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    /* 여러 줄 자르기 추가 스타일 */
    white-space: normal;
    line-height: 1.2;
    height: 2.2em;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>

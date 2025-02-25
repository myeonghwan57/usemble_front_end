<template>
    <div class="d-flex justify-content-between" id="socialinfo">
        <div class="d-flex">
            <div id="socialimg">
                <RouterLink :to="`/social/detail?sno=${props.application.sno}`">
                    <img
                        :src="`${axios.defaults.baseURL}/social/sthumb/${props.application.sno}`"
                    />
                </RouterLink>
            </div>
            <div>
                <RouterLink class="no-deco" :to="`/social/detail?sno=${props.application.sno}`">
                    <div id="socialtitle">{{ props.application.stitle }}</div>
                </RouterLink>
                <div id="socialcontent">
                    <div class="mb-1">{{ props.application.saddress }}</div>
                </div>
                <div id="socialprice">{{ Number(props.application.sfee).toLocaleString() }}원</div>
            </div>
        </div>
        <div>
            <div v-if="new Date(props.application.sdeadline) <= new Date()">
                <button
                    v-if="!props.application.review"
                    class="d-flex btn me-4"
                    id="review-btn"
                    @click="showWriteReviewModal"
                >
                    리뷰작성
                </button>
                <button
                    v-if="props.application.review"
                    class="d-flex btn me-4"
                    id="review-btn"
                    @click="showUpdateReviewModal"
                >
                    리뷰수정
                </button>
                <button
                    class="d-flex btn mt-2 me-4"
                    id="delete-btn"
                    @click="showDeleteJoinHistoryModal"
                >
                    삭제하기
                </button>
            </div>
            <div v-if="new Date(props.application.sdeadline) > new Date()">
                <button
                    class="d-flex btn mt-2 me-4"
                    id="delete-btn"
                    @click="showCancelSocialJoinModal"
                >
                    취소하기
                </button>
            </div>
        </div>
    </div>
    <hr class="mx-3" />
</template>
<script setup>
import axios from "axios";
import { useStore } from "vuex";
import { inject } from "vue";
import reviewAPI from "@/apis/reviewAPI";

const props = defineProps(["application"]);
const emit = defineEmits([
    "reload",
    "showWriteReviewModal",
    "showUpdateReviewModal",
    "showDeleteJoinHistoryModal",
    "showCancelSocialJoinModal",
]);

const store = useStore();
const selectSno = inject("selectSno");
const review = inject("review");

async function getReview() {
    try {
        const response = await reviewAPI.getReview(store.state.mid, selectSno.value);
        review.value = response.data.review;
    } catch (error) {
        console.log(error);
    }
}

function showWriteReviewModal() {
    selectSno.value = props.application.sno;
    emit("showWriteReviewModal");
}

function showCancelSocialJoinModal() {
    selectSno.value = props.application.sno;
    emit("showCancelSocialJoinModal");
}

function showDeleteJoinHistoryModal() {
    selectSno.value = props.application.sno;
    emit("showDeleteJoinHistoryModal");
}

function showUpdateReviewModal() {
    selectSno.value = props.application.sno;
    getReview();
    emit("showUpdateReviewModal");
}
</script>
<style scoped>
img {
    width: 180px;
    height: 120px;
}

#socialinfo {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
}

#socialimg {
    margin: 0 15px;
}

#socialtitle {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 900;
    color: black;
}

#id {
    font-weight: 900;
}

#socialcontent {
    margin-top: 10px;
    font-size: 13px;
    font-weight: 500;
    color: grey;
}

#review-btn {
    justify-content: center;
    background-color: #558ccf;
    color: white;
    font-weight: 700;
    width: 120px;
    height: 40px;
}

#delete-btn {
    justify-content: center;
    background-color: black;
    color: white;
    font-weight: 700;
    width: 120px;
    height: 40px;
}

.no-deco {
    text-decoration: none;
}
</style>

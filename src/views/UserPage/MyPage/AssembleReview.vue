<template>
    <div class="d-flex">
        <div id="history">
            <div class="mb-5 text-center fw-bold fs-5">
                <i class="bi bi-chat-dots me-1" style="font-size: 45px"></i>
                <p>후기</p>
            </div>
            <div class="hr"></div>
            <div class="nav">
                <div class="nav-item">
                    <button class="nav-link fw-bold" @click="toMeClick" :class="{ active: toMe }">
                        나에게 작성된 후기
                    </button>
                </div>
                <div class="nav-item">
                    <button
                        class="nav-link fw-bold"
                        @click="fromMeClick"
                        :class="{ active: fromMe }"
                    >
                        내가 작성한 후기
                    </button>
                </div>
            </div>
            <div class="bg-light text-center review-space">
                <div class="hr"></div>
                <div id="txt" class="text-secondary text-start" style="font-size: 14px">
                    <div v-if="toMe">
                        <div class="review-empty" v-if="recieveReviewPage.reviewList.length == 0">
                            <div>아직 나에게 작성된 후기가 없으시네요!</div>
                            <div class="mb-4">어셈블 하고 후기를 받아보세요.</div>
                            <button
                                class="p-3 bg-black text-white rounded-1 fw-bold"
                                style="font-size: 14px; border: none"
                                @click="goWriteAssemble"
                            >
                                어셈블 작성하기
                            </button>
                        </div>
                        <Review
                            v-for="toMeReview in recieveReviewPage.reviewList"
                            :key="toMeReview.sno"
                            :review="toMeReview"
                        />
                    </div>
                    <div v-if="fromMe">
                        <div class="review-empty" v-if="leaveReviewPage.reviewList.length == 0">
                            <div>작성한 후기가 없으시네요!</div>
                            <div class="mb-4">어셈블에 놀러 다녀오신 후, 후기를 남겨보세요.</div>
                            <button
                                class="p-3 bg-black text-white rounded-1 fw-bold"
                                style="font-size: 14px; border: none"
                                @click="goAssembleList"
                            >
                                어셈블 둘러보기
                            </button>
                        </div>
                        <Review
                            v-for="fromMeReview in leaveReviewPage.reviewList"
                            :key="fromMeReview.sno"
                            :isReview="true"
                            :review="fromMeReview"
                            @showUpdateReviewModal="showUpdateReviewModal"
                            @showDeleteReviewModal="showDeleteReviewModal"
                        />
                    </div>
                </div>
            </div>
            <div
                v-if="recieveReviewPage.reviewList.length != 0 && toMe"
                class="d-flex justify-content-center mt-4"
            >
                <button
                    v-if="recieveReviewPage.reviewList.startPageNo > 1"
                    class="btn page-btn btn-sm me-1"
                    @click="
                        changeRpageNo(recieveReviewPage.pager.startPageNo - 1, $store.state.mid)
                    "
                >
                    이전
                </button>
                <button
                    v-for="pageNo in recieveReviewPage.pager.pageArray"
                    :key="pageNo"
                    :class="recieveReviewPage.pager.pageNo == pageNo ? 'cur-page' : ''"
                    class="btn page-btn btn-sm me-1"
                    @click="changeRpageNo(pageNo, $store.state.mid)"
                >
                    {{ pageNo }}
                </button>
                <button
                    v-if="recieveReviewPage.pager.groupNo < recieveReviewPage.pager.totalGroupNo"
                    class="btn page-btn btn-sm me-1"
                    @click="changeRpageNo(recieveReviewPage.pager.endPageNo + 1, $store.state.mid)"
                >
                    다음
                </button>
            </div>
            <div
                v-if="leaveReviewPage.reviewList.length != 0 && fromMe"
                class="d-flex justify-content-center mt-4"
            >
                <button
                    v-if="leaveReviewPage.reviewList.startPageNo > 1"
                    class="btn page-btn btn-sm me-1"
                    @click="changeLpageNo(leaveReviewPage.pager.startPageNo - 1, $store.state.mid)"
                >
                    이전
                </button>
                <button
                    v-for="pageNo in leaveReviewPage.pager.pageArray"
                    :key="pageNo"
                    :class="leaveReviewPage.pager.pageNo == pageNo ? 'cur-page' : ''"
                    class="btn page-btn btn-sm me-1"
                    @click="changeLpageNo(pageNo, $store.state.mid)"
                >
                    {{ pageNo }}
                </button>
                <button
                    v-if="leaveReviewPage.pager.groupNo < leaveReviewPage.pager.totalGroupNo"
                    class="btn page-btn btn-sm me-1"
                    @click="changeLpageNo(leaveReviewPage.pager.endPageNo + 1, $store.state.mid)"
                >
                    다음
                </button>
            </div>
        </div>
        <UpdateReviewModal id="updateReviewModal" @close="hideUpdateReviewModal" />
        <DeleteReviewModal
            id="deleteReviewModal"
            @close="hideDeleteReviewModal"
            @delete="deleteReview"
        />
    </div>
</template>

<script setup>
import reviewAPI from "@/apis/reviewAPI";
import Review from "@/components/Review.vue";
import { onMounted, provide, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import DeleteReviewModal from "./DeleteReviewModal.vue";
import { Modal } from "bootstrap";
import UpdateReviewModal from "./UpdateReviewInReviewModal.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

const toMe = ref(true);
const fromMe = ref(false);

const lPageNo = ref(route.query.lPageNo || 1);
const rPageNo = ref(route.query.rPageNo || 1);

const toMeClick = () => {
    toMe.value = true;
    fromMe.value = false;
    changeLpageNo(1);
};

const fromMeClick = () => {
    fromMe.value = true;
    toMe.value = false;
    changeRpageNo(1);
};

const recieveReviewPage = ref({
    pager: {},
    reviewList: [],
});

const leaveReviewPage = ref({
    pager: {},
    reviewList: [],
});

async function getRecieveReviewList(pageNo, mid) {
    try {
        const response = await reviewAPI.getRecieveReviewList(pageNo, mid);
        recieveReviewPage.value.pager = response.data.pager;
        recieveReviewPage.value.reviewList = response.data.reviewList;
    } catch (error) {
        console.log(error);
    }
}

getRecieveReviewList(rPageNo.value, store.state.mid);

async function getLeaveReviewList(pageNo, mid) {
    try {
        const response = await reviewAPI.getLeaveReviewList(pageNo, mid);
        leaveReviewPage.value.pager = response.data.pager;
        leaveReviewPage.value.reviewList = response.data.reviewList;
    } catch (error) {
        console.log(error);
    }
}

getLeaveReviewList(lPageNo.value, store.state.mid);

function goAssembleList() {
    router.push("/list");
}

function goWriteAssemble() {
    router.push("/social/write");
}

function changeLpageNo(argPageNo) {
    router.push(`/mypage/assembleReview?lPageNo=${argPageNo}`);
}

function changeRpageNo(argPageNo) {
    router.push(`/mypage/assembleReview?rPageNo=${argPageNo}`);
}

watch(route, (newRoute, oldRoute) => {
    if (newRoute.query.lPageNo) {
        getLeaveReviewList(newRoute.query.lPageNo, store.state.mid);
        lPageNo.value = newRoute.query.lPageNo;
    } else {
        getLeaveReviewList(1, store.state.mid);
        lPageNo.value = 1;
    }

    if (newRoute.query.rPageNo) {
        getRecieveReviewList(newRoute.query.rPageNo, store.state.mid);
        rPageNo.value = newRoute.query.rPageNo;
    } else {
        getRecieveReviewList(1, store.state.mid);
        rPageNo.value = 1;
    }
});

let updateReviewModal = null;
let deleteReviewModal = null;

onMounted(() => {
    updateReviewModal = new Modal(document.getElementById("updateReviewModal"));
    deleteReviewModal = new Modal(document.getElementById("deleteReviewModal"));
});

function showUpdateReviewModal() {
    updateReviewModal.show();
}

function hideUpdateReviewModal() {
    updateReviewModal.hide();
}

function showDeleteReviewModal() {
    deleteReviewModal.show();
}

function hideDeleteReviewModal() {
    deleteReviewModal.hide();
}

const selectSno = ref(0);
provide("selectSno", selectSno);

const review = ref({ sno: 0, rcontent: "", mid: "" });
provide("review", review);

async function deleteReview() {
    try {
        await reviewAPI.deleteReview(store.state.mid, selectSno.value);
        if (leaveReviewPage.value.reviewList.length == 1 && route.query.lPageNo > 1) {
            router.replace({ query: { pageNo: route.query.pageNo - 1 } });
            lPageNo.value = lPageNo.value - 1;
        }
        getLeaveReviewList(lPageNo.value, store.state.mid);
        hideDeleteReviewModal();
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
#history {
    width: 100%;
    margin: 0 auto;
}
#txt {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.hr {
    border-bottom: 1px solid lightgray;
}

.nav-link {
    text-align: center;
    width: 100%;
    color: gray;
}

.nav-link:focus {
    color: black;
    border-width: 100%;
    border-bottom: 1px solid black;
}

.active {
    color: black;
    border-width: 100%;
    border-bottom: 1px solid black;
}

.nav {
    display: flex;
}

.nav-item {
    flex-basis: 50%;
}

.nav-item:nth-child(1) {
    flex-shrink: 1;
}
.nav-item:nth-child(2) {
    flex-shrink: 1;
}

.review-space {
    height: 600px;
    position: relative;
}

.review-empty {
    font-size: 14px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.cur-page {
    font-weight: 800;
    color: #558ccf;
}

.page-btn {
    border: none;
    outline: none;
}

.cur-page:focus {
    border: none;
    outline: none;
}
</style>

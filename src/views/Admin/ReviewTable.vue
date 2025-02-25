<template>
    <div class="p-3 mt-4">
        <h4>후기 관리</h4>
        <table class="table table-bordered text-center" style="border-width: 1">
            <tr style="height: 50px">
                <th style="width: 150px">참여한 소셜링</th>
                <th style="width: 200px">내용</th>
                <th style="width: 90px">날짜</th>
                <th style="width: 40px">작성자</th>
                <th style="width: 40px">관리</th>
            </tr>
            <tr style="height: 50px" v-for="review in page.reviews" :key="review.mid">
                <!-- <td>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="1" />
                    </div>
                </td> -->
                <td>{{ review.stitle }}</td>
                <td id="rcontent">{{ review.rcontent }}</td>
                <td>{{ formatDate(review.rdate) }}</td>
                <td>{{ review.mid }}</td>
                <td>
                    <div>
                        <button
                            class="btn btn-md btn-outline-success"
                            @click="showReviewModal(review)"
                        >
                            상세보기
                        </button>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="5" class="text-center">
                    <button class="btn btn-sm me-1" @click="changePageNo(1)">처음</button>
                    <button
                        v-if="page.pager.groupNo > 1"
                        class="btn btn-sm me-1"
                        @click="changePageNo(page.pager.startPageNo - 1)"
                    >
                        이전
                    </button>
                    <button
                        v-for="pageNo in page.pager.pageArray"
                        :key="pageNo"
                        class="btn btn-sm me-1"
                        @click="changePageNo(pageNo)"
                    >
                        {{ pageNo }}
                    </button>
                    <button
                        v-if="page.pager.groupNo < page.pager.totalGroupNo"
                        class="btn btn-sm me-1"
                        @click="changePageNo(page.pager.endPageNo + 1)"
                    >
                        다음
                    </button>
                    <button class="btn btn-sm me-1" @click="changePageNo(page.pager.totalPageNo)">
                        맨끝
                    </button>
                </td>
            </tr>
        </table>
        <ReviewModal
            id="reviewModal"
            @close="hideReviewModal"
            :review="review"
            @reload="getReviewList($route.query.pageNo)"
        />
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import adminAPI from "@/apis/adminAPI";
import { useRoute, useRouter } from "vue-router";
import ReviewModal from "./ReviewModal.vue";
import { Modal } from "bootstrap";

const page = ref({
    reviews: [],
    pager: {},
});

const route = useRoute();
const pageNo = ref(route.query.pageNo || 1);

async function getReviewList(pageNo) {
    try {
        const response = await adminAPI.getReviewList(pageNo);
        page.value.reviews = response.data.reviews;
        page.value.pager = response.data.pager;
        console.log(page.value.reviews);
        //page.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
}

const router = useRouter();

function changePageNo(argPageNo) {
    router.push(`/admin/ReviewTable?pageNo=${argPageNo}`);
}
//요청 경로의 변경을 감시
watch(route, (newRoute, oldRoute) => {
    if (newRoute.query.pageNo) {
        getReviewList(newRoute.query.pageNo);
        pageNo.value = newRoute.query.pageNo;
    } else {
        getReviewList(1);
        pageNo.value = 1;
    }
});
getReviewList(pageNo.value);

let reviewModal = null;

onMounted(() => {
    reviewModal = new Modal(document.getElementById("reviewModal"));
});

const review = ref({ sno: 0, stitle: "", rdate: "", rcontent: "" });

function showReviewModal(reviewParam) {
    review.value = reviewParam;
    reviewModal.show();
}

function hideReviewModal() {
    reviewModal.hide();
}
</script>

<style scoped>
img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
}
#rcontent {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    max-width: 200px; /* Adjust the max-width as needed */
}

.btn-success {
    /* 기본 버튼 스타일 */
    background-color: #227e36;
    border-color: #218838;
    color: white;
}

.btn-danger {
    /* 기본 버튼 스타일 */
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
}
</style>

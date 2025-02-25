<template>
    <div class="content p-2">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <div class="profile-img me-3">
                            <img :src="mattach" width="100px" height="100px" />
                        </div>
                        <div class="profile">
                            <p class="subtext mt-2 mb-2" style="font-size: 16px">사용자</p>
                            <h4>{{ member.mname }}</h4>
                            <p class="subtext mt-2 mb-2">
                                {{ new Date(member.mdate).toLocaleDateString() }} 가입
                            </p>
                        </div>
                    </div>
                    <div class="mt-1">
                        <button
                            id="like"
                            class="like bi fs-4"
                            :class="{
                                'bi-heart': !like,
                                'like-deactive': !like,
                                'bi-heart-fill': like,
                                'like-active': like,
                            }"
                            @click="handleLike($store.state.mid, mid)"
                        ></button>
                    </div>
                </div>
                <hr />
                <div class="d-flex">
                    <div class="dashboard">
                        <p class="theme-color-text">좋아요를 받은 사용자의 수</p>
                        <h5>{{ member.likeCnt }}개</h5>
                    </div>
                    <div class="vr"></div>
                    <div class="dashboard">
                        <p class="theme-color-text">주최한 어셈블의 수</p>
                        <h5>{{ member.socialCnt }}개</h5>
                    </div>
                    <div class="vr"></div>
                    <div class="dashboard">
                        <p class="theme-color-text">함께한 분들의 후기</p>
                        <h5>{{ member.reviewCnt }}개</h5>
                    </div>
                </div>
                <hr />
                <div class="mt-5 mb-5">
                    <p class="profile-introduce">{{ member.mintroduce }}</p>
                </div>
            </div>
        </div>
        <div class="card mt-4">
            <div class="card-body review-space">
                <div class="review-empty" v-if="recruitList.length == 0">
                    <h5>{{ member.mname }}님이 진행 중인 어셈블</h5>
                    <span class="review-empty-text">아직 진행 중인 어셈블이 없습니다.</span>
                </div>
                <UserSocialList
                    v-if="recruitList.length != 0"
                    :title="member.mname + '님이 진행 중인 어셈블'"
                    :link="`/user/recruit?mid=${member.mid}`"
                    :socials="recruitList"
                />
            </div>
        </div>

        <div class="card mt-4">
            <div class="card-body review-space">
                <div class="review-empty" v-if="recruitedList.length == 0">
                    <h5>{{ member.mname }}님이 진행한 어셈블</h5>
                    <span class="review-empty-text">아직 진행한 어셈블이 없습니다.</span>
                </div>
                <UserSocialList
                    v-if="recruitedList.length != 0"
                    :title="member.mname + '님이 진행한 어셈블'"
                    :link="`/user/recruited?mid=${member.mid}`"
                    :socials="recruitedList"
                />
            </div>
        </div>

        <div class="card mt-4">
            <div class="card-body review-space">
                <h5>함께한 분들의 후기 {{ member.reviewCnt }}</h5>
                <div class="review-empty" v-if="recieveReviewPage.reviewList.length == 0">
                    <span class="review-empty-text">아직 작성된 후기가 없습니다.</span>
                </div>
                <Review
                    v-for="toMeReview in recieveReviewPage.reviewList"
                    :key="toMeReview.sno"
                    :review="toMeReview"
                />
                <div
                    v-if="recieveReviewPage.reviewList.length != 0"
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
                        v-if="
                            recieveReviewPage.pager.groupNo < recieveReviewPage.pager.totalGroupNo
                        "
                        class="btn page-btn btn-sm me-1"
                        @click="
                            changeRpageNo(recieveReviewPage.pager.endPageNo + 1, $store.state.mid)
                        "
                    >
                        다음
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import memberAPI from "@/apis/memberAPI";
import Review from "@/components/Review.vue";
import UserSocialList from "./UserSocialList.vue";
import reviewAPI from "@/apis/reviewAPI";
import socialAPI from "@/apis/socialAPI";

onMounted(() => {
    getRecruitAssemble(route.query.mid);
    getRecruitedAssemble(route.query.mid);
});

//멤버 정보
const member = ref({
    mid: "",
    mname: "",
    mintroduce: "",
    mdate: "",
    likeCnt: 0,
    socialCnt: 0,
    reviewCnt: 0,
});

const route = useRoute();
const router = useRouter();
const store = useStore();
const mid = route.query.mid;

const mattach = ref(null);

//유저 프로필 이미지 가져오기
async function getAttach(mid) {
    try {
        const response = await memberAPI.memberAttachDownload(mid);
        const blob = response.data;
        mattach.value = URL.createObjectURL(blob);
    } catch (error) {
        console.log(error);
    }
}

getAttach(mid);

//유저 프로필 가져오기
async function getMember(mid) {
    try {
        const response = await memberAPI.getUserProfile(mid);
        member.value.mid = response.data.member.mid;
        member.value.mname = response.data.member.mname;
        member.value.mintroduce = response.data.member.mintroduce;
        member.value.mdate = response.data.member.mdate;
    } catch (error) {
        console.log(error);
    }
}

getMember(mid);

provide("member", member);

//나의 좋아요 상태
const like = ref(false);

//나의 좋아요 상태 가져오기
async function getLikeState(mid, fmid) {
    try {
        const response = await memberAPI.getLikeState(mid, fmid);
        like.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

getLikeState(store.state.mid, mid);

//좋아요
async function handleLike(mid, fmid) {
    //스스로를 좋아요 시도 시
    if (mid === fmid) {
        alert("스스로를 좋아요할 수 없습니다.");
        return;
    }

    if (store.state.mrole == "ROLE_ADMIN") {
        alert("관리자는 좋아요를 할 수 없습니다.");
        return;
    }

    if (store.state.mid == "") {
        router.push("/login");
        return;
    }

    like.value = !like.value;

    //좋아요 했을 시
    if (like.value) {
        const response = await memberAPI.insertLike(mid, fmid);
        getLikeCnt(fmid);
    } else {
        const response = await memberAPI.deleteLike(mid, fmid);
        getLikeCnt(fmid);
    }
}

//대쉬보드 정보
//좋아요 수 가져오기
async function getLikeCnt(mid) {
    try {
        const response = await memberAPI.getLikeCnt(mid);
        member.value.likeCnt = response.data;
    } catch (error) {
        console.log(error);
    }
}

getLikeCnt(mid);

//소셜 작성 수 가져오기
async function getSocialCnt(mid) {
    try {
        const response = await memberAPI.getSocialCnt(mid);
        member.value.socialCnt = response.data;
    } catch (error) {
        console.log(error);
    }
}

getSocialCnt(mid);

//리뷰 받은 수 가져오기
async function getReviewCnt(mid) {
    try {
        const response = await memberAPI.getReviewCnt(mid);
        member.value.reviewCnt = response.data;
    } catch (error) {
        console.log(error);
    }
}

getReviewCnt(mid);

// 모집중인 어셈블 가져오기
const recruitList = ref([]);
async function getRecruitAssemble(mid) {
    try {
        const response = await socialAPI.recruitAssemble(mid);
        recruitList.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

// 마감된 어셈블 가져오기
const recruitedList = ref([]);
async function getRecruitedAssemble(mid) {
    try {
        const response = await socialAPI.recruitedAssemble(mid);
        recruitedList.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

const recieveReviewPage = ref({
    pager: {},
    reviewList: [],
});

const rPageNo = ref(route.query.rPageNo || 1);

async function getRecieveReviewList(pageNo, mid) {
    try {
        const response = await reviewAPI.getRecieveReviewList(pageNo, mid);
        recieveReviewPage.value.pager = response.data.pager;
        recieveReviewPage.value.reviewList = response.data.reviewList;
    } catch (error) {
        console.log(error);
    }
}

getRecieveReviewList(rPageNo.value, route.query.mid);

watch(route, (newRoute, oldRoute) => {
    if (newRoute.query.rPageNo) {
        getRecieveReviewList(newRoute.query.rPageNo, route.query.mid);
        rPageNo.value = newRoute.query.rPageNo;
    } else {
        getRecieveReviewList(1, route.query.mid);
        rPageNo.value = 1;
    }
});

function changeRpageNo(argPageNo) {
    router.push(`/user/info?mid=${route.query.mid}&rPageNo=${argPageNo}`);
}
</script>

<style scoped>
.subtext {
    color: #707070;
    font-weight: 700;
    font-size: 14px;
}

.theme-color-text {
    color: black;
    font-weight: 700;
    font-size: 14px;
}

h4,
h5 {
    font-weight: 700;
}

h5 {
    font-size: 18px;
    margin: 14px 0px;
}

.content {
    background-color: #efefef;
}

.card {
    width: 60%;
    margin: 30px auto;
}

.profile {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.profile-img {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50px 50px;
}

.dashboard {
    text-align: center;
    margin: 0 auto;
    width: 33.3%;
}

.like {
    border: 0;
    background-color: #fff;
    border-radius: 10px;
}

.like-active {
    color: red;
}

.like-deactive {
    color: black;
}

.profile-introduce {
    font-weight: 600;
    font-size: 14px;
    color: #858585;
}

.show-more {
    color: #858585;
    /* text-decoration: none; */
    margin: auto 0px;
}

.review-space {
    padding: 16px;
}

.review-empty {
    position: relative;
    height: 150px;
}

.review-empty-text {
    font-size: 16px;
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

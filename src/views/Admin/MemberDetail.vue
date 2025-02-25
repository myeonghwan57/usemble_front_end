<template>
    <div>
        <div class="p-3">
            <h4>회원 상세</h4>
            <table class="table table-user text-center">
                <tbody class="d-flex">
                    <tr class="border">
                        <th class="user-th">이름</th>
                        <th class="user-th">아이디</th>
                        <th class="user-th">휴대전화</th>
                        <th class="user-th">생년월일</th>
                        <th class="user-th">성별</th>
                        <th class="user-th">은행명</th>
                        <th class="user-th">계좌번호</th>
                        <th class="user-th">탈퇴여부</th>
                    </tr>
                    <tr class="border">
                        <td class="user-td">{{ member.mname }}</td>
                        <td class="user-td">{{ member.mid }}</td>
                        <td class="user-td">
                            {{ mphone }}
                        </td>
                        <td class="user-td">{{ mbirth }}</td>
                        <td class="user-td">{{ member.msex }}</td>
                        <td class="user-td">{{ member.mbankName }}</td>
                        <td class="user-td">{{ member.mpayAccount }}</td>
                        <td class="user-td">{{ member.menabled ? "활성화" : "탈퇴" }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="p-3">
            <h4>작성한 어셈블</h4>
            <div style="height: 280px">
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">제목</th>
                            <th scope="col">카테고리</th>
                            <th scope="col">위치</th>
                            <th scope="col">작성일</th>
                            <th scope="col">시작일시</th>
                            <th scope="col">금액</th>
                            <th scope="col">참여 인원 수</th>
                            <th scope="col">정원 인수</th>
                            <th scope="col">모집 상태</th>
                            <th scope="col">마감일시</th>
                            <th scope="col">관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="social in socialPage.socialList"
                            :key="social.sno"
                            style="height: 45px"
                        >
                            <th>
                                <RouterLink
                                    class="no-deco"
                                    :to="`/social/detail?sno=${social.sno}`"
                                >
                                    {{ social.stitle }}
                                </RouterLink>
                            </th>
                            <td>{{ social.ctname }}</td>
                            <td>{{ social.saddress }}</td>
                            <td>
                                {{ new Date(social.swriteDate).toLocaleDateString() }}
                            </td>
                            <td>
                                {{ new Date(social.sstartDate).toLocaleDateString() }}
                                {{ social.sstartTime }}
                            </td>
                            <td>{{ social.sfee }}</td>
                            <td>{{ social.curjoin }}</td>
                            <td>{{ social.smemberCount }}</td>
                            <td>{{ getSstatus(social.sstatus) }}</td>
                            <td>{{ new Date(social.sdeadline).toLocaleDateString() }}</td>
                            <td>
                                <button
                                    class="btn btn-sm btn-danger"
                                    @click="cancelSocial(social.sno)"
                                    :disabled="social.sstatus === 'cancel'"
                                >
                                    취소
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div
                v-if="socialPage.socialList.length != 0"
                class="d-flex justify-content-center mt-4"
            >
                <button
                    v-if="socialPage.pager.startPageNo > 1"
                    class="btn page-btn btn-sm me-1"
                    @click="changeSpageNo(socialPage.pager.startPageNo - 1, $route.query.mid)"
                >
                    이전
                </button>
                <button
                    v-for="pageNo in socialPage.pager.pageArray"
                    :key="pageNo"
                    :class="socialPage.pager.pageNo == pageNo ? 'cur-page' : ''"
                    class="btn page-btn btn-sm me-1"
                    @click="changeSpageNo(pageNo, $route.query.mid)"
                >
                    {{ pageNo }}
                </button>
                <button
                    v-if="socialPage.pager.groupNo < socialPage.pager.totalGroupNo"
                    class="btn page-btn btn-sm me-1"
                    @click="changeSpageNo(socialPage.pager.endPageNo + 1, $route.query.mid)"
                >
                    다음
                </button>
            </div>
        </div>
        <div class="p-3">
            <h4>참여한 어셈블</h4>
            <div style="height: 280px">
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">제목</th>
                            <th scope="col">카테고리</th>
                            <th scope="col">위치</th>
                            <th scope="col">작성일</th>
                            <th scope="col">시작일시</th>
                            <th scope="col">금액</th>
                            <th scope="col">참여 인원 수</th>
                            <th scope="col">정원 인수</th>
                            <th scope="col">모집 상태</th>
                            <th scope="col">마감일시</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="social in joinPage.socialList"
                            :key="social.sno"
                            style="height: 45px"
                        >
                            <th>
                                <RouterLink
                                    class="no-deco"
                                    :to="`/social/detail?sno=${social.sno}`"
                                    >{{ social.stitle }}</RouterLink
                                >
                            </th>
                            <td>{{ social.ctname }}</td>
                            <td>{{ social.saddress }}</td>
                            <td>
                                {{ new Date(social.swriteDate).toLocaleDateString() }}
                            </td>
                            <td>
                                {{ new Date(social.sstartDate).toLocaleDateString() }}
                                {{ social.sstartTime }}
                            </td>
                            <td>{{ social.sfee }}</td>
                            <td>{{ social.curjoin }}</td>
                            <td>{{ social.smemberCount }}</td>
                            <td>{{ getSstatus(social.sstatus) }}</td>
                            <td>{{ new Date(social.sdeadline).toLocaleDateString() }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="joinPage.socialList.length != 0" class="d-flex justify-content-center mt-4">
                <button
                    v-if="joinPage.pager.startPageNo > 1"
                    class="btn page-btn btn-sm me-1"
                    @click="changeJpageNo(joinPage.pager.startPageNo - 1, $route.query.mid)"
                >
                    이전
                </button>
                <button
                    v-for="pageNo in joinPage.pager.pageArray"
                    :key="pageNo"
                    :class="socialPage.pager.pageNo == pageNo ? 'cur-page' : ''"
                    class="btn page-btn btn-sm me-1"
                    @click="changeJpageNo(pageNo, $route.query.mid)"
                >
                    {{ pageNo }}
                </button>
                <button
                    v-if="joinPage.pager.groupNo < joinPage.pager.totalGroupNo"
                    class="btn page-btn btn-sm me-1"
                    @click="changeJpageNo(joinPage.pager.endPageNo + 1, $route.query.mid)"
                >
                    다음
                </button>
            </div>
        </div>
        <div class="p-3">
            <h4>작성한 리뷰</h4>
            <div>
                <table class="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">참여한 어셈블</th>
                            <th scope="col">내용</th>
                            <th scope="col">작성일자</th>
                            <th scope="col">삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="review in reviewPage.reviewList"
                            :key="review.sno"
                            style="height: 45px"
                        >
                            <th>
                                <RouterLink
                                    class="no-deco"
                                    :to="`/social/detail?sno=${review.sno}`"
                                    >{{ review.stitle }}</RouterLink
                                >
                            </th>
                            <td>{{ review.rcontent }}</td>
                            <td>{{ new Date(review.rdate).toLocaleDateString() }}</td>
                            <td>
                                <button
                                    class="btn btn-sm btn-danger"
                                    @click="deleteReview(review.mid, review.sno)"
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div
                v-if="reviewPage.reviewList.length != 0"
                class="d-flex justify-content-center mt-4"
            >
                <button
                    v-if="reviewPage.pager.startPageNo > 1"
                    class="btn page-btn btn-sm me-1"
                    @click="changeRpageNo(reviewPage.pager.startPageNo - 1, $route.query.mid)"
                >
                    이전
                </button>
                <button
                    v-for="pageNo in reviewPage.pager.pageArray"
                    :key="pageNo"
                    :class="reviewPage.pager.pageNo == pageNo ? 'cur-page' : ''"
                    class="btn page-btn btn-sm me-1"
                    @click="changeRpageNo(pageNo, $route.query.mid)"
                >
                    {{ pageNo }}
                </button>
                <button
                    v-if="reviewPage.pager.groupNo < reviewPage.pager.totalGroupNo"
                    class="btn page-btn btn-sm me-1"
                    @click="changeRpageNo(reviewPage.pager.endPageNo + 1, $route.query.mid)"
                >
                    다음
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import adminAPI from "@/apis/adminAPI";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const member = ref({
    mid: "",
    mname: "",
    mphone: "",
    mbirth: "",
    msex: "",
    mbankName: "",
    mpayAccount: "",
    menabled: true,
});

const mphone = ref("");
const mbirth = ref("");

async function getMemberInfo(mid) {
    try {
        const response = await adminAPI.getMemberInfo(mid);
        member.value.mid = response.data.member.mid;
        member.value.mname = response.data.member.mname;
        member.value.mphone = response.data.member.mphone;
        member.value.mbirth = response.data.member.mbirth;
        member.value.msex = response.data.member.msex;
        member.value.mbankName = response.data.member.mbankName;
        member.value.mpayAccount = response.data.member.mpayAccount;
        member.value.menabled = response.data.member.menabled;

        mphone.value =
            member.value.mphone.slice(0, 3) +
            "-" +
            member.value.mphone.slice(3, 7) +
            "-" +
            member.value.mphone.slice(6, 10);

        const mbirthStr = String(member.value.mbirth);

        mbirth.value =
            mbirthStr.slice(0, 2) +
            "년 " +
            mbirthStr.slice(2, 4) +
            "월 " +
            mbirthStr.slice(4, 6) +
            "일";
    } catch (error) {
        console.log(error);
    }
}

getMemberInfo(route.query.mid);

function getSstatus(sstatus) {
    if (sstatus == "recruitment") {
        return "정원 미달";
    } else if (sstatus == "full") {
        return "정원";
    } else {
        return "취소";
    }
}

const sPageNo = ref(route.query.sPageNo || 1);
const socialPage = ref({
    socialList: [],
    pager: {},
});

async function getMemberRecruitList(sPageNo, mid) {
    try {
        const response = await adminAPI.getMemberRecruitList(sPageNo, mid);
        socialPage.value.socialList = response.data.socialList;
        socialPage.value.pager = response.data.pager;
    } catch (error) {
        console.log(error);
    }
}

getMemberRecruitList(sPageNo.value, route.query.mid);

async function cancelSocial(sno) {
    try {
        await adminAPI.updateSocialStatus(sno);
        getMemberRecruitList(sPageNo.value, route.query.mid);
    } catch (error) {
        console.log(error);
    }
}

function changeSpageNo(argPageNo, mid) {
    router.replace({
        query: {
            mid: mid,
            sPageNo: argPageNo,
            jPageNo: route.query.jPageNo,
            rPageNo: route.query.rPageNo,
        },
    });
}

const jPageNo = ref(route.query.jPageNo || 1);
const joinPage = ref({
    socialList: [],
    pager: {},
});

async function getMemberJoinList(jPageNo, mid) {
    try {
        const response = await adminAPI.getMemberJoinList(jPageNo, mid);
        joinPage.value.socialList = response.data.socialList;
        joinPage.value.pager = response.data.pager;
    } catch (error) {
        console.log(error);
    }
}

getMemberJoinList(jPageNo.value, route.query.mid);

function changeJpageNo(argPageNo, mid) {
    router.replace({
        query: {
            mid: mid,
            sPageNo: route.query.sPageNo,
            jPageNo: argPageNo,
            rPageNo: route.query.rPageNo,
        },
    });
}

const rPageNo = ref(route.query.rPageNo || 1);
const reviewPage = ref({
    reviewList: [],
    pager: {},
});

async function getMemberReviewList(rPageNo, mid) {
    try {
        const response = await adminAPI.getMemberReviewList(rPageNo, mid);
        reviewPage.value.reviewList = response.data.reviewList;
        reviewPage.value.pager = response.data.pager;
        console.log(reviewPage.value);
    } catch (error) {
        console.log(error);
    }
}

getMemberReviewList(rPageNo.value, route.query.mid);

function changeRpageNo(argPageNo, mid) {
    router.replace({
        query: {
            mid: mid,
            sPageNo: route.query.sPageNo,
            jPageNo: route.query.jPageNo,
            rPageNo: argPageNo,
        },
    });
}

async function deleteReview(mid, sno) {
    try {
        await adminAPI.deleteReview(mid, sno);
        getMemberReviewList(rPageNo.value, route.query.mid);
    } catch (error) {
        console.log(error);
    }
}

watch(route, (newRoute, oldRoute) => {
    if (newRoute.query.sPageNo) {
        getMemberRecruitList(newRoute.query.sPageNo, route.query.mid);
        sPageNo.value = newRoute.query.sPageNo;
    } else {
        getMemberRecruitList(1, route.query.mid);
        sPageNo.value = 1;
    }

    if (newRoute.query.jPageNo) {
        getMemberJoinList(newRoute.query.jPageNo, route.query.mid);
        jPageNo.value = newRoute.query.jPageNo;
    } else {
        getMemberJoinList(1, route.query.mid);
        jPageNo.value = 1;
    }

    if (newRoute.query.rPageNo) {
        getMemberReviewList(newRoute.query.rPageNo, route.query.mid);
        rPageNo.value = newRoute.query.rPageNo;
    } else {
        getMemberReviewList(1, route.query.mid);
        rPageNo.value = 1;
    }
});
</script>

<style scoped>
.table-user {
    display: -webkit-box;
    display: -ms-flexbox;
    overflow-x: auto;
    overflow-y: hidden;
}

.user-th,
.user-td {
    display: block;
}
tr {
    width: 50%;
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

.no-deco {
    text-decoration: none;
    color: black;
}
</style>

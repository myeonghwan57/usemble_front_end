<template>
    <div class="p-3 mt-4">
        <div class="d-flex justify-content-between mb-2">
            <h4>회원 관리</h4>
            <div class="d-flex">
                <select class="form-select" id="option" style="width: 100px">
                    <option value="name" selected>이름</option>
                    <option value="mid">아이디</option>
                </select>
                <input
                    type="text"
                    class="form-control"
                    id="keyword"
                    @keydown.enter="getMemberListSearch(1, true)"
                    style="width: 250px"
                />
            </div>
        </div>
        <table class="table table-bordered text-center">
            <tr  >
                <th style="width: 40px">이름</th>
                <th style="width: 80px">아이디</th>
                <th style="width: 40px">성별</th>
                <th style="width: 80px">가입일</th>
                <th style="width: 80px">관리</th>
            </tr>

            <tr v-for="member in page.members" :key="member.mid">
                <td>{{ member.mname }}</td>
                <td>{{ member.mid }}</td>
                <td>{{ member.msex }}</td>
                <td>{{ formatDate(member.mdate) }}</td>
                <td class="d-flex justify-content-center">
                    <RouterLink :to="`/admin/memberDetail?mid=${member.mid}`">
                        <button class="btn btn-outline-success btn-md">상세보기</button>
                    </RouterLink>
                    <div>
                        <button
                            v-if="member.menabled"
                            @click="changeMemberState(member)"
                            class="btn btn-outline-danger btn-md"
                        >
                            비활성화
                        </button>
                        <button
                            v-if="!member.menabled"
                            @click="changeMemberState(member)"
                            class="btn btn-outline-primary btn-md"
                        >
                            활성화
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
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import adminAPI from "@/apis/adminAPI";
import { useRoute, useRouter } from "vue-router";

const page = ref({
    members: [],
    pager: {},
});

const route = useRoute();
const pageNo = ref(route.query.pageNo || 1);
const search = ref(false);

async function getMemberList(pageNo) {
    try {
        const response = await adminAPI.getMemberList(pageNo);
        page.value.members = response.data.members;
        page.value.pager = response.data.pager;
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
    router.push(`/admin/MemberTable?pageNo=${argPageNo}`);
}
//요청 경로의 변경을 감시
watch(route, (newRoute, oldRoute) => {
    if (newRoute.fullPath == oldRoute.path && search.value) {
        search.value = false;
        getMemberList(1);
        pageNo.value = 1;
    }
    if (newRoute.query.pageNo) {
        if (!search.value) {
            getMemberList(newRoute.query.pageNo);
        } else {
            getMemberListSearch(newRoute.query.pageNo);
        }
        pageNo.value = newRoute.query.pageNo;
    } else {
        if (!search.value) {
            getMemberList(1);
        } else {
            getMemberListSearch(1);
        }
        pageNo.value = 1;
    }
});

getMemberList(pageNo.value);

async function changeMemberState(member) {
    try {
        const response = await adminAPI.changeMemberState(JSON.parse(JSON.stringify(member)));
        getMemberList(pageNo.value);
    } catch (error) {
        console.log(error);
    }
}

async function getMemberListSearch(spageNo, again = false) {
    try {
        if (again) {
            search.value = true;
            router.replace({ query: { pageNo: 1 } });
            pageNo.value = 1;
        }
        const option = document.getElementById("option").value;
        const keyword = document.getElementById("keyword").value;
        const response = await adminAPI.getMemberListSearch(spageNo, keyword, option);
        page.value.members = response.data.members;
        page.value.pager = response.data.pager;
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
}
</style>

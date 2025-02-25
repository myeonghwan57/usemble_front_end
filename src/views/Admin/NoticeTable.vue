<template>
    <div class="p-3 mt-4">
        <h4>공지사항 관리</h4>
        <table class="table table-bordered text-center">
            <tr style="height: 60px">
                <th style="width: 40px">번호</th>
                <th style="width: 220px">제목</th>
                <th style="width: 80px">날짜</th>
                <th style="width: 40px">작성자</th>
                <th style="width: 40px">관리</th>
            </tr>
            <tr v-for="notice in page.notices" :key="notice.nno">
                <td>{{ notice.nno }}</td>
                <td id="ntitle" @click="handleRead(notice.nno)">{{ notice.ntitle }}</td>
                <td>{{ formatDate(notice.ndate) }}</td>
                <td>{{ notice.mid }}</td>
                <td class="d-flex justify-content-center">
                    <div>
                        <button
                            class="btn btn-outline-success btn-md"
                            @click="handleupdate(notice.nno)"
                            style="border-width: 1px"
                        >
                            수정하기
                        </button>
                    </div>

                    <div>
                        <button
                            class="btn btn-outline-danger btn-md"
                            @click="handleRemove(notice.nno)"
                        >
                            삭제하기
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
        <div class="d-flex justify-content-end">
            <RouterLink to="/admin/noticeWrite">
                <button class="btn btn-success">작성하기</button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import adminAPI from "@/apis/adminAPI";
import { useRoute, useRouter } from "vue-router";

const page = ref({
    notices: [],
    pager: {},
});

const route = useRoute();

const pageNo = ref(route.query.pageNo || 1);

async function getNoticeList(pageNo) {
    try {
        const response = await adminAPI.getNoticeList(pageNo);
        if (response.data.notices.length === 0 && pageNo > 1) {
            const newPageNo = response.data.pager.totalPageNo || 1;
            changePageNo(newPageNo);
        } else {
            page.value.notices = response.data.notices;
            page.value.pager = response.data.pager;
        }
    } catch (error) {
        console.log(error);
    }
}

function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
}

async function handleRead(nno) {
    try {
        router.push(`/admin/NoticeRead?nno=${nno}&pageNo=${pageNo.value}`);
    } catch (error) {
        console.log(error);
    }
}

async function handleupdate(nno) {
    try {
        router.push(`/admin/NoticeUpdate?nno=${nno}&pageNo=${pageNo.value}`);
    } catch (error) {
        console.log(error);
    }
}
async function handleRemove(nno) {
    try {
        await adminAPI.noticeDelete(nno);
        await getNoticeList(pageNo.value);
    } catch (error) {
        console.log(error);
    }
}

const router = useRouter();
function changePageNo(argPageNo) {
    router.push(`/admin/NoticeTable?pageNo=${argPageNo}`);
}

watch(route, (newRoute, oldRoute) => {
    if (newRoute.query.pageNo) {
        getNoticeList(newRoute.query.pageNo);
        pageNo.value = newRoute.query.pageNo;
    } else {
        getNoticeList(1);
        pageNo.value = 1;
    }
});
getNoticeList(pageNo.value);
</script>

<style scoped>
img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
}

#ntitle {
    text-decoration: none;
}
</style>

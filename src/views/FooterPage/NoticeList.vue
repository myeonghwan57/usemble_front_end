<template>
    <div class="mt-5 ms-auto me-auto" style="width: 70%">
        <h4>공지사항</h4>
        <div class="mt-3 mb-3">
            <span class="headline">새로운 어셈블 소식을 확인해보세요.</span>
        </div>
        <div class="notice-container">
            <div v-for="(notice, index) in page.noticeList" :key="notice.nno">
                <RouterLink
                    v-if="index === 0"
                    class="notice-item pinned no-underline"
                    :to="`/notices/detail?nno=${notice.nno}`"
                >
                    <div class="notice-item-title">{{ notice.ntitle }}</div>
                    <div class="notice-item-date">
                        {{ new Date(notice.ndate).toLocaleDateString() }}
                    </div>
                </RouterLink>
                <RouterLink
                    v-else
                    class="notice-item no-underline"
                    :to="`/notices/detail?nno=${notice.nno}`"
                >
                    <div class="notice-item-title">{{ notice.ntitle }}</div>
                    <div class="notice-item-date">
                        {{ new Date(notice.ndate).toLocaleDateString() }}
                    </div>
                </RouterLink>
            </div>
            <div v-if="page.noticeList.length != 0" class="d-flex justify-content-center mt-4">
                <button
                    v-if="page.pager.startPageNo > 1"
                    class="btn page-btn btn-sm me-1"
                    @click="changePageNo(page.pager.startPageNo - 1)"
                >
                    이전
                </button>
                <button
                    v-for="pageNo in page.pager.pageArray"
                    :key="pageNo"
                    :class="page.pager.pageNo == pageNo ? 'cur-page' : ''"
                    class="btn page-btn btn-sm me-1"
                    @click="changePageNo(pageNo)"
                >
                    {{ pageNo }}
                </button>
                <button
                    v-if="page.pager.groupNo < page.pager.totalGroupNo"
                    class="btn page-btn btn-sm me-1"
                    @click="changePageNo(page.pager.endPageNo + 1)"
                >
                    다음
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import commonAPI from "@/apis/commonAPI";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();

const pageNo = ref(route.query.pageNo || 1);
const page = ref({
    noticeList: [],
    pager: {},
});

async function getNoticeList(pageNo) {
    try {
        const response = await commonAPI.getNoticeList(pageNo);
        page.value.noticeList = response.data.noticeList;
        page.value.pager = response.data.pager;
    } catch (error) {
        console.log(error);
    }
}

getNoticeList(pageNo.value);

function changePageNo(pageNo) {
    router.replace({
        query: { pageNo: pageNo },
    });
}

const store = useStore();

watch(
    () => route.query.pageNo,
    (newPageNo, oldPageNo) => {
        if (store.state.activeWatch) {
            if (newPageNo) {
                getNoticeList(newPageNo);
                pageNo.value = newPageNo;
            } else {
                getNoticeList(1);
                pageNo.value = 1;
            }
        }
    }
);
</script>

<style scoped>
h4 {
    font-weight: bold;
}

.headline {
    font-size: 16px;
    font-weight: 550;
    color: rgb(141, 140, 140);
}

.notice-container {
    border-top: 1px solid black;
}

.pinned {
    background-color: #e7e3e2;
}

.notice-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16.5px 20px;
    border-bottom: 1px solid #e7e3e2;
}

.notice-item-title {
    font-weight: bold;
    color: black;
}

.notice-item-date {
    font-size: 14px;
    font-weight: 550;
    color: #a3a1a1;
}

.no-underline {
    text-decoration: none;
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

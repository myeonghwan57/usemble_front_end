<template>
    <div class="mt-5 ms-auto me-auto" style="width: 70%">
        <span class="headline">공지사항</span>
        <div class="notice-detail-title">
            <div class="notice-detail-name mb-2">{{ notice.ntitle }}</div>
            <div class="notice-detail-date">
                {{ new Date(notice.ndate).toLocaleDateString() }}
            </div>
        </div>
        <div class="notice-detail-content" id="noticeContent"></div>
        <div class="d-flex justify-content-center mt-5">
            <button @click="goNoticeList" class="rounded listbtn">목록으로</button>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import commonAPI from "@/apis/commonAPI";

//상태 정의
const route = useRoute();
const router = useRouter();
const notice = ref({});

function goNoticeList() {
    router.back();
}

// 공지사항 세부 내용을 불러오는 함수
async function getNoticeDetail(nno) {
    try {
        const response = await commonAPI.getNoticeDetail(nno);
        notice.value = response.data;
        document.getElementById("noticeContent").innerHTML = notice.value.ncontent;
    } catch (error) {
        console.error(error);
    }
}

// 컴포넌트가 마운트될 때 실행
const nno = route.query.nno; // URL 파라미터에서 nno 가져오기

getNoticeDetail(nno); // 해당 nno에 해당하는 공지사항 세부 내용 불러오기
</script>

<style scoped>
.headline {
    font-size: 16px;
    font-weight: bold;
    color: rgb(141, 140, 140);
}

.notice-detail-title {
    align-items: center;
    padding: 16.5px 0px;
    border-bottom: 1px solid black;
}

.notice-detail-name {
    font-weight: bold;
    font-size: 24px;
    color: black;
}

.notice-detail-date {
    font-size: 14px;
    font-weight: 550;
    color: #a3a1a1;
}

.notice-detail-content {
    border-bottom: 1px solid black;
    padding: 20.5px 0px;
}

.listbtn {
    padding: 0 120px;
    height: 60px;
    color: #fff;
    background-color: black;
    font-weight: 700;
    font-size: 18px;
    line-height: 90%;
}
</style>

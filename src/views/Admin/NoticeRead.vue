<template>
    <div class="p-3 mt-4">
        <h3 class="mb-5">공지사항</h3>
        <div class="form-group row">
            <h5 class="col-sm-2">제목</h5>
            <div class="col-sm-10">
                <p>{{ notice.ntitle }}</p>
            </div>
        </div>
        <div class="form-group row">
            <h5 class="col-sm-2">작성일</h5>
            <div class="col-sm-10">
                <p>{{ new Date(notice.ndate).toLocaleDateString() }}</p>
            </div>
        </div>
        <div class="form-group row">
            <h5 class="col-sm-2">내용</h5>
            <div class="col-sm-10" id="notice-content"></div>
        </div>
        <div class="form-group row mt-3">
            <div class="col-sm-12 d-flex justify-content-end">
                <button type="button" class="btn btn-success me-2" @click="goNoticeupdate()">
                    수정
                </button>
                <button type="button" class="btn btn-danger" @click="goNoticeList()">
                    목록으로
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import adminAPI from "@/apis/adminAPI";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const nno = ref(route.query.nno);
const pageNo = ref(route.query.pageNo);

const notice = ref({
    mid: "",
    ntitle: "",
    ncontent: "",
    ndate: "",
    nno: "",
});
function showContent() {
    document.getElementById("notice-content").innerHTML = notice.value.ncontent;
}
async function getNotice(nno) {
    const response = await adminAPI.getNotice(nno);
    notice.value.mid = response.data.mid;
    notice.value.ntitle = response.data.ntitle;
    notice.value.ndate = response.data.ndate;
    notice.value.ncontent = response.data.ncontent;
    showContent();
}
getNotice(nno.value);

function goNoticeList() {
    router.push(`/admin/NoticeTable?pageNo=${pageNo.value}`);
}
function goNoticeupdate() {
    router.push(`/admin/NoticeUpdate?nno=${nno.value}&pageNo=${pageNo.value}`);
}
</script>

<style scoped></style>

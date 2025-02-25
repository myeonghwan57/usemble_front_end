<template>
    <div class="p-3 mt-4">
        <h3 class="mb-5">공지사항 작성</h3>
        <form @submit.prevent="handleSubmit">
            <div class="form-group row">
                <label for="ntitle" class="col-sm-2 col-form-label">제목</label>
                <div class="col-sm-10">
                    <input
                        id="ntitle"
                        type="text"
                        class="form-control"
                        v-model="notice.ntitle"
                        @change="validateTitle"
                    />
                    <div id="title_warning" class="text-danger" style="font-size: 13px"></div>
                </div>
            </div>
            <div class="form-group row mt-3">
                <label for="ncontent" class="col-sm-2 col-form-label">내용</label>
                <div class="col-sm-10">
                    <WyswygEditor ref="quill" @change="validateContent" />
                    <div id="content_warning" class="text-danger" style="font-size: 13px"></div>
                </div>
            </div>
            <div class="form-group row mt-3">
                <div class="col-sm-12 d-flex justify-content-end">
                    <input type="submit" class="btn btn-success me-2" value="작성" />
                    <input
                        type="button"
                        class="btn btn-danger"
                        value="취소"
                        @click="handleCancel"
                    />
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import WyswygEditor from "@/components/WyswygEditor.vue";
import adminAPI from "@/apis/adminAPI";

const notice = ref({
    ntitle: "",
    ncontent: "",
    ndate: ref(new Date()),
    mid: "admin",
});

const router = useRouter();
const quill = ref(null);
function validateTitle() {
    let flag = true;
    const title_warning = document.getElementById("title_warning");
    if (!notice.value.ntitle) {
        flag = false;
        title_warning.innerHTML = "공지사항 제목을 입력해 주세요.";
    } else {
        flag = true;
        title_warning.innerHTML = " ";
    }
    console.log(flag);
    return flag;
}
function validateContent() {
    let content = quill.value.getContent().textContent;
    const content_warning = document.getElementById("content_warning");
    let flag = true;
    if (content == "null" || content.replace(/\s/g, "") == "") {
        flag = false;
        content_warning.innerHTML = "공지사항 내용을 입력해 주세요.";
    } else {
        flag = true;
        content_warning.innerHTML = " ";
    }
    return flag;
}

function handleCancel() {
    router.back();
}
async function handleSubmit() {
    if (validateTitle() & validateContent()) {
        notice.value.ncontent = quill.value.getContent().innerHTML;
        const response = await adminAPI.writeNotice(JSON.parse(JSON.stringify(notice.value)));
        console.log("Success:", response.data);
        router.push("/admin/noticeTable");
    }
}
</script>

<style scoped>
textarea {
    height: 400px;
    resize: none;
}

.col-form-label {
    font-size: 18px;
}
</style>

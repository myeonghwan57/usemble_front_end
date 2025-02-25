<template>
    <div class="d-flex">
        <div id="pro" class="text-start">
            <div class="d-flex justify-content-between">
                <div class="mb-2 fs-4 fw-bolder">프로필</div>
                <div>
                    <RouterLink to="./profileUpdate">
                        <button
                            id="update-btn"
                            class="btn border fw-bold"
                            style="
                                font-size: 13px;
                                width: 100px;
                                height: 40px;
                                border-color: lightgray;
                            "
                        >
                            프로필 수정
                        </button>
                    </RouterLink>
                </div>
            </div>

            <div class="d-flex">
                <img id="proimg" alt="" :src="mattach" />
                <div class="d-flex flex-column mb-2 ps-4" style="width: 80%">
                    <div class="d-flex">
                        <div class="d-flex me-1" v-for="ctname in mctname" :key="ctname">
                            <div class="me-1 rounded-pill fw-bold" id="ct-btn">{{ ctname }}</div>
                        </div>
                        <div>
                            <button
                                class="btn btn-outline-secondary text-black rounded-pill"
                                style="
                                    width: 80px;
                                    height: 40px;
                                    font-size: 15px;
                                    border-color: lightgray;
                                "
                                @click="showCategoryModal()"
                            >
                                <i class="bi bi-pencil-fill"></i>
                                수정
                            </button>
                            <CategoryModal
                                id="categoryModal"
                                @close="hideCategoryModal"
                                @change="updateMcategory"
                            />
                        </div>
                    </div>
                    <div id="intro_box" class="bg-light p-4 mt-3">{{ member.mintroduce }}</div>
                </div>
            </div>

            <hr class="border-2" />
            <div class="d-flex justify-content-evenly" id="tab-menu">
                <RouterLink class="text-decoration-none" to="./assembleHistory">
                    <p class="mt-3 fw-bold fs-6">
                        <i class="bi bi-house-door me-2 fs-2"></i>
                        내역
                    </p>
                </RouterLink>
                <div class="vl mt-1" style="height: 70px"></div>
                <RouterLink class="text-decoration-none" to="./assembleLike">
                    <p class="mt-3 fw-bold fs-6">
                        <i class="bi bi-heart me-2 fs-2"></i>
                        좋아요
                    </p>
                </RouterLink>
                <div class="vl mt-1" style="height: 70px"></div>
                <RouterLink class="text-decoration-none" to="./assembleReview">
                    <p class="mt-3 fw-bold fs-6">
                        <i class="bi bi-chat-dots me-2 fs-2"></i>
                        후기
                    </p>
                </RouterLink>
            </div>
            <hr class="border-2" />

            <div class="mt-5">
                <div class="d-flex justify-content-between">
                    <div class="fs-4 fw-bolder mb-3">신청한 어셈블</div>
                    <div>
                        <RouterLink class="text-decoration-none text-black" to="./assembleHistory">
                            전체보기 &nbsp;>
                        </RouterLink>
                    </div>
                </div>
                <div class="d-flex row" v-if="applyList.length != 0">
                    <SocialCard
                        class="me-3 col-4"
                        id="social-card"
                        v-for="(social, index) in applyList"
                        :key="index"
                        :social="social"
                    />
                </div>
                <div class="d-flex row" v-if="applyList.length == 0">
                    <div class="apply-empty">
                        <div>아직 신청한 어셈블이 없으시네요!</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SocialCard from "@/components/Social/SocialCard.vue";
import CategoryModal from "./CategoryModal.vue";
import { onMounted, ref, watchEffect } from "vue";
import { Modal } from "bootstrap";
import { useStore } from "vuex";
import memberAPI from "@/apis/memberAPI";
import socialAPI from "@/apis/socialAPI";
import { useRoute, useRouter } from "vue-router";

const props = defineProps(["socials"]);

onMounted(() => {
    categoryModal = new Modal(document.querySelector("#categoryModal"));
});

const route = useRoute();
const router = useRouter();

function goAssembleList() {
    router.push("../../list")
}

let categoryModal = null;

const member = ref({
    mid: "",
    mintroduce: "",
});

//이미지
const mattach = ref(null);
const category = ref([]);
const mcategory = ref([]);
const mctname = ref([]);

//유저 프로필 가져오기
async function getUserProfile(mid) {
    const response = await memberAPI.getUserProfile(mid);
    if (response.data.response == "success") {
        member.value.mid = response.data.member.mid;
        member.value.mintroduce = response.data.member.mintroduce;
    }
}

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
async function getMcategoryList(mid) {
    try {
        const response = await memberAPI.getMcategory(mid);
        mcategory.value = response.data;
    } catch (error) {
        console.log(error);
    }
}
async function getCategoryList() {
    try {
        const response = await memberAPI.getCategory();
        category.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

const store = useStore();

getUserProfile(store.state.mid);
getAttach(store.state.mid);
getMcategoryList(store.state.mid);
getCategoryList();

function showCategoryModal() {
    categoryModal.show();
}

function hideCategoryModal() {
    categoryModal.hide();
}

watchEffect(() => {
    if (category.value.length && mcategory.value.length) {
        mctname.value = mcategory.value
            .map((mcat) => {
                const matchedCategory = category.value.find((cat) => cat.ctno === mcat.ctno);
                return matchedCategory ? matchedCategory.ctname : null;
            })
            .filter(Boolean); // 일치하는 항목이 없을 경우 null 값을 제거
    }
});

async function updateMcategory(updatedMcategories) {
    mcategory.value = updatedMcategories;
    mctname.value = mcategory.value
        .map((mcat) => {
            const matchedCategory = category.value.find((cat) => cat.ctno === mcat.ctno);
            return matchedCategory ? matchedCategory.ctname : null;
        })
        .filter(Boolean);
    // 서버에 업데이트 요청을 보냄
    const resultcate = updatedMcategories.map((mcat) => ({
        mid: store.state.mid,
        ctno: mcat.ctno,
    }));
    await memberAPI.updateMcategory(resultcate);
}

// 신청한 어셈블 가져오기
const applyList = ref([]);
async function getApplyAssemble(mid) {
    try {
        const response = await socialAPI.applyAssemble(mid);
        applyList.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

getApplyAssemble(store.state.mid);
</script>

<style scoped>
#pro {
    width: 100%;
}
.vl {
    border-left: solid 1px;
    color: #dfd7d7;
}

#tab-menu {
    text-align: center;
}

#ct-btn {
    background-color: #ebf0f7;
    border: none;
    color: #558ccf;
    font-size: 14px;
    padding: 10px 15px;
    height: 40px;
}
#proimg {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin: 10px 0;
}
#intro_box {
    width: 100%;
    word-break: break-all
}

p {
    color: black;
    text-decoration: none;
}

#social-card {
    width: 30%;
}

#update-btn:hover {
    color: black;
}

.apply-empty {
    padding: 100px;
    font-size: 14px;
    text-align: center;
}

.btn-outline-secondary:hover {
    background-color: white
}
</style>

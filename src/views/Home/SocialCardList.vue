<template>
    <div class="main ms-auto me-auto" style="height: auto; width: 65%; min-width: 700px">
        <h3 class="new_host mb-3 mt-5">🐣 따끈따끈 신규 어셈블</h3>
        <h4 class="host_text mb-4">
            초보 호스트님들은 기대하고 설레하실거예요~
            <RouterLink
                to="/list"
                style="text-decoration-line: none; color: gray; margin-right: 15px"
                >전체보기</RouterLink
            >
        </h4>
        <div class="main_page_episodes">
            <SocialCard
                v-for="(social, index) in socials"
                :key="index"
                style="width: 24%"
                class="me-3"
                :social="social"
            />
        </div>

        <div v-for="(mcategory, index) in mcategoryList" :key="index">
            <div v-if="mcategory.ctno == 1 && social1 != null && social1.length != 0">
                <h3 class="new_host mb-3 mt-5">🍚 맛집 공유 어셈블</h3>
                <h4 class="host_text mb-4">
                    나만 아는 찐맛집, 우리 같이 가요
                    <RouterLink
                        to="/list?pageNo=1&ctno=1"
                        style="text-decoration-line: none; color: gray; margin-right: 15px"
                        >전체보기</RouterLink
                    >
                </h4>
                <div class="main_page_episodes">
                    <SocialCard
                        v-for="(social, index) in social1"
                        :key="index"
                        style="width: 24%"
                        class="me-3"
                        :social="social"
                    />
                </div>
            </div>
            <div v-if="mcategory.ctno == 2 && social2 != null && social2.length != 0">
                <h3 class="new_host mb-3 mt-5">💪 운동 어셈블</h3>
                <h4 class="host_text mb-4">
                    지겨운 작심삼일, 운동메이트들과 함께해요!
                    <RouterLink
                        to="/list?pageNo=1&ctno=2"
                        style="text-decoration-line: none; color: gray; margin-right: 15px"
                        >전체보기</RouterLink
                    >
                </h4>
                <div class="main_page_episodes">
                    <SocialCard
                        v-for="(social, index) in social2"
                        :key="index"
                        style="width: 24%"
                        class="me-3"
                        :social="social"
                    />
                </div>
            </div>
            <div v-if="mcategory.ctno == 3 && social3 != null && social3.length != 0">
                <h3 class="new_host mb-3 mt-5">📚 내일을 위한 어셈블</h3>
                <h4 class="host_text mb-4">
                    스터디 구할 땐 여기!
                    <RouterLink
                        to="/list?pageNo=1&ctno=3"
                        style="text-decoration-line: none; color: gray; margin-right: 15px"
                        >전체보기</RouterLink
                    >
                </h4>
                <div class="main_page_episodes">
                    <SocialCard
                        v-for="(social, index) in social3"
                        :key="index"
                        style="width: 24%"
                        class="me-3"
                        :social="social"
                    />
                </div>
            </div>
            <div v-if="mcategory.ctno == 4 && social4 != null && social4.length != 0">
                <h3 class="new_host mb-3 mt-5">💘 자만추 어셈블</h3>
                <h4 class="host_text mb-4">
                    혹시 모르죠~ 여기서 만날지도
                    <RouterLink
                        to="/list?pageNo=1&ctno=4"
                        style="text-decoration-line: none; color: gray; margin-right: 15px"
                        >전체보기</RouterLink
                    >
                </h4>
                <div class="main_page_episodes">
                    <SocialCard
                        v-for="(social, index) in social4"
                        :key="index"
                        style="width: 24%"
                        class="me-3"
                        :social="social"
                    />
                </div>
            </div>
            <div v-if="mcategory.ctno == 5 && social5 != null && social5.length != 0">
                <h3 class="new_host mb-3 mt-5">🎨 문화/예술 어셈블</h3>
                <h4 class="host_text mb-4">
                    이런저런 취향 나누며 친해져요~
                    <RouterLink
                        to="/list?pageNo=1&ctno=5"
                        style="text-decoration-line: none; color: gray; margin-right: 15px"
                        >전체보기</RouterLink
                    >
                </h4>
                <div class="main_page_episodes">
                    <SocialCard
                        v-for="(social, index) in social5"
                        :key="index"
                        style="width: 24%"
                        class="me-3"
                        :social="social"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import memberAPI from "@/apis/memberAPI";
import SocialCard from "@/components/Social/SocialCard.vue";

import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps(["socials", "social1", "social2", "social3", "social4", "social5"]);

const store = useStore();

onMounted(async () => {
    await getCategoryList();
    await getMcategoryList(store.state.mid);
    // mainList();
});

const categoryList = ref([]);

async function getCategoryList() {
    try {
        const response = await memberAPI.getCategory();
        categoryList.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

const mcategoryList = ref([]);

async function getMcategoryList(mid) {
    try {
        const response = await memberAPI.getMcategory(mid);
        mcategoryList.value = response.data;
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
.new_host {
    font-weight: 700;
}

.container {
    border-style: none;
}
.main_styles {
    margin-bottom: 10px;
}
.main_styles > img {
    height: 200px;
    margin-bottom: 10px;
    width: 100%;
    position: relative;
}
.main_page_episodes {
    display: flex;
}
.host_text {
    color: gray;
    font-size: large;
    font-weight: 600;
    justify-content: space-between;
    display: flex;
}
.main_category {
    text-decoration-line: none;
    color: black;
    width: 23%;
}
.main_text > h3 {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.main_text > h5 {
    font-size: 14px;
    height: 54px;
    overflow: hidden;
    height: 2.4em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.caption > p {
    font-size: 12px;
    color: gray;
    margin-bottom: 0px;
}
.main_additional {
    border-top: 1px solid #ddd;
}
</style>

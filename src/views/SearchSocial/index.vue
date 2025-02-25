<template>
    <div class="navigation">
        <div class="searchMenu-bar">
            <div class="searchMenu">
                <div
                    class="searchMenu-wrapper mt-3"
                    style="
                        height: 100px;
                        width: 70%;
                        margin: auto;
                        display: flex;
                        align-items: center;
                        border-bottom: solid 1px;
                    "
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        fill="currentColor"
                        class="bi bi-search"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                        />
                    </svg>
                    <input
                        @input="updateKeyword"
                        @keyup.enter="getSearchList"
                        placeholder="검색어를 입력해주세요"
                        class="search ms-3"
                        type="text"
                        style="width: 100%; height: 70px; border: 0; font-size: 20px"
                    />
                </div>
            </div>
            <div class="searchResults" v-if="hasSearched">
                <div class="searchList" v-if="searchList.length > 0">
                    <h3 style="margin-bottom: 40px; text-align: center; margin-top: 50px">
                        <span style="font-weight: 600"> {{ keyword }} 검색 결과</span>
                    </h3>
                    <searchSocialList :searchList="searchList" />
                </div>
                <div v-else style="text-align: center; margin-top: 20px">검색 결과가 없습니다.</div>
            </div>
            <!-- 페이지네이션 버튼 -->
            <div v-if="searchList != 0" class="d-flex justify-content-center mt-4">
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
import socialAPI from "@/apis/socialAPI";
import searchSocialList from "./SearchSocialList.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();

const keyword = ref("");
const searchList = ref([]);
const pageNo = ref(route.query.pageNo || 1);
const page = ref({
    pager: {},
});

const hasSearched = ref(false);

function updateKeyword(event) {
    keyword.value = event.target.value;
}

async function getSearchList() {
    if (!keyword.value.trim()) {
        alert("검색어를 입력해주세요");
        return;
    }
    hasSearched.value = true;
    try {
        const response = await socialAPI.getSearchList(keyword.value, pageNo.value);
        searchList.value = response.data.searchSocialList;
        page.value.pager = response.data.pager;
    } catch (error) {
        console.log(error);
    }
}

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
                pageNo.value = newPageNo;
                getSearchList();
            } else {
                pageNo.value = 1;
                getSearchList();
            }
        }
    }
);
</script>

<style scoped>
input:focus {
    outline: none;
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

<template>
    <div class="pageDetail container" style="max-width: 60%">
        <SocialHeader
            title="어셈블하기"
            @handleCategory="handleCategory"
            @handleSort="handleSort"
        />
        <div>
            <div class="row" style="display: flex; margin-top: 40px">
                <SocialCard
                    class="col-4"
                    style="width: 32%"
                    v-for="social in page.socialList"
                    :key="social.sno"
                    :social="social"
                />
            </div>
        </div>
        <div v-if="page.socialList.length != 0" class="d-flex justify-content-center mt-4">
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
</template>

<script setup>
import socialAPI from "@/apis/socialAPI";
import SocialCard from "@/components/Social/SocialCard.vue";
import SocialHeader from "@/components/Social/SocialHeader.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();

const pageNo = ref(route.query.pageNo || 1);
const ctno = ref(route.query.ctno || 0);
const sort = ref(route.query.sort || null);
const isChangedPageNo = ref(false);

const page = ref({
    socialList: [],
    pager: {},
});

async function getSocialList(pageNo, ctno, sort) {
    try {
        const response = await socialAPI.getSocialList(pageNo, ctno, sort);
        page.value.socialList = response.data.socialList;
        page.value.pager = response.data.pager;
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getSocialList(pageNo.value, ctno.value, sort.value);
});

function changePageNo(pageNo) {
    isChangedPageNo.value = true;
    router.replace({
        query: { pageNo: pageNo, ctno: route.query.ctno, sort: route.query.sort },
    });
}

function handleCategory(ctno) {
    router.replace({
        query: { pageNo: 1, ctno: ctno, sort: route.query.sort },
    });
}

function handleSort(sort) {
    router.replace({
        query: { pageNo: 1, ctno: route.query.ctno, sort: sort },
    });
}

const store = useStore();

watch(
    () => route.query.pageNo,
    (newPageNo, oldPageNo) => {
        if (store.state.activeWatch) {
            if (isChangedPageNo.value == true) {
                if (newPageNo) {
                    getSocialList(newPageNo, ctno.value, sort.value);
                    pageNo.value = newPageNo;
                } else {
                    getSocialList(1, ctno.value, sort.value);
                    pageNo.value = 1;
                }
                isChangedPageNo.value = false;
            }
        }
    }
);

watch(
    () => route.query.ctno,
    (newCtno, oldCtno) => {
        if (store.state.activeWatch) {
            if (newCtno) {
                getSocialList(1, newCtno, sort.value);
                pageNo.value = 1;
                ctno.value = newCtno;
            } else {
                getSocialList(1, 0, sort.value);
                pageNo.value = 1;
                ctno.value = 0;
            }
        }
    }
);

watch(
    () => route.query.sort,
    (newSort, oldSort) => {
        if (store.state.activeWatch) {
            if (newSort) {
                getSocialList(1, ctno.value, newSort);
                pageNo.value = 1;
                sort.value = newSort;
            } else {
                getSocialList(1, ctno.value, null);
                pageNo.value = 1;
                sort.value = null;
            }
        }
    }
);
</script>

<style scoped>
/* 페이지 리스트 */
.pageDetail {
    min-height: 600px;
    justify-content: normal;
    margin-top: 60px;
}
.pageOption {
    flex-wrap: wrap;
    display: flex;
}
.pageCategory {
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: space-between;
    display: flex;
    padding: 0;
}
.wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

/* 이미지 리스트 */
.main_styles {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    justify-content: space-between;
}
.main_styles > img {
    height: 250px;
    width: 100%;
    margin-bottom: 10px;
    position: relative;
}
.main_category {
    text-decoration-line: none;
    color: black;
    margin-bottom: 30px;
    min-width: 150px;
}
.main_text > h3 {
    font-size: 17px;
    font-weight: 600;
    margin-top: 30px;
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
/* 
.btn {
    background-color: #558ccf;
    color: white;
} */

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

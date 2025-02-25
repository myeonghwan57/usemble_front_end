<template>
    <div
        class="main ms-auto me-auto"
        style="height: auto; width: 65%; min-width: 700px; margin-top: 60px"
    >
        <SocialHeader
            :title="member.mname + '님이 진행한 어셈블'"
            @handleCategory="handleCategory"
            @handleSort="handleSort"
        />
        <div class="row" style="display: flex; margin-top: 40px">
            <SocialCard
                class="col-4"
                style="width: 32%"
                v-for="social in progressed.socialList"
                :key="social.sno"
                :social="social"
            />
        </div>
        <div v-if="progressed.socialList.length != 0" class="d-flex justify-content-center mt-4">
            <button
                v-if="progressed.pager.startPageNo > 1"
                class="btn page-btn btn-sm me-1"
                @click="changePageNo(progressed.pager.startPageNo - 1)"
            >
                이전
            </button>
            <button
                v-for="pageNo in progressed.pager.pageArray"
                :key="pageNo"
                :class="progressed.pager.pageNo == pageNo ? 'cur-page' : ''"
                class="btn page-btn btn-sm me-1"
                @click="changePageNo(pageNo)"
            >
                {{ pageNo }}
            </button>
            <button
                v-if="progressed.pager.groupNo < progressed.pager.totalGroupNo"
                class="btn page-btn btn-sm me-1"
                @click="changePageNo(progressed.pager.endPageNo + 1)"
            >
                다음
            </button>
        </div>
    </div>
</template>

<script setup>
import SocialCard from "@/components/Social/SocialCard.vue";
import SocialHeader from "@/components/Social/SocialHeader.vue";
import { ref, watch } from "vue";
import socialAPI from "@/apis/socialAPI";
import { useRoute, useRouter } from "vue-router";
import memberAPI from "@/apis/memberAPI";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();

// 쿼리스트링으로 받은 mid로 mname 받기
const member = ref({
    mname: "",
});
async function getMember(mid) {
    try {
        const response = await memberAPI.getUserProfile(mid);
        member.value.mname = response.data.member.mname;
    } catch (error) {
        console.log(error);
    }
}

const isChangedPageNo = ref(false);

getMember(route.query.mid);

// 마감한 어셈블 전체 가져오기
const progressed = ref({
    pager: {},
    socialList: [],
});

const mid = ref(route.query.mid);
const pageNo = ref(route.query.pageNo || 1);
const ctno = ref(route.query.ctno || 0);
const sort = ref(route.query.sort || null);

async function getRecuited(mid, pageNo, ctno, sort) {
    try {
        const response = await socialAPI.progressed(mid, pageNo, ctno, sort);
        progressed.value.pager = response.data.pager;
        progressed.value.socialList = response.data.socialList;
    } catch (error) {
        console.log(error);
    }
}

getRecuited(mid.value, pageNo.value, ctno.value, sort.value);

function changePageNo(pageNo) {
    isChangedPageNo.value = true;
    router.replace({
        query: {
            mid: route.query.mid,
            pageNo: pageNo,
            ctno: route.query.ctno,
            sort: route.query.sort,
        },
    });
}

function handleCategory(ctno) {
    router.replace({
        query: { mid: route.query.mid, pageNo: 1, ctno: ctno, sort: route.query.sort },
    });
}

function handleSort(sort) {
    router.replace({
        query: { mid: route.query.mid, pageNo: 1, ctno: route.query.ctno, sort: sort },
    });
}

const store = useStore();
watch(
    () => route.query.pageNo,
    (newPageNo, oldPageNo) => {
        if (store.state.activeWatch) {
            if (isChangedPageNo.value == true) {
                if (newPageNo) {
                    getRecuited(mid.value, newPageNo, ctno.value, sort.value);
                    pageNo.value = newPageNo;
                } else {
                    getRecuited(mid.value, 1, ctno.value, sort.value);
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
                getRecuited(mid.value, 1, newCtno, sort.value);
                pageNo.value = 1;
                ctno.value = newCtno;
            } else {
                getRecuited(mid.value, 1, 0, sort.value);
                pageNo.value = 1;
                ctno.value = 0;
                sort.value = null;
            }
        }
    }
);

watch(
    () => route.query.sort,
    (newSort, oldSort) => {
        if (store.state.activeWatch) {
            if (newSort) {
                getRecuited(mid.value, 1, ctno.value, newSort);
                pageNo.value = 1;
                sort.value = newSort;
            } else {
                getRecuited(mid.value, 1, ctno.value, null);
                pageNo.value = 1;
                ctno.value = 0;
                sort.value = null;
            }
        }
    }
);
</script>

<style scoped>
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

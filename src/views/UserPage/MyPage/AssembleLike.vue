<template>
    <div class="d-flex">
        <div class="like">
            <div class="mb-5 text-center fw-bold fs-5">
                <i class="bi bi-heart me-1 fw-bold" style="font-size: 40px"></i>
                <p>좋아요</p>
            </div>
            <div class="hr"></div>
            <ul class="nav justify-content-around">
                <li class="nav-item">
                    <div class="nav-link fw-bold" aria-current="page" to="LikeHost">
                        내가 찜한 호스트
                    </div>
                </li>
            </ul>

            <div class="bg-light like-space">
                <div class="hr"></div>
                <div class="text-secondary">
                    <div class="like-empty" v-if="likeList.mids.length == 0">
                        <div class="mb-4">관심 있는 호스트를 찾아보세요.</div>
                        <button
                            class="p-3 bg-black text-white rounded-1 fw-bold"
                            style="font-size: 14px; border: none"
                            @click="goAssembleList"
                        >
                            어셈블 둘러보기
                        </button>
                    </div>
                    <div id="like-host" class="p-2">
                        <UserProfile
                            v-for="(mid, index) in likeList.mids"
                            :key="mid"
                            :mid="mid"
                            :idx="index"
                            :id="'profile' + index"
                            class="mypage-like"
                            @handleLikeHistory="handleLikeHistory(index)"
                        />
                    </div>
                </div>
            </div>
            <div v-if="likeList.mids.length != 0" class="d-flex justify-content-center mt-4">
                <button
                    v-if="likeList.pager.startPageNo > 1"
                    class="btn page-btn btn-sm me-1"
                    @click="changePageNo(likeList.pager.startPageNo - 1, $store.state.mid)"
                >
                    이전
                </button>
                <button
                    v-for="pageNo in likeList.pager.pageArray"
                    :key="pageNo"
                    :class="likeList.pager.pageNo == pageNo ? 'cur-page' : ''"
                    class="btn page-btn btn-sm me-1"
                    @click="changePageNo(pageNo, $store.state.mid)"
                >
                    {{ pageNo }}
                </button>
                <button
                    v-if="likeList.pager.groupNo < likeList.pager.totalGroupNo"
                    class="btn page-btn btn-sm me-1"
                    @click="changePageNo(likeList.pager.endPageNo + 1, $store.state.mid)"
                >
                    다음
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import UserProfile from "@/components/UserProfile.vue";
import memberAPI from "@/apis/memberAPI";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const pageNo = ref(route.query.pageNo || 1);

const likeList = ref({
    mids: [],
    pager: {},
});

//좋아요 정보 가져오기
async function getUserLikeList(pageNo, mid) {
    try {
        const response = await memberAPI.getUserLikeList(pageNo, mid);
        likeList.value.mids = response.data.likeList;
        likeList.value.pager = response.data.pager;
    } catch (error) {
        console.log(error);
    }
}

getUserLikeList(pageNo.value, store.state.mid);

//좋아요 삭제 시 컴포넌트 삭제
function handleLikeHistory(index) {
    document.getElementById("profile" + index).remove();
    if (likeList.value.mids.length == 1 && route.query.pageNo > 1) {
        router.replace({ query: { pageNo: route.query.pageNo - 1 } });
        pageNo.value = pageNo.value - 1;
    }
    getUserLikeList(pageNo.value, store.state.mid);
}

const router = useRouter();

function goAssembleList() {
    router.push("/list");
}

//페이지 이동
function changePageNo(argPageNo, mid) {
    router.push(`/mypage/assembleLike?mid=${mid}&pageNo=${argPageNo}`);
}

//요청 경로의 변경을 감시
watch(route, (newRoute, oldRoute) => {
    if (newRoute.query.pageNo) {
        getUserLikeList(newRoute.query.pageNo, store.state.mid);
        pageNo.value = newRoute.query.pageNo;
    } else {
        getUserLikeList(1, store.state.mid);
        pageNo.value = 1;
    }
});
</script>

<style scoped>
.like {
    width: 100%;
    margin: 0 auto;
}
#txt {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.hr {
    border-bottom: 1px solid lightgray;
}

#host-info {
    width: 90%;
    overflow: auto;
    text-overflow: ellipsis;
}

#like-btn {
    justify-content: center;
    align-items: center;
    border-color: lightgray;
    width: 120px;
    height: 40px;
}

.nav-link {
    text-align: center;
    color: gray;
}

.like-space {
    height: 470px;
    position: relative;
}

.like-empty {
    font-size: 14px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

<template>
    <div class="d-flex">
        <div class="alarm">
            <div class="mb-5 text-center fw-bold fs-5">
                <i class="bi bi-bell me-1 fw-bold" style="font-size: 40px"></i>
                <p>알림</p>
            </div>
            <div class="hr"></div>
            <ul class="nav justify-content-around">
                <li class="nav-item">
                    <div class="nav-link fw-bold" aria-current="page" to="LikeHost">
                        받은 알림 메세지
                    </div>
                </li>
            </ul>

            <div class="bg-light alarm-space">
                <div class="hr"></div>
                <div class="text-secondary">
                    <div class="alarm-empty" v-if="alarmPage.alarmList.length == 0">
                        <div>받은 알림이 존재하지 않습니다.</div>
                    </div>
                    <div class="p-2">
                        <div
                            v-for="alarm in alarmPage.alarmList"
                            :key="alarm.ano"
                            :id="'alarm' + alarm.ano"
                        >
                            <div class="d-flex justify-content-between">
                                <div class="mt-auto mb-auto">
                                    <span style="white-space: pre-wrap"> {{ alarm.message }}</span>
                                </div>
                                <button
                                    class="bg-light"
                                    style="border: none; outline: none"
                                    @click="checkAlarm(store.state.mid, alarm.ano)"
                                >
                                    <i class="bi bi-x fs-4"></i>
                                </button>
                            </div>
                            <div class="mt-2">
                                <span>{{ new Date(alarm.adate).toLocaleString() }}</span>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="alarmPage.alarmList.length != 0" class="d-flex justify-content-center mt-4">
                <button
                    v-if="alarmPage.pager.startPageNo > 1"
                    class="btn page-btn btn-sm me-1"
                    @click="changePageNo(alarmPage.pager.startPageNo - 1)"
                >
                    이전
                </button>
                <button
                    v-for="pageNo in alarmPage.pager.pageArray"
                    :key="pageNo"
                    :class="alarmPage.pager.pageNo == pageNo ? 'cur-page' : ''"
                    class="btn page-btn btn-sm me-1"
                    @click="changePageNo(pageNo)"
                >
                    {{ pageNo }}
                </button>
                <button
                    v-if="alarmPage.pager.groupNo < alarmPage.pager.totalGroupNo"
                    class="btn page-btn btn-sm me-1"
                    @click="changePageNo(alarmPage.pager.endPageNo + 1)"
                >
                    다음
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import memberAPI from "@/apis/memberAPI";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

const pageNo = ref(route.query.pageNo || 1);

const alarmPage = ref({
    alarmList: [],
    pager: {},
});

//좋아요 정보 가져오기
async function getAlarmList(pageNo, mid) {
    try {
        const response = await memberAPI.getAlarmList(pageNo, mid);
        alarmPage.value.alarmList = response.data.alarmList;
        alarmPage.value.pager = response.data.pager;
    } catch (error) {
        console.log(error);
    }
}

getAlarmList(pageNo.value, store.state.mid);

async function checkAlarm(mid, ano) {
    document.getElementById("alarm" + ano).remove();
    try {
        const response = await memberAPI.checkAlarm(ano);
        if (alarmPage.value.alarmList.length == 1 && route.query.pageNo > 1) {
            router.replace({ query: { pageNo: route.query.pageNo - 1 } });
            pageNo.value = pageNo.value - 1;
        }
        getAlarmList(pageNo.value, store.state.mid);

        const isAlarmResponse = await memberAPI.isAlarm(mid);
        store.commit("changeIsAlarm", isAlarmResponse.data.isAlarm);
    } catch (error) {
        console.log(error);
    }
}

const router = useRouter();

//페이지 이동
function changePageNo(argPageNo) {
    router.push(`/mypage/alarm?pageNo=${argPageNo}`);
}

//요청 경로의 변경을 감시
watch(route, (newRoute, oldRoute) => {
    if (newRoute.query.pageNo) {
        getAlarmList(newRoute.query.pageNo, store.state.mid);
        pageNo.value = newRoute.query.pageNo;
    } else {
        getAlarmList(1, store.state.mid);
        pageNo.value = 1;
    }
});
</script>

<style scoped>
.alarm {
    width: 100%;
    margin: 0 auto;
}

.hr {
    border-bottom: 1px solid lightgray;
}

.nav-link {
    text-align: center;
    color: gray;
}

.alarm-space {
    height: 410px;
    position: relative;
}

.alarm-empty {
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

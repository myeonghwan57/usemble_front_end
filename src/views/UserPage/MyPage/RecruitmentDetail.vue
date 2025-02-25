<template>
    <div class="d-flex justify-content-between" id="socialinfo">
        <div class="d-flex">
            <div id="socialimg">
                <RouterLink :to="`/social/detail?sno=${props.recruitment.sno}`">
                    <img
                        :src="`${axios.defaults.baseURL}/social/sthumb/${props.recruitment.sno}`"
                    />
                </RouterLink>
            </div>
            <div>
                <RouterLink class="no-deco" :to="`/social/detail?sno=${props.recruitment.sno}`">
                    <div id="socialtitle">{{ props.recruitment.stitle }}</div>
                </RouterLink>
                <div id="socialcontent">
                    <div class="mb-1">{{ props.recruitment.saddress }}</div>
                </div>
                <div id="socialprice">{{ Number(props.recruitment.sfee).toLocaleString() }}원</div>
            </div>
        </div>
        <div class="justify-content-center align-items-center">
            <RouterLink
                class="text-decoration-none"
                :to="`./recruitmentStatus?sno=${props.recruitment.sno}`"
            >
                <button class="d-flex btn me-4 mb-2" id="host-btn">모집 현황</button>
            </RouterLink>
            <button
                v-if="new Date(props.recruitment.sdeadline) > new Date()"
                class="d-flex btn me-4"
                id="host-btn"
                @click="showSelectRecruitModal()"
            >
                취소하기
            </button>
        </div>
    </div>
    <hr class="mx-3" />
</template>

<script setup>
import axios from "axios";
import { inject } from "vue";
import { useRouter } from "vue-router";

const props = defineProps(["recruitment"]);
const emit = defineEmits(["showModal"]);
const router = useRouter();
const selectSno = inject("selectSno");

function showSelectRecruitModal() {
    selectSno.value = props.recruitment.sno;
    emit("showModal");
}
</script>

<style scoped>
img {
    width: 180px;
    height: 120px;
}
#socialinfo {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
}
#socialimg {
    margin: 0 15px;
}
#socialtitle {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 900;
    color: black;
}
#id {
    font-weight: 900;
}
#socialcontent {
    margin-top: 10px;
    font-size: 13px;
    font-weight: 500;
    color: grey;
}

#host-btn {
    justify-content: center;
    background-color: black;
    color: white;
    font-weight: 700;
    width: 120px;
    height: 40px;
}

.no-deco {
    text-decoration: none;
}
</style>

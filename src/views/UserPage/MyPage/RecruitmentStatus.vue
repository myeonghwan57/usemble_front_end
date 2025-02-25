<template>
    <div>
        <h4 class="mb-3">신청자 관리</h4>
        <table class="table table-group-divider table-bordered text-center">
            <tr class="p-2">
                <th>아이디</th>
                <th>신청자</th>
                <th>성별</th>
                <th>생년월일</th>
                <th v-if="!isDeadline"></th>
            </tr>
            <tr v-for="member in memberList" :key="member.mid">
                <td>
                    <RouterLink class="text-decoration-none" :to="`/user/info?mid=${member.mid}`">
                        {{ member.mid }}
                    </RouterLink>
                </td>
                <td>
                    {{ member.mname }}
                </td>
                <td>{{ member.msex }}</td>
                <td>{{ member.mbirth }}</td>
                <td v-if="!isDeadline">
                    <button
                        type="button"
                        class="btn btn-sm refuse"
                        @click="refuseJoinMember(member.mid, route.query.sno)"
                    >
                        거절
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import socialAPI from "@/apis/socialAPI";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const memberList = ref([]);
const isDeadline = ref(false);

async function getJoinMemberList(sno) {
    try {
        const response = await socialAPI.getJoinMemberList(sno);
        memberList.value = response.data.memberList;
    } catch (error) {
        console.log(error);
    }
}

getJoinMemberList(route.query.sno);

async function isDeadlineState(sno) {
    try {
        const response = await socialAPI.isDeadline(sno);
        isDeadline.value = response.data.isDeadline;
    } catch (error) {
        console.log(error);
    }
}

isDeadlineState(route.query.sno);

async function refuseJoinMember(mid, sno) {
    try {
        await socialAPI.refuseJoinMember(mid, sno);
        getJoinMemberList(route.query.sno);
    } catch (error) {
        console.log(error);
    }
}
</script>

<style scoped>
th,
td {
    padding: 10px;
}

.refuse {
    color: white;
    background-color: rgb(254, 100, 100);
}
</style>

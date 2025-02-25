<template>
    <div class="mt-4 text-start">
        <h3 class="fw-bold ms-3">{{ $store.state.mname }}</h3>
        <p class="ms-3 mb-5" style="font-size: 12px">{{ $store.state.mid }}</p>

        <ul class="nav flex-column text-start" id="tab-bar">
            <li class="nav-item">
                <RouterLink
                    class="nav-link fw-bold mb-3"
                    style="font-size: 20px; color: black"
                    to="/mypage/profileInfo"
                >
                    마이페이지
                </RouterLink>
            </li>
            <li class="nav-item">
                <span class="nav-link text-black"><strong>어셈블 관리</strong></span>
            </li>
            <li class="nav-item">
                <RouterLink to="/mypage/assembleHistory" class="nav-link" style="font-size: 14px">
                    내역
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/mypage/assembleLike" class="nav-link" style="font-size: 14px">
                    좋아요
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink to="/mypage/assembleReview" class="nav-link" style="font-size: 14px">
                    후기
                </RouterLink>
            </li>
            <li class="nav-item mb-4">
                <RouterLink to="/mypage/alarm" class="nav-link" style="font-size: 14px">
                    알림
                </RouterLink>
            </li>
            <li class="nav-item">
                <span class="nav-link disabled text-black"><strong>계정 관리</strong></span>
            </li>
            <li class="nav-item">
                <RouterLink to="/mypage/profileUpdate" class="nav-link" style="font-size: 14px">
                    프로필 수정
                </RouterLink>
            </li>
            <li class="nav-item mb-4">
                <RouterLink to="/mypage/privacyInfo" class="nav-link" style="font-size: 14px">
                    개인정보 수정
                </RouterLink>
            </li>
            <li class="nav-item mb-3">
                <button @click="handleLogout" class="nav-link text-black">
                    <strong>로그아웃</strong>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

//로그아웃
function handleLogout() {
    store.dispatch("deleteAuth");
    router.push("/");
}
</script>

<style scoped>
#click-mypage {
    color: black;
    font-size: 20px;
    font-weight: 700;
}

.nav-link {
    color: gray;
}
</style>

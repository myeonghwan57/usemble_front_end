<template>
    <div id="navbar">
        <div id="adminProfile" class="d-flex mb-5">
            <img id="adminImg" src="../../../public/images/admin.png" alt="" />
            <span id="adminId">관리자</span>
        </div>
        <div id="menu" class="d-flex flex-column">
            <div id="menulist">
                <RouterLink id="title" to="/"
                    ><i class="bi bi-house-fill me-2"></i>메인페이지</RouterLink
                >
            </div>
            <div id="menulist">
                <RouterLink id="title" to="/admin/dashBoard"
                    ><i class="bi bi-clipboard-data-fill me-2"></i>대시보드</RouterLink
                >
            </div>
            <div id="menulist">
                <RouterLink id="title" to="/admin/socialingTable"
                    ><i class="bi bi-search-heart-fill me-2"></i>소셜링 관리</RouterLink
                >
            </div>
            <div id="menulist">
                <RouterLink id="title" to="/admin/memberTable"
                    ><i class="bi bi-person-fill me-2"></i>회원 관리</RouterLink
                >
            </div>
            <div id="menulist">
                <RouterLink id="title" to="/admin/reviewTable">
                    <i class="bi bi-chat-dots-fill me-2"></i>후기 관리</RouterLink
                >
            </div>
            <div id="menulist">
                <RouterLink id="title" to="/admin/noticeTable">
                    <i class="bi bi-chat-dots-fill me-2"></i>공지사항 관리</RouterLink
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
#adminProfile {
    justify-content: center;
}
#adminImg {
    width: 40px;
    margin-right: 10px;
    border-radius: 50%;
}

#adminId {
    align-content: center;
    font-size: 20px;
    font-weight: 700;
    color: white;
}
#title {
    text-decoration: none;
    color: white;
    font-size: 20px;
    font-weight: 900;
}

#navbar {
    width: 300px;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background-color: rgb(20, 70, 0);
    position: fixed;
    left: -240px;
}
#navbar:hover {
    transform: translate(240px, 0);
    transition: 0.5s;
}
#menu {
    justify-content: space-around;
}
#menulist {
    width: 100%;
    height: 80px;
}
</style>

<template>
    <div class="ms-auto me-auto" style="width: 70%; min-width: 800px">
        <div class="main-img" style="text-align: center">
            <img src="../../../public/images/usemble.jpg" width="100%" />
        </div>
        <div class="category container d-flex">
            <RouterLink class="main_category" to="list?ctno=1"
                ><img src="../../../public/images/category/eat.png" />맛집</RouterLink
            >
            <RouterLink class="main_category" to="list?ctno=2"
                ><img src="../../../public/images/category/exercise.png" />운동</RouterLink
            >
            <RouterLink class="main_category" to="list?ctno=3"
                ><img src="../../../public/images/category/study.png" />스터디</RouterLink
            >
            <RouterLink class="main_category" to="list?ctno=4"
                ><img src="../../../public/images/category/friendship.png" />친목</RouterLink
            >
            <RouterLink class="main_category" to="list?ctno=5"
                ><img src="../../../public/images/category/art.png" />문화예술</RouterLink
            >
            <RouterLink class="main_category" to="list"
                ><img src="../../../public/images/category/all.png" />전체보기</RouterLink
            >
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.category {
    margin-top: 50px;
    min-width: 50%;
    justify-content: center;
}

.main_category {
    cursor: pointer;
    width: 70%;
    justify-items: center;
    display: inline-grid;
    font-size: 16px;
    font-weight: 600;
    color: black;
    text-decoration: none;
    /* margin-left: 50px;
    margin-right: 50px; */
}

.main_category::before {
    content: "";
    display: block;
}

.main_category > img {
    width: 85px;
    height: 85px;
    border-radius: 50%;
}
.main_img {
    width: 100%;
    height: 380px;
    margin-left: auto;
    margin-right: auto;
}
</style>

<template>
    <Header v-if="!$route.path.startsWith('/admin') && !$route.path.startsWith('/Admin')" />

    <div :class="{ wrap: !$route.path.startsWith('/user/info') }">
        <router-view />
        <TopButton />
    </div>

    <Footer v-if="!$route.path.startsWith('/admin') && !$route.path.startsWith('/Admin')" />
</template>

<script setup>
import Header from "@/components/Common/Header.vue";
import Footer from "@/components/Common/Footer.vue";
import TopButton from "@/components/TopButton.vue";
</script>

<style>
@import url("https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css");

#app {
    font-family: "NanumSquare", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /* ------------------- */
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* viewport의 전체 높이를 차지 */
    min-width: 1400px;
}

.wrap {
    padding-bottom: 50px;
}
</style>

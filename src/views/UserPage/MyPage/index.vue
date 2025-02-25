<template>
    <div class="mt-5" id="mypageForm">
        <div class="mt-4 d-flex">
            <div id="tab"><TabMenu /></div>
            <div id="mycontent" class="mt-4 text-start">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script setup>
import TabMenu from "./TabMenu.vue";
</script>

<style scoped>
#tab {
    width: 15%;
}
#mycontent {
    width: 70%;
    margin: 0 auto;
}
#mypageForm {
    width: 70%;
    margin: 0 auto;
}
</style>

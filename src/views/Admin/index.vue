<template>
    <div class="d-flex">
        <div><AdminTab></AdminTab></div>
        <div id="admincontent"><RouterView /></div>
    </div>
</template>
<script setup>
import AdminTab from "./AdminTab.vue";
</script>

<style scoped>
#admincontent {
    width: 80%;
    margin: 0 auto;
    min-width: 1500px;
}
</style>

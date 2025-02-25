<template>
    <div class="searchResults container" style="max-width: 60%">
        <div class="row" style="display: flex; margin-top: 60px">
            <SocialCard
                class="col-4 mt-3"
                style="width: 32%"
                v-for="(social, index) in searchList"
                :key="index"
                :social="social"
            />
        </div>
    </div>
</template>

<script setup>
import SocialCard from "@/components/Social/SocialCard.vue";

const prop = defineProps(["searchList"]);
</script>

<style scoped></style>

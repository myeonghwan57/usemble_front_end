<template>
    <div>
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <h5>{{ title }}</h5>
                <RouterLink class="show-more" :to="props.link" :title="title">더보기</RouterLink>
            </div>
            <div class="row mt-3">
                <SocialCard
                    v-for="(social, index) in socials"
                    :key="index"
                    class="col-4"
                    :social="social"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import SocialCard from "@/components/Social/SocialCard.vue";

const props = defineProps(["title", "link", "socials"]);

</script>

<style scoped>
h5 {
    font-size: 18px;
    font-weight: 700;
    margin: 14px 0px;
}

.show-more {
    color: #858585;
    /* text-decoration: none; */
    margin: auto 0px;
}
</style>

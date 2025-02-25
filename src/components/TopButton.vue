<template>
    <div v-show="isVisible" class="top-button" @click="scrollToTop">
        <i class="bi bi-arrow-up"></i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isVisible: false, //표시할지 여부
        };
    },
    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: "smooth" }); //스크롤할 위치 설정
        },
        checkVisibility() {
            this.isVisible = window.scrollY > 300; //300넘으면 true
        },
    },
    mounted() {
        window.addEventListener("scroll", this.checkVisibility);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.checkVisibility);
    },
};
</script>

<style scoped>
.top-button {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    transition: opacity 0.3s;
}
</style>

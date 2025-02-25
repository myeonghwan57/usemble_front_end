<template>
    <div>
        <h3 style="margin-bottom: 40px">
            <span style="font-weight: 600">{{ title }}</span>
        </h3>
        <div class="pageCategory container">
            <div class="wrapper">
                <div class="pageOption">
                    <div class="custom-select me-2">
                        <select
                            id="ctno"
                            class="dropdown-select"
                            v-model.trim="viewSelects.viewCategory"
                            @change="selectCategory"
                        >
                            <option value="0" selected>카테고리</option>
                            <option value="1">맛집</option>
                            <option value="2">운동</option>
                            <option value="3">스터디</option>
                            <option value="4">친목</option>
                            <option value="5">문화/예술</option>
                        </select>
                    </div>
                    <div class="custom-select">
                        <!-- <select class="dropdown-select" v-model="viewSelects.viewSort"> -->
                        <select
                            id="sort"
                            class="dropdown-select"
                            v-model="viewSelects.viewSort"
                            @change="selectSort"
                        >
                            <option value="" selected>정렬</option>
                            <option value="recently">최신순</option>
                            <option value="deadline">마감임박순</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps(["title"]);
const emit = defineEmits(["handleCategory", "handleSort"]);

const route = useRoute();

const viewSelects = ref({
    viewCategory: "all",
    viewSort: "",
});

viewSelects.value.viewCategory = route.query.ctno != null ? route.query.ctno : 0;

function selectCategory() {
    const category = document.getElementById("ctno").value;
    emit("handleCategory", category);
}

function selectSort() {
    const sort = document.getElementById("sort").value;
    emit("handleSort", sort);
}
</script>

<style scoped>
/* 페이지 리스트 */
.pageOption {
    flex-wrap: wrap;
    display: flex;
}
.pageCategory {
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: space-between;
    display: flex;
    padding: 0;
}
.wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.btn {
    background-color: #558ccf;
    color: white;
}

/* select css */
.custom-select {
    position: relative;
}

.dropdown-select {
    appearance: none;
    /*  safari  */
    -webkit-appearance: none;
    /*  other styles for aesthetics */
    width: 100px;
    font-size: 15px;
    padding: 5px 5px 5px 8px;
    background-color: #558ccf;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    border: none;
    outline: none;
}
.custom-select::after {
    --size: 0.3rem;
    content: "";
    position: absolute;
    right: 0.6rem;
    pointer-events: none;
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid #fff;
    top: 40%;
}
.dropdown-select > option {
    font-size: 15px;
}
</style>

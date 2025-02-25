<template>
    <ModalTemplate>
        <template v-slot:header>
            <span class="header">
                <h4>관심있는 카테고리를 선택하세요.</h4>
                <h5 class="text-secondary">취향에 맞는 어셈블을 찾아보세요.</h5>
            </span>
        </template>

        <template v-slot:body>
            <div class="d-flex justify-content-center" style="width: 100%">
                <div class="d-flex ms-2">
                    <div v-for="(cate, index) in modalCategory" :key="index">
                        <input
                            type="button"
                            :value="cate.ctname"
                            class="btn ct-btn me-2"
                            :class="{
                                'ct-btn': !selected[index],
                                'ct-btn-select': selected[index],
                            }"
                            @click="selectCategory(index)"
                        />
                    </div>
                </div>
            </div>
            <div id="cate_warning" class="text-danger" style="font-size: 13px"></div>
        </template>

        <template v-slot:footer>
            <button class="btn" @click="confirmSelection()">확인</button>
        </template>
    </ModalTemplate>
</template>

<script setup>
import memberAPI from "@/apis/memberAPI";
import ModalTemplate from "@/components/ModalTemplate.vue";
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";

const emit = defineEmits(["close", "change"]);

const modalMcategory = ref([]);
const newModalMcategory = ref([]);
const modalCategory = ref([]);
const selected = ref(
    modalCategory.value.map((cat) => modalMcategory.value.some((mcat) => mcat.ctno === cat.ctno))
);
const cnt = ref(0);

async function getCategoryList() {
    try {
        const response = await memberAPI.getCategory();
        modalCategory.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

async function getMcategoryList(mid) {
    try {
        const response = await memberAPI.getMcategory(mid);
        modalMcategory.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

function initializeSelected() {
    selected.value = modalCategory.value.map((cat) =>
        modalMcategory.value.some((mcat) => mcat.ctno === cat.ctno)
    );
    cnt.value = selected.value.filter((val) => val).length;
}

function selectCategory(index) {
    for (let i = 0; i < modalMcategory.value.length; i++) {
        newModalMcategory.value.push(modalMcategory.value[i].ctno);
    }

    if (cnt.value === 3) {
        if (selected.value[index]) {
            selected.value[index] = false;
            cnt.value--;
            const delValue = newModalMcategory.value.indexOf(modalCategory.value[index].ctno);
            if (delValue !== -1) {
                newModalMcategory.value.splice(delValue, 1);
            }
        }
    } else {
        selected.value[index] = !selected.value[index];
        if (selected.value[index]) {
            newModalMcategory.value.push(modalCategory.value[index].ctno);
            cnt.value++;
        } else {
            const delValue = newModalMcategory.value.indexOf(modalCategory.value[index].ctno);
            if (delValue !== -1) {
                newModalMcategory.value.splice(delValue, 1);
                cnt.value--;
            }
        }
    }
}

const store = useStore();

onMounted(async () => {
    await getCategoryList();
    await getMcategoryList(store.state.mid);
    initializeSelected();
});
watch(
    [modalCategory, modalMcategory],
    () => {
        if (modalCategory.value.length && modalMcategory.value.length) {
            initializeSelected();
        }
    },
    { immediate: true }
);

function confirmSelection() {
    const cate_warning = document.getElementById("cate_warning");
    const selectedCategories = modalCategory.value.filter((cat, index) => selected.value[index]);
    if (selectedCategories.length != 0) {
        emit("change", selectedCategories);
        emit("close");
        cate_warning.innerHTML = "";
    } else {
        cate_warning.innerHTML = "취향에 맞는 카테고리를 최소 1개 이상 골라주세요.";
    }
}
</script>

<style scoped>
.ct-btn {
    background-color: #ebf0f7;
    border-radius: 50px;
    color: #558ccf;
    font-size: 16px;
    padding: 10px 25px;
    height: 50px;
    display: flex;
    text-align: center;
    align-items: center;
    word-break: keep-all;
}

.ct-btn:hover {
    color: white;
    background-color: #57b17f;
    padding: 10px 25px;
    border-radius: 50px;
    opacity: 70%;
    font-size: 16px;
    font-weight: bolder;
}

.ct-btn-select {
    color: white;
    border: #57b17f;
    background-color: #57b17f;
    padding: 10px 25px;
    border-radius: 50px;
    opacity: 70%;
    font-size: 16px;
    font-weight: bolder;
}
</style>

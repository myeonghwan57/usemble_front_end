<template>
    <ModalTemplate>
        <template v-slot:header>
            <div></div>
        </template>

        <template v-slot:body>
            <div class="text-secondary">{{ mid }} 아이디를 입력해 주세요.</div>
            <div class="text-secondary">{{ mid }} 는(은) 사용가능한 아이디 입니다.</div>
            <div class="text-secondary">{{ mid }} 는(은) 중복된 아이디 입니다.</div>
        </template>

        <template v-slot:footer>
            <button type="button" class="btn" @click="useId">입력</button>
            <button type="button" class="btn" @click="useId">사용하기</button>
            <button type="button" class="btn" @click="useId">재입력</button>
        </template>
    </ModalTemplate>
</template>
<script setup>
import ModalTemplate from "../../../components/ModalTemplate.vue";
const prop = defineProps(["mid"]);
</script>

<style scoped></style>

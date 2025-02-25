<template>
    <div class="mb-2">
        <div class="from-group search">
            <label class="form-label">주소 검색</label>
            <div class="d-flex mb-2">
                <input
                    class="form-control"
                    type="text"
                    id="sample5_address"
                    placeholder="주소를 검색해주세요"
                    style="background-color: #efefef"
                    readonly
                />
                <input
                    class="btn btn-dark ms-2"
                    type="button"
                    @click="sample5_execDaumPostcode"
                    value="주소 찾기"
                />
            </div>
        </div>
        <KakaoMap ref="kakaoMap" />
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import KakaoMap from "@/components/KakaoMap.vue";

const emit = defineEmits(["getAddress"]);

const kakaoMap = ref(null);

onMounted(() => {
    if (!window.daum) {
        loadScript();
    }
});

function loadScript() {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => {
        new Promise((resolve) => window.daum.postcode.load(resolve));
    };

    document.head.appendChild(script);
}

function sample5_execDaumPostcode() {
    new window.daum.Postcode({
        oncomplete: function (data) {
            var addr = data.address; // 최종 주소 변수

            // 주소 정보를 해당 필드에 넣는다.
            document.getElementById("sample5_address").value = addr;
            kakaoMap.value.getAddress(addr);
            getAddress(addr);
        },
    }).open();
}

function getAddress(address) {
    emit("getAddress", address);
}
</script>

<style scoped>
.search {
    text-align: left;
    font-weight: bold;
}
</style>

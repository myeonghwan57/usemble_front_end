<template>
    <div class="map_wrap">
        <div id="map" style="width: 100%; height: 100%; position: relative; overflow: hidden"></div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const map = ref(null);
const geocoder = ref(null);

defineExpose({ getAddress });

const props = defineProps(["saddress"]);

//마운트 됐을 시
onMounted(() => {
    //카카오 객체 존재, 맵을 그릴 준비가 됐다면 맵 실행
    if (window.kakao && window.kakao.maps) {
        loadMap();
    } else {
        //카카오 api 스크립트 추가
        loadScript();
    }
});

onUnmounted(() => {});

function loadScript() {
    const script = document.createElement("script");
    script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=1d60b156410f6021cf6dbfa93d74abeb&libraries=services,drawing,clusterer&autoload=false";
    script.onload = () =>
        window.kakao.maps.load(() => {
            loadMap();
        });

    document.head.appendChild(script);
}

function loadMap() {
    const container = document.getElementById("map");
    const options = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
    };

    map.value = new window.kakao.maps.Map(container, options);
    geocoder.value = new window.kakao.maps.services.Geocoder();

    if (props.saddress != null) {
        getAddress(props.saddress);
    }
}

function getAddress(address) {
    // 주소로 좌표를 검색합니다
    geocoder.value.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
            var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new window.kakao.maps.Marker({
                map: map.value,
                position: coords,
            });

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.value.setCenter(coords);
        }
    });
}
</script>

<style scoped>
.map_wrap,
.map_wrap * {
    margin: 0;
    padding: 0;
    font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
    font-size: 12px;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
    color: #000;
    text-decoration: none;
}
.map_wrap {
    position: relative;
    width: 100%;
    height: 358px;
}
</style>

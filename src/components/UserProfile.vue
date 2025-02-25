<template>
    <div :id="props.id">
        <div class="d-flex justify-content-between userinfo">
            <div class="d-flex">
                <div id="userimg">
                    <RouterLink :to="`/user/info?mid=${props.mid}`">
                        <img :src="`${axios.defaults.baseURL}/member/mattach/${props.mid}`" />
                    </RouterLink>
                </div>
                <div>
                    <div id="host">호스트</div>
                    <RouterLink class="no-underline" :to="`/user/info?mid=${props.mid}`">
                        <div id="id">{{ profile.mid }}</div>
                    </RouterLink>
                    <div :class="props.class" id="intro">
                        {{ profile.mintroduce }}
                    </div>
                </div>
            </div>
            <div class="d-flex align-items-center">
                <button
                    class="d-flex btn mx-3"
                    id="like-btn"
                    @click="handleLike(store.state.mid, profile.mid)"
                >
                    <i
                        :id="'like' + idx"
                        class="bi me-2"
                        :class="{
                            'bi-heart': !like,
                            'like-deactive': !like,
                            'bi-heart-fill': like,
                            'like-active': like,
                        }"
                    ></i>
                    <div>{{ profile.mlikeCnt }}</div>
                </button>
            </div>
        </div>
        <hr class="mx-2" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import memberAPI from "@/apis/memberAPI";
import axios from "axios";

const props = defineProps(["mid", "idx", "id", "class"]);
const emit = defineEmits(["handleLikeHistory"]);

const router = useRouter();

const profile = ref({
    mid: "",
    mintroduce: "",
    mlikeCnt: 0,
});

const mattach = ref(null);

//멤버 정보 불러오기
async function getMember(mid) {
    try {
        const response = await memberAPI.getUserProfile(mid);
        profile.value.mid = response.data.member.mid;
        profile.value.mintroduce = response.data.member.mintroduce;
    } catch (error) {
        console.log(error);
    }
}

getMember(props.mid);

//좋아요 개수 가져오기
async function getLikeCnt(mid) {
    try {
        const response = await memberAPI.getLikeCnt(mid);
        profile.value.mlikeCnt = response.data;
    } catch (error) {
        console.log(error);
    }
}

getLikeCnt(props.mid);

//나의 좋아요 상태
const like = ref(false);

//나의 좋아요 상태 가져오기
async function getLikeState(mid, fmid) {
    try {
        const response = await memberAPI.getLikeState(mid, fmid);
        like.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

const store = useStore();

getLikeState(store.state.mid, props.mid);

//좋아요 클릭시 이벤트
async function handleLike(mid, fmid) {
    if (mid === fmid) {
        alert("스스로를 좋아요할 수 없습니다.");
        return;
    }

    if (store.state.mrole == "ROLE_ADMIN") {
        alert("관리자는 좋아요를 할 수 없습니다.");
        return;
    }

    if (store.state.mid == "") {
        router.push("/login");
        return;
    }

    like.value = !like.value;
    const likeEl = document.getElementById("like" + props.idx);

    if (like.value) {
        likeEl.classList.remove("bi-heart");
        likeEl.style.color = "red";
        likeEl.classList.add("bi-heart-fill");
        const response = await memberAPI.insertLike(mid, fmid);
    } else {
        likeEl.classList.remove("bi-heart-fill");
        likeEl.style.color = "black";
        likeEl.classList.add("bi-heart");
        const response = await memberAPI.deleteLike(mid, fmid);

        //좋아요 삭제 시 프로필 삭제 이벤트가 있다면
        if (emit("handleLikeHistory") != null) {
            //프로필 div id를 부모 컴포넌트의 함수에 전달
            emit("handleLikeHistory", props.id);
        }
    }
    //좋아요 개수 재로딩
    getLikeCnt(fmid);
}
</script>

<style scoped>
img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
}
.userinfo {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
}
#userimg {
    margin: 0 15px;
}
#host {
    font-size: 12px;
    font-weight: 900;
    color: grey;
}
#id {
    font-weight: 900;
}
#intro {
    margin-top: 10px;
    font-size: 14px;
    font-weight: 500;
    color: grey;
    word-break: break-all;
}

.mypage-like {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 360px;
}
#like-btn {
    justify-content: center;
    align-items: center;
    border-color: lightgray;
    width: 120px;
    height: 40px;
}

.like-active {
    color: red;
}

.like-deactive {
    color: black;
}

.no-underline {
    color: black;
    text-decoration: none;
}
</style>

<template>
    <nav>
        <div id="leftmenu">
            <RouterLink class="mx-4 nav_text" @click="reloadList" to="/list"
                >어셈블 둘러보기</RouterLink
            >
            <RouterLink id="usemble" class="mx-4" to="/write">어셈블!</RouterLink>
        </div>
        <RouterLink to="/"
            ><img id="logoimg" alt="Vue logo" src="../../../public/images/logo.png"
        /></RouterLink>
        <div id="rightmenu">
            <RouterLink to="/search">
                <button class="btn" style="border: none; outline: none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-search"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
                        />
                    </svg>
                </button>
            </RouterLink>
            <div class="d-flex" v-if="$store.state.mid === ''">
                <RouterLink to="/login" class="mx-4 nav_text">로그인</RouterLink>
                <span class="nav_text">|</span>
                <RouterLink to="/join" class="mx-4 nav_text">회원가입</RouterLink>
            </div>
            <div v-if="$store.state.mid !== ''">
                <RouterLink
                    v-if="$store.state.mrole === 'ROLE_ADMIN'"
                    class="nav_text ms-4"
                    to="/admin"
                    >관리자페이지</RouterLink
                >
                <RouterLink to="/myPage/alarm" v-if="$store.state.mrole === 'ROLE_USER'">
                    <button
                        class="btn ms-4"
                        type="button"
                        style="border: none; outline: none; position: relative"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-bell"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"
                            />
                        </svg>
                        <span
                            v-if="store.state.isAlarm"
                            class="translate-middle rounded-circle bg-danger"
                            style="
                                position: absolute;
                                width: 8px;
                                height: 8px;
                                top: 33px;
                                right: 8px;
                            "
                            ><span class="visually-hidden">New alerts</span></span
                        >
                    </button>
                </RouterLink>
                <RouterLink
                    v-if="$store.state.mrole === 'ROLE_USER'"
                    class="nav_text ms-4"
                    to="/myPage"
                    >마이페이지</RouterLink
                >
                <button
                    @click="handleLogout"
                    class="mx-4"
                    style="border: none; background-color: white; font-weight: 900; font-size: 17px"
                >
                    로그아웃
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import memberAPI from "@/apis/memberAPI";

const store = useStore();
const router = useRouter();
const route = useRoute();

function handleLogout() {
    store.dispatch("deleteAuth");
    router.push("/");
}

async function reloadList() {
    if (route.fullPath != route.path && route.path == "/list") {
        store.commit("changeActiveWatch");
        await router.replace({ path: route.path, query: {} });
        store.commit("changeActiveWatch");
        router.go(0);
    }
}

async function isAlarmState(mid) {
    try {
        const response = await memberAPI.isAlarm(mid);
        store.commit("changeIsAlarm", response.data.isAlarm);
    } catch (error) {
        console.log(error);
    }
}

if (store.state.mid != "") {
    isAlarmState(store.state.mid);
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    height: 80px;
}

nav {
    width: 70%;
    height: 80px;
    margin: 0px auto;
    min-width: 700px;
    text-align: center;
}

a {
    text-decoration: none;
    color: black;
    font-size: 17px;
    height: 80px;
    font-weight: 900;
}

#logoimg {
    width: 80px;
}

#rightmenu {
    height: 80px;
    display: flex;
    float: right;
}

#leftmenu {
    height: 80px;
    display: flex;
    float: left;
    margin-right: 25px;
}
#usemble {
    color: #00a3e0;
    margin-top: 30px;
}

.nav_text {
    margin-top: 30px;
}
</style>

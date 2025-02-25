import axiosConfig from "@/apis/axiosConfig";
import { createStore } from "vuex";

export default createStore({
    state: { mid: "", mname: "", mrole: "", accessToken: "", activeWatch: true, isAlarm: false },
    getters: {
        getMid(state, getters, rootState, rootGetters) {
            return state.mid;
        },
        getMname(state, getters, rootState, rootGetters) {
            return state.mname;
        },
        getMrole(state, getters, rootState, rootGetters) {
            return state.mrole;
        },
        getAccessToken(state, getters, rootState, rootGetters) {
            return state.accessToken;
        },
        getActiveWatch(state, getters, rootState, rootGetters) {
            return state.activeWatch;
        },
        getIsAlarm(state, getters, rootState, rootGetters) {
            return state.activeWatch;
        },
    },
    mutations: {
        setMid(state, payload) {
            state.mid = payload;
        },
        setMname(state, payload) {
            state.mname = payload;
        },
        setMrole(state, payload) {
            state.mrole = payload;
        },
        setAccessToken(state, payload) {
            state.accessToken = payload;
        },
        changeActiveWatch(state) {
            state.activeWatch = !state.activeWatch;
        },
        changeIsAlarm(state, payload) {
            state.isAlarm = payload;
        },
    },
    actions: {
        loginAction(context, payload) {
            new Promise((resolve, reject) => {
                if (payload.result == "success") {
                    resolve({ result: "success", mid: payload.mid });
                } else {
                    reject({ result: "fail", reason: "password is wrong" });
                }
            })
                .then((data) => {
                    context.commit("setMid", data.mid);
                })
                .catch((error) => {
                    console.log("로그인 실패");
                });
        },
        loadAuth(context, payload) {
            const localMid = localStorage.getItem("mid") || "";
            const localMname = localStorage.getItem("mname") || "";
            const localMrole = localStorage.getItem("mrole") || "";
            const localAccessToken = localStorage.getItem("accessToken") || "";

            const sessionMid = sessionStorage.getItem("mid") || "";
            const sessionMname = sessionStorage.getItem("mname") || "";
            const sessionMrole = sessionStorage.getItem("mrole") || "";
            const sessionAccessToken = sessionStorage.getItem("accessToken") || "";

            const mid = localMid || sessionMid;
            const mname = localMname || sessionMname;
            const mrole = localMrole || sessionMrole;
            const accessToken = localAccessToken || sessionAccessToken;

            context.commit("setMid", mid);
            context.commit("setMname", mname);
            context.commit("setMrole", mrole);
            context.commit("setAccessToken", accessToken);

            if (accessToken !== "") {
                axiosConfig.addAuthHeader(accessToken);
            }
        },
        saveAuthLocal(context, payload) {
            context.commit("setMid", payload.mid);
            context.commit("setMname", payload.mname);
            context.commit("setMrole", payload.mrole);
            context.commit("setAccessToken", payload.accessToken);

            localStorage.setItem("mid", payload.mid);
            localStorage.setItem("mname", payload.mname);
            localStorage.setItem("mrole", payload.mrole);
            localStorage.setItem("accessToken", payload.accessToken);
            axiosConfig.addAuthHeader(payload.accessToken);
        },
        saveAuthSession(context, payload) {
            context.commit("setMid", payload.mid);
            context.commit("setMname", payload.mname);
            context.commit("setMrole", payload.mrole);
            context.commit("setAccessToken", payload.accessToken);

            sessionStorage.setItem("mid", payload.mid);
            sessionStorage.setItem("mname", payload.mname);
            sessionStorage.setItem("mrole", payload.mrole);
            sessionStorage.setItem("accessToken", payload.accessToken);
            axiosConfig.addAuthHeader(payload.accessToken);
        },
        deleteAuth(context, payload) {
            context.commit("setMid", "");
            context.commit("setMname", "");
            context.commit("setMrole", "");
            context.commit("setAccessToken", "");

            localStorage.removeItem("mid");
            localStorage.removeItem("mname");
            localStorage.removeItem("mrole");
            localStorage.removeItem("accessToken");

            sessionStorage.removeItem("mid");
            sessionStorage.removeItem("mname");
            sessionStorage.removeItem("mrole");
            sessionStorage.removeItem("accessToken");

            axiosConfig.removeAuthHeader();
        },
    },
    modules: {},
});


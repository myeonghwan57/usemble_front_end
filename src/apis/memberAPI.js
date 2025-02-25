import axios from "axios";
import qs from "qs";

function login(member) {
    return axios.post("/member/login", qs.stringify(member));
}

function join(formData) {
    //multipart/form-data로 데이터 전송
    return axios.post("/member/join", formData);
}

function findPassword(mid) {
    //multipart/form-data로 데이터 전송
    return axios.patch("/member/findPassword?mid=" + mid);
}

function getUserLikeList(pageNo, mid) {
    return axios.get("/member/likeList?mid=" + mid + "&pageNo=" + pageNo);
}

function getUserProfile(mid) {
    return axios.get("/member/profile?mid=" + mid);
}

function getLikeState(mid, fmid) {
    return axios.get("/member/likeState?mid=" + mid + "&fmid=" + fmid);
}

function getLikeCnt(mid) {
    return axios.get("/member/likeCnt?mid=" + mid);
}

function getSocialCnt(mid) {
    return axios.get("/member/socialCnt?mid=" + mid);
}

function getReviewCnt(mid) {
    return axios.get("/member/reviewCnt?mid=" + mid);
}

function insertLike(mid, fmid) {
    return axios.post("/member/like?mid=" + mid + "&fmid=" + fmid);
}

function deleteLike(mid, fmid) {
    return axios.delete("/member/unlike?mid=" + mid + "&fmid=" + fmid);
}

function withdrawMember(mid) {
    return axios.patch("/member/withdraw?mid=" + mid);
}

function idCheck(mid) {
    return axios.get("/member/idCheck?mid=" + mid);
}

function memberAttachDownload(mid) {
    return axios.get("/member/mattach/" + mid, { responseType: "blob" });
}
function getCategory() {
    return axios.get("/member/category");
}

function getPrivacy(mid) {
    return axios.get("/member/privacy?mid=" + mid);
}

function updatePrivacy(member) {
    return axios.patch("/member/updatePrivacy", member);
}

function updatePassword(member) {
    return axios.patch("/member/updatePassword", qs.stringify(member));
}

function updateProfile(formData) {
    return axios.patch("/member/updateProfile", formData);
}

function updateAgree(member) {
    return axios.patch("/member/updateAgree", member);
}

function getMcategory(mid) {
    return axios.get("/member/mcategory?mid=" + mid);
}

function putMcategory(resultcate) {
    return axios.post("/member/putMcategory", resultcate);
}

function updateMcategory(resultcate) {
    return axios.post("/member/updateMcategory", resultcate);
}

function putAgree(mid) {
    return axios.post("/member/putAgree?mid=" + mid);
}

function getAlarmList(pageNo, mid) {
    return axios.get("/member/alarm?mid=" + mid + "&pageNo=" + pageNo);
}

function checkAlarm(ano) {
    return axios.patch("/member/alarm/check?ano=" + ano);
}

function isAlarm(mid) {
    return axios.get("/member/alarm/state?mid=" + mid);
}

export default {
    login,
    join,
    findPassword,
    getUserLikeList,
    getUserProfile,
    getLikeState,
    getLikeCnt,
    getSocialCnt,
    getReviewCnt,
    insertLike,
    deleteLike,
    withdrawMember,
    idCheck,
    memberAttachDownload,
    getCategory,
    getPrivacy,
    updatePrivacy,
    updatePassword,
    updateProfile,
    updateAgree,
    getMcategory,
    putMcategory,
    updateMcategory,
    putAgree,
    getAlarmList,
    checkAlarm,
    isAlarm,
};

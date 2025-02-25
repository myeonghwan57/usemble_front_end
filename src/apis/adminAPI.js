import axios from "axios";
import qs from "qs";

function getMemberList(pageNo = 1) {
    return axios.get("/admin/memberList", { params: { pageNo: pageNo } });
}

function getSocialList(pageNo = 1) {
    return axios.get("/admin/socialList", { params: { pageNo: pageNo } });
}

function getReviewList(pageNo = 1) {
    return axios.get("/admin/reviewList", { params: { pageNo: pageNo } });
}
function writeNotice(notice) {
    return axios.post("/notice/write", notice);
}

function getNoticeList(pageNo = 1) {
    return axios.get("/admin/noticeList", { params: { pageNo: pageNo } });
}

function getNotice(nno) {
    return axios.get("/notice/read/" + nno);
}
function noticeUpdate(notice) {
    return axios.put("/notice/update", notice);
}
function noticeDelete(nno) {
    return axios.delete("notice/delete/" + nno);
}

function changeMemberState(member) {
    return axios.post("/admin/member/state", member);
}

function getMemberInfo(mid) {
    return axios.get("/admin/member/info?mid=" + mid);
}

function getMemberRecruitList(sPageNo, mid) {
    return axios.get("/admin/social/recruit?sPageNo=" + sPageNo + "&mid=" + mid);
}

function getMemberJoinList(jPageNo, mid) {
    return axios.get("/admin/social/join?jPageNo=" + jPageNo + "&mid=" + mid);
}

function getMemberReviewList(rPageNo, mid) {
    return axios.get("/admin/review?rPageNo=" + rPageNo + "&mid=" + mid);
}

function deleteReview(mid, sno) {
    return axios.delete("/admin/review/delete?mid=" + mid + "&sno=" + sno);
}

function updateSocialStatus(sno) {
    return axios.patch("/admin/social/cancel/" + sno);
}

function getMemberListSearch(pageNo, keyword, option) {
    return axios.get(
        "/admin/memberList/search?pageNo=" + pageNo + "&keyword=" + keyword + "&option=" + option
    );
}
function getSocialListSearch(pageNo, keyword, option) {
    return axios.get(
        "/admin/socialList/search?pageNo=" + pageNo + "&keyword=" + keyword + "&option=" + option
    );
}

function getMemberAll() {
    return axios.get("/admin/countAll");
}
function getSocialAll() {
    return axios.get("/admin/countAllSocial");
}
function getCategoryName() {
    return axios.get("/admin/getCateName");
}
function getNotices() {
    return axios.get("/admin/getNotice");
}
function getReview() {
    return axios.get("/admin/getReview");
}
export default {
    getMemberList,
    getSocialList,
    getReviewList,
    writeNotice,
    getNoticeList,
    getNotice,
    changeMemberState,
    getMemberInfo,
    getMemberRecruitList,
    getMemberJoinList,
    getMemberReviewList,
    deleteReview,
    updateSocialStatus,
    noticeUpdate,
    noticeDelete,
    getMemberListSearch,
    getSocialListSearch,
    getMemberAll,
    getSocialAll,
    getCategoryName,
    getNotices,
    getReview,
};

import axios from "axios";
import qs from "qs";

function writeSocial(formData) {
    return axios.post("/social/write", formData);
}

function getSocialList(pageNo, ctno, sort) {
    return axios.get("/social/list" + "?pageNo=" + pageNo + "&ctno=" + ctno + "&sort=" + sort);
}

function mainSocial() {
    return axios.get("/social/mainSocial");
}

function getSocial(sno) {
    return axios.get("/social/read/" + sno);
}

function getSjoinCnt(sno) {
    return axios.get("/social/sjoin/count/" + sno);
}

function deleteSocial(sno) {
    return axios.patch("/social/delete/" + sno);
}

function getSpayInfo(sno) {
    return axios.get("/social/pay/" + sno);
}

function joinSocial(sjoin) {
    return axios.post("/social/sjoin", sjoin);
}

function getSjoinState(mid, sno) {
    return axios.get("/social/sjoin/state?mid=" + mid + "&sno=" + sno);
}

function cancelSocialJoin(mid, sno) {
    return axios.delete("/social/sjoin/cancel?mid=" + mid + "&sno=" + sno);
}

function getJoinHistory(pageNo, mid) {
    return axios.get("/social/history/join?mid=" + mid + "&jPageNo=" + pageNo);
}

function getRecruitHistory(pageNo, mid) {
    return axios.get("/social/history/recruit?mid=" + mid + "&rPageNo=" + pageNo);
}

function getJoinMemberList(sno) {
    return axios.get("/social/sjoin/list/" + sno);
}

function isDeadline(sno) {
    return axios.get("/social/deadline/" + sno);
}

function refuseJoinMember(mid, sno) {
    return axios.delete("/social/sjoin/refuse?mid=" + mid + "&sno=" + sno);
}

function applyAssemble(mid) {
    return axios.get("/social/applyAssemble?mid=" + mid);
}

function recruitAssemble(mid) {
    return axios.get("/social/recruitAssemble?mid=" + mid);
}

function recruitedAssemble(mid) {
    return axios.get("/social/recruitedAssemble?mid=" + mid);
}

function mainCateSocial(mid) {
    return axios.get("/social/mainCateSocial?mid=" + mid);
}

function getSearchList(keyword, pageNo) {
    return axios.get("/social/search?", { params: { keyword: keyword, pageNo: pageNo } });
}

function inprogress(mid, pageNo, ctno, sort) {
    return axios.get(
        "/social/inprogress?mid=" + mid + "&pageNo=" + pageNo + "&ctno=" + ctno + "&sort=" + sort
    );
}

function progressed(mid, pageNo, ctno, sort) {
    return axios.get(
        "/social/progressed?mid=" + mid + "&pageNo=" + pageNo + "&ctno=" + ctno + "&sort=" + sort
    );
}
export default {
    writeSocial,
    getSocialList,
    mainSocial,
    getSocial,
    getSjoinCnt,
    deleteSocial,
    getSpayInfo,
    joinSocial,
    getSjoinState,
    cancelSocialJoin,
    getJoinHistory,
    getRecruitHistory,
    getJoinMemberList,
    isDeadline,
    refuseJoinMember,
    applyAssemble,
    recruitAssemble,
    mainCateSocial,
    getSearchList,
    recruitedAssemble,
    inprogress,
    progressed,
};

import axios from "axios";
import qs from "qs";

function imageUpload(formData) {
    return axios.post("/img/upload", formData);
}

function getNoticeList(pageNo) {
    return axios.get("/notice/list", { params: { pageNo: pageNo } });
}

function getNoticeDetail(nno) {
    return axios.get("/notice/read/" + nno);
}

export default {
    imageUpload,
    getNoticeList,
    getNoticeDetail,
};

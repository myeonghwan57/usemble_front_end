import axios from "axios";
import qs from "qs";

function writeReview(review) {
    return axios.post("/review/write", review);
}

function getIsReview(mid, sno) {
    return axios.get("/review/state?mid=" + mid + "&sno=" + sno);
}

function getReview(mid, sno) {
    return axios.get("/review/read?mid=" + mid + "&sno=" + sno);
}

function updateReview(review) {
    return axios.patch("/review/update", review);
}

function deleteReview(mid, sno) {
    return axios.delete("/review/delete?mid=" + mid + "&sno=" + sno);
}

function getRecieveReviewList(pageNo, mid) {
    return axios.get("/review/recieve?mid=" + mid + "&rPageNo=" + pageNo);
}

function getLeaveReviewList(pageNo, mid) {
    return axios.get("/review/leave?mid=" + mid + "&lPageNo=" + pageNo);
}

export default {
    writeReview,
    getIsReview,
    getReview,
    updateReview,
    deleteReview,
    getRecieveReviewList,
    getLeaveReviewList,
};

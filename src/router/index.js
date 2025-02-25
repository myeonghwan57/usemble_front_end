import { createRouter, createWebHistory } from "vue-router";
import { compile } from "vue";
import store from "../store";
import Home from "../views/Home";
import GuideList from "../views/FooterPage/GuideList.vue";
import NoticeList from "@/views/FooterPage/NoticeList.vue";
import NoticeDetail from "@/views/FooterPage/NoticeDetail.vue";
import PolicyPrivacy from "@/views/FooterPage/PolicyPrivacy.vue";
import PolicyUsage from "@/views/FooterPage/PolicyUsage.vue";
import NotFound from "@/views/NotFound.vue";
import SocialPage from "./SocialPage";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/guide",
        name: "guide",
        component: GuideList,
    },
    {
        path: "/notices",
        name: "notice",
        component: NoticeList,
    },
    {
        path: "/notices/detail",
        name: "noticeDetail",
        component: NoticeDetail,
    },
    {
        path: "/policy/privacy",
        name: "policyPrivacy",
        component: PolicyPrivacy,
    },
    {
        path: "/policy/usage",
        name: "policyUsage",
        component: PolicyUsage,
    },
    ...SocialPage,
    ...UserPage,
    ...AdminPage,
    //존재하지 않는 페이지 접근시 notFound 페이지 이동
    {
        path: "/:catchAll(.*)",
        name: "notFound",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return { ...savedPosition, behavior: "instant" };
        } else if (to.path != from.path) {
            // 항상 최상단으로 이동
            return { top: 0, behavior: "instant" };
        }
    },
});

//권한 확인
router.beforeEach((to, from, next) => {
    //유저 권한과 페이지 별 권한
    const mrole = store.state.mrole;
    const { authorization } = to.meta;

    //페이지에 권한이 존재한다면
    if (authorization) {
        //유저의 권한이 존재 안한다면 로그인
        if (mrole == "") {
            return next({ path: "/login" });
        }
        //권한이 맞지 않는다면 not-found 페이지로 이동
        if (authorization.length && !authorization.includes(mrole)) {
            return next({ path: "/:catchAll(.*)" });
        }
    }
    // 권한이 맞다면 페이지 이동
    next();
});

export default router;

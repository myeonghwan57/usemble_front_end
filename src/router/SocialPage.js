const routes = [
    {
        path: "/list",
        name: "list",
        component: () =>
            import(/* webpackChunkName: "SocialPage" */ "../views/SocialPage/SocialList.vue"),
    },
    {
        path: "/write",
        name: "socialWrite",
        meta: { authorization: ["ROLE_USER"] },
        component: () =>
            import(/* webpackChunkName: "SocialPage" */ "../views/SocialPage/WriteSocial.vue"),
    },
    {
        path: "/social/detail",
        name: "socialdetail",
        component: () =>
            import(/* webpackChunkName: "SocialPage" */ "../views/SocialPage/SocialDetail.vue"),
    },
    {
        path: "/social/payinfo",
        name: "socialpay",
        meta: { authorization: ["ROLE_USER"] },
        component: () =>
            import(/* webpackChunkName: "SocialPage" */ "../views/SocialPage/SocialPay.vue"),
    },
    {
        path: "/search",
        component: () => import(/* webpackChunkName: "SearchSocial" */ "@/views/SearchSocial"),
    },
];

export default routes;

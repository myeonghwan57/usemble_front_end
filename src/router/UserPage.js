const routes = [
    {
        path: "/user/info",
        name: "userInfo",
        component: () =>
            import(/* webpackChunkName: "UserPage" */ "../views/UserPage/UserInfoPage/UserInfo"),
    },
    {
        path: "/user/recruit",
        name: "userrecruit",
        component: () =>
            import(/* webpackChunkName: "UserPage" */ "../views/UserPage/UserInfoPage/UserRecruit"),
    },
    {
        path: "/user/recruited",
        name: "userrecruited",
        component: () =>
            import(
                /* webpackChunkName: "UserPage" */ "../views/UserPage/UserInfoPage/UserRecruited"
            ),
    },
    {
        path: "/login",
        name: "LoginForm",
        component: () =>
            import(/* webpackChunkName: "LoginPage" */ "@/views/UserPage/LoginPage/LoginForm"),
    },
    {
        path: "/findpassword",
        name: "Findpassword",
        component: () =>
            import(/* webpackChunkName: "LoginPage" */ "@/views/UserPage/LoginPage/FindPassword"),
    },
    {
        path: "/join",
        name: "Join",
        component: () => import(/* webpackChunkName: "Join" */ "@/views/UserPage/Join"),
    },
    {
        path: "/myPage",
        component: () => import(/* webpackChunkName: "MyPage" */ "@/views/UserPage/MyPage"),
        redirect: "/myPage/profileInfo",
        meta: { authorization: ["ROLE_USER"] },
        children: [
            {
                path: "profileInfo",
                component: () =>
                    import(/* webpackChunkName: "MyPage" */ "@/views/UserPage/MyPage/ProfileInfo"),
            },
            {
                path: "assembleHistory",
                component: () =>
                    import(
                        /* webpackChunkName: "MyPage" */ "@/views/UserPage/MyPage/AssembleHistory"
                    ),
            },
            {
                path: "assembleLike",
                component: () =>
                    import(/* webpackChunkName: "MyPage" */ "@/views/UserPage/MyPage/AssembleLike"),
            },
            {
                path: "privacyInfo",
                component: () =>
                    import(/* webpackChunkName: "MyPage" */ "@/views/UserPage/MyPage/PrivacyInfo"),
            },
            {
                path: "profileUpdate",
                component: () =>
                    import(
                        /* webpackChunkName: "MyPage" */ "@/views/UserPage/MyPage/ProfileUpdate"
                    ),
            },
            {
                path: "assembleReview",
                component: () =>
                    import(
                        /* webpackChunkName: "MyPage" */ "@/views/UserPage/MyPage/AssembleReview"
                    ),
            },
            {
                path: "passwordUpdate",
                component: () =>
                    import(
                        /* webpackChunkName: "MyPage" */ "@/views/UserPage/MyPage/PasswordUpdate"
                    ),
            },
            {
                path: "recruitmentStatus",
                component: () =>
                    import(
                        /* webpackChunkName: "MyPage" */ "@/views/UserPage/MyPage/RecruitmentStatus"
                    ),
            },
            {
                path: "alarm",
                component: () =>
                    import(/* webpackChunkName: "MyPage" */ "@/views/UserPage/MyPage/UserAlarm"),
            },
        ],
    },
];

export default routes;

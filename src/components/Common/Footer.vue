<template>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
    />
    <footer>
        <div id="inner">
            <div id="inner-left" style="margin-left: 50px">
                <div id="footer-header">
                    <RouterLink to="/notices" class="footer-message">공지사항</RouterLink>
                    <RouterLink to="/guide" class="footer-message">이용가이드</RouterLink>
                    <RouterLink to="/policy/usage" class="footer-message">이용약관</RouterLink>
                    <RouterLink to="/policy/privacy" class="footer-message"
                        >개인정보 처리방침</RouterLink
                    >
                </div>
                <div id="footer-content">
                    <div class="footer-contact">곽동현: dream@fun-coding.org</div>
                    <div class="footer-contact">김명환: dream@fun-coding.org</div>
                </div>
                <div id="footer-content">
                    <div class="footer-contact">김주희: dream@fun-coding.org</div>
                    <div class="footer-contact">김지혜: dream@fun-coding.org</div>
                </div>

                <div class="footer-copyright">Copyrigh 2024 All ⓒ rights reserved</div>
            </div>
            <div id="inner-right" style="margin-left: 180px">
                <div class="footer-message">고객센터</div>
                <div class="d-flex">
                    <i id="phone" class="bi bi-telephone-fill"></i>
                    <p>02-0000-0000</p>
                </div>
                <div id="sm-txt">운영시간 : 09:00 ~ 18:00</div>
                <div id="sm-txt">주말&공휴일 : 휴무</div>
            </div>
        </div>
    </footer>
</template>
<script setup></script>
<style scoped>
footer {
    border-top: 1px solid #e4e4e4;
    background-color: #f8f9f4;
    padding: 1rem 0;
    /* -------하단 고정------- */
    margin-top: auto;
}
#inner {
    display: flex;
    width: 70%;
    margin: 0 auto;
    /* justify-content: space-between; */
}

#footer-header {
    display: flex;
}
.footer-message {
    margin-right: 18px;
    font-weight: 800;
    font-size: 15px;
    color: #545e6f;
    margin-bottom: 0.3rem;
    text-decoration: none;
}
#footer-content {
    display: flex;
}
.footer-contact {
    margin-right: 18px;
    font-size: 0.9rem;
    color: #545e6f;
}
.footer-copyright {
    font-size: 0.9rem;
    color: #545e6f;
}
#phone {
    font-size: 12px;
    margin-top: 3px;
    margin-right: 10px;
}
#sm-txt {
    font-size: 12px;
}
</style>

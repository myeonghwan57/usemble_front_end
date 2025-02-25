<template>
    <div class="row mt-5 ms-auto me-auto" style="width: 70%">
        <h4>도움말</h4>
        <div class="col-6 mt-3 mb-5">
            <h5 class="mb-3">[공통] 어셈블 이용 FAQ</h5>
            <div class="accordion accordion-flush" id="accordionUse">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#usecollapse1"
                            aria-expanded="false"
                            aria-controls="usecollapse1"
                        >
                            Q. 어셈블이란?
                        </button>
                    </h2>
                    <div
                        id="usecollapse1"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionUse"
                    >
                        <div class="accordion-body body-info">
                            같은 취미를 가진 사람들과 연결해주는 서비스에요.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#usecollapse2"
                            aria-expanded="false"
                            aria-controls="usecollapse2"
                        >
                            Q. 비밀번호를 잃어버렸어요.
                        </button>
                    </h2>
                    <div
                        id="usecollapse2"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionUse"
                    >
                        <div class="accordion-body body-info">
                            로그인 : 로그인 화면 하단, '혹시, 비밀번호를 잊으셨나요' 클릭 후 안내에
                            따라 진행해주세요.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#usecollapse3"
                            aria-expanded="false"
                            aria-controls="usecollapse3"
                        >
                            Q. 회원탈퇴는 어떻게 하나요?
                        </button>
                    </h2>
                    <div
                        id="usecollapse3"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionUse"
                    >
                        <div class="accordion-body body-info">
                            <span
                                >어셈블 이용이 만족스러우시지 않으셨나요? 앞으로 더 좋은 서비스를
                                만들기 위해 노력하는 어셈블이 되겠습니다.</span
                            >
                            <span>회원정보에서 회원탈퇴를 진행하실 수 있습니다.</span>
                            <span>떠나시더라도 다시 어셈블하실 때를 기다리고 있겠습니다.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 mt-3 mb-5">
            <h5 class="mb-3">[작성자] 어셈블하기</h5>
            <div class="accordion accordion-flush" id="accordionMake">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#makecollapse1"
                            aria-expanded="false"
                            aria-controls="makecollapse1"
                        >
                            Q. 정기적으로 어셈블을 진행하고 싶은데 어떻게 하나요?
                        </button>
                    </h2>
                    <div
                        id="makecollapse1"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionMake"
                    >
                        <div class="accordion-body body-info">
                            아쉽게도 아직까지는 정기 어셈블 서비스는 제공하지 않고 있습니다.
                            정기적으로 작성자가 게시글을 작성해주셔야 합니다. 추후에 서비스를 추가할
                            예정입니다.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#makecollapse2"
                            aria-expanded="false"
                            aria-controls="makecollapse2"
                        >
                            Q. 만든 어셈블은 어디서 확인할 수 있나요?
                        </button>
                    </h2>
                    <div
                        id="makecollapse2"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionMake"
                    >
                        <div class="accordion-body body-info">
                            '마이페이지 - 내역 - 어셈블 내역'에서 확인하실 수 있습니다.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#makecollapse3"
                            aria-expanded="false"
                            aria-controls="makecollapse3"
                        >
                            Q. 만든 어셈블 내용을 변경하고 싶은데 어떻게 하나요?
                        </button>
                    </h2>
                    <div
                        id="makecollapse3"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionMake"
                    >
                        <div class="accordion-body body-info">
                            작성하신 어셈블 페이지 내에 수정 버튼을 클릭하시면 수정하실 수 있습니다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 mt-3">
            <h5 class="mb-3">[작성자] 어셈블 게스트 관리하기</h5>
            <div class="accordion accordion-flush" id="accordionManage">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#managecollapse1"
                            aria-expanded="false"
                            aria-controls="managecollapse1"
                        >
                            Q. 최소 모집인원이 있나요?
                        </button>
                    </h2>
                    <div
                        id="managecollapse1"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionManage"
                    >
                        <div class="accordion-body body-info">
                            최소인원은 호스트가 1명 또는 2명으로 선택 가능합니다. 단, 최소 인원을
                            1명으로 설정한 어셈블에 결과 알림일까지 초대 승인된 게스트가 1명일 때
                            초대 승인된 게스트가 1:1 진행을 원치 않을 경우 진행은 취소 됩니다.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#managecollapse2"
                            aria-expanded="false"
                            aria-controls="managecollapse2"
                        >
                            Q. 게스트에게 제 주소가 노출되나요?
                        </button>
                    </h2>
                    <div
                        id="managecollapse2"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionManage"
                    >
                        <div class="accordion-body body-info">
                            모집페이지에는 작성시 입력하셨던 주소가 노출되니 개인정보 유출에
                            유의해주시기 바랍니다.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#managecollapse3"
                            aria-expanded="false"
                            aria-controls="managecollapse3"
                        >
                            Q. 모집기간은 어떻게 되나요?
                        </button>
                    </h2>
                    <div
                        id="managecollapse3"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionManage"
                    >
                        <div class="accordion-body body-info">
                            모임 마감 전까지, 모집하실 수 있습니다.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#managecollapse4"
                            aria-expanded="false"
                            aria-controls="managecollapse4"
                        >
                            Q. 게스트가 동행자와 함께 오고 싶다고 하는데 어떻게 하죠?
                        </button>
                    </h2>
                    <div
                        id="managecollapse4"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionManage"
                    >
                        <div class="accordion-body body-info">
                            어셈블의 모든 신청은 개별적으로 진행되며 1개의 아이디 당 1명의 게스트만
                            신청할 수 있습니다. 따라서 게스트로부터 동행자가 있다는 연락을 받으실
                            경우, 별도로 신청을 안내해주시면 됩니다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 mt-3">
            <h5 class="mb-3">[참여자] 어셈블하기</h5>
            <div class="accordion accordion-flush" id="accordionJoin">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#joincollapse1"
                            aria-expanded="false"
                            aria-controls="joincollapse1"
                        >
                            Q. 지인 또는 가족과 함께 참여 하고 싶은데 가능한가요?
                        </button>
                    </h2>
                    <div
                        id="joincollapse1"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionJoin"
                    >
                        <div class="accordion-body body-info">
                            어셈블의 모든 방문 신청은 개별적으로 진행되며 1개의 아이디 당 1명의
                            게스트만 신청할 수 있어요. 지인 또는 가족과 동행을 원하실 경우, 별도로
                            회원가입 후 해당 어셈블에 신청해주셔야 해요. 이때 호스트가 방문신청서를
                            보고 어떤 분이 동행인지 알 수 있도록, 신청서에 동행자 성함을 적어 주시면
                            호스트가 참고하여 초대 여부를 결정해줄 거예요!
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#joincollapse2"
                            aria-expanded="false"
                            aria-controls="joincollapse2"
                        >
                            Q. 어셈블 신청 취소는 어떻게 하나요?
                        </button>
                    </h2>
                    <div
                        id="joincollapse2"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionJoin"
                    >
                        <div class="accordion-body body-info">
                            어셈블 '마이페이지 - 내역 - 신청내역'에서 신청한 어셈블 '취소하기'를
                            누르면 신청/결제가 취소됩니다. 결재액은 카드사에 따라 3-7일 내외로
                            결제한 카드로 환불 정책에 따라 환불됩니다.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#joincollapse3"
                            aria-expanded="false"
                            aria-controls="joincollapse3"
                        >
                            Q. 환불규정은 어떻게 되나요?
                        </button>
                    </h2>
                    <div
                        id="joincollapse3"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionJoin"
                    >
                        <div class="accordion-body body-info">
                            어셈블의 게스트 환불 규정은 아래와 같습니다. 신청 전 반드시 확인
                            부탁드려요.
                            <strong>환불 규정</strong> ∙ 초대 승인 전까지 취소 시 전액 환불 처리
                            됩니다. ∙ 초대 승인된 어셈블 취소 시, 어셈블 방문 6일 전까지 결제액 전액
                            환불됩니다. (자정 기준) ∙ 초대 승인된 어셈블 취소 시, 방문 5일~2일
                            전까지는 결제액의 30%가 환불됩니다. (자정 기준) ∙ 어셈블 방문 1일
                            전~방문 당일 및 노쇼인 경우에는 환불이 불가합니다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
h3,
h4,
h5 {
    font-weight: bold;
}

.accordion-button {
    font-weight: 400;
    font-size: 16px;
}

.body-info {
    font-size: 14px;
    font-weight: 400;
}

.accordion-body {
    background-color: #efefef;
    border-bottom: 1px solid;
    border-bottom-color: #c5c1c0;
}

.accordion-button {
    border-bottom: 1px solid;
    border-bottom-color: #c5c1c0;
}

.accordion-item {
    border: none;
}

.accordion-button:focus {
    box-shadow: none;
    /* font-weight: bold; */
}

.accordion-button:not(.collapsed) {
    background-color: transparent;
    font-weight: bold;
}
</style>

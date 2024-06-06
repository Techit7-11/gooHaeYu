/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/api/post-comment/{postId}/comment/{commentId}": {
    /** 댓글 수정 */
    put: operations["modify"];
    /** 댓글 삭제 */
    delete: operations["delete"];
  };
  "/api/notification/{id}": {
    /** 알림 읽음 처리 */
    put: operations["read"];
  };
  "/api/members/image": {
    /** 프로필 이미지 변경 */
    put: operations["updateMemberImage"];
  };
  "/api/member": {
    /** 내 정보 조회 */
    get: operations["detailMember"];
    /** 내 정보 수정 */
    put: operations["modifyMember"];
  };
  "/api/member/social": {
    /** 최초 소셜로그인 - 필수 회원정보 입력 */
    put: operations["updateSocialMember"];
  };
  "/api/job-posts/{id}": {
    /** 구인공고 단건 조회 */
    get: operations["showDetailPost"];
    /** 구인공고 수정 */
    put: operations["modifyPost"];
    /** 구인공고 삭제 */
    delete: operations["deleteJobPost"];
  };
  "/api/job-posts/{id}/closing": {
    /** 조기 마감 */
    put: operations["postEarlyClosing"];
  };
  "/api/chat/{roomId}": {
    /** 채팅방 입장 */
    get: operations["showRoom"];
    /** 채팅방 퇴장 */
    put: operations["exitsRoom"];
  };
  "/api/applications/{id}": {
    /** 지원서 상세 내용 */
    get: operations["detailApplication"];
    /** 지원서 수정 */
    put: operations["modifyApplication"];
    /** 지원서 작성 */
    post: operations["writeApplication"];
    /** 지원서 삭제 */
    delete: operations["deleteApplication"];
  };
  "/batch": {
    post: operations["runBatch"];
  };
  "/api/post-comment/{postId}/comment": {
    /** 댓글 작성 */
    post: operations["write"];
  };
  "/api/payments": {
    /** 결제 요청 */
    post: operations["requestTossPayments"];
  };
  "/api/payments/cancel": {
    /** 결제 취소 */
    post: operations["tossPaymentCancel"];
  };
  "/api/notification/register": {
    post: operations["register"];
  };
  "/api/member/review/{jobPostingId}": {
    /** 지원자 리뷰 작성 */
    post: operations["createReview"];
  };
  "/api/member/logout": {
    /** 로그아웃 처리 및 쿠키 삭제 */
    post: operations["logout"];
  };
  "/api/member/login": {
    /** 로그인, accessToken, refreshToken 쿠키 생성됨 */
    post: operations["login"];
  };
  "/api/member/join": {
    /** 회원가입 */
    post: operations["join"];
  };
  "/api/job-posts": {
    /** 구인공고 글 목록 가져오기 */
    get: operations["findAllPost"];
    /** 구인공고 작성 */
    post: operations["writePost"];
  };
  "/api/job-posts/{id}/interest": {
    /** 구인공고 관심 등록 */
    post: operations["interest"];
    /** 구인공고 관심 제거 */
    delete: operations["disinterest"];
  };
  "/api/chat/{roomId}/message": {
    /** 채팅 메세지 로드 */
    get: operations["writeChat_1"];
    /** 채팅 생성 */
    post: operations["writeChat"];
  };
  "/api/auth/email": {
    /** 인증 메일 전송 */
    post: operations["sendAuthEmail"];
  };
  "/api/members/verify/{code}": {
    /** 인증코드 확인 */
    patch: operations["verifyCode"];
  };
  "/api/jobs/individual/no-work/{applicationId}": {
    /** 개인 지급 알바 미완료 처리 */
    patch: operations["cancelIndividualNoWork"];
  };
  "/api/jobs/complete/{applicationId}/manually": {
    /** 구인자가 수동으로 알바완료 처리 */
    patch: operations["completeJobManually"];
  };
  "/api/employ/{postId}/{applicationIds}": {
    /** 지원서 승인 */
    patch: operations["approve"];
  };
  "/ready": {
    /** 배포한 애플리케이션의 준비 상태를 확인 */
    get: operations["isReady"];
  };
  "/member/socialLogin/{providerTypeCode}": {
    /** 소셜 로그인 */
    get: operations["socialLogin"];
  };
  "/api/post-comment/{postId}": {
    /** 해당 공고에 달린 댓글 목록 */
    get: operations["findByPostId"];
  };
  "/api/payments/{applicationId}": {
    /** 결제정보 가져오기 */
    get: operations["getPaymentKey"];
  };
  "/api/payments/success": {
    /** 결제 성공 */
    get: operations["tossPaymentSuccess"];
  };
  "/api/payments/fail": {
    /** 결제 실패 */
    get: operations["tossPaymentFail"];
  };
  "/api/notification": {
    /** 유저 별 알림리스트 */
    get: operations["getList"];
  };
  "/api/notification/new": {
    /** 읽지 않은 알림 유무 확인 */
    get: operations["unreadNotification"];
  };
  "/api/members/image/{username}": {
    /** 아이디로 프로필 이미지 URL 불러오기 */
    get: operations["getMemberImageByUsername"];
  };
  "/api/members/image/posts/{postId}": {
    /** 공고번호로 작성자의 프로필 이미지 URL 불러오기 */
    get: operations["getMemberImageByPostId"];
  };
  "/api/member/review": {
    /** 나의 전체 리뷰 조회 */
    get: operations["getAllReviews"];
  };
  "/api/member/review/{id}": {
    /** 리뷰 단건 조회 */
    get: operations["getReviewById"];
    /** 리뷰 삭제 */
    delete: operations["deleteReview"];
  };
  "/api/member/myposts": {
    /** 내 공고 조회 */
    get: operations["detailMyPosts"];
  };
  "/api/member/myinterest": {
    /** 내 관심 공고 조회 */
    get: operations["detailMyInterestingPosts"];
  };
  "/api/member/mycomments": {
    /** 내 댓글 조회 */
    get: operations["detailMyComments"];
  };
  "/api/member/myapplications": {
    /** 내 지원서 조회 */
    get: operations["detailMyApplications"];
  };
  "/api/job-posts/{id}/members/interest": {
    /** 로그인한 유저의 해당 구인공고 관심 등록 여부 */
    get: operations["isInterested"];
  };
  "/api/job-posts/sort": {
    /** 구인공고 글 목록 정렬 */
    get: operations["findAllPostSort"];
  };
  "/api/job-posts/search": {
    /** 게시물 검색 */
    get: operations["searchJobPostsByTitleAndBody"];
  };
  "/api/job-posts/search-sort": {
    /** 구인공고 검색 */
    get: operations["postSearchAndSort"];
  };
  "/api/employ/{postId}": {
    /** 공고 별 지원리스트 */
    get: operations["getList_1"];
  };
  "/api/chat": {
    /** 채팅방 목록 */
    get: operations["showRoomList"];
  };
  "/": {
    get: operations["showMain"];
  };
  "/api/notification/read": {
    /** 읽은 알림 전부 삭제 */
    delete: operations["deleteReadAll"];
  };
  "/api/notification/all": {
    /** 알림 전부 삭제 */
    delete: operations["deleteAll"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Register: {
      content: string;
    };
    ApiResponseEmpty: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["Empty"];
    };
    Empty: Record<string, never>;
    Modify: {
      /** @enum {string} */
      gender?: "MALE" | "FEMALE" | "UNDEFINED";
      location?: string;
      /** Format: date */
      birth?: string;
      password?: string;
    };
    SocialProfileForm: {
      name: string;
      phoneNumber: string;
      /** @enum {string} */
      gender?: "MALE" | "FEMALE" | "UNDEFINED";
      location: string;
      /** Format: date */
      birth: string;
    };
    ApiResponseMemberDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["MemberDto"];
    };
    MemberDto: {
      /** Format: int64 */
      id: number;
      username: string;
      /** @enum {string} */
      gender?: "MALE" | "FEMALE" | "UNDEFINED";
      location: string;
      /** Format: date */
      birth?: string;
      name: string;
      phoneNumber: string;
      email: string;
      authenticated?: boolean;
      profileImageUrl?: string;
    };
    ApiResponseModify: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["Modify"];
    };
    ApiResponseRegister: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["Register"];
    };
    PaymentReqDto: {
      /** @enum {string} */
      payStatus: "REQUEST" | "CARD" | "EASY_PAY";
      /** Format: int64 */
      amount: number;
      orderId?: string;
      orderName?: string;
      /** Format: int64 */
      applicationId?: number;
    };
    ApiResponsePaymentResDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["PaymentResDto"];
    };
    PaymentResDto: {
      /** @enum {string} */
      payStatus: "REQUEST" | "CARD" | "EASY_PAY";
      /** Format: int64 */
      amount: number;
      orderId: string;
      orderName: string;
      payer: string;
      successUrl?: string;
      failUrl?: string;
      failReason?: string;
      canceled?: boolean;
      cancelReason?: string;
    };
    ApiResponsePaymentCancelResDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["PaymentCancelResDto"];
    };
    PaymentCancelResDto: {
      /** Format: int32 */
      cancelAmount?: number;
      transactionKey?: string;
      canceledAt?: string;
    };
    ApplicantReviewDto: {
      /** Format: int64 */
      id?: number;
      body?: string;
      /** Format: double */
      score?: number;
      /** Format: int64 */
      jobPostingId?: number;
      /** Format: int64 */
      applicantId?: number;
    };
    ApiResponseApplicantReviewDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["ApplicantReviewDto"];
    };
    LoginForm: {
      username: string;
      password: string;
    };
    JoinForm: {
      username: string;
      password: string;
      name: string;
      phoneNumber: string;
      email: string;
      /** @enum {string} */
      gender?: "MALE" | "FEMALE" | "UNDEFINED";
      location: string;
      /** Format: date */
      birth: string;
    };
    ApiResponseJoinForm: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["JoinForm"];
    };
    ApiResponseListCommentDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["CommentDto"][];
    };
    CommentDto: {
      /** Format: int64 */
      id: number;
      /** Format: int64 */
      jobPostId: number;
      author: string;
      content: string;
      authorProfileImageUrl?: string;
      /** Format: date-time */
      createAt: string;
      /** Format: date-time */
      modifyAt: string;
    };
    ApiResponsePaymentDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["PaymentDto"];
    };
    PaymentDto: {
      paymentKey?: string;
      /** Format: int64 */
      totalAmount?: number;
      orderName?: string;
      paid?: boolean;
      canceled?: boolean;
      /** Format: int64 */
      applicationId?: number;
      payStatus?: string;
    };
    ApiResponsePaymentSuccessDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["PaymentSuccessDto"];
    };
    PaymentSuccessDto: {
      paymentKey?: string;
      orderId?: string;
      /** Format: int64 */
      applicationId?: number;
      orderName?: string;
      method?: string;
      /** Format: int32 */
      totalAmount?: number;
      approvedAt?: string;
      card?: components["schemas"]["SuccessCardDto"];
      easyPay?: components["schemas"]["SuccessEasyPayDto"];
    };
    SuccessCardDto: {
      company?: string;
      number?: string;
      installmentPlanMonths?: string;
      isInterestFree?: string;
      approveNo?: string;
      useCardPoint?: string;
      cardType?: string;
      acquireStatus?: string;
    };
    SuccessEasyPayDto: {
      provider?: string;
      /** Format: int32 */
      amount?: number;
      /** Format: int32 */
      discountAmount?: number;
    };
    ApiResponsePaymentFailDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["PaymentFailDto"];
    };
    PaymentFailDto: {
      errorCode?: string;
      errorMessage?: string;
      orderId?: string;
    };
    ApiResponseListNotificationDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["NotificationDto"][];
    };
    NotificationDto: {
      /** Format: int64 */
      id?: number;
      createAt?: string;
      toMember?: string;
      fromMember?: string;
      relPostTitle?: string;
      /** @enum {string} */
      causeTypeCode?: "POST_MODIFICATION" | "POST_DELETED" | "POST_INTERESTED" | "POST_DEADLINE" | "COMMENT_CREATED" | "APPLICATION_CREATED" | "APPLICATION_MODIFICATION" | "APPLICATION_APPROVED" | "APPLICATION_UNAPPROVE" | "CHATROOM_CREATED" | "CALCULATE_PAYMENT";
      /** @enum {string} */
      resultTypeCode?: "NOTICE" | "DELETE" | "APPROVE";
      seen?: boolean;
      url?: string;
    };
    ApiResponseBoolean: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: boolean;
    };
    ApiResponseString: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: string;
    };
    ApiResponseListApplicantReviewDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["ApplicantReviewDto"][];
    };
    ApiResponseListJobPostDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["JobPostDto"][];
    };
    JobPostDto: {
      /** Format: int64 */
      id: number;
      author: string;
      title: string;
      location: string;
      /** Format: int64 */
      commentsCount: number;
      /** Format: int64 */
      incrementViewCount: number;
      /** Format: int64 */
      interestsCount: number;
      createdAt: string;
      employed: boolean;
      /** Format: date */
      deadLine?: string;
      /** Format: date */
      jobStartDate?: string;
      closed?: boolean;
    };
    ApiResponseListApplicationDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["ApplicationDto"][];
    };
    ApplicationDto: {
      /** Format: int64 */
      id: number;
      jobPostAuthorUsername: string;
      /** Format: int64 */
      jobPostId: number;
      jobPostName: string;
      author: string;
      body: string;
      name: string;
      /** Format: date */
      birth: string;
      phone: string;
      location: string;
      wageStatus: string;
      wagePaymentMethod: string;
      /** Format: int32 */
      wages: number;
      /** Format: date-time */
      createdAt?: string;
      approve?: boolean;
    };
    ApiResponseJobPostDetailDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["JobPostDetailDto"];
    };
    JobPostDetailDto: {
      /** Format: int64 */
      id: number;
      author: string;
      title: string;
      location: string;
      /** Format: int64 */
      commentsCount: number;
      /** Format: int64 */
      incrementViewCount: number;
      /** Format: int64 */
      interestsCount: number;
      createdAt: string;
      employed: boolean;
      /** Format: date */
      deadLine?: string;
      /** Format: date */
      jobStartDate?: string;
      body: string;
      /** Format: int64 */
      applicationCount?: number;
      /** Format: int32 */
      minAge?: number;
      /** @enum {string} */
      gender?: "MALE" | "FEMALE" | "UNDEFINED";
      modifiedAt?: string;
      interestedUsernames?: string[];
      /** Format: int32 */
      workTime?: number;
      /** Format: int32 */
      workDays?: number;
      /** Format: int32 */
      cost?: number;
      /** @enum {string} */
      payBasis?: "UNDEFINED" | "TOTAL_HOURS" | "TOTAL_DAYS";
      /** @enum {string} */
      wagePaymentMethod?: "UNDEFINED" | "INDIVIDUAL_PAYMENT" | "SERVICE_PAYMENT";
      closed?: boolean;
    };
    ApiResponseGetPostsResponseBody: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["GetPostsResponseBody"];
    };
    GetPostsResponseBody: {
      itemPage: components["schemas"]["PageDtoJobPostDto"];
    };
    PageDtoJobPostDto: {
      /** Format: int64 */
      totalElementsCount: number;
      /** Format: int64 */
      pageElementsCount: number;
      /** Format: int64 */
      totalPagesCount: number;
      /** Format: int32 */
      number: number;
      content: components["schemas"]["JobPostDto"][];
    };
    ApiResponseListRoomListDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["RoomListDto"][];
    };
    RoomListDto: {
      /** Format: int64 */
      roomId?: number;
      username1?: string;
      username2?: string;
      lastChat?: string;
      lastChatDate?: string;
    };
    ApiResponseRoomDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["RoomDto"];
    };
    Message: {
      /** Format: int64 */
      id?: number;
      room?: components["schemas"]["Room"];
      sender?: string;
      content?: string;
      /** Format: date-time */
      createdAt?: string;
    };
    Room: {
      /** Format: int64 */
      id?: number;
      username1?: string;
      username2?: string;
      /** Format: date-time */
      user1Enter?: string;
      /** Format: date-time */
      user2Enter?: string;
      user1HasExit?: boolean;
      user2HasExit?: boolean;
    };
    RoomDto: {
      username1?: string;
      username2?: string;
      messages?: components["schemas"]["Message"][];
    };
    ApiResponseListMessageDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["MessageDto"][];
    };
    MessageDto: {
      /** Format: int64 */
      id?: number;
      sender: string;
      text: string;
      createdAt?: string;
    };
    ApiResponseApplicationDto: {
      /** Format: int32 */
      statusCode?: number;
      message: string;
      /** @enum {string} */
      resultType: "SUCCESS" | "VALIDATION_EXCEPTION" | "CUSTOM_EXCEPTION";
      errorCode?: string;
      data: components["schemas"]["ApplicationDto"];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** 댓글 수정 */
  modify: {
    parameters: {
      path: {
        postId: number;
        commentId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Register"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
    };
  };
  /** 댓글 삭제 */
  delete: {
    parameters: {
      path: {
        postId: number;
        commentId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
    };
  };
  /** 알림 읽음 처리 */
  read: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
    };
  };
  /** 프로필 이미지 변경 */
  updateMemberImage: {
    requestBody?: {
      content: {
        "application/json": {
          /** Format: binary */
          profileImageFile?: string;
        };
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 내 정보 조회 */
  detailMember: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseMemberDto"];
        };
      };
    };
  };
  /** 내 정보 수정 */
  modifyMember: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Modify"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 최초 소셜로그인 - 필수 회원정보 입력 */
  updateSocialMember: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["SocialProfileForm"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseMemberDto"];
        };
      };
    };
  };
  /** 구인공고 단건 조회 */
  showDetailPost: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseJobPostDetailDto"];
        };
      };
    };
  };
  /** 구인공고 수정 */
  modifyPost: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Modify"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseModify"];
        };
      };
    };
  };
  /** 구인공고 삭제 */
  deleteJobPost: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
    };
  };
  /** 조기 마감 */
  postEarlyClosing: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 채팅방 입장 */
  showRoom: {
    parameters: {
      path: {
        roomId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseRoomDto"];
        };
      };
    };
  };
  /** 채팅방 퇴장 */
  exitsRoom: {
    parameters: {
      path: {
        roomId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 지원서 상세 내용 */
  detailApplication: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseApplicationDto"];
        };
      };
    };
  };
  /** 지원서 수정 */
  modifyApplication: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Modify"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 지원서 작성 */
  writeApplication: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Register"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 지원서 삭제 */
  deleteApplication: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  runBatch: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": string;
        };
      };
    };
  };
  /** 댓글 작성 */
  write: {
    parameters: {
      path: {
        postId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Register"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseRegister"];
        };
      };
    };
  };
  /** 결제 요청 */
  requestTossPayments: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["PaymentReqDto"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponsePaymentResDto"];
        };
      };
    };
  };
  /** 결제 취소 */
  tossPaymentCancel: {
    parameters: {
      query: {
        paymentKey: string;
        cancelReason: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponsePaymentCancelResDto"];
        };
      };
    };
  };
  register: {
    requestBody: {
      content: {
        "application/json": string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
    };
  };
  /** 지원자 리뷰 작성 */
  createReview: {
    parameters: {
      path: {
        jobPostingId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ApplicantReviewDto"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseApplicantReviewDto"];
        };
      };
    };
  };
  /** 로그아웃 처리 및 쿠키 삭제 */
  logout: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": Record<string, never>;
        };
      };
    };
  };
  /** 로그인, accessToken, refreshToken 쿠키 생성됨 */
  login: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginForm"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseMemberDto"];
        };
      };
    };
  };
  /** 회원가입 */
  join: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["JoinForm"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseJoinForm"];
        };
      };
    };
  };
  /** 구인공고 글 목록 가져오기 */
  findAllPost: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseListJobPostDto"];
        };
      };
    };
  };
  /** 구인공고 작성 */
  writePost: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Register"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseRegister"];
        };
      };
    };
  };
  /** 구인공고 관심 등록 */
  interest: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 구인공고 관심 제거 */
  disinterest: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 채팅 메세지 로드 */
  writeChat_1: {
    parameters: {
      path: {
        roomId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseListMessageDto"];
        };
      };
    };
  };
  /** 채팅 생성 */
  writeChat: {
    parameters: {
      path: {
        roomId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Register"];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 인증 메일 전송 */
  sendAuthEmail: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 인증코드 확인 */
  verifyCode: {
    parameters: {
      path: {
        code: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 개인 지급 알바 미완료 처리 */
  cancelIndividualNoWork: {
    parameters: {
      path: {
        applicationId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 구인자가 수동으로 알바완료 처리 */
  completeJobManually: {
    parameters: {
      path: {
        applicationId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 지원서 승인 */
  approve: {
    parameters: {
      path: {
        postId: number;
        applicationIds: number[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseEmpty"];
        };
      };
    };
  };
  /** 배포한 애플리케이션의 준비 상태를 확인 */
  isReady: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": string;
        };
      };
    };
  };
  /** 소셜 로그인 */
  socialLogin: {
    parameters: {
      query: {
        redirectUrl: string;
      };
      path: {
        providerTypeCode: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": string;
        };
      };
    };
  };
  /** 해당 공고에 달린 댓글 목록 */
  findByPostId: {
    parameters: {
      path: {
        postId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseListCommentDto"];
        };
      };
    };
  };
  /** 결제정보 가져오기 */
  getPaymentKey: {
    parameters: {
      path: {
        applicationId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponsePaymentDto"];
        };
      };
    };
  };
  /** 결제 성공 */
  tossPaymentSuccess: {
    parameters: {
      query: {
        paymentKey: string;
        orderId: string;
        amount: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponsePaymentSuccessDto"];
        };
      };
    };
  };
  /** 결제 실패 */
  tossPaymentFail: {
    parameters: {
      query: {
        code: string;
        message: string;
        orderId: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponsePaymentFailDto"];
        };
      };
    };
  };
  /** 유저 별 알림리스트 */
  getList: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseListNotificationDto"];
        };
      };
    };
  };
  /** 읽지 않은 알림 유무 확인 */
  unreadNotification: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseBoolean"];
        };
      };
    };
  };
  /** 아이디로 프로필 이미지 URL 불러오기 */
  getMemberImageByUsername: {
    parameters: {
      path: {
        username: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseString"];
        };
      };
    };
  };
  /** 공고번호로 작성자의 프로필 이미지 URL 불러오기 */
  getMemberImageByPostId: {
    parameters: {
      path: {
        postId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseString"];
        };
      };
    };
  };
  /** 나의 전체 리뷰 조회 */
  getAllReviews: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseListApplicantReviewDto"];
        };
      };
    };
  };
  /** 리뷰 단건 조회 */
  getReviewById: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseApplicantReviewDto"];
        };
      };
    };
  };
  /** 리뷰 삭제 */
  deleteReview: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseString"];
        };
      };
    };
  };
  /** 내 공고 조회 */
  detailMyPosts: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseListJobPostDto"];
        };
      };
    };
  };
  /** 내 관심 공고 조회 */
  detailMyInterestingPosts: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseListJobPostDto"];
        };
      };
    };
  };
  /** 내 댓글 조회 */
  detailMyComments: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseListCommentDto"];
        };
      };
    };
  };
  /** 내 지원서 조회 */
  detailMyApplications: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseListApplicationDto"];
        };
      };
    };
  };
  /** 로그인한 유저의 해당 구인공고 관심 등록 여부 */
  isInterested: {
    parameters: {
      path: {
        id: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseBoolean"];
        };
      };
    };
  };
  /** 구인공고 글 목록 정렬 */
  findAllPostSort: {
    parameters: {
      query?: {
        page?: number;
        sortBy?: string[];
        sortOrder?: string[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseGetPostsResponseBody"];
        };
      };
    };
  };
  /** 게시물 검색 */
  searchJobPostsByTitleAndBody: {
    parameters: {
      query?: {
        titleOrBody?: string;
        title?: string;
        body?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseListJobPostDto"];
        };
      };
    };
  };
  /** 구인공고 검색 */
  postSearchAndSort: {
    parameters: {
      query?: {
        page?: number;
        kw?: string;
        kwType?: string[];
        closed?: string;
        gender?: string;
        min_Age?: number[];
        location?: string[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseGetPostsResponseBody"];
        };
      };
    };
  };
  /** 공고 별 지원리스트 */
  getList_1: {
    parameters: {
      path: {
        postId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseListApplicationDto"];
        };
      };
    };
  };
  /** 채팅방 목록 */
  showRoomList: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["ApiResponseListRoomListDto"];
        };
      };
    };
  };
  showMain: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": string;
        };
      };
    };
  };
  /** 읽은 알림 전부 삭제 */
  deleteReadAll: {
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
    };
  };
  /** 알림 전부 삭제 */
  deleteAll: {
    responses: {
      /** @description OK */
      200: {
        content: never;
      };
    };
  };
}

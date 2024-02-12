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
  "/api/employ/{postId}/{applicationIds}": {
    /** 지원서 승인 */
    put: operations["approve"];
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
  "/api/post-comment/{postId}/comment": {
    /** 댓글 작성 */
    post: operations["write"];
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
    post: operations["increase"];
    /** 구인공고 관심 제거 */
    delete: operations["disinterest"];
  };
  "/member/socialLogin/{providerTypeCode}": {
    /** 소셜 로그인 */
    get: operations["socialLogin"];
  };
  "/api/post-comment/{postId}": {
    /** 해당 공고에 달린 댓글 목록 */
    get: operations["findByPostId"];
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
  "/api/job-posts/sort": {
    /** 구인공고 글 목록 정렬 */
    get: operations["findAllPostSort"];
  };
  "/api/job-posts/search": {
    /** 게시물 검색 */
    get: operations["searchJobPostsByTitleAndBody"];
  };
  "/api/employ/{postId}": {
    /** 공고 별 지원리스트 */
    get: operations["getList"];
  };
  "/": {
    get: operations["showMain"];
  };
  "/api/job-posts/{id}/deadline": {
    /** 공고 마감 */
    delete: operations["deadline"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Register: {
      content: string;
    };
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
    MemberDto: {
      /** Format: int64 */
      id: number;
      username: string;
      /** @enum {string} */
      gender?: "MALE" | "FEMALE" | "UNDEFINED";
      location?: string;
      /** Format: date */
      birth?: string;
      name?: string;
      phoneNumber?: string;
    };
    RsDataMemberDto: {
      resultCode?: string;
      /** Format: int32 */
      statusCode?: number;
      msg?: string;
      data?: components["schemas"]["MemberDto"];
    };
    RsDataURI: {
      resultCode?: string;
      /** Format: int32 */
      statusCode?: number;
      msg?: string;
      /** Format: uri */
      data?: string;
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
      /** @enum {string} */
      gender?: "MALE" | "FEMALE" | "UNDEFINED";
      location: string;
      /** Format: date */
      birth: string;
    };
    RsDataJoinForm: {
      resultCode?: string;
      /** Format: int32 */
      statusCode?: number;
      msg?: string;
      data?: components["schemas"]["JoinForm"];
    };
    CommentDto: {
      /** Format: int64 */
      id: number;
      /** Format: int64 */
      jobPostId: number;
      author: string;
      content: string;
      /** Format: date-time */
      createAt: string;
      /** Format: date-time */
      modifyAt: string;
    };
    RsDataListCommentDto: {
      resultCode?: string;
      /** Format: int32 */
      statusCode?: number;
      msg?: string;
      data?: components["schemas"]["CommentDto"][];
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
      /** Format: date */
      deadLine?: string;
      createdAt: string;
      closed?: boolean;
    };
    RsDataListJobPostDto: {
      resultCode?: string;
      /** Format: int32 */
      statusCode?: number;
      msg?: string;
      data?: components["schemas"]["JobPostDto"][];
    };
    ApplicationDto: {
      /** Format: int64 */
      id: number;
      /** Format: int64 */
      jobPostId: number;
      jobPostName: string;
      author: string;
      /** Format: int64 */
      postId: number;
      body: string;
      /** Format: date-time */
      createdAt?: string;
      approve?: boolean;
    };
    RsDataListApplicationDto: {
      resultCode?: string;
      /** Format: int32 */
      statusCode?: number;
      msg?: string;
      data?: components["schemas"]["ApplicationDto"][];
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
      /** Format: date */
      deadLine?: string;
      createdAt: string;
      body: string;
      /** Format: int64 */
      applicationCount?: number;
      /** Format: int64 */
      interestsCount?: number;
      /** Format: int32 */
      minAge?: number;
      /** @enum {string} */
      gender?: "MALE" | "FEMALE" | "UNDEFINED";
      modifyAt?: string;
      closed?: boolean;
    };
    RsDataJobPostDetailDto: {
      resultCode?: string;
      /** Format: int32 */
      statusCode?: number;
      msg?: string;
      data?: components["schemas"]["JobPostDetailDto"];
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
    RsDataGetPostsResponseBody: {
      resultCode?: string;
      /** Format: int32 */
      statusCode?: number;
      msg?: string;
      data?: components["schemas"]["GetPostsResponseBody"];
    };
    RsDataApplicationDto: {
      resultCode?: string;
      /** Format: int32 */
      statusCode?: number;
      msg?: string;
      data?: components["schemas"]["ApplicationDto"];
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
        arg1: number;
        arg2: number;
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
  /** 내 정보 조회 */
  detailMember: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["RsDataMemberDto"];
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
        content: never;
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
          "*/*": components["schemas"]["RsDataMemberDto"];
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
          "*/*": components["schemas"]["RsDataJobPostDetailDto"];
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
        content: never;
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
  /** 지원서 승인 */
  approve: {
    parameters: {
      path: {
        arg1: number;
        arg2: number[];
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: never;
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
          "*/*": components["schemas"]["RsDataApplicationDto"];
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
        content: never;
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
          "*/*": components["schemas"]["RsDataURI"];
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
        content: never;
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
          "*/*": components["schemas"]["RsDataURI"];
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
          "*/*": components["schemas"]["RsDataMemberDto"];
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
          "*/*": components["schemas"]["RsDataJoinForm"];
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
          "*/*": components["schemas"]["RsDataListJobPostDto"];
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
          "*/*": components["schemas"]["RsDataURI"];
        };
      };
    };
  };
  /** 구인공고 관심 등록 */
  increase: {
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
        content: never;
      };
    };
  };
  /** 소셜 로그인 */
  socialLogin: {
    parameters: {
      query: {
        arg0: string;
      };
      path: {
        arg1: string;
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
        arg0: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["RsDataListCommentDto"];
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
          "*/*": components["schemas"]["RsDataListJobPostDto"];
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
          "*/*": components["schemas"]["RsDataListJobPostDto"];
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
          "*/*": components["schemas"]["RsDataListCommentDto"];
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
          "*/*": components["schemas"]["RsDataListApplicationDto"];
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
          "*/*": components["schemas"]["RsDataGetPostsResponseBody"];
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
          "*/*": components["schemas"]["JobPostDto"][];
        };
      };
    };
  };
  /** 공고 별 지원리스트 */
  getList: {
    parameters: {
      path: {
        arg1: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "*/*": components["schemas"]["RsDataListApplicationDto"];
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
  /** 공고 마감 */
  deadline: {
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
}

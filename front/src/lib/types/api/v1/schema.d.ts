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
  "/api/job-posts/{id}": {
    /** 구인공고 단건 조회 */
    get: operations["showDetailPost"];
    /** 구인공고 수정 */
    put: operations["modifyPost"];
    /** 구인공고 삭제 */
    delete: operations["deletePost"];
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
  "/api/member/login": {
    /** 로그인 */
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
  "/api/post-comment/{postId}": {
    /** 해당 공고에 달린 댓글 목록 */
    get: operations["findByPostId"];
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
      gender?: "MALE" | "FEMALE";
      location?: string;
      /** Format: date */
      birth?: string;
    };
    LoginForm: {
      username: string;
      password: string;
    };
    JoinForm: {
      username: string;
      password: string;
    };
    CommentDto: {
      /** Format: int64 */
      id?: number;
      /** Format: int64 */
      jobPostId?: number;
      author?: string;
      content?: string;
      /** Format: date-time */
      createAt?: string;
      /** Format: date-time */
      modifyAt?: string;
    };
    MemberDto: {
      /** Format: int64 */
      id?: number;
      username?: string;
      password?: string;
      /** @enum {string} */
      gender?: "MALE" | "FEMALE";
      location?: string;
      /** Format: date */
      birth?: string;
    };
    JobPostDto: {
      /** Format: int64 */
      id: number;
      author: string;
      title: string;
      body: string;
      createdAt?: string;
      closed?: boolean;
    };
    RsDataListJobPostDto: {
      resultCode?: string;
      /** Format: int32 */
      statusCode?: number;
      msg?: string;
      data?: components["schemas"]["JobPostDto"][];
      success?: boolean;
      fail?: boolean;
    };
    RsDataJobPostDto: {
      resultCode?: string;
      /** Format: int32 */
      statusCode?: number;
      msg?: string;
      data?: components["schemas"]["JobPostDto"];
      success?: boolean;
      fail?: boolean;
    };
    ApplicationDto: {
      /** Format: int64 */
      id?: number;
      author?: string;
      /** Format: int64 */
      postId?: number;
      body?: string;
      /** Format: date-time */
      createdAt?: string;
      approve?: boolean;
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
        content: {
          "*/*": string;
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
          "*/*": components["schemas"]["MemberDto"];
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
          "*/*": components["schemas"]["RsDataJobPostDto"];
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
  deletePost: {
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
          "*/*": components["schemas"]["ApplicationDto"];
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
          "*/*": string;
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
          "*/*": string;
        };
      };
    };
  };
  /** 로그인 */
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
          "*/*": string;
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
          "*/*": string;
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
          "*/*": components["schemas"]["CommentDto"][];
        };
      };
    };
  };
}

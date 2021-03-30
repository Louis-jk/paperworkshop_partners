// action type
const USER_NO = 'USER_NO';
const USER_NAME = 'USER_NAME';
const USER_MOBILE = 'USER_MOBILE';
const USER_EMAIL = 'USER_EMAIL';
const USER_COMPANY = 'USER_COMPANY';
const USER_MOBILE_CFM = 'USER_MOBILE_CFM';
const USER_LEVEL = 'USER_LEVEL';
const USER_PROFILE = 'USER_PROFILE';
const USER_PTYPE = 'USER_PTYPE';
const USER_LICENSE = 'USER_LICENSE';
const USER_LICENSE_SOURCE = 'USER_LICENSE_SOURCE';
const USER_COMPANY_FILE = 'USER_COMPANY_FILE';
const USER_COMPANY_FILE_NAME = 'USER_COMPANY_FILE_NAME';
const USER_CATE1 = 'USER_CATE1';
const USER_CA_ID = 'USER_CA_ID';
const USER_CA_NAME = 'USER_CA_NAME';
const USER_DESCRIPTION = 'USER_DESCRIPTION';
const USER_BUSINESSTIME = 'USER_BUSINESSTIME';
const USER_CLOSEDAY = 'USER_CLOSEDAY';
const USER_USED = 'USER_USED';
const USER_BANK_NAME = 'USER_BANK_NAME';
const USER_BANK_ACCOUNT = 'USER_BANK_ACCOUNT';
const USER_BANK_DEPOSITOR = 'USER_BANK_DEPOSITOR';
const USER_ESTIMATE_CNT = 'USER_ESTIMATE_CNT';
const USER_NOTICE_YN = 'USER_NOTICE_YN';
const USER_QA_YN = 'USER_QA_YN';
const USER_ESTIMATE_YN = 'USER_ESTIMATE_YN';
const USER_PORTFOLIO = 'USER_PORTFOLIO';
const USER_LOCATION = 'USER_LOCATION';

// action method
export const UserNo = (payload) => ({type: USER_NO, payload});
export const UserName = (payload) => ({type: USER_NAME, payload});
export const UserMobile = (payload) => ({type: USER_MOBILE, payload});
export const UserEmail = (payload) => ({type: USER_EMAIL, payload});
export const UserMobileCfm = (payload) => ({type: USER_MOBILE_CFM, payload});
export const UserLevel = (payload) => ({type: USER_LEVEL, payload});
export const UserCompany = (payload) => ({type: USER_COMPANY, payload});
export const UserProfile = (payload) => ({type: USER_PROFILE, payload});
export const UserPtype = (payload) => ({type: USER_PTYPE, payload});
export const UserLicense = (payload) => ({type: USER_LICENSE, payload});
export const UserLicenseSource = (payload) => ({
  type: USER_LICENSE_SOURCE,
  payload,
});
export const UserCompanyFile = (payload) => ({
  type: USER_COMPANY_FILE,
  payload,
});
export const UserCompanyFileName = (payload) => ({
  type: USER_COMPANY_FILE_NAME,
  payload,
});
export const UserCate1 = (payload) => ({type: USER_CATE1, payload});
export const UserCaId = (payload) => ({type: USER_CA_ID, payload});
export const UserCaName = (payload) => ({type: USER_CA_NAME, payload});
export const UserDescription = (payload) => ({type: USER_DESCRIPTION, payload});
export const UserBusinessTime = (payload) => ({
  type: USER_BUSINESSTIME,
  payload,
});
export const UserCloseDay = (payload) => ({type: USER_CLOSEDAY, payload});
export const UserUsed = (payload) => ({type: USER_USED, payload});
export const UserBankName = (payload) => ({type: USER_BANK_NAME, payload});
export const UserBankAccount = (payload) => ({
  type: USER_BANK_ACCOUNT,
  payload,
});
export const UserBankDepositor = (payload) => ({
  type: USER_BANK_DEPOSITOR,
  payload,
});
export const UserNoticeYn = (payload) => ({type: USER_NOTICE_YN, payload});
export const UserQaYn = (payload) => ({type: USER_QA_YN, payload});
export const UserEstimateYn = (payload) => ({type: USER_ESTIMATE_YN, payload});

export const UserPortfolio = (payload) => ({type: USER_PORTFOLIO, payload});
export const UserLocation = (payload) => ({type: USER_LOCATION, payload});
export const UserEstimateCnt = (payload) => ({
  type: USER_ESTIMATE_CNT,
  payload,
});

// initialize
const initialize = {
  mb_no: null,
  mb_name: null,
  mb_hp: null,
  mb_email: null,
  mb_2: null, // company
  mb_1: null, // 휴대폰 인증 여부 ('Y'or 'N')
  mb_level: null, // 파트너스회원('4) / 사용자회원('2')
  mb_profile_img: null,
  ptype: null,
  license: null, // 사업자 등록증
  license_source: null, // 사업자 등록증 파일명
  company_file: null, // 회사소개서
  company_file_name: null, // 회사소개서 파일명
  cate1: null,
  ca_id: null,
  ca_name: null,
  description: null, // 업체소개
  businessTime: null, // 영업시간
  closeDay: null, // 휴무일
  used: null, // 영업품목
  bank_name: null,
  bank_account: null,
  bank_depositor: null,
  estimate_yn: null,
  notice_yn: null,
  qa_yn: null,
  estimate_cnt: null,
  portfolioImg: null,
  location: null,
};

// reducer create
export default function setJoinInfo(state = initialize, action) {
  switch (action.type) {
    case USER_NO:
      return {
        ...state,
        mb_no: action.payload,
      };
    case USER_NAME:
      return {
        ...state,
        mb_name: action.payload,
      };
    case USER_MOBILE:
      return {
        ...state,
        mb_hp: action.payload,
      };
    case USER_EMAIL:
      return {
        ...state,
        mb_email: action.payload,
      };
    case USER_COMPANY:
      return {
        ...state,
        mb_2: action.payload,
      };
    case USER_MOBILE_CFM:
      return {
        ...state,
        mb_1: action.payload,
      };
    case USER_LEVEL:
      return {
        ...state,
        mb_level: action.payload,
      };
    case USER_PROFILE:
      return {
        ...state,
        mb_profile_img: action.payload,
      };
    case USER_PTYPE:
      return {
        ...state,
        ptype: action.payload,
      };
    case USER_LICENSE:
      return {
        ...state,
        license: action.payload,
      };
    case USER_LICENSE_SOURCE:
      return {
        ...state,
        license_source: action.payload,
      };
    case USER_COMPANY_FILE:
      return {
        ...state,
        company_file: action.payload,
      };
    case USER_COMPANY_FILE_NAME:
      return {
        ...state,
        company_file_name: action.payload,
      };
    case USER_CATE1:
      return {
        ...state,
        cate1: action.payload,
      };
    case USER_CA_ID:
      return {
        ...state,
        ca_id: action.payload,
      };
    case USER_CA_NAME:
      return {
        ...state,
        ca_name: action.payload,
      };
    case USER_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case USER_BUSINESSTIME:
      return {
        ...state,
        businessTime: action.payload,
      };
    case USER_CLOSEDAY:
      return {
        ...state,
        closeDay: action.payload,
      };
    case USER_USED:
      return {
        ...state,
        used: action.payload,
      };
    case USER_BANK_NAME:
      return {
        ...state,
        bank_name: action.payload,
      };
    case USER_BANK_ACCOUNT:
      return {
        ...state,
        bank_account: action.payload,
      };
    case USER_BANK_DEPOSITOR:
      return {
        ...state,
        bank_depositor: action.payload,
      };
    case USER_ESTIMATE_YN:
      return {
        ...state,
        estimate_yn: action.payload,
      };
    case USER_NOTICE_YN:
      return {
        ...state,
        notice_yn: action.payload,
      };
    case USER_QA_YN:
      return {
        ...state,
        qa_yn: action.payload,
      };
    case USER_ESTIMATE_CNT:
      return {
        ...state,
        estimate_cnt: action.payload,
      };
    case USER_PORTFOLIO:
      return {
        ...state,
        portfolioImg: action.payload,
      };
    case USER_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
}

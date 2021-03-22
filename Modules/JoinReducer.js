// action type
const JOIN_EMAIL = 'JOIN_EMAIL';
const JOIN_PWD = 'JOIN_PWD';
const JOIN_NAME = 'JOIN_NAME';
const JOIN_MOBILE = 'JOIN_MOBILE';
const JOIN_MOBILE_CFM = 'JOIN_MOBILE_CFM';
const JOIN_COMPANY = 'JOIN_COMPANY';

const JOIN_LICENSE = 'JOIN_LICENSE';
const JOIN_LOCATION = 'JOIN_LOCATION';
const JOIN_CATE1 = 'JOIN_CATE1';
const JOIN_CAID = 'JOIN_CAID';

const JOIN_BANKNAME = 'JOIN_BANKNAME';
const JOIN_BANKACCOUNT = 'JOIN_BANKACCOUNT';
const JOIN_BANKDEPOSITOR = 'JOIN_BANKDEPOSITOR';

// action method
export const joinEmail = (payload) => ({type: JOIN_EMAIL, payload});
export const joinPwd = (payload) => ({type: JOIN_PWD, payload});
export const joinName = (payload) => ({type: JOIN_NAME, payload});
export const joinMobile = (payload) => ({type: JOIN_MOBILE, payload});
export const joinMobileCfm = (payload) => ({type: JOIN_MOBILE_CFM, payload});
export const joinCompany = (payload) => ({type: JOIN_COMPANY, payload});
export const joinLicense = (payload) => ({type: JOIN_LICENSE, payload});
export const joinLocation = (payload) => ({type: JOIN_LOCATION, payload});
export const joinCate1 = (payload) => ({type: JOIN_CATE1, payload});
export const joinCaId = (payload) => ({type: JOIN_CAID, payload});
export const joinBankName = (payload) => ({type: JOIN_BANKNAME, payload});
export const joinBankAccount = (payload) => ({type: JOIN_BANKACCOUNT, payload});
export const joinBankDepositor = (payload) => ({
  type: JOIN_BANKDEPOSITOR,
  payload,
});

// initialize
const initialize = {
  mb_email: null, // 아이디(이메일)
  mb_password: null, // 비밀번호
  mb_name: null, // 이름
  mb_hp: null, // 휴대폰 번호
  mb_1: null, // 인증여부
  mb_2: null, // 회사명
  license: null, // 사업자등록증
  location: null, // 위치
  cate1: null, // 분류
  ca_id: null, // 1차분류
  bank_name: null, // 은행명
  bank_account: null, // 계좌번호
  bank_depositor: null, // 예금주
};

// reducer create
export default function setJoinInfo(state = initialize, action) {
  switch (action.type) {
    case JOIN_EMAIL:
      return {
        ...state,
        mb_email: action.payload,
      };
    case JOIN_PWD:
      return {
        ...state,
        mb_password: action.payload,
      };
    case JOIN_NAME:
      return {
        ...state,
        mb_name: action.payload,
      };
    case JOIN_MOBILE:
      return {
        ...state,
        mb_hp: action.payload,
      };
    case JOIN_MOBILE_CFM:
      return {
        ...state,
        mb_1: action.payload,
      };
    case JOIN_COMPANY:
      return {
        ...state,
        mb_2: action.payload,
      };
    case JOIN_LICENSE:
      return {
        ...state,
        license: action.payload,
      };
    case JOIN_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case JOIN_CATE1:
      return {
        ...state,
        cate1: action.payload,
      };
    case JOIN_CAID:
      return {
        ...state,
        ca_id: action.payload,
      };
    case JOIN_BANKNAME:
      return {
        ...state,
        bank_name: action.payload,
      };
    case JOIN_BANKACCOUNT:
      return {
        ...state,
        bank_account: action.payload,
      };
    case JOIN_BANKDEPOSITOR:
      return {
        ...state,
        bank_depositor: action.payload,
      };
    default:
      return state;
  }
}

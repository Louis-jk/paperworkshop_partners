import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  onSignIn(frmData) {
    return Send({
      method: 'post',
      data: frmData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  onEmailCheck(mb_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_duplicate_id',
        mb_id,
      }),
    });
  },
  onMobileConfirm(mb_hp) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_cert_mb_hp',
        mb_hp,
        mb_level: '4',
      }),
    });
  },
  onMobileConfirmNo(mb_hp, cert_num, rt_yn) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_cert_confirm',
        mb_hp,
        cert_num,
        rt_yn,
      }),
    });
  },
  onLogin(mb_id, mb_password, mb_3, mb_4) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_login_partner',
        mb_id,
        mb_password,
        mb_3,
        mb_4,
      }),
    });
  },
  // 아이디 찾기
  onSearchIdStep01(mb_name, mb_hp, mb_level) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_search_id',
        mb_name,
        mb_hp,
        mb_level,
      }),
    });
  },
  onSearchIdStep02(mb_name, mb_hp, cert_num, mb_level, rt_yn) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_search_id_confirm',
        mb_name,
        mb_hp,
        cert_num,
        mb_level,
        rt_yn,
      }),
    });
  },
  onSearchPwdStep01(mb_id, mb_hp, mb_level) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_search_pass',
        mb_id,
        mb_hp,
        mb_level,
      }),
    });
  },
  // 비밀번호 찾기
  onSearchPwdStep02(mb_id, mb_hp, cert_num, mb_level, rt_yn) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_search_pass_confirm',
        mb_id,
        mb_hp,
        cert_num,
        mb_level,
        rt_yn,
        // check_yn,
      }),
    });
  },
  onSetPwd(mb_id, mb_password, mb_password_re) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_change_pass',
        mb_id,
        mb_password,
        mb_password_re,
      }),
    });
  },
  // 파트너스 정보 수정
  onEdit(frmData) {
    return Send({
      method: 'post',
      data: frmData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  // 인기파트너스 신청 전 정보(개월수, 금액)
  requestPopularInfo() {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_hit_price',
      }),
    });
  },
  // 인기파트너스 신청
  requestPopular(company_id, content1, content2, price, period) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_hit_add',
        company_id,
        content1,
        content2,
        price,
        period,
      }),
    });
  },
};

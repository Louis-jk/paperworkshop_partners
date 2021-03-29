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
};

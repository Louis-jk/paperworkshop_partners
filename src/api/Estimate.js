import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  // 견적 리스트
  getList(type, step, company_id, cate1, ca_id, sfl, search) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_estimate_list',
        type,
        step,
        company_id,
        cate1,
        ca_id,
        sfl,
        search,
      }),
    });
  },
  // 견적 정보 (간단)
  getDetail(pe_id, company_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_estimate_detail',
        pe_id,
        company_id,
      }),
    });
  },
  // 견적 세부 정보
  getMoreDetail(method, pe_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method,
        pe_id,
      }),
    });
  },
  // 견적발송 및 수정
  sendEstimate(frmData) {
    return Send({
      method: 'post',
      data: frmData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  // 납품완료
  sendDelivery(pd_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_estimate_status2',
        pd_id,
      }),
    });
  },
};

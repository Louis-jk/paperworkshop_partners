import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  getList(type, step, company_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_estimate_list',
        type,
        step,
        company_id,
      }),
    });
  },
  getDetail(pe_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_estimate_detail',
        pe_id,
      }),
    });
  },
  getEstimateSend(company_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_partner_estimate_list',
        type: null,
        step: '5',
        company_id,
      }),
    });
  },
};
import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  onAlarm(company_id, estimate_yn, notice_yn, qa_yn) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_paper_alram_config_add',
        company_id,
        estimate_yn,
        notice_yn,
        qa_yn,
      }),
    });
  },
};

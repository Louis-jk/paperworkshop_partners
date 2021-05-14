import Send from '../utils/Send.js';
import qs from 'qs';

export default {
  // 1:1 문의 등록 API
  sendQna(mb_id, qa_subject, qa_content) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_qa_add',
        mb_id,
        qa_subject,
        qa_content,
      }),
    });
  },
  // 1:1문의 리스트
  getQnaList(mb_id, search) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_qa_list',
        mb_id,
        search,
      }),
    });
  },
  // 1:1문의 상세
  getQnaDetail(qa_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_qa_detail',
        qa_id,
      }),
    });
  },
  // FAQ 리스트
  getFaqList(search) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_faq_list',
        search
      }),
    });
  },
  // FAQ 상세
  getFaqDetail(fa_id) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_faq_detail',
        fa_id,
      }),
    });
  },
  // 공지사항 리스트
  getNoticeList(search) {
    return Send({
      method: 'post',
      data: qs.stringify({
        method: 'proc_notice_list',
        search
      }),
    });
  },
};

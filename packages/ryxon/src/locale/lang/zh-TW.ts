export default {
  name: '姓名',
  tel: '電話',
  save: '儲存',
  confirm: '確認',
  cancel: '取消',
  delete: '刪除',
  loading: '載入中...',
  noCoupon: '暫無優惠券',
  nameEmpty: '請填寫姓名',
  addContact: '建立聯絡人',
  telInvalid: '請填寫正確的電話',
  rCalendar: {
    end: '結束',
    start: '開始',
    title: '日期選擇',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: (year: number, month: number) => `${year}年${month}月`,
    rangePrompt: (maxRange: number) => `最多選擇 ${maxRange} 天`,
  },
  rCascader: {
    select: '請選擇',
  },
  rPagination: {
    prev: '上一頁',
    next: '下一頁',
  },
  rPullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '釋放即可刷新...',
  },
  rSubmitBar: {
    label: '合計:',
  },
  rCoupon: {
    unlimited: '無門檻',
    discount: (discount: number) => `${discount}折`,
    condition: (condition: number) => `滿${condition}元可用`,
  },
  rCouponCell: {
    title: '優惠券',
    count: (count: number) => `${count}張可用`,
  },
  rCouponList: {
    exchange: '兌換',
    close: '不使用',
    enable: '可使用優惠券',
    disabled: '不可使用優惠券',
    placeholder: '輸入優惠代碼',
  },
  rAddressEdit: {
    area: '地區',
    areaEmpty: '請選擇地區',
    addressEmpty: '請填寫詳細地址',
    addressDetail: '詳細地址',
    defaultAddress: '設為預設收貨地址',
  },
  rAddressList: {
    add: '新增地址',
  },
};

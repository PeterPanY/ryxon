export default {
  name: 'お名前',
  tel: '電話番号',
  save: 'セーブ',
  confirm: '確認',
  cancel: 'キャンセル',
  delete: '削除',
  loading: '読み込み中...',
  noCoupon: 'クーポンはありません',
  nameEmpty: '名前を入力してください',
  addContact: '連絡先を追加',
  telInvalid: '正しい電話番号を入力してください',
  rCalendar: {
    end: '終了',
    start: '開始',
    title: '日付選択',
    weekdays: ['日', '月', '火', '水', '木', '金', '土'],
    monthTitle: (year: number, month: number) => `${year}年${month}月`,
    rangePrompt: (maxRange: number) => `${maxRange}日まで選択`,
  },
  rCascader: {
    select: '選択する',
  },
  rPagination: {
    prev: '前のページ',
    next: '次のページ',
  },
  rPullRefresh: {
    pulling: 'プルダウンして更新...',
    loosing: 'リリース時に更新...',
  },
  rSubmitBar: {
    label: '合計:',
  },
  rCoupon: {
    unlimited: '無制限',
    discount: (discount: number) => `${10 - discount}割引`,
    condition: (condition: number) => `${condition}円以上で利用可能`,
  },
  rCouponCell: {
    title: 'クーポン',
    count: (count: number) => `${count}枚が利用可能`,
  },
  rCouponList: {
    exchange: '両替',
    close: '使用禁止',
    enable: '利用可能',
    disabled: '利用できません',
    placeholder: '割引コードを入力してください',
  },
  rAddressEdit: {
    area: '地域',
    areaEmpty: '地域を選択してください',
    addressEmpty: '詳しい住所を入力してください',
    addressDetail: '詳しい住所',
    defaultAddress: 'デフォルトの住所に設定',
  },
  rAddressList: {
    add: '住所を追加',
  },
};

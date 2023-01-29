export default {
  name: 'Нэр',
  tel: 'Утас',
  save: 'Хадгалах',
  confirm: 'Баталгаажуулах',
  cancel: 'Цуцлах',
  delete: 'Устгах',
  loading: 'Ачааж байна...',
  noCoupon: 'Купон байхгүй',
  nameEmpaty: 'Нэрээ оруулна уу',
  addContact: 'Харилцагч нэмэх',
  telInvalid: 'Газар утасны дугаар',
  rCalendar: {
    end: 'Төгсгөл',
    start: 'Эхлэх',
    title: 'Хуанли',
    weekdays: ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `${maxRange} хоногоос илүүгүй сонгох`,
  },
  rCascader: {
    select: 'Сонгох',
  },
  rPagination: {
    prev: 'Өмнөх',
    next: 'Дараагийн',
  },
  rPullRefresh: {
    pulling: 'Сэргээхийн тулд татах...',
    loosing: 'Сэргээхийн тулд сул...',
  },
  rSubmitBar: {
    label: 'Нийт:',
  },
  rCoupon: {
    unlimited: 'Хязгааргүй',
    discount: (discount: number) => `${discount * 10}% хямдрал`,
    condition: (condition: number) => `Хамгийн багадаа ${condition}`,
  },
  rCouponCell: {
    title: 'Купон',
    count: (count: number) => `Танд ${count} купон байна`,
  },
  rCouponList: {
    exchange: 'солилцоо',
    close: 'хаах',
    enable: 'Боломжтой',
    disabled: 'Боломжгүй',
    placeholder: 'Купон код',
  },
  rAddressEdit: {
    area: 'Талбай',
    areaEmpty: 'Хүлээн авах бүсээ сонгоно уу',
    addressEmpty: 'Хаяг хоосон байж болохгүй',
    addressDetail: 'Хаяг',
    defaultAddress: 'Өгөгдмөл хаягаар тохируулах',
  },
  rAddressList: {
    add: 'Шинэ хаяг нэмэх',
  },
};

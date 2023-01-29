export default {
  name: 'שם',
  tel: 'טלפון',
  save: 'שמור',
  confirm: 'אישור',
  cancel: 'ביטול',
  delete: 'מחיקה',
  loading: 'טוען...',
  noCoupon: 'אין קופונים',
  nameEmpty: 'אנא מלא את השדה',
  addContact: 'הוסף איש-קשר',
  telInvalid: 'מספר טלפון שגוי',
  rCalendar: {
    end: 'סוף',
    start: 'התחלה',
    title: 'לוח שנה',
    weekdays: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => ` בחר לא יותר מ ${maxRange} ימים `,
  },
  rCascader: {
    select: 'בחר',
  },
  rPagination: {
    prev: 'הקודם',
    next: 'הבא',
  },
  rPullRefresh: {
    pulling: 'גרור כדי לרענן',
    loosing: 'שחרר כדי לרענן',
  },
  rSubmitBar: {
    label: 'סך הכל:',
  },
  rCoupon: {
    unlimited: 'ללא הגבלה',
    discount: (discount: number) => `${discount * 10}% הנחה`,
    condition: (condition: number) => ` לפחות ${condition}`,
  },
  rCouponCell: {
    title: 'קופון',
    count: (count: number) => ` יש לך ${count} קופונים `,
  },
  rCouponList: {
    exchange: 'החלפה',
    close: 'סגירה',
    enable: 'זמינים',
    disabled: 'לא זמינים',
    placeholder: 'קוד קופון',
  },
  rAddressEdit: {
    area: 'איזור',
    postal: 'מיקוד',
    areaEmpty: 'אנא בחר איזור קבלה',
    addressEmpty: 'יש למלא כתובת',
    postalEmpty: 'טעות במיקוד',
    addressDetail: 'כתובת',
    defaultAddress: 'הגדר ככתובת ברירת מחדש',
  },
  rAddressList: {
    add: 'הוספת כתובת חדשה',
  },
};

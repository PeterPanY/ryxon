export default {
  name: 'Nafn',
  tel: 'Sími',
  save: 'Vista',
  confirm: 'Staðfesta',
  cancel: 'hætta við',
  delete: 'Eyða',
  loading: 'Hleður...',
  noCoupon: 'Engin afsláttarmiða',
  nameEmpty: 'Vinsamlegast fylltu út nafn',
  addContact: 'Bæta við tengilið',
  telInvalid: 'Gangað símanúmer',
  rCalendar: {
    end: 'Enda',
    start: 'Byrja',
    title: 'Dagatal',
    weekdays: [
      'sunnudag',
      'Mánudagur',
      'þriðjudag',
      'miðvikudag',
      'fimmtudag',
      'föstudag',
      'laugardag',
    ],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Veldu ekki fleiri en ${maxRange} daga`,
  },
  rCascader: {
    select: 'Velja',
  },
  rPagination: {
    prev: 'Fyrri',
    next: 'Næst',
  },
  rPullRefresh: {
    pulling: 'Dregðu til að endurnýja...',
    loosing: 'Loose to refresh...',
  },
  rSubmitBar: {
    label: 'Samtals:',
  },
  rCoupon: {
    unlimited: 'Ótakmarkað',
    discount: (discount: number) => `${discount * 10}% afsláttur`,
    condition: (condition: number) => `Að minnsta kosti ${condition}`,
  },
  rCouponCell: {
    title: 'Afsláttarmiði',
    count: (count: number) => `Þú átt ${count} afsláttarmiða`,
  },
  rCouponList: {
    exchange: 'Skipti',
    close: 'Loka',
    enable: 'Laus',
    disabled: 'Ótiltækt',
    placeholder: 'Afsláttarmiðakóði',
  },
  rAddressEdit: {
    area: 'Svæði',
    areaEmpty: 'Vinsamlega veldu móttökusvæði',
    addressEmpty: 'Heimilisfang má ekki vera tómt',
    addressDetail: 'Heimilisfang',
    defaultAddress: 'Setja sem sjálfgefið heimilisfang',
  },
  rAddressList: {
    add: 'Bæta við nýju heimilisfangi',
  },
};

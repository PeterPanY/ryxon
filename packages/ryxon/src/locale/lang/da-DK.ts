export default {
  name: 'navn',
  tel: 'Telefon',
  save: 'Gem',
  confirm: 'Bekræft',
  cancel: 'Annuller',
  delete: 'Slet',
  loading: 'Indlæser...',
  noCoupon: 'Ingen kuponer',
  nameEmpty: 'Fyld venligst navnet',
  addContact: 'Tilføj kontakt',
  telInvalid: 'Forkert telefonnummer',
  rCalendar: {
    end: 'Ende',
    start: 'Start',
    title: 'Kalender',
    weekdays: ['Søn', 'Man', 'tirs', 'ons', 'tors', 'Fre', 'lør'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Vælg ikke mere end ${maxRange} dage`,
  },
  rCascader: {
    select: 'Vælg',
  },
  rPagination: {
    prev: 'Forrige',
    next: 'Næste',
  },
  rPullRefresh: {
    pulling: 'Træk for at opdatere...',
    loosing: 'Løs for at opdatere...',
  },
  rSubmitBar: {
    label: 'I alt:',
  },
  rCoupon: {
    unlimited: 'Ubegrænset',
    discount: (discount: number) => `${discount * 10}% rabat`,
    condition: (condition: number) => `Mindst ${condition}`,
  },
  rCouponCell: {
    title: 'Kupon',
    count: (count: number) => `Du har ${count} kuponer`,
  },
  rCouponList: {
    exchange: 'Udveksling',
    close: 'Luk',
    enable: 'Ledig',
    disabled: 'Utilgængelig',
    placeholder: 'Kuponkode',
  },
  rAddressEdit: {
    area: 'ArOmrådeea',
    postal: 'Post',
    areaEmpty: 'Vælg venligst et modtageområde',
    addressEmpty: 'Adressen må ikke være tom',
    postalEmpty: 'Forkert postnummer',
    addressDetail: 'Adresse',
    defaultAddress: 'Sæt som standardadresse',
  },
  rAddressList: {
    add: 'Tilføj ny adresse',
  },
};

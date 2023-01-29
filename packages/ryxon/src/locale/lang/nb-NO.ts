export default {
  name: 'Navn',
  tel: 'Telefon',
  save: 'Lagre',
  confirm: 'Bekreft',
  cancel: 'Avbryt',
  delete: 'Slett',
  loading: 'Laster...',
  noCoupon: 'Ingen kuponger',
  nameEmpty: 'Vennligst fyll inn navn',
  addContact: 'Legg til ny kontakt',
  telInvalid: 'Ugyldig telefonnummer',
  rCalendar: {
    end: 'Slutt',
    start: 'Start',
    title: 'Kalendar',
    weekdays: ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Maks. ${maxRange} dager`,
  },
  rCascader: {
    select: 'Plukke ut',
  },
  rPagination: {
    prev: 'Forrige',
    next: 'Neste',
  },
  rPullRefresh: {
    pulling: 'Dra for oppdatering...',
    loosing: 'Mist for oppdatering...',
  },
  rSubmitBar: {
    label: 'Totalt:',
  },
  rCoupon: {
    unlimited: 'Uendelig',
    discount: (discount: number) => `${discount * 10}% avslag`,
    condition: (condition: number) => `Minst ${condition}`,
  },
  rCouponCell: {
    title: 'Kupong',
    count: (count: number) => `Du har ${count} kuponger`,
  },
  rCouponList: {
    exchange: 'Bytte',
    close: 'Lukk',
    enable: 'Tilgjengelig',
    disabled: 'Utilgjengelig',
    placeholder: 'Kupong kode',
  },
  rAddressEdit: {
    area: 'Område',
    areaEmpty: 'Vennligst fyll inn område',
    addressEmpty: 'Addresse kan ikke være tomt',
    addressDetail: 'Adresse',
    defaultAddress: 'Sett som standard adresse',
  },
  rAddressList: {
    add: 'Legg til ny adresse',
  },
};

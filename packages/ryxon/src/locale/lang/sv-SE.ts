export default {
  name: 'Namn',
  tel: 'Telefon',
  save: 'Spara',
  confirm: 'Bekräfta',
  cancel: 'Avbryt',
  delete: 'Radera',
  loading: 'Laddar...',
  noCoupon: 'Inga kuponger',
  nameEmpty: 'Vänligen fyll i namnet',
  addContact: 'Lägg till kontakt',
  telInvalid: 'Felformat telefonnummer',
  rCalendar: {
    end: 'Slut',
    start: 'Start',
    title: 'Kalender',
    weekdays: ['sön', 'mån', 'tis', 'ons', 'tors', 'fre', 'lör'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Välj högst ${maxRange} dagar`,
  },
  rCascader: {
    select: 'Välj',
  },
  rPagination: {
    prev: 'Föregående',
    next: 'Nästa',
  },
  rPullRefresh: {
    pulling: 'Dra för att uppdatera...',
    loosing: 'Lös för att uppdatera...',
  },
  rSubmitBar: {
    label: 'Totalt:',
  },
  rCoupon: {
    unlimited: 'Obegränsat',
    discount: (discount: number) => `${discount * 10}% rabatt`,
    condition: (condition: number) => `Minst ${condition}`,
  },
  rCouponCell: {
    title: 'Kupong',
    count: (count: number) => `Du har ${count} kuponger`,
  },
  rCouponList: {
    exchange: 'Utbyta',
    close: 'Stäng',
    enable: 'Tillgängliga',
    disabled: 'Inte tillgänglig',
    placeholder: 'Kupongkod',
  },
  rAddressEdit: {
    area: 'Område',
    areaEmpty: 'Välj ett mottagningsområde',
    addressEmpty: 'Adressen får inte vara tom',
    addressDetail: 'Adress',
    defaultAddress: 'Ange som standardadress',
  },
  rAddressList: {
    add: 'Lägg till ny adress',
  },
};

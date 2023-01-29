export default {
  name: 'naam',
  tel: 'Telefoon',
  save: 'Opslaan',
  confirm: 'Bevestigen',
  cancel: 'Annuleren',
  delete: 'Verwijderen',
  loading: 'Bezig met laden...',
  noCoupon: 'Geen coupons',
  nameEmpty: 'Vul de naam in',
  addContact: 'Contact toevoegen',
  telInvalid: 'Onjuist opgemaakt telefoonnummer',
  rCalendar: {
    end: 'Einde',
    start: 'Beginnen',
    title: 'Kalender',
    weekdays: ['Zon', 'Maan', 'Dins', 'Woens', 'Donder', 'Vrij', 'Zater'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Kies niet meer dan ${maxRange} dagen`,
  },
  rCascader: {
    select: 'Selecteer',
  },
  rPagination: {
    prev: 'Vorige',
    next: 'Volgende',
  },
  rPullRefresh: {
    pulling: 'Trekken om te vernieuwen...',
    loosing: 'Los om te verversen...',
  },
  rSubmitBar: {
    label: 'Totaal:',
  },
  rCoupon: {
    unlimited: 'Onbeperkt',
    discount: (discount: number) => `${discount * 10}% korting`,
    condition: (condition: number) => `Ten minste ${condition}`,
  },
  rCouponCell: {
    title: 'Waardebon',
    count: (count: number) => `Je hebt ${count} coupons`,
  },
  rCouponList: {
    exchange: 'Uitwisselen',
    close: 'Sluiten',
    enable: 'Beschikbaar',
    disabled: 'Niet beschikbaar',
    placeholder: 'Couponcode',
  },
  rAddressEdit: {
    area: 'Gebied',
    areaEmpty: 'Selecteer een ontvangstgebied',
    addressEmpty: 'Adres mag niet leeg zijn',
    addressDetail: 'Adres',
    defaultAddress: 'Instellen als standaardadres',
  },
  rAddressList: {
    add: 'Nieuw adres toevoegen',
  },
};

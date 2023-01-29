export default {
  name: 'Name',
  tel: 'Telefon',
  save: 'Speichern',
  confirm: 'Bestätigen',
  cancel: 'Abbrechen',
  delete: 'Löschen',
  loading: 'Laden...',
  noCoupon: 'Keine Coupons',
  nameEmpty: 'Bitte den Name angeben',
  addContact: 'Neuen Kontakt hinzufügen',
  telInvalid: 'Ungültige Telefonnummer',
  rCalendar: {
    end: 'Ende',
    start: 'Start',
    title: 'Kalender',
    weekdays: ['So', 'Mo', 'Di', 'Mo', 'Do', 'Fr', 'Sa'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Wähle nicht mehr als ${maxRange} Tage`,
  },
  rCascader: {
    select: 'Wählen',
  },
  rPagination: {
    prev: 'Vorherige',
    next: 'Nächste',
  },
  rPullRefresh: {
    pulling: 'Zum Aktualisieren herunterziehen...',
    loosing: 'Loslassen zum Aktualisieren...',
  },
  rSubmitBar: {
    label: 'Total:',
  },
  rCoupon: {
    unlimited: 'Unbegrenzt',
    discount: (discount: number) => `${discount * 10}% Rabatt`,
    condition: (condition: number) => `Mindestens ${condition}`,
  },
  rCouponCell: {
    title: 'Coupon',
    count: (count: number) => `Du hast ${count} Coupons`,
  },
  rCouponList: {
    exchange: 'Austauschen',
    close: 'Schließen',
    enable: 'Verfügbar',
    disabled: 'Nicht verfügbar',
    placeholder: 'Couponcode',
  },
  rAddressEdit: {
    area: 'Standort',
    areaEmpty: 'Bitte deinen Ort angeben',
    addressEmpty: 'Adresse darf nicht leer sein',
    addressDetail: 'Adresse',
    defaultAddress: 'Als Standardadresse festgelegen',
  },
  rAddressList: {
    add: 'Neue Adresse hinzufügen',
  },
};

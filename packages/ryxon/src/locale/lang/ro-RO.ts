export default {
  name: 'Nume',
  tel: 'Telefon',
  save: 'Salvează',
  confirm: 'Confirmă',
  cancel: 'Anulează',
  delete: 'Șterge',
  loading: 'Încărcare...',
  noCoupon: 'Fără cupoane',
  nameEmpty: 'Te rugăm să completezi numele',
  addContact: 'Adaugă contact nou',
  telInvalid: 'Număr de telefon invalid',
  rCalendar: {
    end: 'Sfârșit',
    start: 'Început',
    title: 'Calendar',
    weekdays: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Alege maxim ${maxRange} zile`,
  },
  rCascader: {
    select: 'Selectați',
  },
  rPagination: {
    prev: 'Precedenta',
    next: 'Urmatoarea',
  },
  rPullRefresh: {
    pulling: 'Trage pentru a da împrospăta...',
    loosing: 'Eliberează pentru a împrospăta...',
  },
  rSubmitBar: {
    label: 'Total:',
  },
  rCoupon: {
    unlimited: 'Nelimitat',
    discount: (discount: number) => `${discount * 10}% discount`,
    condition: (condition: number) => `Cel puțin ${condition}`,
  },
  rCouponCell: {
    title: 'Cupon',
    count: (count: number) => `Ai ${count} cupoane`,
  },
  rCouponList: {
    exchange: 'Schimbă',
    close: 'Închide',
    enable: 'Disponibil',
    disabled: 'Indisponibil',
    placeholder: 'Cod cupon',
  },
  rAddressEdit: {
    area: 'Zonă',
    areaEmpty: 'Te rugăm sa selectezi o zona de primire',
    addressEmpty: 'Adresa nu poate fi goală',
    addressDetail: 'Adresă',
    defaultAddress: 'Setează ca adresă de pornire',
  },
  rAddressList: {
    add: 'Adaugă adresă nouă',
  },
};

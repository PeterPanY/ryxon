export default {
  name: 'Nome',
  tel: 'Telefono',
  save: 'Salva',
  confirm: 'Conferma',
  cancel: 'Annulla',
  delete: 'Elimina',
  loading: 'Caricamento in corso...',
  noCoupon: 'Nessun coupon',
  nameEmpty: 'Inserisci il nome',
  addContact: 'Aggiungi contatto',
  telInvalid: 'Numero di telefono errato',
  rCalendar: {
    end: 'Fine',
    start: 'Inizio',
    title: 'Calendario',
    weekdays: [
      'domenica',
      'Lunedi',
      'Martedì',
      'mercoledì',
      'giovedì',
      'venerdì',
      'Sabato',
    ],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Scegli non più di ${maxRange} giorni`,
  },
  rCascader: {
    select: 'Seleziona',
  },
  rPagination: {
    prev: 'Precedente',
    next: 'Avanti',
  },
  rPullRefresh: {
    pulling: 'Tiri per aggiornare...',
    loosing: 'Largo per rinfrescare...',
  },
  rSubmitBar: {
    label: 'Totale:',
  },
  rCoupon: {
    unlimited: 'Illimitato',
    discount: (discount: number) => `${discount * 10}% di sconto`,
    condition: (condition: number) => `Almeno ${condition}`,
  },
  rCouponCell: {
    title: 'Buono',
    count: (count: number) => `Hai ${count} coupon`,
  },
  rCouponList: {
    exchange: 'Scambio',
    close: 'Chiudi',
    enable: 'Disponibile',
    disabled: 'Non disponibile',
    placeholder: 'Codice coupon',
  },
  rAddressEdit: {
    area: 'Area',
    areaEmpty: "Seleziona un'area di ricezione",
    addressEmpty: "L'indirizzo non può essere vuoto",
    addressDetail: 'Indirizzo',
    defaultAddress: 'Imposta come indirizzo predefinito',
  },
  rAddressList: {
    add: 'Aggiungi nuovo indirizzo',
  },
};

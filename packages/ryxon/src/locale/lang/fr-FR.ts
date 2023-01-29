export default {
  name: 'Nom',
  tel: 'Telephone',
  save: 'Sauvegarder',
  confirm: 'Confirmer',
  cancel: 'Annuler',
  delete: 'Suprimer',
  loading: 'Chargement...',
  noCoupon: 'Pas de coupons',
  nameEmpty: 'Veuillez remplir le nom',
  addContact: 'Ajouter contact',
  telInvalid: 'Numéro de téléphone incorrect',
  rCalendar: {
    end: 'Fin',
    start: 'Début',
    title: 'Calendrier',
    weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Choisir pas plus de ${maxRange} jours`,
  },
  rCascader: {
    select: 'Sélectionner',
  },
  rPagination: {
    prev: 'Précédent',
    next: 'Suivant',
  },
  rPullRefresh: {
    pulling: 'Tirer pour actualiser ...',
    loosing: 'Relâchez pour actualiser...',
  },
  rSubmitBar: {
    label: 'Total:',
  },
  rCoupon: {
    unlimited: 'Illimité',
    discount: (discount: number) => `${discount * 10}% de réduction`,
    condition: (condition: number) => `Au moins ${condition}`,
  },
  rCouponCell: {
    title: 'Coupon',
    count: (count: number) => `Vous avez ${count} coupons`,
  },
  rCouponList: {
    exchange: 'Exchange',
    close: 'Fermer',
    enable: 'Disponible',
    disabled: 'Indisponible',
    placeholder: 'Code coupon',
  },
  rAddressEdit: {
    area: 'Zone',
    areaEmpty: 'Veuillez sélectionner une zone de réception',
    addressEmpty: "L'adresse ne peut pas être vide",
    addressDetail: 'Adresse',
    defaultAddress: 'Définir comme adresse par défaut',
  },
  rAddressList: {
    add: 'Ajouter une nouvelle adresse',
  },
};

export default {
  name: 'Όνομα',
  tel: 'Τηλέφωνο',
  save: 'Αποθήκευση',
  confirm: 'Επιβεβαίωση',
  cancel: 'Ακύρωση',
  delete: 'Διαγραφή',
  loading: 'Φόρτωση...',
  noCoupon: 'Χωρίς κουπόνια',
  nameEmpty: 'Παρακαλώ συμπληρώστε το όνομα',
  addContact: 'Προσθήκη επαφής',
  telInvalid: 'Αριθμός τηλεφώνου με εσφαλμένη μορφή',
  rCalendar: {
    end: 'Τέλος',
    start: 'Έναρξη',
    title: 'Ημερολόγιο',
    weekdays: [
      'Κυριακή',
      'Δευτέρα',
      'Τρίτη',
      'Τετάρτη',
      'Πέμπτη',
      'Παρασκευή',
      'Σάββατο',
    ],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) =>
      `Επιλέξτε όχι περισσότερες από ${maxRange} ημέρες`,
  },
  rCascader: {
    select: 'Επιλογή',
  },
  rPagination: {
    prev: 'Προηγούμενο',
    next: 'Επόμενο',
  },
  rPullRefresh: {
    pulling: 'Τραβήξτε για ανανέωση...',
    loosing: 'Χαλαρά για ανανέωση...',
  },
  rSubmitBar: {
    label: 'Σύνολο:',
  },
  rCoupon: {
    unlimited: 'Απεριόριστο',
    discount: (discount: number) => `${discount * 10}% έκπτωση`,
    condition: (condition: number) => `Τουλάχιστον ${condition}`,
  },
  rCouponCell: {
    title: 'Κουπόνι',
    count: (count: number) => `Έχετε ${count} κουπόνια`,
  },
  rCouponList: {
    exchange: 'Ανταλλαγή',
    close: 'Κλείσιμο',
    enable: 'Διαθέσιμο',
    disabled: 'Μη διαθέσιμο',
    placeholder: 'Κωδικός κουπονιού',
  },
  rAddressEdit: {
    area: 'Περιοχή',
    postal: 'Ταχυδρομείο',
    areaEmpty: 'Παρακαλώ επιλέξτε μια περιοχή λήψης',
    addressEmpty: 'Η διεύθυνση δεν μπορεί να είναι κενή',
    postalEmpty: 'Λάθος ταχυδρομικός κώδικας',
    addressDetail: 'Διεύθυνση',
    defaultAddress: 'Ορισμός ως προεπιλεγμένη διεύθυνση',
  },
  rAddressList: {
    add: 'Προσθήκη νέας διεύθυνσης',
  },
};

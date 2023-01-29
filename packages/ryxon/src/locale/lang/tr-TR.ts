export default {
  name: 'İsim',
  tel: 'Telefon',
  save: 'Kaydet',
  confirm: 'Onayla',
  cancel: 'İptal',
  delete: 'Sil',
  loading: 'Yükleniyor...',
  noCoupon: 'Kupon yok',
  nameEmpty: 'Lütfen isim giriniz',
  addContact: 'Yeni kişi ekle',
  telInvalid: 'Geçersiz tel. numarası',
  rCalendar: {
    end: 'Son',
    start: 'Başlat',
    title: 'Takvim',
    weekdays: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `En fazla ${maxRange} gün seçin`,
  },
  rCascader: {
    select: 'Seçiniz',
  },
  rPagination: {
    prev: 'Önceki',
    next: 'Sonraki',
  },
  rPullRefresh: {
    pulling: 'Yenilemek için çekin...',
    loosing: 'Yenilemek için bırakın...',
  },
  rSubmitBar: {
    label: 'Toplam:',
  },
  rCoupon: {
    unlimited: 'Sınırsız',
    discount: (discount: number) => `%${discount * 10} indirim`,
    condition: (condition: number) => `En az ${condition}`,
  },
  rCouponCell: {
    title: 'Kupon',
    count: (count: number) => `${count} adet teklif var`,
  },
  rCouponList: {
    exchange: 'Takas',
    close: 'Kapat',
    enable: 'Mevcut',
    disabled: 'Mevcut değil',
    placeholder: 'Kupon kodu',
  },
  rAddressEdit: {
    area: 'Alan',
    areaEmpty: 'Lütfen alıcı alanını seçin',
    addressEmpty: 'Adres boş olamaz!',
    addressDetail: 'Adres',
    defaultAddress: 'Varsayılan adres olarak ayarla',
  },
  rAddressList: {
    add: 'Yeni adres ekle',
  },
};

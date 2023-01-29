export default {
  name: 'Nama',
  tel: 'Telepon',
  save: 'Simpan',
  confirm: 'Konfirmasi',
  cancel: 'Batal',
  delete: 'Hapus',
  loading: 'Memuat...',
  noCoupon: 'Tidak ada kupon',
  nameEmpty: 'Silakan isi nama',
  addContact: 'Tambahkan kontak',
  telInvalid: 'Nomor telepon salah format',
  rCalendar: {
    end: 'Akhir',
    start: 'Mulai',
    title: 'Kalender',
    weekdays: ['minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) =>
      `Pilih tidak lebih dari ${maxRange} hari`,
  },
  rCascader: {
    select: 'Pilih',
  },
  rPagination: {
    prev: 'Sebelumnya',
    next: 'Selanjutnya',
  },
  rPullRefresh: {
    pulling: 'Tarik untuk menyegarkan...',
    loosing: 'Loose untuk menyegarkan...',
  },
  rSubmitBar: {
    label: 'Jumlah:',
  },
  rCoupon: {
    unlimited: 'Tidak terbatas',
    discount: (discount: number) => `${discount * 10}% off`,
    condition: (condition: number) => `Setidaknya ${condition}`,
  },
  rCouponCell: {
    title: 'Kupon',
    count: (count: number) => `Anda memiliki kupon ${count}`,
  },
  rCouponList: {
    exchange: 'Pertukaran',
    close: 'Tutup',
    enable: 'Tersedia',
    disabled: 'Tidak tersedia',
    placeholder: 'Kode kupon',
  },
  rAddressEdit: {
    area: 'Daerah',
    areaEmpty: 'Silakan pilih area penerima',
    addressEmpty: 'Alamat tidak boleh kosong',
    addressDetail: 'Alamat',
    defaultAddress: 'Tetapkan sebagai alamat default',
  },
  rAddressList: {
    add: 'Tambahkan alamat baru',
  },
};

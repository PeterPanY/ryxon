export default {
  name: 'ชื่อ',
  tel: 'โทรศัพท์',
  save: 'บันทึก',
  confirm: 'ยืนยัน',
  cancel: 'ยกเลิก',
  delete: 'ลบ',
  loading: 'กำลังโหลด...',
  noCoupon: 'ไม่มีคูปอง',
  nameEmpty: 'กรุณากรอกชื่อของคุณ',
  addContact: 'เพิ่มผู้ติดต่อ',
  telInvalid: 'กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง',
  rCalendar: {
    end: 'จบ',
    start: 'เริ่ม',
    title: 'การเลือกวันที่',
    weekdays: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
    monthTitle: (year: number, month: number) => `${year}ปี${month}เดือน`,
    rangePrompt: (maxRange: number) =>
      `จำนวนวันที่เลือกต้องไม่เกิน ${maxRange} วัน`,
  },
  rCascader: {
    select: 'โปรดเลือก',
  },
  rPagination: {
    prev: 'หน้าที่แล้ว',
    next: 'หน้าต่อไป',
  },
  rPullRefresh: {
    pulling: 'ดึงลงเพื่อรีเฟรช...',
    loosing: 'ปล่อยเพื่อรีเฟรช...',
  },
  rSubmitBar: {
    label: 'รวม:',
  },
  rCoupon: {
    unlimited: 'ไม่ จำกัด',
    discount: (discount: number) => `ลด${discount}`,
    condition: (condition: number) => `มีจำหน่ายในราคา ${condition} กว่าหยวน`,
  },
  rCouponCell: {
    title: 'คูปอง',
    count: (count: number) => `มีรูปภาพ ${count} รูป`,
  },
  rCouponList: {
    exchange: 'แลกเปลี่ยน',
    close: 'ไม่ได้ใช้',
    enable: 'พร้อมใช้งาน',
    disabled: 'ไม่พร้อมใช้งาน',
    placeholder: 'กรุณากรอกรหัสคูปอง',
  },
  rAddressEdit: {
    area: 'พื้นที่',
    areaEmpty: 'โปรดเลือกภูมิภาค',
    addressEmpty: 'กรุณากรอกที่อยู่โดยละเอียด',
    addressDetail: 'ที่อยู่',
    defaultAddress: 'ตั้งเป็นที่อยู่จัดส่งเริ่มต้น',
  },
  rAddressList: {
    add: 'เพิ่มที่อยู่',
  },
};

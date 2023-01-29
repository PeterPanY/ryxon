export default {
  name: 'Name',
  tel: 'Phone',
  save: 'Save',
  confirm: 'Confirm',
  cancel: 'Cancel',
  delete: 'Delete',
  loading: 'Loading...',
  noCoupon: 'No coupons',
  nameEmpty: 'Please fill in the name',
  addContact: 'Add contact',
  telInvalid: 'Malformed phone number',
  rCalendar: {
    end: 'End',
    start: 'Start',
    title: 'Calendar',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Choose no more than ${maxRange} days`,
  },
  rCascader: {
    select: 'Select',
  },
  rPagination: {
    prev: 'Previous',
    next: 'Next',
  },
  rPullRefresh: {
    pulling: 'Pull to refresh...',
    loosing: 'Loose to refresh...',
  },
  rSubmitBar: {
    label: 'Total:',
  },
  rCoupon: {
    unlimited: 'Unlimited',
    discount: (discount: number) => `${discount * 10}% off`,
    condition: (condition: number) => `At least ${condition}`,
  },
  rCouponCell: {
    title: 'Coupon',
    count: (count: number) => `You have ${count} coupons`,
  },
  rCouponList: {
    exchange: 'Exchange',
    close: 'Close',
    enable: 'Available',
    disabled: 'Unavailable',
    placeholder: 'Coupon code',
  },
  rAddressEdit: {
    area: 'Area',
    areaEmpty: 'Please select a receiving area',
    addressEmpty: 'Address can not be empty',
    addressDetail: 'Address',
    defaultAddress: 'Set as the default address',
  },
  rAddressList: {
    add: 'Add new address',
  },
};

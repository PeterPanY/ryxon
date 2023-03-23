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
    rangePrompt: (maxRange: number) => `Choose no more than ${maxRange} days`
  },
  rCascader: {
    select: 'Select'
  },
  rDatepicker: {
    now: 'Now',
    today: 'Today',
    cancel: 'Cancel',
    clear: 'Clear',
    confirm: 'OK',
    dateTablePrompt:
      'Use the arrow keys and enter to select the day of the month',
    monthTablePrompt: 'Use the arrow keys and enter to select the month',
    yearTablePrompt: 'Use the arrow keys and enter to select the year',
    selectedDate: 'Selected date',
    selectDate: 'Select date',
    selectTime: 'Select time',
    startDate: 'Start Date',
    startTime: 'Start Time',
    endDate: 'End Date',
    endTime: 'End Time',
    prevYear: 'Previous Year',
    nextYear: 'Next Year',
    prevMonth: 'Previous Month',
    nextMonth: 'Next Month',
    year: '',
    month1: 'January',
    month2: 'February',
    month3: 'March',
    month4: 'April',
    month5: 'May',
    month6: 'June',
    month7: 'July',
    month8: 'August',
    month9: 'September',
    month10: 'October',
    month11: 'November',
    month12: 'December',
    week: 'week',
    weeks: {
      sun: 'Sun',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat'
    },
    weeksFull: {
      sun: 'Sunday',
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday'
    },
    months: {
      jan: 'Jan',
      feb: 'Feb',
      mar: 'Mar',
      apr: 'Apr',
      may: 'May',
      jun: 'Jun',
      jul: 'Jul',
      aug: 'Aug',
      sep: 'Sep',
      oct: 'Oct',
      nov: 'Nov',
      dec: 'Dec'
    }
  },
  rPagination: {
    prev: 'Previous',
    next: 'Next',
    goto: 'Go to',
    pagesize: '/page',
    total: (total: number) => `Total ${total}`,
    pageClassifier: ''
  },
  rPullRefresh: {
    pulling: 'Pull to refresh...',
    loosing: 'Loose to refresh...'
  },
  rSelect: {
    loading: 'Loading',
    noMatch: 'No matching data',
    noData: 'No data',
    placeholder: 'Select'
  },
  rSubmitBar: {
    label: 'Total:'
  },
  table: {
    emptyText: 'No Data',
    confirmFilter: 'Confirm',
    resetFilter: 'Reset',
    clearFilter: 'All',
    sumText: 'Sum'
  },
  rUpload: {
    uploading: 'Uploading...',
    failed: 'Failed'
  },
  rCoupon: {
    unlimited: 'Unlimited',
    discount: (discount: number) => `${discount * 10}% off`,
    condition: (condition: number) => `At least ${condition}`
  },
  rCouponCell: {
    title: 'Coupon',
    count: (count: number) => `You have ${count} coupons`
  },
  rCouponList: {
    exchange: 'Exchange',
    close: 'Close',
    enable: 'Available',
    disabled: 'Unavailable',
    placeholder: 'Coupon code'
  },
  rAddressEdit: {
    area: 'Area',
    areaEmpty: 'Please select a receiving area',
    addressEmpty: 'Address can not be empty',
    addressDetail: 'Address',
    defaultAddress: 'Set as the default address'
  },
  rAddressList: {
    add: 'Add new address'
  }
}

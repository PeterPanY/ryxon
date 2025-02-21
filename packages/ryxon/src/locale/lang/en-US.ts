export default {
  name: 'Name',
  tel: 'Phone',
  save: 'Save',
  clear: 'Clear',
  cancel: 'Cancel',
  confirm: 'Confirm',
  delete: 'Delete',
  loading: 'Loading...',
  nameEmpty: 'Please fill in the name',
  addContact: 'Add contact',
  telInvalid: 'Malformed phone number',
  rColorPicker: {
    defaultLabel: 'color picker',
    description: (color: string) =>
      `current color is ${color}. press enter to select a new color.`
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
  rSlider: {
    defaultLabel: (min: number, max: number) =>
      `slider between ${min} and ${max}`,
    defaultRangeStartLabel: 'pick start value',
    defaultRangeEndLabel: 'pick end value'
  },
  rSubmitBar: {
    label: 'Total:'
  },
  rTable: {
    emptyText: 'No Data',
    confirmFilter: 'Confirm',
    resetFilter: 'Reset',
    clearFilter: 'All',
    sumText: 'Sum'
  },
  rTree: {
    emptyText: 'No Data'
  },
  rUpload: {
    uploading: 'Uploading...',
    failed: 'Failed'
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

export default {
  name: '姓名',
  tel: '电话',
  save: '保存',
  confirm: '确认',
  cancel: '取消',
  delete: '删除',
  loading: '加载中...',
  noCoupon: '暂无优惠券',
  nameEmpty: '请填写姓名',
  addContact: '添加联系人',
  telInvalid: '请填写正确的电话',
  rCalendar: {
    end: '结束',
    start: '开始',
    title: '日期选择',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: (year: number, month: number) => `${year}年${month}月`,
    rangePrompt: (maxRange: number) => `最多选择 ${maxRange} 天`
  },
  rCascader: {
    select: '请选择'
  },
  rDatepicker: {
    now: '此刻',
    today: '今天',
    cancel: '取消',
    clear: '清空',
    confirm: '确定',
    selectDate: '选择日期',
    selectTime: '选择时间',
    startDate: '开始日期',
    startTime: '开始时间',
    endDate: '结束日期',
    endTime: '结束时间',
    prevYear: '前一年',
    nextYear: '后一年',
    prevMonth: '上个月',
    nextMonth: '下个月',
    year: '年',
    month1: '1 月',
    month2: '2 月',
    month3: '3 月',
    month4: '4 月',
    month5: '5 月',
    month6: '6 月',
    month7: '7 月',
    month8: '8 月',
    month9: '9 月',
    month10: '10 月',
    month11: '11 月',
    month12: '12 月',
    // week: '周次',
    weeks: {
      sun: '日',
      mon: '一',
      tue: '二',
      wed: '三',
      thu: '四',
      fri: '五',
      sat: '六'
    },
    months: {
      jan: '一月',
      feb: '二月',
      mar: '三月',
      apr: '四月',
      may: '五月',
      jun: '六月',
      jul: '七月',
      aug: '八月',
      sep: '九月',
      oct: '十月',
      nov: '十一月',
      dec: '十二月'
    }
  },
  rPagination: {
    prev: '上一页',
    next: '下一页'
  },
  rPullRefresh: {
    pulling: '下拉即可刷新...',
    loosing: '释放即可刷新...'
  },
  rSelect: {
    loading: '加载中',
    noMatch: '无匹配数据',
    noData: '无数据',
    placeholder: '请选择'
  },
  rSubmitBar: {
    label: '合计:'
  },
  rCoupon: {
    unlimited: '无门槛',
    discount: (discount: number) => `${discount}折`,
    condition: (condition: number) => `满${condition}元可用`
  },
  rCouponCell: {
    title: '优惠券',
    count: (count: number) => `${count}张可用`
  },
  rCouponList: {
    exchange: '兑换',
    close: '不使用',
    enable: '可用',
    disabled: '不可用',
    placeholder: '输入优惠码'
  },
  rAddressEdit: {
    area: '地区',
    areaEmpty: '请选择地区',
    addressEmpty: '请填写详细地址',
    addressDetail: '详细地址',
    defaultAddress: '设为默认收货地址'
  },
  rAddressList: {
    add: '新增地址'
  }
}

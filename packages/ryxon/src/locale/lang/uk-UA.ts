export default {
  name: "Ім'я",
  tel: 'Телефон',
  save: 'Зберегти',
  confirm: 'Підтвердити',
  cancel: 'Скасувати',
  delete: 'Видалити',
  loading: 'Завантаження...',
  noCoupon: 'Без купонів',
  nameEmpty: "Будь ласка, введіть ім'я",
  addContact: 'Додати контакт',
  telInvalid: 'Неправильний номер телефону',
  rCalendar: {
    end: 'Кінець',
    start: 'Почати',
    title: 'Календар',
    weekdays: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Оберіть не більше ніж ${maxRange} днів`
  },
  rCascader: {
    select: 'Обрати'
  },
  rPagination: {
    prev: 'Повернутися',
    next: 'Далі'
  },
  rPullRefresh: {
    pulling: 'Потягніть, щоб оновити...',
    loosing: 'Відпустіть, щоб оновити...'
  },
  rSubmitBar: {
    label: 'Усього:'
  },
  rCoupon: {
    unlimited: 'Необмежено',
    discount: (discount: number) => `${discount * 10}% off`,
    condition: (condition: number) => `Принаймні ${condition}`
  },
  rCouponCell: {
    title: 'Купон',
    count: (count: number) => `У вас є ${count} купонів`
  },
  rCouponList: {
    exchange: 'Обмін',
    close: 'Закрити',
    enable: 'Доступно',
    disabled: 'Недоступно',
    placeholder: 'Код купону'
  },
  rAddressEdit: {
    area: 'Область',
    areaEmpty: 'Будь ласка, оберіть зону прийому',
    addressEmpty: 'Адреса не може бути порожньою',
    addressDetail: 'Адреса',
    defaultAddress: 'Встановити як адресу за замовчуванням'
  },
  rAddressList: {
    add: 'Додати нову адресу'
  }
}

export default {
  name: 'Имя',
  tel: 'Телефон',
  save: 'Сохранить',
  confirm: 'Подтвердить',
  cancel: 'Отмена',
  delete: 'Удалить',
  loading: 'Загрузка...',
  noCoupon: 'Нет купонов',
  nameEmpty: 'Пожалуйста укажите имя',
  addContact: 'Создать контакт',
  telInvalid: 'Некорректный номер телефона',
  rCalendar: {
    end: 'Конец',
    start: 'Начало',
    title: 'Календарь',
    weekdays: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Укажите более ${maxRange} дней`,
  },
  rCascader: {
    select: 'Выбрать',
  },
  rPagination: {
    prev: 'Назад',
    next: 'Вперед',
  },
  rPullRefresh: {
    pulling: 'Потяните для обновления...',
    loosing: 'Отпустите для обновления...',
  },
  rSubmitBar: {
    label: 'Всего:',
  },
  rCoupon: {
    unlimited: 'Безлимитный',
    discount: (discount: number) => `${discount * 10}% скидка`,
    condition: (condition: number) => `Как минимум ${condition}`,
  },
  rCouponCell: {
    title: 'Купон',
    count: (count: number) => `У вас есть ${count} купонов`,
  },
  rCouponList: {
    exchange: 'Обмен',
    close: 'Закрыть',
    enable: 'Доступно',
    disabled: 'Недоступно',
    placeholder: 'Код купона',
  },
  rAddressEdit: {
    area: 'Область',
    areaEmpty: 'Укажите зону доставки',
    addressEmpty: 'Адрес не может быть пустым',
    addressDetail: 'Адрес',
    defaultAddress: 'Сделать адресом по умолчанию',
  },
  rAddressList: {
    add: 'Новый адрес',
  },
};

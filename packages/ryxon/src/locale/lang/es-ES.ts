export default {
  name: 'Nombre',
  tel: 'Teléfono',
  save: 'Guardar',
  confirm: 'Confirmar',
  cancel: 'Cancelar',
  delete: 'Eliminar',
  loading: 'Cargando...',
  noCoupon: 'Sin cupones',
  nameEmpty: 'Por favor rellena el nombre',
  addContact: 'Añadi contacto',
  telInvalid: 'Teléfono inválido',
  rCalendar: {
    end: 'Fin',
    start: 'Inicio',
    title: 'Calendario',
    weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    monthTitle: (year: number, month: number) => `${year}/${month}`,
    rangePrompt: (maxRange: number) => `Elija no más de ${maxRange} días`,
  },
  rCascader: {
    select: 'Seleccione',
  },
  rPagination: {
    prev: 'Anterior',
    next: 'Siguiente',
  },
  rPullRefresh: {
    pulling: 'Tira para recargar...',
    loosing: 'Suelta para recargar...',
  },
  rSubmitBar: {
    label: 'Total:',
  },
  rCoupon: {
    unlimited: 'Ilimitado',
    discount: (discount: number) => `${discount * 10}% de descuento`,
    condition: (condition: number) => `Al menos ${condition}`,
  },
  rCouponCell: {
    title: 'Cupón',
    count: (count: number) => `You have ${count} coupons`,
  },
  rCouponList: {
    exchange: 'Intercambio',
    close: 'Cerrar',
    enable: 'Disponible',
    disabled: 'No disponible',
    placeholder: 'Código del cupón',
  },
  rAddressEdit: {
    area: 'Área',
    areaEmpty: 'Por favor selecciona una área de recogida',
    addressEmpty: 'La dirección no puede estar vacia',
    addressDetail: 'Dirección',
    defaultAddress: 'Establecer como dirección por defecto',
  },
  rAddressList: {
    add: 'Anadir dirección',
  },
};

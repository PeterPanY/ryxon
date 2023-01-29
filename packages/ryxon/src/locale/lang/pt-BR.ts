export default {
  name: 'Nome',
  tel: 'Fone',
  save: 'Salvar',
  confirm: 'Confirmar',
  cancel: 'Cancelar',
  delete: 'Excluir',
  loading: 'Carregando...',
  noCoupon: 'Nenhum cupom',
  nameEmpty: 'Por favor, preencha o nome',
  addContact: 'Adicionar novo contato',
  telInvalid: 'Telefone em formato inválido',
  rCalendar: {
    end: 'Fim',
    start: 'Início',
    title: 'Calendário',
    weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    monthTitle: (year: number, month: number) => `${month}/${year}`,
    rangePrompt: (maxRange: number) => `Escolha no máximo ${maxRange} dias`,
  },
  rCascader: {
    select: 'Selecione',
  },
  rPagination: {
    prev: 'Anterior',
    next: 'Próximo',
  },
  rPullRefresh: {
    pulling: 'Puxe para atualizar...',
    loosing: 'Solte para atualizar...',
  },
  rSubmitBar: {
    label: 'Total:',
  },
  rCoupon: {
    unlimited: 'Ilimitado',
    discount: (discount: number) => `${discount * 10}% de desconto`,
    condition: (condition: number) => `Pelo menos ${condition}`,
  },
  rCouponCell: {
    title: 'Cupom',
    count: (count: number) => `Você possui ${count} cupom(ns)`,
  },
  rCouponList: {
    exchange: 'Usar',
    close: 'Fechar',
    enable: 'Disponível',
    disabled: 'Indisponível',
    placeholder: 'Código do cupom',
  },
  rAddressEdit: {
    area: 'Área',
    areaEmpty: 'Por favor, selecione uma área de recebimento',
    addressEmpty: 'Endereço não pode ser vazio',
    addressDetail: 'Endereço',
    defaultAddress: 'Usar como endereço padrão',
  },
  rAddressList: {
    add: 'Adicionar novo endereço',
  },
};

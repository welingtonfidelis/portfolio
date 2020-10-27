export default {
  maskValue(value) {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  },
  maskDate(date) {
    return Intl.DateTimeFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(date);
  }
}
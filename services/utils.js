module.exports = {
  maskValue(value) {
    return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  },

  maskDate(date) {
    return Intl.DateTimeFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(date);
  },

  async fileToBase64(file) {
    const result_base64 = await new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    });

    return result_base64;
  },
}
export const maskCPF = (CPF: string) => {
  CPF = CPF.replace(/\D/g, '')

  if (CPF.length <= 11) {
    CPF = CPF.replace(/(\d{3})(\d)/, '$1.$2')
    CPF = CPF.replace(/(\d{3})(\d)/, '$1.$2')
    CPF = CPF.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  } else {
    CPF = CPF.replace(/^(\d{2})(\d)/, '$1.$2')
    CPF = CPF.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    CPF = CPF.replace(/\.(\d{3})(\d)/, '.$1/$2')
    CPF = CPF.replace(/(\d{4})(\d)/, '$1-$2')
  }

  return CPF
}

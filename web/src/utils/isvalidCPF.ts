export function isValidCPF(CPF: string) {
  CPF = CPF.replace(/\D/g, '')
  if (
    CPF.length !== 11 ||
    !Array.from(CPF).filter((e) => e !== CPF[0]).length
  ) {
    return false
  }

  let sum = 0
  let rest

  for (let i = 1; i <= 9; i++)
    sum = sum + parseInt(CPF.substring(i - 1, i)) * (11 - i)

  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) rest = 0

  if (rest !== parseInt(CPF.substring(9, 10))) return false

  sum = 0

  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(CPF.substring(i - 1, i)) * (12 - i)

  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) rest = 0

  if (rest !== parseInt(CPF.substring(10, 11))) return false

  return true
}

export function generateCPF() {
  const number01 = randomNumber()
  const number02 = randomNumber()
  const number03 = randomNumber()

  const dig1 = dig(number01, number02, number03) // agora só uma função dig
  const dig2 = dig(number01, number02, number03, number01) // mesma função dig aqui

  const CPF = `${number01}${number02}${number03}${dig1}${dig2}`

  return CPF
}

function dig(n1: string, n2: string, n3: string, n4?: string) {
  const nums = n1.split('').concat(n2.split(''), n3.split(''))

  if (n4 !== undefined) {
    nums[9] = n4
  }

  let x = 0

  for (let i = n4 !== undefined ? 11 : 10, j = 0; i >= 2; i--, j++) {
    x += parseInt(nums[j]) * i
  }

  const y = x % 11

  return y < 2 ? 0 : 11 - y
}

function randomNumber() {
  const aleat = Math.floor(Math.random() * 999)
  return ('' + aleat).padStart(3, '0')
}

const  createArray=(total:number, value:number) =>   Array.from(Array(total), () => numberRandom(value));


const numberRandom =(value:number) =>  Math.round(Math.random() * value);

const  mod=(dividendo:number, divisor:number) =>  Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));




export function cpf() {
  let total_array = 9;
  let n = 9;
  let [n1, n2, n3, n4, n5, n6, n7, n8, n9] = createArray(total_array, n);

  let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
  d1 = 11 - (mod(d1, 11));
  if (d1 >= 10) d1 = 0;

  let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
  d2 = 11 - (mod(d2, 11));
  if (d2 >= 10) d2 = 0;

 
    return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
}
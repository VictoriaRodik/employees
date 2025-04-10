const units = [
  "",
  "одна",
  "дві",
  "три",
  "чотири",
  "п'ять",
  "шість",
  "сім",
  "вісім",
  "дев'ять",
];

const teens = [
  "десять",
  "одинадцять",
  "дванадцять",
  "тринадцять",
  "чотирнадцять",
  "п'ятнадцять",
  "шістнадцять",
  "сімнадцять",
  "вісімнадцять",
  "дев'ятнадцять",
];

const tens = [
  "",
  "",
  "двадцять",
  "тридцять",
  "сорок",
  "п'ятдесят",
  "шістдесят",
  "сімдесят",
  "вісімдесят",
  "дев'яносто",
];

const hundreds = [
  "",
  "сто",
  "двісті",
  "триста",
  "чотириста",
  "п'ятсот",
  "шістсот",
  "сімсот",
  "вісімсот",
  "дев'ятсот",
];

const thousandForms = ["тисяча", "тисячі", "тисяч"];
const millionForms = ["мільйон", "мільйони", "мільйонів"];

function getPluralForm(n: number, forms: string[]): string {
  const cases = [2, 0, 1, 1, 1, 2];
  return forms[n % 100 > 4 && n % 100 < 20 ? 2 : cases[Math.min(n % 10, 5)]];
}

function convertLessThanThousand(num: number): string {
  if (num === 0) return "";

  let result = "";

  const hundred = Math.floor(num / 100);
  if (hundred > 0) {
    result += hundreds[hundred] + " ";
  }

  const remainder = num % 100;

  if (remainder >= 10 && remainder < 20) {
    result += teens[remainder - 10];
    return result.trim();
  }

  const ten = Math.floor(remainder / 10);
  const unit = remainder % 10;

  if (ten > 0) {
    result += tens[ten] + " ";
  }

  if (unit > 0) {
    result += units[unit];
  }

  return result.trim();
}

export function numberToWords(num: number): string {
  if (num === 0) return "нуль";

  let result = "";

  const thousands = Math.floor(num / 1000);
  if (thousands > 0) {
    result +=
      convertLessThanThousand(thousands) +
      " " +
      getPluralForm(thousands, thousandForms) +
      " ";
    num %= 1000;
  }

  const millions = Math.floor(num / 1000000);
  if (millions > 0) {
    result +=
      convertLessThanThousand(millions) +
      " " +
      getPluralForm(millions, millionForms) +
      " ";
    num %= 1000000;
  }

  const remainder = convertLessThanThousand(num);
  if (remainder) {
    result += remainder;
  }

  return result.trim();
}

export function moneyToWords(amount: number): string {
  const hryvnias = Math.floor(amount);
  const kopecks = Math.round((amount - hryvnias) * 100);

  let result =
    numberToWords(hryvnias) +
    " " +
    getPluralForm(hryvnias, ["гривня", "гривні", "гривень"]);

  if (kopecks > 0) {
    result +=
      " " +
      (kopecks < 10 ? "0" : "") +
      kopecks +
      " " +
      getPluralForm(kopecks, ["копійка", "копійки", "копійок"]);
  }

  return result;
}

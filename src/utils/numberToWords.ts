export function numberToWords(amount: number): string {
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];

  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  function convertTwoDigits(num: number): string {
    if (num === 0) return '';
    if (num < 20) return ones[num];
    const ten = Math.floor(num / 10);
    const one = num % 10;
    return tens[ten] + (one > 0 ? ' ' + ones[one] : '');
  }

  function convertThreeDigits(num: number): string {
    if (num === 0) return '';
    const hundred = Math.floor(num / 100);
    const remainder = num % 100;
    let result = '';
    if (hundred > 0) {
      result += ones[hundred] + ' Hundred';
      if (remainder > 0) result += ' ';
    }
    if (remainder > 0) {
      result += convertTwoDigits(remainder);
    }
    return result;
  }

  if (amount === 0) return 'Zero Rupees';

  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);

  if (rupees === 0 && paise === 0) return 'Zero Rupees';

  let result = '';

  // Convert rupees using Indian numbering system
  if (rupees > 0) {
    let num = rupees;
    const parts: string[] = [];

    // Crores
    if (num >= 10000000) {
      const crores = Math.floor(num / 10000000);
      parts.push(convertThreeDigits(crores) + ' Crore');
      num %= 10000000;
    }

    // Lakhs
    if (num >= 100000) {
      const lakhs = Math.floor(num / 100000);
      parts.push(convertThreeDigits(lakhs) + ' Lakh');
      num %= 100000;
    }

    // Thousands
    if (num >= 1000) {
      const thousands = Math.floor(num / 1000);
      parts.push(convertThreeDigits(thousands) + ' Thousand');
      num %= 1000;
    }

    // Hundreds, Tens, Ones
    if (num > 0) {
      parts.push(convertThreeDigits(num));
    }

    result = parts.join(' ').trim();
    result += ' Rupee' + (rupees !== 1 ? 's' : '');
  }

  // Convert paise
  if (paise > 0) {
    if (result) result += ' and ';
    result += convertTwoDigits(paise) + ' Paise';
  }

  return result.charAt(0).toUpperCase() + result.slice(1);
}


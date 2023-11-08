export const prefix = [
    "Начало", "Конец", "Середина",
    "Первая половина", "Вторая половина", 
    "Первая треть", "Вторая треть", "Третья треть",
    "Первая четверть", "Вторая четверть", "Третья четверть", "Четвертая четверть",
    "около", "не ранее", "не позднее"
]

export function centurize(year: number) {
    return Math.ceil(year/100)
}

export const romanize = (original: number): string => {
    if (original === 0) return "0"
    if (original < 0 || original > 3999) return 'Error: Input integer limited to 1 through 3,999'
  
    const numerals = [
      ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1-9
      ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10-90
      ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 100-900
      ['M', 'MM', 'MMM'], // 1000-3000
    ];
  
    const digits = Math.round(original).toString().split('');
    let position = (digits.length - 1);
  
    return digits.reduce((roman, digit) => {
      if (digit !== '0') {
        roman += numerals[position][parseInt(digit) - 1];
      }
  
      position -= 1;
  
      return roman;
    }, '');
}

export function getPrefix(start: number, end: number) {
    if (Math.abs(start) < Math.abs(end)) {
        if ((start - 1) % 100 === 0) {
            switch (end - start) {
                case 14:
                    return {prefix: "Начало", century: true}
                case 49:
                    return {prefix: "Первая половина", century: true}
                case 32:
                    return {prefix: "Первая треть", century: true}
                case 24:
                    return {prefix: "Первая четверть", century: true}
                default:
                    return null;
            }
        } else if (end % 100 === 0) {
            switch (end - start) {
                case 15:
                    return {prefix: "Конец", century: true}
                case 49:
                    return {prefix: "Вторая половина", century: true}
                case 33:
                    return {prefix: "Третья треть", century: true}
                case 24:
                    return {prefix: "Четвертая четверть", century: true}
                default:
                    return null;
            }
        } else if ((start % 100 === 34) && (end - start === 32)) {
            return {prefix: "Вторая треть", century: true}
        } else if ((start % 100 === 26) && (end - start === 34)) {
            return {prefix: "Вторая четверть", century: true}
        } else if ((start % 100 === 51) && (end - start === 24)) {
            return {prefix: "Третья четверть", century: true}
        } else if ((start % 100 === 45) && (end - start === 10)) {
            return {prefix: "Середина", century: true}
        } else if (end === Infinity) {
            return {prefix: "не ранее", century: false}
        }
    } else if (start === Infinity) {
        return {prefix: "не позднее", century: false}
    } else if ((start !== 0) && (start === end)) {
        return {prefix: "около", century: false}
    }
    return null;
}

export function getDatingLable(start: number, end: number) {
    const prefix = getPrefix(start, end)
    const difference = Math.abs(Math.abs(start) - Math.abs(end))

    if (start === 0 && end === 0) return "__"

    if (!!prefix) {
        if (prefix.century) {
            const century = romanize(centurize(Math.abs(start)))
            return `${prefix.prefix} ${century} века`
        } else {
            const year = start === Infinity ? end : start
            return `${prefix.prefix} ${year} года`
        }
    } else if (difference === 99) {
        if (start > 0) return `${romanize(centurize(start))} век`
        else return `${romanize(centurize(end))} век до н.э.`
    }
}
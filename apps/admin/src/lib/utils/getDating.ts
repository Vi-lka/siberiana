export type Prefix = {
    label: string;
    start: string;
    end: string;
}

export const ERA = [
    {start: -2500000, end: -9001, label: "Палеолит"},
    {start: -100000, end: -40001, label: "Средний палеолит"},
    {start: -40000, end: -9001, label: "Верхний палеолит"},
    {start: -2500000, end: -100001, label: "Нижний палеолит"},
    {start: -9000, end: -7001, label: "Мезолит"},
    {start: -7000, end: -3901, label: "Неолит"},
    {start: -7000, end: -5501, label: "Ранний неолит"},
    {start: -5500, end: -3901, label: "Поздний неолит"},
    {start: -3900, end: -3501, label: "Энеолит"},
    {start: -3500, end: -1000, label: "Бронзовый век"},
    {start: -3500, end: -2101, label: "Ранний бронзовый век"},
    {start: -2100, end: -1601, label: "Средний бронзовый век"},
    {start: -1600, end: -1201, label: "Развитый бронзовый век"},
    {start: -1200, end: -1001, label: "Финальный бронзовый век"},
    {start: -1000, end: -801, label: "Переход от бронзового к раннему железному веку"},
    {start: -800, end: -501, label: "Ранний железный век"},
    {start: -800, end: -201, label: "Скифское время"},
    {start: -150, end: 150, label: "Хуннское время"},
    {start: 250, end: 550, label: "Сяньбийско-жужанское время"},
    {start: 550, end: 800, label: "Тюркское время"},
    {start: 550, end: 1601, label: "Средневековье"},
    {start: 550, end: 1000, label: "Раннее средневековье"},
    {start: 1001, end: 1401, label: "Развитое средневековье"},
    {start: 1401, end: 1601, label: "Позднее средневековье"},
    {start: 1201, end: 1550, label: "Монгольское время"},
    {start: 1601, end: 1800, label: "Раннее Новое время"},
    {start: 1601, end: 1900, label: "Новое время"},
]

export const PREFIXES = [
    {label: "Начало", start: "01", end: "15"},
    {label: "Конец", start: "85", end: "00"},
    {label: "Середина", start: "45", end: "55"},
    {label: "Первая половина", start: "01", end: "50"},
    {label: "Вторая половина", start: "51", end: "00"},
    {label: "Первая треть", start: "01", end: "33"},
    {label: "Вторая треть", start: "34", end: "66"},
    {label: "Третья треть", start: "67", end: "00"},
    {label: "Первая четверть", start: "01", end: "25"},
    {label: "Вторая четверть", start: "26", end: "50"},
    {label: "Третья четверть", start: "51", end: "75"},
    {label: "Четвертая четверть", start: "76", end: "00"},
] as Prefix[]

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

export function getEra(start: number, end: number): string | false {
    const result = ERA.find(item => (item.start === start && item.end === end))
    if (!!result) return result.label
    else return false
}

// OOOOO MYYYY GOOOOOOD, THIS IS SHIT
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
        } else if ((start % 100 === 26) && (end - start === 24)) {
            return {prefix: "Вторая четверть", century: true}
        } else if ((start % 100 === 51) && (end - start === 24)) {
            return {prefix: "Третья четверть", century: true}
        } else if ((start % 100 === 45) && (end - start === 10)) {
            return {prefix: "Середина", century: true}
        } else if (end === 999999) {
            return {prefix: "не ранее", century: false}
        }
    } else if (start === 999999) {
        return {prefix: "не позднее", century: false}
    } else if ((start !== 0) && (start === end)) {
        return {prefix: "около", century: false}
    }
    return null;
}

// OOOOO MYYYY GOOOOOOD, THIS IS SHIT
export function getDating(start: number, end: number): string {
    const prefix = getPrefix(start, end)
    const difference = Math.abs(Math.abs(start) - Math.abs(end))

    if (start === 0 && end === 0) return "__"

    if (!!prefix) {
        if (prefix.century) {
            const century = romanize(centurize(Math.abs(start)))
            return `${prefix.prefix} ${century} века`
        } else {
            const year = start === 999999 ? end : start
            return `${prefix.prefix} ${year} года`
        }
    } else if (difference === 99) {
        if (start > 0) return `${romanize(centurize(Math.abs(start)))} век`
        else return `${romanize(centurize(Math.abs(end)))} век до н.э.`
    }
    else {
        const era = getEra(start, end)

        if (era) {
            return era
        } else {
            if ((start % 10 === 0) && (end - start === 9)) return `${start}-е годы`
            if ((start % 10 === 0) && ((end - start) > 9) && ((end - start)%10 === 9)) return `${start}-${end-9}-е годы`
            else {
                if (end !== 0) {
                    return `${start}-${end} гг.`
                } else return `${start} г.`
            }
        }
    }
}
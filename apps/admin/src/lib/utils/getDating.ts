export type Prefix = {
  label: string;
  start: string;
  startBC: string | undefined;
  end: string;
};

export type DatingType = "year" | "century" | "millennium";

export type Era = {
  start: number,
  end: number,
  label: string,
}

export const ERA = [
  { start: -2500000, end: -9001, label: "Палеолит" },
  { start: -100000, end: -40001, label: "Средний палеолит" },
  { start: -40000, end: -9001, label: "Верхний палеолит" },
  { start: -2500000, end: -100001, label: "Нижний палеолит" },
  { start: -9000, end: -7001, label: "Мезолит" },
  { start: -7000, end: -3901, label: "Неолит" },
  { start: -7000, end: -5501, label: "Ранний неолит" },
  { start: -5500, end: -3901, label: "Поздний неолит" },
  { start: -3900, end: -3501, label: "Энеолит" },
  { start: -3500, end: -1000, label: "Бронзовый век" },
  { start: -3500, end: -2101, label: "Ранний бронзовый век" },
  { start: -2100, end: -1601, label: "Средний бронзовый век" },
  { start: -1600, end: -1201, label: "Развитый бронзовый век" },
  { start: -1200, end: -1001, label: "Финальный бронзовый век" },
  {
    start: -1000,
    end: -801,
    label: "Переход от бронзового к раннему железному веку",
  },
  { start: -800, end: -501, label: "Ранний железный век" },
  { start: -800, end: -201, label: "Скифское время" },
  { start: -150, end: 150, label: "Хуннское время" },
  { start: 250, end: 550, label: "Сяньбийско-жужанское время" },
  { start: 550, end: 800, label: "Тюркское время" },
  { start: 550, end: 1601, label: "Средневековье" },
  { start: 550, end: 1000, label: "Раннее средневековье" },
  { start: 1001, end: 1401, label: "Развитое средневековье" },
  { start: 1401, end: 1601, label: "Позднее средневековье" },
  { start: 1201, end: 1550, label: "Монгольское время" },
  { start: 1601, end: 1800, label: "Раннее Новое время" },
  { start: 1601, end: 1900, label: "Новое время" },
] as Era[];

export const PREFIXES = [
  { label: "Начало", start: "01", startBC: "85", end: "15" },
  { label: "Конец", start: "85", startBC: "01", end: "00" },
  { label: "Середина", start: "45", startBC: "55", end: "55" },
  { label: "Первая половина", start: "01", end: "50" },
  { label: "Вторая половина", start: "51", end: "00" },
  { label: "Первая треть", start: "01", end: "33" },
  { label: "Вторая треть", start: "34", end: "66" },
  { label: "Третья треть", start: "67", end: "00" },
  { label: "Первая четверть", start: "01", end: "25" },
  { label: "Вторая четверть", start: "26", end: "50" },
  { label: "Третья четверть", start: "51", end: "75" },
  { label: "Четвертая четверть", start: "76", end: "00" },
] as Prefix[];

export function centurize(year: number) {
  return Math.ceil(Math.abs(year / 100));
}

export const romanize = (original: number): string => {
  if (original === 0) return "0";
  if (original < 0 || original > 3999)
    return "Error: Input integer limited to 1 through 3,999";

  const numerals = [
    ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], // 1-9
    ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"], // 10-90
    ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"], // 100-900
    ["M", "MM", "MMM"], // 1000-3000
  ];

  const digits = Math.round(original).toString().split("");
  let position = digits.length - 1;

  return digits.reduce((roman, digit) => {
    if (digit !== "0") {
      roman += numerals[position][parseInt(digit) - 1];
    }

    position -= 1;

    return roman;
  }, "");
};

export function getEra(start: number, end: number): string | false {
  const result = ERA.find((item) => item.start === start && item.end === end);
  if (!!result) {
    return result.label
  } else {
    const firstResult = ERA.find((item) => item.start === start);
    const secondResult = ERA.find((item) => item.end === end);
    
    if (firstResult && secondResult) return `${firstResult.label} - ${secondResult.label}`
    else return false;
  }
}

// OOOOO MYYYY GOOOOOOD, THIS IS SHIT
export function getPrefix(start: number, end: number) {
  const startAbs = start < 0 && end < 0 ? Math.abs(end) : Math.abs(start);
  const endAbs = start < 0 && end < 0 ? Math.abs(start) : Math.abs(end);
  if (startAbs < endAbs) {
    if ((startAbs - 1) % 100 === 0 && end < 999999) {
      switch (endAbs - startAbs) {
        case 14:
          return { prefix: "Начало", century: true };
        case 49:
          return { prefix: "Первая половина", century: true };
        case 32:
          return { prefix: "Первая треть", century: true };
        case 24:
          return { prefix: "Первая четверть", century: true };
      }
    } else if (endAbs % 100 === 0 && startAbs < 999999) {
      switch (endAbs - startAbs) {
        case 15:
          return { prefix: "Конец", century: true };
        case 49:
          return { prefix: "Вторая половина", century: true };
        case 33:
          return { prefix: "Третья треть", century: true };
        case 24:
          return { prefix: "Четвертая четверть", century: true };
      }
    } else if (startAbs % 100 === 34 && endAbs - startAbs === 32) {
      return { prefix: "Вторая треть", century: true };
    } else if (startAbs % 100 === 26 && endAbs - startAbs === 24) {
      return { prefix: "Вторая четверть", century: true };
    } else if (startAbs % 100 === 51 && endAbs - startAbs === 24) {
      return { prefix: "Третья четверть", century: true };
    } else if (startAbs % 100 === 45 && endAbs - startAbs === 10) {
      return { prefix: "Середина", century: true };
    } else if (endAbs === 999999) {
      return { prefix: "не ранее", century: false };
    }
  } else if (startAbs === 999999) {
    return { prefix: "не позднее", century: false };
  } else if (startAbs !== 0 && start === end) {
    return { prefix: "около", century: false };
  }
  return null;
}

export function getMultiPrefixData(start: number, end: number, type: DatingType) {
  const startAbs = Math.abs(start);
  const endAbs = Math.abs(end);

  const isMillennium = type === "millennium"

  // const startStarting = startAbs.toString().slice(0, 2)
  let startEnding = startAbs.toString().slice(-2);
  if (startEnding.length < 2) startEnding = "0" + startEnding;
  // const endStarting = endAbs.toString().slice(0, 2)
  let endEnding = endAbs.toString().slice(-2);
  if (endEnding.length < 2) endEnding = "0" + endEnding;

  const startPrefix = PREFIXES.find((item) => 
    start < 0 ? item.startBC === startEnding : item.start === startEnding
  );
  const endPrefix = PREFIXES.find((item) => 
    end < 0 ? item.startBC === endEnding : item.start === endEnding
  );

  const startCentury = romanize(centurize(Math.abs(start)));
  const endCentury = romanize(centurize(Math.abs(end)));

  const startString = startPrefix
    ? isMillennium 
      ? `${startPrefix.label} ${startCentury} тыс. ${start >= 0 ? "" : "до н.э."}`
      : `${startPrefix.label} ${startCentury} века ${start >= 0 ? "" : "до н.э."}`
       
    : isMillennium 
      ? `${startCentury} тыс. ${start >= 0 ? "" : "до н.э."}`
      : `${startCentury} век ${start >= 0 ? "" : "до н.э."}`;

  const endString = endPrefix
    ? isMillennium
      ? `${endPrefix.label} ${endCentury} тыс. ${end >= 0 ? "" : "до н.э."}`
      : `${endPrefix.label} ${endCentury} века ${end >= 0 ? "" : "до н.э."}`

    : isMillennium 
      ? `${endCentury} тыс. ${end >= 0 ? "" : "до н.э."}`
      : `${endCentury} век ${end >= 0 ? "" : "до н.э."}`;

  return `${startString} - ${endString}`;
}

export function getMillennium(start: number, end: number) {
  const usableStart = start/10
  const usableEnd = end/10
  const difference = Math.abs(Math.abs(start) - Math.abs(end));


  const prefix = getPrefix(usableStart, usableEnd);

  if (!!prefix && prefix.century) {
    const millennium = romanize(centurize(Math.abs(usableStart)));
    return start > 0
      ? `${prefix.prefix} ${millennium} тыс.`
      : `${prefix.prefix} ${millennium} тыс. до н.э.`;
  } else if (difference === 990) {
    if (start > 0) return `${romanize(centurize(Math.abs(usableStart)))} тыс.`;
    else return `${romanize(centurize(Math.abs(usableEnd)))} тыс. до н.э.`;
  } else return getMultiPrefixData(usableStart, usableEnd, "millennium")
}

// OOOOO MYYYY GOOOOOOD, THIS IS SHIT
export function getDating(
  start: number,
  end: number,
  type: DatingType,
): string {
  const prefix = getPrefix(start, end);
  const difference = Math.abs(Math.abs(start) - Math.abs(end));

  if (start === 0 && end === 0) return "";

  if (!!prefix) {
    if (prefix.century) {
      const century = romanize(centurize(Math.abs(start)));
      return start > 0
        ? `${prefix.prefix} ${century} века`
        : `${prefix.prefix} ${century} века до н.э.`;
    } else {
      const year = start === -999999 ? end : start;
      return `${prefix.prefix} ${year} года`;
    }
  } else if (difference === 99) {
    if (start > 0) return `${romanize(centurize(Math.abs(start)))} век`;
    else return `${romanize(centurize(Math.abs(end)))} век до н.э.`;
  } else {
    const era = getEra(start, end);

    if (era) {
      return era;
    } else {
      if (start % 10 === 0 && end - start === 9) return `${start}-е годы`;
      if (start % 10 === 0 && end - start > 9 && (end - start) % 10 === 9 && (end - start) < 190)
        return `${start}-${end - 9}-е годы`;
      else {
        if (end !== 0) {
          if (type === "century") { 
            return getMultiPrefixData(start, end, "century")
          } else if (type === "millennium") {
            return getMillennium(start, end)
          } else return `${start}-${end} гг.`;
        } else return `${start} г.`;
      }
    }
  }
}

export function generateValues(value: string, prefix: Prefix | undefined) {
  const valueNum = Number(value);
  const valueNumAbs = Math.abs(valueNum);

  const prefixStartNum = Number(prefix?.start);
  const prefixEndNum = Number(prefix?.end);

  const isDoubleDigitCentury = valueNumAbs < 11;
  const isInMiddle = prefixStartNum >= 51 && prefixEndNum < 75;

  const forStart = isDoubleDigitCentury
    ? "0" + (valueNumAbs - 1).toString()
    : (valueNumAbs - 1).toString();

  const forEnd = isDoubleDigitCentury
    ? isInMiddle
      ? "0" + value
      : "0" + (valueNumAbs - 1).toString()
    : isInMiddle
    ? value
    : (valueNumAbs - 1).toString();

  return { forStart, forEnd };
}

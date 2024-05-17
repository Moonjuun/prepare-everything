// 천자리 수 콤마 반환하는 함수
export const formatThousandsCommas = (input: string | number): string => {
  const str = typeof input === "number" ? String(input) : input;

  const formattedValue: string = str.replace(/[^\d.]+/g, "");
  const parts: string[] = formattedValue.split(".");
  const integerPart: string = parts[0].replace(
    /(\d)(?=(?:\d{3})+(?!\d))/g,
    "$1,"
  );
  const result: string =
    parts.length > 1 ? integerPart + "." + parts[1] : integerPart;

  return result;
};

export const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = today.getDate();
  return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
};

export const throttling = (cb: Function, distance = 100) => {
  let prevTime = 0;
  let timeout = 0;
  return () => {
    const nowTime = Date.now();
    if (prevTime && nowTime - prevTime < distance) {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        prevTime = nowTime;
        cb?.();
      }, distance);
    } else {
      prevTime = nowTime;
      cb?.();
    }
  };
};

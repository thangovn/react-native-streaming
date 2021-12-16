export const getTime = (t, isFormat) => {
    const digit = n => (n < 10 ? `0${n}` : `${n}`);
    const sec: any = digit(Math.floor(t % 60));
    const min: any = digit(Math.floor((t / 60) % 60));
    const hr: any = digit(Math.floor((t / 3600) % 60));
    if (isFormat) return min + ':' + sec;

    if (hr > 0 && min > 0 && sec > 0) {
        return `${hr}:${min}:${sec}`;
    }
    if (min > 0 && sec > 0) {
        return `${min}:${sec}`;
    }
    return `${sec}`;
    // return min + ':' + sec // this will convert sec to timer string
    // 33 -> 00:00:33
};

export function transformDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

export function transformDateArray(data: Date[]) {
    return data.map(value => {
        return `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`;
    });
}

export function transformId(id: string) {
    return new Date(id);
}

export function getFormatDate(date: Date) {
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    return `${date.getDate()} ${months[date.getMonth()]}, ${days[date.getDay()]}`
}

export const deepclone = (obj: any) => JSON.parse(JSON.stringify(obj));

export function getRangeFromDate(start: Date, end: Date) {
    let range = [];
    let startTime = start.getTime();
    const endTime = end.getTime();
    range.push(start);

    const PERIOD = 1000 * 60 * 60 * 24;

    while (startTime < endTime) {
        range.push(new Date(startTime + PERIOD));
        startTime += PERIOD;
    }

    return range;
};
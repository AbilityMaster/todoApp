/***
 * Создает id, преобразуя значение даты в строку
 * @param date
 */

export function transformDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

/***
 * Создает несколько id, преобразуя массив с датами в массив с строками
 * @param data
 */

export function transformDateArray(data: Date[]) {
    console.log(data);
    return data.map(value => {
        return `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`;
    });
}

/***
 * Преобразует массив из текстовых id, в массив с датами
 * @param data
 */

export function transformStringArray(data: string[]) {
    return data.map(value => {
        return new Date(value);
    });
}

/***
 * Преобразовывает из id типа строки в дату
 * @param id
 */

export function transformId(id: string) {
    return new Date(id);
}

/***
 * Преобразовывает дату в строку вида "27 июля, суббота"
 * @param date
 */

export function getFormatDate(date: Date) {
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    return `${date.getDate()} ${months[date.getMonth()]}, ${days[date.getDay()]}`
}

export const deepclone = (obj: any) => JSON.parse(JSON.stringify(obj));

/***
 * Для получения массива дат из выбранного диапозона,
 * при выборе диапазона в календаре, созхдается объект, в нем хранится начальная дата и конечная дата,
 * функция getRangeFromDate, перебирает даты в этом диапозоне и возвращает их в виде массива
 * @param start
 * @param end
 */

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

/***
 *  Возначает начальное состояние для свойств объекта, в котором хранится информация при выборе
 *  из календаря диапазона дат
 *
 */

export function getInitialStateForRange(): {from: any, to: any, enteredTo: any} {
    return {
        from: null,
        to: null,
        enteredTo: null
    }
}

/***
 * Обновляет массив с выбранными датам для календаря
 * @param dates
 * @param oldDate
 * @param newDate
 */

export function updateDateArray( dates: Date[], oldDate: string, newDate: string) {
    let _dates = transformDateArray(dates);
    const del = _dates.findIndex(value => value === oldDate);
    _dates.splice(del, 1);
    _dates.push(newDate);

    return transformStringArray(_dates);
}

export function transformToGroupConfig(config: any) {
    const _config = deepclone(config);
    const keys: any = [];

    // eslint-disable-next-line array-callback-return
    _config.filter( (item: any) => {
        if (!keys.find((value: any) => value.idDay === item.idDay)) {
            keys.push({ idDay: item.idDay});
        }
    });

    keys.forEach( (value: any) => {
        // eslint-disable-next-line array-callback-return
        value.tasks = _config.filter((item: any) => {
            if (item.idDay === value.idDay) {
                return item;
            }
        });
    });

    return keys;
}

export function isEmptyArray(data: any) {
    return data.length === 0;
}
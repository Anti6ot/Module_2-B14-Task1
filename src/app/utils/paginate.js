import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize; // страница на которой мы находимся в днный момент - 1 * 4
    return _(items).slice(startIndex).take(pageSize).value(); // возвращает 4 юзера начиная со startIndex
}

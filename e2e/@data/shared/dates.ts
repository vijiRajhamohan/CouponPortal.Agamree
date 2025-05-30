const moment = require('moment');

export const today: moment.Moment = (() => {
    return moment().format('MM/DD/YYYY');
})();

export const rolling365: moment.Moment = (() => {
    const today = moment();
    let rolling365: any;
    today.add(1, 'years').isLeapYear() ? (rolling365 = moment().add(365, 'days')) : (rolling365 = moment().add(364, 'days'));
    return rolling365.format('MM/DD/YYYY');
})();

export const endOfNextYear: moment.Moment = (() => {
    const nextYear = moment().year() + 1;
    const endOfNextYear = moment(`12 31 ${nextYear}`, 'MM DD YYYY');
    return endOfNextYear.format('MM/DD/YYYY');
})();

export const endOfCurrentYear: moment.Moment = (() => {
    const currentYear = moment().year();
    const endOfCurrentYear = moment(`12 31 ${currentYear}`, 'MM DD YYYY');
    return endOfCurrentYear.format('MM/DD/YYYY');
})();

export enum Month {
    JAN = 1,
    FEB,
    MAR,
    APR,
    MAY,
    JUN,
    JUL,
    AUG,
    SEP,
    OCT,
    NOV,
    DEC,
}

export const monthNames: string[] = (() => {
    const monthNames: string[] = [];
    for (const enumMember in Month) {
        const isValueProperty = parseInt(enumMember, 10) >= 0;
        if (isValueProperty) {
            monthNames.push(Month[enumMember]);
        }
    }
    return monthNames;
})();

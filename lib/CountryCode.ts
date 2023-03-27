const { getCode } = require('country-list');

export const getCountryCode = (name: string) => {
    return getCode(name).toLowerCase();
};
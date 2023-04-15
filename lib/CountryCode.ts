const { getCode } = require('country-list');

export const getCountryCode = (name: string) => {
    try {
        return getCode(name).toLowerCase();
    } catch (error) {
        return '';
    }
};
const { getCode } = require('country-list');

export const getCountryCode = (name: string) => {
    try {
        switch(name) {
            case 'England':
                return 'gb-eng';
            case 'Wales':
                return 'gb-wls';
            case 'Scotland':
                return 'gb-sct';
            case 'Northern Ireland':
                return 'gb-nir';
            default:
                return getCode(name).toLowerCase();
        }
    } catch (error) {
        return '';
    }
};
export function getPositionAcronym(position: string): string {
    switch (position) {
        case 'Attacker':
            return 'FWD';
        case 'Midfielder':
            return 'MID';
        case 'Defender':
            return 'DEF';
        case 'Goalkeeper':
            return 'GK';
        default:
            throw new Error('Invalid position');
    }
}
import { isp_types } from '../handlers/selectMenuHandler/select-menu.js';

const NumberWithPrefix = (prefix: string, list: string[]): string => {
    const remainingDigits = 10 - prefix.length - 1; // 1 for the leading '0'
    let randomNumber = '';
    for (let i = 0; i < remainingDigits; i ++) {
        const digit = Math.floor(Math.random() * 10);
        randomNumber += digit.toString();
    }

    const result = '0' + prefix + randomNumber;
    if (list.includes(result)) {
        return NumberWithPrefix(prefix, list)
    }
    return result
}

const GenerateNumbers = (prefix: string, count: number) => {
    const numbers: string[] = []
    for (let i = 0; i < count; i ++) {
        numbers.push(`\`${ NumberWithPrefix(prefix, numbers) }\``)
    }
    return numbers
}

const Prefix = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)]
}

/* Default Number Generation Count */
const Count = 5

export const ISPGen: Record<isp_types, () => Array<string>> = {
    mobitel: () => {
        return GenerateNumbers(Prefix([ '71', '70' ]), Count)
    },
    dialog: () => {
        return GenerateNumbers(Prefix([ '76', '77', '74' ]), Count)
    },
    hutch: () => {
        return GenerateNumbers(Prefix([ '72', '78' ]), Count)
    },
    airtel: () => {
        return GenerateNumbers(Prefix(['75']), Count)
    }
}

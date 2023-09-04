import { card_types } from '../handlers/selectMenuHandler/select-menu.js'
import { BIN } from './bin.js'

class CheckSumRules {
    constructor (
        public readonly length: number,
        public index: number
    ) {}

    public next () {
        this.index !== 2 ? this.index = 2 : this.index = 1
    }

    public LuhnCheckSum (number: string): boolean {
        if (number.length !== this.length) {
            return false
        }
    
        const Sums = {
            product: 0,
            sum: 0
        }
    
        for (const digit of number) {
            const sum = parseInt(digit) * this.index
    
            if (sum >= 10) {
                for (const i of String(sum)) {
                    Sums.sum += parseInt(i)
                }
                Sums.product += Sums.sum
                Sums.sum = 0
            } else {
                Sums.product += sum
            }
    
            this.next()
        }

        return Sums.product % 10 === 0 
    }
}

class CardGen {
    constructor (
        private readonly bin: number[],
        private readonly length: number
    ) {}

    private cvv (list: number[]): number {
        const digit = Math.floor(Math.random() * (999 - 100 + 1)) + 100
        if (list.includes(digit)) {
            return this.cvv(list)
        }
        return digit
    }

    private expire (list: string[]): string {
        const currentYear = new Date().getFullYear()
        const maxYear = currentYear + 5

        const randomYear = Math.floor(Math.random() * (maxYear - currentYear + 1)) + currentYear
        const randomMonth = Math.floor(Math.random() * 12) + 1

        const formattedMonth = String(randomMonth).padStart(2, '0')
        const formattedYear = String(randomYear + 1);

        const expiredate = `${ formattedMonth }/${ formattedYear }`

        if (list.includes(expiredate)) {
            return this.expire(list)
        }
        return expiredate
    }

    private mod10Number (list: string[], bin: number[], numDigits: number): string {
        const digits = [ ...bin, ...Array.from({ length: numDigits - (1 + bin.length) }, () => Math.floor(Math.random() * 10)) ]
    
        let total = 0
        for (let i = 0; i < digits.length; i ++) {
            const digit = digits[digits.length - 1 - i]
            if ((i + 1) % 2 === 0) {
                total += digit
            } else {
                const doubled = digit * 2
                total += doubled > 9 ? doubled - 9 : doubled
            }
        }
    
        const checkDigit = (10 - (total % 10)) % 10
        digits.push(checkDigit)

        const mod10Number = digits.join('')
        const Rules = new CheckSumRules(numDigits, 2)

        if (list.includes(mod10Number) || !Rules.LuhnCheckSum(mod10Number)) {
            return this.mod10Number(list, bin, numDigits)
        }
        return mod10Number
    }

    public generate (quantity: number) {
        const cards: string[] = []
        const cvvs: number[] = []
        const dates: string[] = []

        const result: Record<'cards', Array<Array<number|string>>> = {
            cards: []
        }

        for (let i = 1; i <= quantity; i ++) {
            const cardNumber = this.mod10Number(cards, this.bin, this.length)
            const cvv = this.cvv(cvvs)
            const date = this.expire(dates)

            cards.push(cardNumber)
            cvvs.push(cvv)
            dates.push(date)

            result['cards'].push([ cardNumber, cvv, date ]) 
        }

        return result
    }
}

export const CardData = (card_bin_id: card_types) => {
    const { bins, digits } = BIN[card_bin_id]
    const bin = bins[Math.floor(Math.random() * bins.length)]
    const FakeData = new CardGen(bin, digits)
    const { cards } = FakeData.generate(10)
    return cards
}

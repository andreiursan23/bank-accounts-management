import { Currency } from '../features/accounts/types'

type ExchangeRates = Record<Currency, number>

interface UseCurrencyConverterResult {
  convert: (amount: number, from: Currency, to: Currency) => number
}

const useCurrencyConverter = (): UseCurrencyConverterResult => {
  const fixedRates: ExchangeRates = {
    [Currency.EUR]: 1,
    [Currency.USD]: 1.08,
    [Currency.GBP]: 0.88
  }

  const convert = (amount: number, from: Currency, to: Currency): number => {
    const fromRate = fixedRates[from]
    const toRate = fixedRates[to]

    if (fromRate === undefined || toRate === undefined) return 0

    return parseFloat(((amount / fromRate) * toRate).toFixed(2))
  }

  return { convert }
}

export default useCurrencyConverter

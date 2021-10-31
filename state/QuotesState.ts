import {action, makeAutoObservable} from "mobx";
import axios from "axios";

export interface ITicker {
    id: number ;
    name: string ;
    last: string ;
    lowestAsk: string ;
    highestBid: string ;
    percentChange: string ;
    baseVolume: string ;
    quoteVolume: string ;
    isFrozen: string ;
    postOnly: string ;
    high24hr: string ;
    low24hr: string ;
}

class QuotesState  {
    quotes: ITicker[] = []
    loading: boolean = false
    error: boolean = false
    errorMessage: string = ''

    constructor() {
        makeAutoObservable(this, {
            getQuotes: action.bound
        })
    }

    async getQuotes() {
        this.setLoading()
        this.clearError()
        try {
            const quotesData: ITicker[] = []
            const {data} = await axios.get('https://poloniex.com/public?command=returnTicker')
            for (let key in data) {
                data[key].name = key
                quotesData.push(data[key]
                )
            }
            this.refreshData(quotesData)
            this.setLoading()
        } catch (e) {
            this.setError()
            console.log(e)
        }
    }

    refreshData(value:ITicker[]) {
        this.quotes = value
    }

    setLoading() {
        this.loading = !this.loading
    }

    setError() {
        this.error = true
        this.errorMessage = 'Ошибка'
    }

    clearError() {
        this.error = false
        this.errorMessage = ''
    }

}

export default new QuotesState();
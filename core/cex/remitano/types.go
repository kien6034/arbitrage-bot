package remitano

type CoinAccount struct {
	CoinCurrency     string  `json:"coin_currency"`
	Address          string  `json:"address"`
	AvailableBalance float64 `json:"available_balance"`
	FrozenBalance    float64 `json:"frozen_balance"`
}

type BalanceResponse struct {
	Data []CoinAccount `json:"data"`
}

type PriceDetail struct {
	Bid float64 `json:"bid"`
	Ask float64 `json:"ask"`
}

type PriceResponse map[string]PriceDetail
type CurrencyDetail struct {
	ID        string  `json:"id"`
	Code      string  `json:"code"`
	Name      string  `json:"name"`
	Active    bool    `json:"active"`
	Type      string  `json:"type"`
	Fee       float64 `json:"fee"`
	Precision int     `json:"precision"`
	// Limits    struct {
	// 	Amount struct {
	// 		Min string `json:"min"`
	// 		Max string `json:"max"`
	// 	} `json:"amount"`
	// 	Withdraw struct {
	// 		Min string `json:"min"`
	// 		Max string `json:"max"`
	// 	} `json:"withdraw"`
	// } `json:"limits"`
}

type CurrenciesInfo map[string]CurrencyDetail

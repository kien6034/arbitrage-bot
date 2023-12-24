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

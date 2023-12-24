package remitano

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	utils "github.com/kien6034/arbitrage-bot/core/utils"
)

const RemitanoBaseURL = "https://api.remitano.com/api/v1/"

type Remitano struct {
	AccessKey string
	SecretKey string
}

func NewRemitano(accessKey, secretKey string) *Remitano {
	return &Remitano{
		AccessKey: accessKey,
		SecretKey: secretKey,
	}
}

func (r *Remitano) DoApiRequest(url, method, data string) (*http.Response, error) {
	if r.SecretKey == "" || r.AccessKey == "" {
		return nil, fmt.Errorf("missing API keys")
	}

	client := &http.Client{}
	fullURL := RemitanoBaseURL + url
	req, err := http.NewRequest(method, fullURL, strings.NewReader(getStringData(data)))
	if err != nil {
		return nil, err
	}

	md5Hash := ComputeMD5(data)
	date := time.Now().UTC()
	formattedDate := strings.ReplaceAll(date.Format(time.RFC1123), "UTC", "GMT")

	reqUrl := "/api/v1/" + url
	signatureString := fmt.Sprintf("%s,application/json,%s,%s,%s", method, md5Hash, reqUrl, formattedDate)
	hmacSha1 := ComputeHmacSHA1(r.SecretKey, signatureString)

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Content-MD5", md5Hash)
	req.Header.Set("Date", formattedDate)
	req.Header.Set("Authorization", fmt.Sprintf("APIAuth %s:%s", r.AccessKey, hmacSha1))

	return client.Do(req)
}

func (r *Remitano) GetBalance(tokens []string) error {
	response, err := r.DoApiRequest("users/coin_accounts", "GET", "")
	if err != nil {
		return err
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("API request failed with status code: %d", response.StatusCode)
	}

	// Adjust here: Decode the response body directly into a slice of CoinAccount
	var accounts []CoinAccount
	err = json.NewDecoder(response.Body).Decode(&accounts)
	if err != nil {
		fmt.Println("Error decoding response body:", err)
		return err
	}

	// Process the balances
	for _, account := range accounts {
		if utils.Contains(tokens, account.CoinCurrency) {
			fmt.Printf("Currency: %s, Available: %f, Frozen: %f\n", account.CoinCurrency, account.AvailableBalance, account.FrozenBalance)
		}
	}

	return nil
}

func (r *Remitano) GetPrice(token0, token1 string) error {
	tokenPair := strings.ToUpper(token0) + strings.ToUpper(token1)
	response, err := r.DoApiRequest("tickers/price", "GET", "")

	if err != nil {
		return fmt.Errorf("error making API request: %v", err)
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("API request failed with status code: %d", response.StatusCode)
	}

	var priceResp PriceResponse
	err = json.NewDecoder(response.Body).Decode(&priceResp)
	if err != nil {
		return fmt.Errorf("error decoding response body: %v", err)
	}

	priceDetail, ok := priceResp[tokenPair]
	if !ok {
		return fmt.Errorf("price for token pair %s not found", tokenPair)
	}

	fmt.Printf("Bid: %f, Ask: %f\n", priceDetail.Bid, priceDetail.Ask)
	return nil
}

func (r *Remitano) GetCurrenciesInfo() (CurrenciesInfo, error) {
	response, err := r.DoApiRequest("currencies/info", "GET", "")
	if err != nil {
		return nil, fmt.Errorf("error making API request: %v", err)
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code: %d", response.StatusCode)
	}

	var currenciesInfo CurrenciesInfo
	err = json.NewDecoder(response.Body).Decode(&currenciesInfo)
	if err != nil {
		return nil, fmt.Errorf("error decoding response body: %v", err)
	}

	return currenciesInfo, nil
}

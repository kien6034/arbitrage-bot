package remitano

import (
	"crypto/hmac"
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	utils "github.com/kien6034/arbitrage-bot/core/utils"
)

const RemitanoBaseURL = "https://api.remitano.com/api/v1/"

func ComputeHmac(secret, method, data string) string {
	key := []byte(secret)
	h := hmac.New(sha256.New, key)
	h.Write([]byte(data))
	return base64.StdEncoding.EncodeToString(h.Sum(nil))
}

func getStringData(data string) string {
	if data == "" {
		// If data is an empty string, treat it as an empty JSON object to match TypeScript behavior
		data = "{}"
	}
	return data
}

func ComputeMD5(data string) string {
	hasher := md5.New()
	hasher.Write([]byte(getStringData(data)))
	md5Hash := base64.StdEncoding.EncodeToString(hasher.Sum(nil))
	return md5Hash
}

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

func ComputeHmacSHA1(secret, data string) string {
	key := []byte(secret)
	h := hmac.New(sha1.New, key)
	h.Write([]byte(data))
	return base64.StdEncoding.EncodeToString(h.Sum(nil))
}

func (r *Remitano) GetBalance(tokens []string) error {
	response, err := r.DoApiRequest("users/coin_accounts", "GET", "")
	if err != nil {
		fmt.Println("Error when doing request:", err)
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

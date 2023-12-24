package remitano

import (
	"crypto/hmac"
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"encoding/base64"
)

func ComputeHmacSHA1(secret, data string) string {
	key := []byte(secret)
	h := hmac.New(sha1.New, key)
	h.Write([]byte(data))
	return base64.StdEncoding.EncodeToString(h.Sum(nil))
}

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

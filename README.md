# ddns-namecheap-client
* `docker build -t botirkhuja/namecheap-ddns .`
* `docker run --env-file=.env botirkhuja/namecheap-ddns` or `docker run -e "DOMAIN=example.test" -e "API_KEY=namecheap-api-key" -e "HOSTS=www,test" -e "DELAY_TIME=60000" botirkhuja/namecheap-ddns`

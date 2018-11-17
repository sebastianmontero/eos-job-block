#!/usr/bin/env bash
set -o errexit

echo "=== setup blockchain accounts and smart contract ==="

# set PATH
PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/scripts"

set -m

echo "=== install EOSIO.CDT (Contract Development Toolkit) ==="
apt install /opt/eosio/bin/scripts/eosio.cdt-1.3.2.x86_64.deb

# start nodeos ( local node of blockchain )
# run it in a background job such that docker run could continue
nodeos -e -p eosio -d /mnt/dev/data \
  --config-dir /mnt/dev/config \
  --http-validate-host=false \
  --plugin eosio::producer_plugin \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::http_plugin \
  --http-server-address=0.0.0.0:8888 \
  --access-control-allow-origin=* \
  --contracts-console \
  --verbose-http-errors &
sleep 1s
until curl localhost:8888/v1/chain/get_info
do
  sleep 1s
done

# Sleep for 2 to allow time 4 blocks to be created so we have blocks to reference when sending transactions
sleep 2s
echo "=== setup wallet: eosiomain ==="
# First key import is for eosio system account
cleos wallet create -n eosiomain --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosiomain_wallet_password.txt
cleos wallet import -n eosiomain --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

echo "=== setup wallet: jobchainwal ==="
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n jobchainwal --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > jobchain_wallet_password.txt
# Owner key for jobchainwal wallet
cleos wallet import -n jobchainwal --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K
# Active key for jobchainwal wallet
cleos wallet import -n jobchainwal --private-key 5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N

# * Replace "notechainwal" by your own wallet name when you start your own project

# create account for jobchainacc with above wallet's public keys
cleos create account eosio jobchainacc EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS8BCgapgYA2L4LJfCzekzeSr3rzgSTUXRXwNi8bNRoz31D14en9


cleos wallet import -n jobchainwal --private-key 5KNKqEsKqXLE4YxksiiDpU58V1gX3ugiWkrxmq1j3kzVHE5WHT9
# Active key for jobchainwal wallet
cleos wallet import -n jobchainwal --private-key 5KPstJfHkczJcTVuWfRP2sxyg4JQBz2GkCFfHoZAcg2wSBs7Q6g

# * Replace "notechainwal" by your own wallet name when you start your own project

# create account for jobchainacc with above wallet's public keys
cleos create account eosio token EOS8FY5TKExgy6dJsmriAb4JFwUBvLdBhsgfhNCjoB4nRqrDGH4xM EOS7kVLdTQ7jxYnSCJy8QkLXQWi1FyzAmCAmCNAtcXMZAGBKkiSYV

# * Replace "notechainacc" by your own account name when you start your own project

echo "=== deploy smart contract ==="
# $1 smart contract name
# $2 account holder name of the smart contract
# $3 wallet for unlock the account
# $4 password for unlocking the wallet
deploy_contract.sh job jobchainacc jobchainwal $(cat jobchain_wallet_password.txt)

echo "=== create user accounts ==="
# script for create data into blockchain
create_accounts.sh

eosio-cpp -I /opt/eosio/bin/contracts/eosio.token/include -abigen /opt/eosio/bin/contracts/eosio.token/eosio.token.cpp -o /opt/eosio/bin/contracts/eosio.token/eosio.token.wasm --contract "eosio.token"
#eosio-cpp -I /opt/eosio/bin/contracts/eosio.token/include -o /opt/eosio/bin/contracts/eosio.token/eosio.token.wasm /opt/eosio/bin/contracts/eosio.token/eosio.token.cpp --abigen

cleos set contract token /opt/eosio/bin/contracts/eosio.token --permission token

cleos push action token create '{"issuer":"token", "maximum_supply":"1000000.0000 GLD"}' -p token
cleos push action token issue '{"to":"token", "quantity":"1000000.0000 GLD", "memo":"GLD issue"}' -p token
cleos push action token transfer '{"from":"token","to":"useraaaaaaaa", "quantity":"500000.0000 GLD", "memo":"GLD issue"}' -p token

#cleos set account permission useraaaaaaaa active '{"threshold":"1", "keys":[{"key":"EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b", "weight":"1"}], "accounts":[{"permission":{"actor":"jobchainacc", "permission":"eosio.code"}, "weight":"1"}], "waits":[]}' owner -p useraaaaaaaa
cleos set account permission useraaaaaaaa active '{"threshold":"1", "keys":[{"key":"EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b", "weight":"1"}], "accounts":[{"permission":{"actor":"jobchainacc", "permission":"eosio.code"}, "weight":"1"}], "waits":[]}' -p useraaaaaaaa@active
cleos set account permission jobchainacc active '{"threshold": 1,"keys": [{"key": "EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p","weight": 1}], "accounts": [{"permission":{"actor":"jobchainacc","permission":"eosio.code"},"weight":1}]}'  -p jobchainacc@active


# * Replace the script with different form of data that you would pushed into the blockchain when you start your own project

echo "=== end of setup blockchain accounts and smart contract ==="
# create a file to indicate the blockchain has been initialized
touch "/mnt/dev/data/initialized"

# put the background nodeos job to foreground for docker run
fg %1

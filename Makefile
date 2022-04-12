build:
	docker build -t ewc-rosetta:latest .

run-mainnet-online:
	docker run -d --rm -e "MODE=online" -e "NETWORK=mainnet" -e "WEB3_PROVIDER_URL=http://localhost:8545" -p 8080:8080 -p 8545:8545 ewc-rosetta:latest

run-mainnet-offline:
	docker run -d --rm -e "MODE=offline" -e "NETWORK=mainnet" -e "WEB3_PROVIDER_URL=http://localhost:8545" -p 8080:8080 ewc-rosetta:latest

run-volta-online:
	docker run -d --rm -e "MODE=online" -e "NETWORK=volta" -e "WEB3_PROVIDER_URL=http://localhost:8545" -p 8080:8080 -p 8545:8545 ewc-rosetta:latest

run-volta-offline:
	docker run -d --rm -e "MODE=offline" -e "NETWORK=volta" -e "WEB3_PROVIDER_URL=http://localhost:8545" -p 8080:8080 ewc-rosetta:latest

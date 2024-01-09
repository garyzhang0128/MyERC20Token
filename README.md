# 1 Create .env in the root dir
enter 
ALCHEMY_API_KEY={your key}
MAINNET_PRIVATE_KEY={your key}
# 2 open terminal 
npm install
# 3 deploy
npx hardhat run --network mainnet scripts/deploy.js
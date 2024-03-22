## Usage
### Prepare metadata
- Upload token image into IPFS(You can use quicknode or anything else) and get IPFS url.
- Edit sample_metadata.json.
    Write token name, symbol, description and image url
- Upload sample_metadata.json into IPFS and get an IPFS url.

### Edit .env
- Rename .sample.env into .env
- Write private key of address which you want to use for deploying (PRIVATE_KEY)
- Get a Solana RPC endpoint and write it (RPC_ENDPOINT)
- Write the metadata IPFS url which got above (IPFS_URL_OF_METADATA)
- Write the token name (TOKEN_NAME)
- Write the token symbol (TOKEN_SYMBOL)
- Write the token decimals (TOKEN_DECIMALS)

### Run script
- `npm run mint`
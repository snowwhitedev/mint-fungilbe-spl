import { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair } from '@metaplex-foundation/umi'
import { TokenStandard, createAndMint } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import  "@solana/web3.js";
import bs58 from 'bs58';

import * as dotenv from 'dotenv';

dotenv.config();

console.log("connecting RPC endpoint with ", process.env.RPC_ENDPOINT);
const umi = createUmi(process.env.RPC_ENDPOINT); //Replace with your QuickNode RPC Endpoint
console.log('connected RPC endpoint');

console.log('connecting wallet signer...');
const privateKey = process.env.PRIVATE_KEY
const secret = bs58.decode(privateKey);
const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
const userWalletSigner = createSignerFromKeypair(umi, userWallet);
console.log('connected wallet with ', userWalletSigner.publicKey);

console.log(`creating token with name - ${process.env.TOKEN_NAME}, symbol - ${process.env.TOKEN_SYMBOL}, decimals - ${process.env.TOKEN_DECIMALS}`);

const metadata = {
    name: process.env.TOKEN_NAME,
    symbol: process.env.TOKEN_SYMBOL,
    uri: process.env.IPFS_URL_OF_METADATA
};

const mint = generateSigner(umi);
umi.use(signerIdentity(userWalletSigner));
umi.use(mplCandyMachine())

createAndMint(umi, {
    mint,
    authority: umi.identity,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: parseInt(process.env.TOKEN_DECIMALS),
    amount: 1000000_00000000,
    tokenOwner: userWallet.publicKey,
    tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi).then(() => {
    console.log("Successfully minted 1 million tokens (", mint.publicKey, ")");
});

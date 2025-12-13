---
title: "Solana SPL Token Automation"
description: "Programmatic creation and management of SPL Tokens on the Solana Devnet using TypeScript and Web3.js."
pubDate: 2024-02-15
heroImage: "/projects/masterz-sol.jpg"
badge: "Blockchain"
tags: ["Solana", "TypeScript", "SPL Token"]
lang: "ENG"
url: "https://github.com/EdordoPng/MasterzBootcamp"
---

## Project Overview

This project was developed as the practical final exam for the **Masterz Blockchain Bootcamp**. The objective was to build a series of TypeScript scripts to interact programmatically with the Solana Blockchain, specifically to manage the entire lifecycle of a custom **SPL (Solana Program Library) Token**.

Instead of using a UI, the project demonstrates how to perform on-chain actions directly via code, managing keypairs, transactions, and token minting authorities.

> **⚠️ Security Disclaimer:** > The repository includes visible wallet files (`wallet.json`) and public/private keys. 
> **These are disposable "burner wallets" generated strictly for the Solana Devnet (Testnet).** > In a production Mainnet environment, private keys must **never** be exposed or committed to version control. They are visible here solely for educational verification of the exam process.

## Operational Workflow

The project consists of sequential scripts that handle specific on-chain operations:

### 1. Wallet Generation & Funding
* **Keygen:** Algorithmically generates a new Solana Keypair (Public/Private key).
* **Airdrop:** Connects to the Solana Devnet RPC and requests an airdrop of SOL (native token) to fund the transaction fees (gas) for the subsequent steps.

### 2. Token Initialization
* **SPL Init:** Interacts with the Token Program to initialize a new **Mint Account**. This acts as the factory for the new custom token.
* **Decimals:** Configured the token logic (e.g., decimal precision) directly on-chain.

### 3. Minting & Distribution
* **ATA Creation:** Creating an *Associated Token Account* (ATA) linked to the wallet to hold the specific new token.
* **Minting:** executing the `mintTo` instruction to generate 1000 units of the token into the creator's wallet.
* **Transfer:** Sending a portion of the minted tokens to a secondary "brand new" wallet to verify transfer logic and blockchain finality.

## Tech Stack
* **Language:** TypeScript
* **Libraries:** `@solana/web3.js`, `@solana/spl-token`
* **Network:** Solana Devnet
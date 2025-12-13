---
title: "DataMinder DeSci Platform"
description: "Decentralized Science (DeSci) platform empowering users to own and monetize their medical data via encrypted Solana NFTs."
pubDate: 2024-06-15
heroImage: "/projects/masterz-sol.jpg"
badge: "Blockchain"
tags: ["Solana", "React", "Python", "Cryptography", "NFT"]
lang: "ITA / ENG"
url: "https://github.com/mm-110/dataminder"
related: ["solana-program"]
---

## Context: Masterz Solana Bootcamp

Developed as the **Final Capstone Project** for the **Masterz Blockchain Bootcamp**.
The project was built by a team of 3 developers to solve the issue of data centralization in scientific research.

## Project Mission

[cite_start]**DataMinder** is a Decentralized Science (DeSci) platform that aims to return data ownership to individuals[cite: 506].
In the current landscape, research institutions hoard sensitive data in silos. [cite_start]DataMinder allows users (e.g., patients) to store their data securely and grant access to researchers only upon payment and consent[cite: 510].

## How it Works: The "Encrypted NFT" Logic

The core innovation lies in how data is handled on the **Solana** blockchain:

1.  **Encryption:** Sensitive data is encrypted client-side using the user's keys.
2.  [cite_start]**NFT Minting:** The encrypted data is stored as metadata within an NFT[cite: 522].
3.  [cite_start]**Access Control:** When a researcher purchases access, the data is re-encrypted using their public key (Asymmetric Encryption), allowing them—and only them—to read it[cite: 524, 528].

## MVP Features

The platform demonstrates a complete user flow:
* [cite_start]**Wallet Connection:** Authentication via Solana wallets[cite: 583].
* [cite_start]**Data Upload:** Users upload documents which are minted as private NFTs[cite: 586].
* [cite_start]**Marketplace:** An "Explore" page where researchers can browse available (but encrypted) datasets[cite: 587].
* [cite_start]**Request System:** Researchers send access requests, and users approve them to release the decryption keys[cite: 588].

## Tech Stack

* **Blockchain:** Solana (Devnet)
* **Frontend:** React / Next.js
* **Encryption:** RSA/AES Hybrid encryption logic
* **Integration:** Solana Wallet Adapter

## Team

* **Edoardo Diana:** Full Stack & Logic.
* **[Massimo Montanaro]:**

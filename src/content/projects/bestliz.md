---
title: "Bestliz SportFi Platform"
description: "A lossless sports betting and social engagement platform built on the Chiliz Chain. Winner of 2nd Place (Fan Utility) at ETHGlobal London."
pubDate: 2024-03-17
heroImage: "/projects/eth-global-london.jpg"
badge: "Blockchain"
tags: ["Blockchain", "Ethereum", "Solidity", "Hardhat", "Chiliz", "DeFi", "Hackathon"]
lang: "ENG"
url: "https://github.com/WeDev00/Bestliz"
related: ["aztec-swap"]
---

## Event Context: ETHGlobal London

Developed during **ETHGlobal London**, one of the most prestigious blockchain hackathons in the world. 
This project was a collaborative effort by an **international team of 4** (Italy, Singapore, India), built under the pressure of a 36-hour deadline.

## Project Overview

**Bestliz** is a Social Network and Betting platform designed to engage sports fans without the financial risk associated with traditional gambling.
It runs on the **Chiliz Chain** (the leading blockchain for sports & entertainment) and introduces a "Lossless Betting" mechanism.

## The "Lossless" Mechanism
Unlike traditional betting where you risk your capital, Bestliz allows users to bet on the **yield**.
* **Staking:** Users stake $CHZ tokens into a Match Vault.
* **The Bet:** No odds needed. You bet on the outcome.
* **The Outcome:**
    * **Winners:** Claim their stake back immediately + earn rewards (Platform Tokens).
    * **Losers:** Do *not* lose their money. Instead, their stake is **time-locked** for a longer period. The penalty is *time*, not capital.
* **Revenue:** While tokens are locked, the protocol lends them to generate yield, which funds the rewards.

## Technical Architecture

The protocol is built on **Chiliz Layer 1** using **Scaffold-ETH** and **Hardhat**. It relies on a Factory Pattern to deploy unique contracts for every match:

1.  **Chat.sol:** Handles the "Token Gated" chat rooms (you must stake Team Tokens to enter).
2.  **BettingPool.sol:** Manages the staking, locking logic, and yield generation.
3.  **Fidelity Token:** A non-tradable reputation token used to redeem real-life fan experiences (merch, tickets).

## Achievements

* 🥈 **2nd Place Winner:** Chiliz - Fan Utility Projects.
* 🏅 **Pool Prize Winner:** Chiliz Ecosystem.

## Team & Collaboration

This project was built by a diverse, international team combining different backgrounds:

* **Edoardo Diana:** Product Strategy & Smart Contract Logic.
* **Marco Sorrentino:** Lead Solidity Developer ([LinkedIn](https://www.linkedin.com/in/marco-sorrentino-23b069193) | [GitHub](https://github.com/WeDev00)).
* **International Teammates:** Collaborated with two talented developers from **Singapore** and **India**, managing time zones and cross-cultural communication to deliver the MVP.

<img src="/projects/eth-global-london-foto.jpg" alt="Part of the Team" class="rounded-xl shadow-lg my-6 w-full object-cover" />

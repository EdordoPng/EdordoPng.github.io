---
title: "Differential Power Analysis (DPA)"
description: "Implementation of Side-Channel Attacks on AES-128 using Power Analysis. Comparative study of Correlation vs. Difference of Means (DoM) distinguishers."
pubDate: 2024-11-20
heroImage: "/projects/dpa.png"
badge: "Cybersecurity"
tags: ["Python", "Differential Power Analysis (DPA)", "Side-Channel Attacks", "Advanced Encryption Standard (AES)", "Cryptography", "Hardware Security", "Leakage Model"]
lang: "ENG"
url: "https://github.com/EdordoPng/differential-power-analysis-attack"
related: ["aes-implementation", "profiling-dl"] 
---

## Project Overview

This project explores **Side-Channel Attacks**, specifically **Differential Power Analysis (DPA)**, to extract the secret key from an AES-128 encryption implementation by analyzing power consumption traces.

The core objective was to move beyond standard byte-level attacks and implement granular **Bit-Level strategies**, comparing different statistical distinguishers to optimize attack efficiency.

## Methodologies & Experiments

I implemented and benchmarked three distinct attack vectors:

### 1. Bit-Level Leakage Model
Instead of attacking full bytes, I targeted individual bits of the **S-Box output** (Intermediate Value).
* **Result:** Higher precision compared to byte-level guesses.

### 2. Correlation vs. Difference of Means (DoM)
I compared two statistical tools to distinguish the correct key guess:
* **Pearson Correlation:** Slower computation but highly efficient in terms of data. [cite_start]It successfully recovered the full key with just **~105 traces**[cite: 1184, 1240].
* **Difference of Means (DoM):** Computed using the T-Statistic. [cite_start]It proved to be significantly faster (30 mins vs 4 hours) but "data-hungry", requiring **~660-700 traces** to reach stable key recovery[cite: 1077, 1181].

### 3. Linear vs. Non-Linear Targets
I attempted to attack the **AddRoundKey (ARK)** output directly (linear operation) versus the **SubBytes** output (non-linear).
* [cite_start]**Finding:** The attack on the linear ARK stage failed to recover most bytes (only 4/16 correct)[cite: 1119, 1174]. [cite_start]This empirically confirmed that non-linear operations (S-Box) are the primary source of exploitable leakage in block ciphers[cite: 645, 1120].

## Key Takeaways

| Metric | Correlation Distinguisher | Difference of Means (DoM) |
| :--- | :--- | :--- |
| **Computation Speed** | Slow (High Complexity) | **Fast (Statistical Binning)** |
| **Data Efficiency** | **High (~100 traces)** | Low (~700 traces) |
| **Attack Vector** | Bit-Wise S-Box Output | Bit-Wise S-Box Output |

## Tech Stack
* **Language:** Python 3.x
* **Analysis:** NumPy (for vectorised statistical computations), Matplotlib
* **Target:** TinyAES traces (Simulated/Captured power data)

## Note 
While this project focuses on Side-Channel attacks, the underlying cryptographic logic is based on my AES Implementation from Scratch.

---
[cite_start]*Based on a differential attack using a Hamming Weight leakage model[cite: 635].*
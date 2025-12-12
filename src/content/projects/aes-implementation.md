---
title: "AES Encryption from Scratch"
description: "Full Python implementation of the Advanced Encryption Standard (FIPS 197), featuring custom Finite Field arithmetic, dynamic S-Box generation, and side-channel analysis."
pubDate: 2024-12-13
heroImage: "/aes-python.png"
badge: "Cryptography"
tags: ["Python", "AES", "Cybersecurity", "Finite Fields", "Math"]
lang: "ENG"
url: "https://github.com/EdordoPng/AES_Implementation"
related: ["dpa-analysis", "profiling-dl"]
---

## Project Overview

Developed for the *Advanced Topics in Cybersecurity* course, this project is a complete, low-level implementation of the **AES-128 (Advanced Encryption Standard)** algorithm in Python.

Unlike standard wrappers (like `pycryptodome`), this repository implements every single transformation **from scratch**, strictly following the **NIST FIPS 197** specification. The goal was to dissect the mathematical foundations of modern block ciphers.

## Technical Features

### 1. Finite Field Arithmetic ($GF(2^8)$)
AES relies on byte operations within a Galois Field. I implemented the core arithmetic engine:
* **Polynomial Addition:** XOR operations.
* **Field Multiplication:** Custom `xtimes` implementation (multiplication by $x$ modulo the irreducible polynomial $m(x) = x^8 + x^4 + x^3 + x + 1$).
* **Modular Inversion:** Implemented using **Fermat's Little Theorem** ($a^{-1} \equiv a^{254} \pmod{m(x)}$).

### 2. The AES Pipeline
The encryption flow manages the full state matrix transformation:
1.  **Key Expansion:** Generating round keys from the master key.
2.  **Rounds:** Implementing `SubBytes` (Non-linear), `ShiftRows` (Permutation), `MixColumns` (Linear diffusion), and `AddRoundKey`.

### 3. Advanced Modules
* **Dynamic S-Box:** Instead of hardcoding the lookup table, the code generates the S-Box on-the-fly by composing the Affine Transformation with the Multiplicative Inverse.
* **Optimization:** Created a combined `SubBytes + ShiftRows` function to reduce memory access overhead.
* **Side-Channel Analysis:** Investigated the linearity properties of the cipher by analyzing how the state reacts to **Masking** (XORing the state with a random value $m$). This is crucial for understanding countermeasures against Power Analysis attacks.

## Usage Example

```python
# Standard Encryption
encrypted_state = AES_encr(AES_state, key)

# Optimized Encryption
encrypted_state_opt = AES_encr_combined_sb_and_sr(AES_state, key)

# Dynamic S-Box Generation
sbox = gen_s_box()
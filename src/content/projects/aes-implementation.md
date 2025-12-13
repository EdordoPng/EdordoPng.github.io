---
title: "AES Encryption from Scratch"
description: "Full Python implementation of the Advanced Encryption Standard (FIPS 197), featuring custom Finite Field arithmetic, dynamic S-Box generation, and side-channel analysis."
pubDate: 2024-02-15
heroImage: "/projects/AES-encryption.png"
badge: "Cybersecurity"
tags: ["Python", "Advanced Encryption Standard (AES)", "Cryptography", "Galois Finite Field", "Cybersecurity"]
lang: "ENG"
url: "https://github.com/EdordoPng" 
related: ["dpa-attack"]
---

## Project Overview

This project is a complete, ground-up implementation of the **Advanced Encryption Standard (AES)** algorithm, strictly following the **NIST FIPS 197** specification.
Developed as part of an *Advanced Topics in Cybersecurity* course, the goal was not just to encrypt data, but to deconstruct the mathematical foundations of modern cryptography.

Unlike standard library implementations, this project manually builds the underlying algebraic structures, specifically the finite field **GF(2⁸)**, offering deep insights into how AES achieves confusion and diffusion.

## Core Features

The implementation covers the full encryption flow for **AES-128**:

* **Key Expansion:** Generating round keys from the master cipher key.
* **The 4 Transformations:**
    * `SubBytes`: Non-linear substitution using a custom S-Box.
    * `ShiftRows`: Permutation for diffusion.
    * `MixColumns`: Linear transformation for mixing data within columns.
    * `AddRoundKey`: XOR application of the round key.

## Deep Dive: The Mathematics of GF(2⁸)

The core strength of this project lies in the implementation of **Finite Field Arithmetic**. Instead of using look-up tables blindly, I implemented the polynomial operations from scratch:

* **Field Operations:** Addition (XOR) and Multiplication (modulo irreducible polynomial $x^8 + x^4 + x^3 + x + 1$).
* **xTimes Function:** Optimization for efficient multiplication.
* **Inversion:** Calculating multiplicative inverses in GF(2⁸), essential for S-Box generation.

## Cybersecurity Analysis

Beyond implementation, the project analyzes the security properties of the cipher:

### 1. Dynamic S-Box Generation
I implemented an algorithm to generate the **S-Box** dynamically by composing:
1.  Inversion in the finite field.
2.  Affine Transformation.
This demonstrates understanding of how AES aims to maximize non-linearity to resist linear cryptanalysis.

### 2. Linearity & Masking
The project includes a detailed analysis of the **Linearity of Transformations**:
* Proving which steps are linear (ShiftRows, MixColumns, AddRoundKey).
* Isolating the source of non-linearity (SubBytes).
* **Side-Channel Considerations:** I implemented a version (`AES_encr_state_xor_m`) to analyze how **Masking** (XORing inputs with random values) affects the internal state, a crucial technique for resisting Differential Power Analysis (DPA).

## Usage Example

```python
# State and Key definition
AES_state = [
    [0x32, 0x88, 0x31, 0xe0],
    [0x43, 0x5a, 0x31, 0x37],
    [0xf6, 0x30, 0x98, 0x07],
    [0xa8, 0x8d, 0xa2, 0x34],
]

key = [
    [0x2b, 0x28, 0xab, 0x09],
    [0x7e, 0xae, 0xf7, 0xcf],
    [0x15, 0xd2, 0x15, 0x4f],
    [0x16, 0xa6, 0x88, 0x3c],
]

# Standard Encryption
encrypted = AES_encr(AES_state, key)

# Optimized Version (Combined SubBytes + ShiftRows)
encrypted_opt = AES_encr_combined_sb_and_sr(AES_state, key)





---
title: "Collatz Sequence & Binary Analysis"
description: "MIPS Assembly implementation of the famous 3n+1 problem, featuring real-time bitwise analysis and Hamming weight calculation."
pubDate: 2024-02-15
heroImage: "/collatz-assembly.png"
badge: "Low Level"
tags: ["Assembly", "MIPS", "Bitwise Operations"]
lang: "ITA / ENG"
url: "https://github.com/EdordoPng/collatz-sequence-assembly"
related: ["mips-calculator"]
---

## Project Overview

This project explores algorithm implementation at the hardware architecture level using **MIPS Assembly**.
It calculates the famous **Collatz Sequence** (also known as the $3n+1$ problem) for any given integer.

Beyond generating the sequence, the program performs a deep statistical analysis: for every number generated, it inspects its raw binary representation to calculate its **Hamming Weight** (the count of set bits / 1s), identifying which number in the sequence is computationally "densest".

## Multi-Language Support 🇮🇹 🇬🇧

The logic and documentation are available in both languages:
* **English:** `Project_eng.txt`
* **Italian:** `Project_ita.txt`

## The Algorithm

The core loop implements the Collatz rules using efficient bitwise logic instead of expensive division/multiplication instructions where possible:

1.  **Input Handling:** Accepts integers, automatically converting negative inputs to positive absolute values.
2.  **Sequence Logic:**
    * If **Even**: Divide by 2 (Implemented via logical right shift `srl` or arithmetic logic).
    * If **Odd**: Multiply by 3 and add 1.
    * **Termination:** The loop halts when the sequence reaches `1`.

## Bitwise Analysis (Hamming Weight)

The unique feature of this implementation is the **Binary Analysis module**.
For each number $X$ in the sequence, the program runs an inner loop that:
1.  Iterates through all 32 bits of the register.
2.  Uses masking (`andi`) and shifting (`srl`) to count how many bits are set to `1`.
3.  Compares the count with the current maximum (`$s3`) and updates the record holder (`$s2`) if necessary.

## Example Output

```text
Enter a number: 6
Sequence: 6 3 10 5 16 8 4 2 1 

Number of elements in the sequence: 9

Number with the maximum amount of ones in its binary representation: 5
It has a number of ones equal to: 2 (Binary: 101)
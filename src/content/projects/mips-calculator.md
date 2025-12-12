---
title: "MIPS Assembly Sum Calculator"
description: "Low-level MIPS Assembly program that calculates min/max sum sets with manual memory management and arithmetic overflow protection."
pubDate: 2024-01-10
heroImage: "/mips-assembly.png"
badge: "Low Level"
tags: ["Assembly", "MIPS", "Computer Architecture", "QtSPIM"]
lang: "ITA / ENG"
url: "https://github.com/EdordoPng/sum-sets-calculator-assembly"
related: ["collatz-assembly"]
---

## Project Overview

This project dives into the foundational layer of computing: **Assembly Language**.
It is a program written for the **MIPS architecture** that performs statistical analysis on a stream of user-provided integers.

The goal is to calculate the **Minimum Possible Sum** and **Maximum Possible Sum** of a set of $N$ numbers by selectively excluding one element at a time. The challenge was to implement this logic efficiently at the register level, without the abstractions provided by high-level languages.

## Multi-Language Support 🇮🇹 🇬🇧

The repository includes detailed documentation and logic explanation in both languages:
* **English:** `Project_eng.txt`
* **Italian:** `Project_ita.txt`

## The Algorithm: $O(N)$ Efficiency

Instead of brute-forcing all possible combinations (which would be computationally expensive), the program implements an optimized mathematical logic during the input phase:

1.  **Input Loop:** Reads numbers one by one until `0` is entered.
2.  **Live Tracking:** While reading, it updates three registers in real-time:
    * `$s4`: The Running Total Sum.
    * `$s2`: The Minimum value seen so far.
    * `$s3`: The Maximum value seen so far.
3.  **Final Calculation:**
    * **Max Sum** = Total Sum - Minimum Number.
    * **Min Sum** = Total Sum - Maximum Number.

## Technical Highlights

### 1. Manual Overflow Handling ⚠️
In high-level languages, large numbers are often handled automatically. In Assembly, I had to implement **Arithmetic Overflow Detection**.
The program checks the status flags after each addition. If the sum exceeds the 32-bit limit, the program safely halts execution and prints an error message (`"The program has encountered overflow. END"`) to prevent data corruption.

### 2. Register Management
The code demonstrates strict adherence to MIPS conventions for register usage:
* **Saved Registers (`$s0`-`$s4`):** Used for persistent data like Min/Max values and Total Sum.
* **Temporary Registers (`$t0`-`$t3`):** Used for volatile calculations and overflow checks.

## Memory Layout

The program directly manipulates the specific memory segments of the MIPS architecture:
* **Text Segment (`0x400100`):** Where the instructions reside.
* **Data Segment (`0x10011000`):** RAM allocation for storing user inputs and string literals.

## Example Execution

```text
Enter a number, 0 to start computation:
10
Enter a number, 0 to start computation:
5
Enter a number, 0 to start computation:
15
Enter a number, 0 to start computation:
0

The minimum sum is = 20 (Discarded: 15)
The maximum sum is = 25 (Discarded: 5)
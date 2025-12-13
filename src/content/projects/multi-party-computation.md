---
title: "Secure MPC with Garbled Circuits"
description: "Implementation of Yao's Garbled Circuits protocol for secure Multi-Party Computation (MPC), allowing two parties to compute the maximum of their private datasets without revealing inputs."
pubDate: 2024-03-20
heroImage: "/projects/mpc-garbled.png"
badge: "Cybersecurity"
tags: ["Python", "Cryptography","Multi-Party Computation (MPC)", "Yao's Garbled Circuits", "Oblivious Transfer", "Boolean Circuits"]
lang: "ENG"
url: "https://github.com/EdordoPng/multi-party-computation"
---

## Project Overview

This project implements a secure **Multi-Party Computation (MPC)** system based on **Yao's Garbled Circuits** protocol.
The goal is to solve the "Millionaires' Problem" variant: two parties, Alice and Bob, want to compute the **Maximum** value between their respective private sets of integers, but **neither party must learn the other's inputs**.

The solution involves generating Boolean circuits, encrypting (garbling) logic gates, and using **Oblivious Transfer (OT)** to securely exchange input keys.

## Technical Architecture

The protocol is implemented from scratch in Python, structured in three main layers:

### 1. Circuit Generation (`createCircuitExtended.py`)
Instead of hardcoding logic, I built a generator that:
* Creates truth tables for comparison logic.
* Converts logic into **SOP (Sum of Products)** boolean formulas using `SymPy`.
* Compiles these formulas into a JSON circuit format composed of `AND`, `OR`, `XOR`, and `NOT` gates.
* Supports scalable architectures (cascading 4-bit comparators to handle 32+ integers).

### 2. The Protocol Core (Alice & Bob)
* **Alice (Garbler):** Generates the circuit, creates random keys for every wire (0/1 states), encrypts the truth tables (Garbled Tables), and sends them to Bob.
* **Bob (Evaluator):** Receives the garbled tables. He knows his own input keys (obtained via OT) and Alice's input keys (sent directly), allowing him to decrypt the path through the circuit gate-by-gate to find the final result.

### 3. Oblivious Transfer (OT)
Implemented a 1-out-of-2 Oblivious Transfer protocol. This ensures Bob can request the keys corresponding to his input bits (e.g., key for "1") without Alice knowing which key he requested, and without Bob learning the key for the other bit (e.g., key for "0").

## Logic Flow

```mermaid
graph LR
    A[Alice Inputs] -->|Encrypt| GC[Garbled Circuit]
    B[Bob Inputs] -->|Oblivious Transfer| GC
    GC -->|Evaluation| R[Final Result: MAX(A,B)]
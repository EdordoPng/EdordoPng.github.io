---
title: "Cross-out Puzzle Solver (ASP)"
description: "Logic solver for grid puzzles using Answer Set Programming (Clingo), featuring ethical analysis on steganography and military applications."
pubDate: 2024-05-10
heroImage: "/crossout-puzzle.png"
badge: "Logic Programming"
tags: ["Automated Reasoning", "Clingo", "Answer Set Programming"]
lang: "ENG"
url: "https://github.com/EdordoPng/Cross_out_puzzle_solver"
---

## Project Overview

This project implements an intelligent agent capable of solving **Cross-out Puzzles** using **Answer Set Programming (ASP)**.
The challenge involves processing a rectangular grid of symbols and deciding which ones to "cross out" to satisfy strict topological and uniqueness constraints.

Beyond the code, the project explores the **dual-use nature of AI algorithms**, analyzing how a simple puzzle solver can be re-purposed for steganography or military defense strategies.

## The Logic Model

The solver is implemented in `Clingo` and enforces three core rules:
1.  **Uniqueness:** No symbol can appear more than once in any row or column (unless crossed out).
2.  **Adjacency Constraint:** Two crossed-out symbols cannot be adjacent (horizontally or vertically).
3.  **Contiguity:** All remaining (kept) symbols must form a **single contiguous area**. This requires implementing reachability logic to prevent isolated islands of symbols.

## Beyond Code: Ethical & Practical Applications

A unique feature of this project is the analysis of its potential real-world applications:

### 1. Steganography
The solver can be used to hide messages in plain sight.
* **Concept:** A public grid of symbols appears random or decorative.
* **Hidden Channel:** Only the receiver, knowing the specific constraint rules (the "key"), can filter out the noise (crossed-out symbols) to reveal the hidden message formed by the remaining characters.

### 2. Military Strategy (Minefield Safe Paths)
* **Scenario:** Modeling a minefield around a base.
* **Application:** The "contiguous area" constraint ensures that there is always a connected **safe path** for allied troops to traverse the grid, while the "adjacency constraint" ensures mines are spread out effectively to deter enemies who don't know the safe route.

## Tech Stack
* **Language:** ASP (Answer Set Programming)
* **Solver:** Clingo 5.7.1
* **Reasoning:** Constraint Satisfaction, Reachability Logic

---
*Includes a dedicated report on the ethical implications of autonomous decision-making algorithms.*
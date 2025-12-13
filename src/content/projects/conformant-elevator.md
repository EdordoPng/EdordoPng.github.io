---
title: "Conformant Elevator Planning"
description: "Advanced AI planning project addressing incomplete knowledge and uncertainty in elevator control systems using Answer Set Programming."
pubDate: 2024-05-20
heroImage: "/projects/elev-plan.jpg"
badge: "Automated Reasoning"
tags: ["Conformant Planning Problem", "Clingo", "Answer Set Programming", "Uncertainty"]
lang: "ENG"
url: "https://github.com/EdordoPng/ASP_elevator_confromant_planning"
related: ["asp-elevator"]
---

## Project Overview

This project serves as an advanced evolution of the *Smart Elevator Control* system. While standard planning assumes perfect information (we know exactly where elevators start), **Conformant Planning** addresses scenarios with **incomplete knowledge**.

The core challenge modeled here is: *How do we generate a foolproof plan to serve all passengers when we do not know the initial positions of the elevators?*

## The Challenge: Uncertainty

In classical AI planning, the agent perceives the full state of the world. In this conformant model:
* **Unknown Initial State:** Elevators could be on *any* floor at time $t=0$.
* **Goal:** The solver must produce a single sequence of actions that guarantees success **regardless** of the actual starting configuration.
* **Universal Validity:** The plan is valid if and only if it leads to the goal state for *every* possible initial world.

## Implementation Features

The solution leverages **Clingo** with specialized encodings to handle non-determinism:

### 1. State Abstraction (Task 1 & 2)
The encoding defines a "super-state" encompassing all possible physical configurations. The goal is satisfied only when pending requests (calls and deliveries) are cleared in *all* parallel realities simulated by the solver.

### 2. Conditional Logic (Task 3 & 4)
* **Movement:** Elevators move up or down based on logical preconditions.
* **Service Logic:** The `serve(E)` action is modeled with conditional effects.
    * *Deterministic:* Must serve if a call is definitely present.
    * *Non-Deterministic:* May serve a delivery if conditions are ambiguous, forcing the solver to find a path that resolves this ambiguity safely.

### 3. Control Knowledge (Task 5)
To reduce the immense search space caused by uncertainty, I implemented directional constraints (e.g., preventing an elevator from reversing direction unnecessarily), guiding the solver toward valid plans faster.

## Conformant vs. Classical Planning

| Feature | Classical Planning (Previous Project) | Conformant Planning (This Project) |
| :--- | :--- | :--- |
| **Initial State** | Fully Known | **Unknown / Uncertain** |
| **Solver Strategy** | Finds optimal path for 1 scenario | Finds **robust path** for N scenarios |
| **Complexity** | NP-Complete | **Sigma-2-P (More complex)** |
| **Use Case** | Optimization & Efficiency | **Safety & Robustness** |

## Tech Stack
* **Solver:** Clingo (using `incmode`, `forall`, and `exists` encodings)
* **Paradigm:** Logic Programming under Uncertainty
* **Validation:** Tested against 8 increasingly complex instances (`instance01.lp` to `instance08.lp`).

## Note 
This project builds upon the foundational logic established in the Smart Elevator Control project, introducing uncertainty handling.

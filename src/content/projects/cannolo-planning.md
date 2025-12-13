---
title: "Reverse Planning & Epistemic Reasoning"
description: "Comparative study of Automated Planning frameworks (PDDL, ASP, Eclingo, DLV^K) applied to Universally Reversible Actions using a custom domain."
pubDate: 2024-06-15
heroImage: "/projects/cannolo-planning.png"
badge: "Automated Reasoning"
tags: ["PDDL", "Reverse Planning","Universally Reversible Action", "Answer Set Programming", "Eclingo", "Clingo", "DLV^K","K Language", "Epistemic Logic"]
lang: "ENG"
url: "https://github.com/EdordoPng/cannolo-reverse-planning"
---

## Project Overview

This research project explores the complex field of **Reverse Planning**—the ability of an agent to backtrack or "undo" actions to return to a previous valid state.

To make the abstract logic accessible, I modeled a unique problem domain: **The preparation of the Sicilian Cannolo** 🍩🇮🇹. The goal was to mathematically model the states of assembly (e.g., *Empty Shell* → *Filled* → *Decorated*) and analyze which actions are reversible under specific logic frameworks.

## Methodologies Compared

The core objective was to benchmark different Automated Planning languages and solvers to handle **Universally Reversible Actions**.

### 1. PDDL (STRIPS) & Plasp
* **Approach:** Classical planning definition using the Planning Domain Definition Language.
* **Workflow:** Defined the domain in `.pddl` files and used **Plasp** to automatically translate these definitions into Answer Set Programming facts.

### 2. ASP & Epistemic Reasoning (Eclingo)
* **Approach:** Moving beyond simple state transitions to model **knowledge states**.
* **Tool:** **Eclingo**.
* **Why:** To solve problems where the agent must *know* that an action is reversible, not just that it is physically possible.

### 3. K Language & DLV^K
* **Approach:** Using a high-level declarative planning language.
* **Tool:** DLV^K System.
* **Result:** Successfully modeled planning queries (e.g., "Find a plan of length 3 that results in a filled Cannolo").

## Technical Execution

The repository contains multiple implementations of the same domain to demonstrate the syntax and solving capabilities of each tool:

* **Sequential Horizon:** Solving using standard Clingo atoms.
* **Epistemic Logic:** Solving using Eclingo with knowledge operators ($K$ operator).
* **QBF Solving:** Mapped to Quantified Boolean Formulas using `qasp.jar`.

## Documentation

The project includes a detailed **scientific report (`Report.pdf`)** analyzing the transition graphs and the computational performance of the different solvers (Clingo vs. DLV).

---
*Tools used: Clingo, Eclingo, Plasp, DLV System.*
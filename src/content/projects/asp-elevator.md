---
title: "Smart Elevator Control with ASP"
description: "AI Planning project using Answer Set Programming (Clingo) to optimize multi-elevator logistics using both Single-Shot and Multi-Shot encodings."
pubDate: 2024-04-10
heroImage: "/asp-elevator.png"
badge: "Automated Reasoning"
tags: ["Clingo", "ASP", "Logic Programming", "AI Planning"]
lang: "ENG"
url: "https://github.com/EdordoPng/ASP_Elevator"
related: ["conformant-elevator"]
---

## Project Overview

This repository demonstrates the application of **Answer Set Programming (ASP)** to solve a combinatorial planning problem: controlling a system of multiple elevators in a building. Using the **Clingo** solver, the project models the logic to handle floor calls and specific delivery requests while minimizing the total time steps required to complete all tasks.

The project is significant because it compares two distinct reasoning methodologies available in modern logic solvers: static planning vs. incremental planning.

## Core Features

The logic program models a discrete-time system where:
* **Actions:** At each step, an elevator can move (Up/Down), serve a floor (Pickup/Delivery), or wait.
* **Constraints:** The system strictly enforces physical constraints (e.g., doors must open to serve, movement is sequential).
* **Optimization:** The solver searches for the model that satisfies all requests with the **minimum number of steps** (up to a bounded horizon).

## Methodology: Single-Shot vs. Multi-Shot

A key feature of this project is the implementation of two different encoding strategies:

### 1. Single-Shot Encoding (Static)
* **File:** `elevator_SingleShotEncoding.lp`
* **Logic:** Solves the entire problem in one execution run.
* **Use Case:** Ideal for snapshots where the initial state (elevator positions) and all requests are known *a priori*. It produces the globally optimal plan for that specific static scenario.

### 2. Multi-Shot Encoding (Dynamic)
* **File:** `elevator_MultiShotEncoding.lp`
* **Logic:** Leverages Clingo's **incremental solving** capabilities (`#program step(t)`). The solver maintains the state and evolves the plan step-by-step.
* **Use Case:** Designed for **real-time systems**. It allows the logic to react to new calls arriving dynamically while the elevators are already moving, without restarting the reasoning process from scratch.

## Tech Stack
* **Solver:** Potassco Clingo (ASP)
* **Language:** Gringo (Logic Programming format)
* **Problem Class:** NP-Hard Planning

---
*This project serves as a foundation for advanced reasoning tasks, leading into further research on **Conformant Planning**.*
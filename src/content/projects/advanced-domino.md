---
title: "Advanced Domino Placement (COP)"
description: "Solving a complex combinatorial optimization problem using Constraint Programming (MiniZinc) and Answer Set Programming (ASP/Clingo)."
pubDate: 2024-06-01
heroImage: "/projects/domino.jpg"
badge: "Automated Reasoning"
tags: ["Constraint Optimization Problem", "MiniZinc", "Answer Set Programming", "Clingo", "Constraint Programming", "AI"]
lang: "ITA / ENG"
url: "https://github.com/EdordoPng/advanced_domino"
---

## Project Overview

This project addresses a **Constraint Optimization Problem (COP)** inspired by a complex variation of the domino game.
The challenge is to place a set of polyomino tiles (defined by shape and numeric values) onto an $N \times N$ grid to **maximize the number of placed tiles** while satisfying strict geometric and logic constraints.

Unlike standard imperative programming, this project uses **Declarative Programming**, where we describe *what* the solution looks like, leaving the search strategy to the solver.

## The Constraints

The model enforces a rigorous set of rules:
1.  **Boundaries & Overlap:** Tiles must fit within the grid and cannot overlap (`place_grid` matrix logic).
2.  **Value Matching:** Adjacent cells from different tiles must share the same numeric value (classic Domino rule).
3.  **Connectivity (The Hardest Part):** All placed tiles must form a **single connected component**. This prevents the solver from creating isolated islands of tiles to cheat the score.

## Implementation: MiniZinc vs. ASP

I implemented the solution using two different paradigms to benchmark performance and expressiveness.

### 1. MiniZinc (Constraint Programming)
* **Modeling:** Used explicit constraints over 2D arrays (`grid` and `place_grid`).
* **Connectivity Logic:** Implemented a propagation constraint. If a cell is occupied, it propagates a "connected" signal (`connesso` variable) to its neighbors.
* **Pros:** Strong typing, excellent IDE for debugging and visualizing small instances.

### 2. ASP (Answer Set Programming - Clingo)
* **Modeling:** Based on predicates (`positioned(Tile, X, Y)`, `adjacent(X, Y, X2, Y2)`).
* **Connectivity Logic:** Used recursive rules (Reachability) to define the connected graph.
* **Performance:** Proved to be significantly faster on "Hard" instances (solving in ~60ms vs minutes in MiniZinc) thanks to efficient grounding and conflict-driven clause learning.

## Key Code Snippet (MiniZinc)

Here is how the adjacency rule is enforced in the MiniZinc model:

```minizinc
% Constraint: Adjacent cells of different tiles must have the same value
constraint
  forall(cellX, cellY in 1..n where place_grid[cellX, cellY]!=0)(
    if (cellY < n /\ place_grid[cellX, cellY] != place_grid[cellX, cellY + 1] 
        /\ place_grid[cellX, cellY + 1] != 0)
      then grid[cellX, cellY] == grid[cellX, cellY + 1]
    endif
    % ... (checks for other directions)
  );
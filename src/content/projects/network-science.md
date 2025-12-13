---
title: "Advanced Network Science"
description: "A collection of complex system analyses using Graph Theory in R. From dismantling terrorist cells to mapping interdisciplinary science flows."
pubDate: 2025-11-20
heroImage: "/projects/network-science.png"
badge: "Network Science"
tags: ["R", "Data Science", "Network Science", "Graph Theory"]
lang: "ITA / ENG"
url: "https://github.com/EdordoPng/NetworkScienceR"
related: ["nba-network"]
---

## Context: Advanced Data Science

This repository collects the practical challenges and capstone projects developed for the **Advanced Data Science** course.
The focus is on **Network Science**: applying graph theory and linear algebra to model, analyze, and visualize complex real-world systems.

## Project 1: Madrid Train Bombing Network 

Analyzing the terrorist network behind the 2004 Madrid attacks (M-11) to understand criminal organization structures.

* **Similarity Analysis:** Constructed an Adjacency Matrix weighted by trust, kinship, and co-participation. Used **Cosine Similarity** and **Hierarchical Clustering** to reconstruct the terrorist cells without prior knowledge.
* **Resilience & Percolation:** Simulated attacks on the network to test its robustness.
    * Compared different node removal strategies: *Random* vs. *Targeted* (Degree, PageRank, Betweenness).
    * **Result:** The network proved resilient to random failures but fragile to targeted removal of "hub" nodes (high Betweenness).
* **Cohesive Blocks:** Used **k-connected components** to identify the unbreakable core of the organization.

## Project 2: Interdisciplinarity in Science

A Scientometric analysis of citation flows between scientific disciplines to measure "Autarchy" vs. "Interdisciplinarity".

* **Flow Normalization:** Implemented a **Configuration Model** to calculate Expected Flows ($E$) vs. Observed Flows ($F$).
* **Statistical Testing:** Applied **X-test** and **G-test** to filter out random noise and visualize only statistically significant citation pathways.
* **Entropy Measures:**
    * **Shannon & Simpson:** To measure diversity.
    * **Rao Quadratic Entropy:** To measure *true* interdisciplinarity by accounting for the dissimilarity between cited disciplines (e.g., Physics citing Sociology is more interdisciplinary than Physics citing Math).

## Project 3: NBA Assist Dynamics

(See dedicated project card)
Applying centrality metrics to basketball tracking data to identify playmakers and ball-movement patterns.

## Tech Stack

* **Language:** R
* **Libraries:** `igraph`, `ggraph`, `tidygraph`, `tidyverse`, `ggplot2`, 
* **Math:** Linear Algebra (Eigenvalues, Spectral Radius), Statistical Mechanics (Entropy).
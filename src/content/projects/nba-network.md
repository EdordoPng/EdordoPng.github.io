---
title: "NBA Network Analysis"
description: "Network Science project analyzing NBA assist dynamics (2020-2025) using R, Graph Theory, and Centrality metrics."
pubDate: 2025-01-20
heroImage: "/projects/nba-network.png"
badge: "Network Science"
tags: ["R", "Data Science", "Network Science", "Graph Theory"]
lang: "ITA / ENG"
url: "https://github.com/EdordoPng/NBA"
---

## Project Overview

This project applies **Network Science** principles to sports analytics. By analyzing NBA data from 2020 to 2025, I modeled basketball teams as complex networks where:
* **Nodes** = Players.
* **Edges** = Assists (Weighted by frequency).

The goal was to go beyond simple statistics (points/rebounds) and understand the **structural dynamics** of a team: who is the real playmaker? How cohesive is the passing game?

## Technical Workflow

The project is built in **R** and structured into reproducible notebooks (`.Rmd`):

### 1. Data Ingestion (API)
Instead of static CSVs, the project interacts dynamically with the **BallDontLie API**.
* Implemented secure API Key management via `config.R` (git-ignored for security).
* Used `httr` and `jsonlite` to fetch and parse seasons, games, and play-by-play data.

### 2. Network Construction
This module transforms raw data into graph structures using `igraph` and `tidygraph`.
* **Directed Graphs:** Assists are directional (Player A -> Player B).
* **Weighted Edges:** The strength of the connection represents the volume of assists.

### 3. Centrality Analysis
This is the core scientific module (`03_Centrality_Analysis.Rmd`). I applied various centrality algorithms to determine player roles:
* **Degree Centrality:** To identify the main ball handlers.
* **Betweenness Centrality:** To find players who act as "bridges" between different sub-groups (e.g., passing from guards to centers).
* **PageRank:** To measure player influence within the passing flow.

## Code Snippet (R)

Here is how the analysis pipeline is set up using the Tidyverse ecosystem:

```r
# Setup dependencies and environment
source("setup.R")

# Load Network Analysis libraries
library(igraph)
library(tidygraph)
library(ggraph)

# Run the analysis notebook
rmarkdown::render("notebooks/NBA_Analysis.Rmd")
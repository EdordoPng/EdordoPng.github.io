---
title: "Deep Learning for SCA Profiling"
description: "Advanced Side-Channel Profiling attack on the ASCAD dataset using Multi-Layer Perceptrons (MLP) and Convolutional Neural Networks (CNN)."
pubDate: 2024-10-15
heroImage: "/projects/profiling-dl.png"
badge: "Cybersecurity"
tags: ["Python", "Deep Learning", "Cryptography", "Cybersecurity", "Profiling", "Leakage Exfiltration"]
lang: "ENG"
url: "https://github.com/EdordoPng/profiling_deep_learning"
related: ["dpa-analysis"]
---

## Project Overview

This project bridges the gap between **Artificial Intelligence** and **Hardware Security**. It implements a **Profiling Attack**—the most powerful type of Side-Channel Attack—against the **ASCAD v1** benchmark dataset (ATMega8515 implementation of AES).

The goal was to train Deep Learning models to automatically extract leakage features from power consumption traces and recover the secret encryption key, even in the presence of countermeasures like jitter (desynchronization).

## Methodology

### 1. Dataset Analysis (ASCAD)
I worked with the complex **HDF5** structure of the ASCAD database, focusing on traces reduced to a specific window of interest (700 time samples in the interval `[45400..46100]`) corresponding to the **3rd S-Box operation** of the first AES round.

### 2. Architecture Selection Strategy
The project explores two distinct Neural Network architectures:
* **Multi-Layer Perceptron (MLP):** Selected for high efficiency on clean, aligned data.
* **Convolutional Neural Network (CNN):** Proposed for scenarios with misaligned traces (desync50/100), leveraging translation invariance to detect leakage patterns without perfect synchronization.

### 3. Training & Hyperparameter Tuning
I implemented the training pipeline using **TensorFlow/Keras**, solving compatibility challenges (Python 3.9/tf_keras).
* **Experiments:** Trained multiple models varying epochs (250-600) and batch sizes (32-50).
* **Optimization:** Focused on maximizing validation accuracy to prevent overfitting on the profiling set.

## Attack Results

After training, the models were deployed to attack the "Attack Set" (unknown keys).
* **Target:** Successfully recovered the target key byte (Rank 0).
* **Generalization:** By extending the attack with the best performing MLP model (600 epochs), I demonstrated the capability to recover up to **4/16 key bytes**, showing that leakage generalizes across different operations.

## Tech Stack
* **Frameworks:** TensorFlow, Keras, H5py
* **Techniques:** Supervised Learning, SCA Profiling
* **Target:** AES-128 (ASCAD Benchmark)

---
*Based on the "Study of Deep Learning Techniques for Side-Channel Analysis" methodology.*
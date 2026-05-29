# 🚀 Analyzr – AI-Powered CSV Analytics Platform

## 📌 Overview

Analyzr is an AI-powered data analytics platform that enables users to upload CSV datasets, perform automated exploratory data analysis, generate visualizations, discover correlations, and obtain AI-generated business insights.

The platform combines FastAPI, React, Pandas, Matplotlib, Seaborn, and Groq LLM to transform raw CSV data into meaningful insights through an interactive dashboard.

---

## ✨ Features

### 📂 CSV Upload & Analysis

* Upload CSV datasets of various sizes.
* Automatic dataset profiling.
* Supports numerical and categorical features.

### 🤖 AI-Powered Insights

* Generates concise business-focused insights using Groq LLM.
* Provides actionable recommendations based on dataset patterns.
* Summarizes key findings in an easy-to-understand format.

### 📊 Dataset Overview

* Total rows and columns.
* Dataset structure summary.
* Quick statistical overview.

### 📋 Missing Value Analysis

* Detects missing values across all columns.
* Displays missing counts in a clean tabular format.
* Helps identify data quality issues.

### 🔗 Correlation Explorer

* Select any two numerical features.
* Calculate correlation coefficients dynamically.
* Provides correlation strength interpretation:

  * Strong Positive Correlation
  * Weak Positive Correlation
  * No Correlation
  * Weak Negative Correlation
  * Strong Negative Correlation

### 📈 Visualization Studio

Generate visualizations on demand:

* Histogram
* Scatter Plot
* Bar Chart
* Box Plot
* Heatmap

Interactive visualization generation improves performance by creating charts only when requested by the user.

### 📄 Dataset Preview

* Displays sample records from uploaded datasets.
* Allows users to verify uploaded data instantly.

### 📥 PDF Report Generation

Generate downloadable analytical reports containing:

* Dataset Overview
* AI Insights
* Missing Value Analysis
* Correlation Summary

---

## 🏗️ System Architecture

### Frontend

* React.js
* Vite
* Axios
* CSS

### Backend

* FastAPI
* Pandas
* NumPy
* Matplotlib
* Seaborn
* Groq API
* ReportLab

---

## 📂 Project Structure

```text
Analyzr/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   ├── main.py
│   │   └── __init__.py
│   │
│   ├── pyproject.toml
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/leelamadhav07/Analyzr.git
cd Analyzr
```

### 2. Backend Setup

```bash
cd backend

uv sync

python -m uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
GROQ_API_KEY=your_groq_api_key
```

---

## 📸 Screenshots

### Dashboard

Add dashboard screenshot here.

### Correlation Explorer

Add correlation explorer screenshot here.

### Visualization Studio

Add visualization studio screenshot here.

### PDF Report

Add generated report screenshot here.

---

## 🎯 Key Learnings

During the development of this project, the following concepts were implemented:

* Data preprocessing using Pandas
* Correlation analysis
* Statistical profiling
* Dynamic chart generation
* REST API development using FastAPI
* Frontend-backend integration
* AI-powered data interpretation
* PDF report generation
* Interactive dashboard design

---

## 🚀 Future Enhancements

* Outlier Detection
* Data Quality Score
* Advanced Statistical Analysis
* Export Visualizations
* Cloud Deployment
* User Authentication
* Scheduled Report Generation

---

## 👨‍💻 Author

**Leela Madhav**

GitHub: https://github.com/leelamadhav07

---

## ⭐ If you found this project useful, consider giving it a star!

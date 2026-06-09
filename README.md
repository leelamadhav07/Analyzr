# 🚀 Analyzr – AI-Powered CSV Analytics Platform

## 📌 Overview

Analyzr is an AI-powered data analytics platform that allows users to upload CSV datasets and instantly generate:

- 📊 Automated Data Analysis
- 🤖 AI-Generated Insights using Groq LLM
- 🔍 Correlation Analysis
- 📈 Interactive Visualizations
- 📄 Downloadable PDF Reports

The platform helps users quickly understand datasets without writing code.

---

## 🌐 Live Demo

### Frontend
🔗 https://analyzr-one.vercel.app/

### Backend API
🔗 https://analyzr-backend-ybjn.onrender.com/docs

---

## ✨ Features

### 📁 CSV Upload
- Upload any CSV dataset
- Automatic data validation
- Instant dataset processing

### 📊 Automated EDA
- Number of Rows
- Number of Columns
- Column Names
- Mean Values
- Median Values
- Missing Value Analysis

### 🤖 AI Insights
- Dataset summarization using Groq LLM
- Business insights generation
- Trend identification
- Data interpretation

### 🔍 Correlation Analysis
- Select any two numerical features
- Calculate Pearson Correlation
- Correlation strength interpretation

### 📈 Visualization Studio
Generate professional visualizations:

- Histogram
- Bar Chart
- Box Plot
- Scatter Plot
- Heatmap

### 📄 PDF Report Generation
Download a professional report containing:

- Dataset Summary
- AI Insights
- Missing Values
- Correlation Matrix
- Visualizations

---

## 🏗️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- CSS

### Backend
- FastAPI
- Python

### Data Analysis
- Pandas
- NumPy

### Data Visualization
- Matplotlib
- Seaborn

### AI Integration
- Groq LLM API

### Deployment
- Vercel (Frontend)
- Render (Backend)

---

## 📂 Project Structure

```text
Analyzr/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── screenshots/
│
└── README.md
```

---

## 📸 Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Correlation Analysis

![Correlation](screenshots/correlation_explorer.png)

### Visualization Studio

![Visualization](screenshots/visualization_studio.png)

### PDF Report

![PDF Report](screenshots/pdf_report.png)

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/leelamadhav07/Analyzr.git
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file inside backend folder:

```env
GROQ_API_KEY=your_groq_api_key
```

---

## 🎯 Future Enhancements

- Multi-file comparison
- Drag-and-drop upload
- User authentication
- Dashboard history
- Advanced ML insights
- Forecasting analytics
- Interactive charts using Plotly

---

## 👨‍💻 Author

**Leela Madhav**

LinkedIn:
www.linkedin.com/in/leelamadhavsunkara

GitHub:
https://github.com/leelamadhav07

---

## ⭐ Support

If you found this project useful:

⭐ Star the repository

🍴 Fork the project

📢 Share it with others

---

## 📜 License

This project is licensed under the MIT License.
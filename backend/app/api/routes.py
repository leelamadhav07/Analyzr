from fastapi import APIRouter, UploadFile, File
from app.services.analysis_service import analyze_data
from app.services.groq_service import generate_explanation
from fastapi import Body
import app.services.data_store as store
import matplotlib.pyplot as plt
import io
from io import BytesIO
import base64
from fastapi.responses import StreamingResponse
from app.services.report_service import generate_pdf_report

router = APIRouter()

latest_summary = None
latest_explanation = None


def encode_chart():
    buf = io.BytesIO()
    plt.savefig(buf, format="png", bbox_inches="tight")
    buf.seek(0)

    image = base64.b64encode(buf.read()).decode("utf-8")

    buf.close()
    plt.close()

    return image


@router.get("/")
def home():
    return {"message": "Autonomous CSV Data Analyst Backend Running"}


@router.post("/upload")
async def upload(file: UploadFile = File(...)):

    global latest_summary
    global latest_explanation

    try:
        if not file.filename.endswith(".csv"):
            return {"status": "error", "message": "Only CSV files are allowed"}

        result = analyze_data(file.file)

        explanation = generate_explanation(result)

        # Store latest analysis for PDF generation
        latest_summary = result
        latest_explanation = explanation

        return {
            "status": "success",
            "message": "File analyzed successfully",
            "data": result,
            "llm_Explanation": explanation,
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}


@router.post("/correlation")
async def get_correlation(data: dict = Body(...)):

    if store.uploaded_df is None:
        return {"status": "error", "message": "No dataset uploaded"}

    column1 = data["column1"]
    column2 = data["column2"]

    df = store.uploaded_df

    correlation = round(df[column1].corr(df[column2]), 3)

    interpretation = ""

    if correlation > 0.7:
        interpretation = "Strong Positive Correlation"
    elif correlation > 0.3:
        interpretation = "Moderate Positive Correlation"
    elif correlation > 0:
        interpretation = "Weak Positive Correlation"
    elif correlation < -0.7:
        interpretation = "Strong Negative Correlation"
    elif correlation < -0.3:
        interpretation = "Moderate Negative Correlation"
    else:
        interpretation = "Weak/No Correlation"

    return {
        "status": "success",
        "correlation": correlation,
        "interpretation": interpretation,
    }


@router.post("/generate-chart")
async def generate_chart(data: dict = Body(...)):

    if store.uploaded_df is None:
        return {"status": "error", "message": "No dataset uploaded"}

    df = store.uploaded_df

    chart_type = data["chart_type"]
    x_column = data.get("x_column")
    y_column = data.get("y_column")

    if chart_type == "histogram":
        plt.figure(figsize=(8, 5))
        df[x_column].hist()

    elif chart_type == "scatter":
        plt.figure(figsize=(8, 5))
        plt.scatter(df[x_column], df[y_column])

        plt.xlabel(x_column)
        plt.ylabel(y_column)

    elif chart_type == "bar":
        plt.figure(figsize=(8, 5))
        df[x_column].value_counts().head(10).plot(kind="bar")

    elif chart_type == "box":
        plt.figure(figsize=(8, 5))
        plt.boxplot(df[x_column].dropna())

        plt.title(x_column)

    elif chart_type == "heatmap":
        import seaborn as sns

        plt.figure(figsize=(8, 6))

        sns.heatmap(
            df.select_dtypes(include=["number"]).corr(), annot=True, cmap="coolwarm"
        )

    else:
        return {"status": "error", "message": "Invalid chart type"}

    image = encode_chart()

    return {"status": "success", "image": image}


@router.get("/download-report")
async def download_report():

    if latest_summary is None:
        return {"status": "error", "message": "No analysis available"}

    pdf = generate_pdf_report(latest_summary, latest_explanation)

    return StreamingResponse(
        BytesIO(pdf),
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=Analyzr_Report.pdf"},
    )

from fastapi import APIRouter, UploadFile, File
from app.services.analysis_service import analyze_data
from app.services.gemini_service import generate_explanation

router = APIRouter()


@router.get("/")
def home():
    return {"message": "Autonomous CSV Data Analyst Backend Running"}


@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith(".csv"):
            return {"status": "error", "message": "Only CSV files are allowed"}

        result = analyze_data(file.file)
        explanation = generate_explanation(result)

        return {
            "status": "success",
            "message": "File analyzed successfully",
            "data": result,
            "llm_Explanation": explanation,
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}

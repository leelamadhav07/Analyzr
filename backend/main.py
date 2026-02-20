from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from analysis import analyze_data

app = FastAPI()

# Allow frontend to connect (important later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Autonomous CSV Data Analyst Backend Running"}


@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith(".csv"):
            return {
                "status": "error",
                "message": "Only CSV files are allowed"
            }

        result = analyze_data(file.file)

        return {
            "status": "success",
            "data": result
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }
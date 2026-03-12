import os
import json
from google.genai import Client
from dotenv import load_dotenv

load_dotenv()

client = Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_explanation(summary):

    prompt = f"""
You are an expert data analyst.

Analyze the dataset summary and provide:

1. Key Insights
2. Trends
3. Business Recommendations

Dataset Summary:
{json.dumps(summary, indent=2)}
"""

    response = client.models.generate_content(model="gemini-2.0-flash", contents=prompt)

    return response.text

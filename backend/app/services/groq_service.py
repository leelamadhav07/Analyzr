import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def generate_explanation(summary):

    # Convert summary to string
    summary_text = json.dumps(summary)

    # HARD TOKEN SAFETY LIMIT
    if len(summary_text) > 4000:
        summary_text = summary_text[:4000]

    prompt = f"""
You are a senior data analyst.

Provide exactly 3 short lines:

Line 1: Dataset overview.
Line 2: Most important trend or insight.
Line 3: Business recommendation.

Maximum 15 words per line.
No headings.
No bullet points.
No markdown.

Dataset Summary:
{summary_text}
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b", messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content

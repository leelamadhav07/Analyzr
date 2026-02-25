# import os
# import ollama

# # Disable proxy
# os.environ["HTTP_PROXY"] = ""
# os.environ["HTTPS_PROXY"] = ""
# os.environ["NO_PROXY"] = "localhost,127.0.0.1"

# def generate_explanation(summary_data):

#     prompt = f"""
#         You are a professional data analyst.
#         Explain this dataset summary clearly and simply:
#         {summary_data}
#     """

#     response = ollama.chat(
#         model = "phi3",
#         messages=[
#             {"role":"user", "content":prompt}
#         ]
#     )
#     return response["message"]["content"]

import subprocess
import json

def generate_explanation(summary_data):

    prompt = f"""
    You are a professional data analyst.
    Explain this dataset summary clearly and simply:

    {summary_data}
    """

    try:
        process = subprocess.Popen(
            ["ollama", "run", "phi3"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        output, error = process.communicate(prompt)

        if error:
            return f"Error from model: {error}"

        return output.strip()

    except Exception as e:
        return f"LLM Error: {str(e)}"
import ollama


def generate_explanation(summary_data):

    small_summary = {
        "rows": summary_data.get("rows"),
        "columns": summary_data.get("columns"),
        "mean_values": summary_data.get("mean_values", {}),
    }

    prompt = f"""
Explain this dataset briefly in 3-4 simple lines.

Dataset Summary:
{small_summary}
"""

    try:
        response = ollama.generate(model="phi3", prompt=prompt)
        return response["response"].strip()
    except Exception as e:
        return f"LLM Error: {str(e)}"

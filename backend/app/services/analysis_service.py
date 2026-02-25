import pandas as pd
import matplotlib.pyplot as plt
import io
import base64


def generate_graph(df):
    
    numeric_df = df.select_dtypes(include=["number"])

    if numeric_df.empty:
        return None

    plt.figure(figsize=(10, 6))
    numeric_df.hist()
    plt.tight_layout()

    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)

    plt.close()

    return base64.b64encode(buf.read()).decode()


def analyze_data(file): 

    df = pd.read_csv(file)

    summary = {
        "rows": df.shape[0],
        "columns": df.shape[1],
        "column_names": list(df.columns),
        "statistics": df.describe(include="all").fillna(0).to_dict(),
        "correlation": df.corr(numeric_only=True).fillna(0).to_dict(),
        "missing_values": df.isnull().sum().to_dict()
    }

    graph = generate_graph(df)

    if graph:
        summary["graph"] = graph
    else:
        summary["graph"] = "No numeric columns available for plotting"

    return summary
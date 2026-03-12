import pandas as pd
import matplotlib.pyplot as plt
import io
import base64


def encode_plot():

    buf = io.BytesIO()
    plt.savefig(buf, format="png", bbox_inches="tight")
    buf.seek(0)
    image = base64.b64encode(buf.read()).decode("utf-8")
    buf.close()
    plt.close()
    return image


def generate_histogram(df):

    numeric_df = df.select_dtypes(include=["number"])
    if numeric_df.empty:
        return None
    plt.figure(figsize=(8, 5))
    numeric_df.hist(figsize=(8, 5))
    plt.title("Histogram Distribution")
    return encode_plot()


def generate_bar_chart(df):

    categorical_cols = df.select_dtypes(include=["object"]).columns
    if len(categorical_cols) == 0:
        return None
    col = categorical_cols[0]
    plt.figure(figsize=(8, 5))
    df[col].value_counts().head(10).plot(kind="bar")
    plt.title(f"Top Categories in {col}")
    plt.xlabel(col)
    plt.ylabel("Count")
    return encode_plot()


def generate_scatter_plot(df):

    numeric_df = df.select_dtypes(include=["number"])
    if numeric_df.shape[1] < 2:
        return None
    col1 = numeric_df.columns[0]
    col2 = numeric_df.columns[1]
    plt.figure(figsize=(6, 5))
    plt.scatter(df[col1], df[col2])
    plt.xlabel(col1)
    plt.ylabel(col2)
    plt.title(f"{col1} vs {col2}")
    return encode_plot()


def analyze_data(file):

    df = pd.read_csv(file)

    summary = {
        "rows": df.shape[0],
        "columns": df.shape[1],
        "column_names": list(df.columns),
        "mean_values": df.mean(numeric_only=True).to_dict(),
        "median_values": df.median(numeric_only=True).to_dict(),
        "missing_values": df.isnull().sum().to_dict(),
        "correlation": df.corr(numeric_only=True).fillna(0).to_dict(),
    }

    charts = {
        "histogram": generate_histogram(df),
        "bar_chart": generate_bar_chart(df),
        "scatter_plot": generate_scatter_plot(df),
    }

    summary["charts"] = charts

    return summary

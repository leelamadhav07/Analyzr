from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from io import BytesIO


def generate_pdf_report(summary, explanation):

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    content = []

    content.append(Paragraph("AI CSV Analysis Report", styles["Title"]))

    content.append(Spacer(1, 12))

    content.append(Paragraph(f"Rows: {summary['rows']}", styles["Normal"]))

    content.append(Paragraph(f"Columns: {summary['columns']}", styles["Normal"]))

    content.append(Spacer(1, 12))

    content.append(Paragraph("AI Insights", styles["Heading2"]))

    content.append(Paragraph(explanation, styles["Normal"]))

    content.append(Spacer(1, 12))

    content.append(Paragraph("Missing Values", styles["Heading2"]))

    for col, count in summary["missing_values"].items():
        content.append(Paragraph(f"{col}: {count}", styles["Normal"]))

    doc.build(content)

    pdf = buffer.getvalue()

    buffer.close()

    return pdf

import { useState } from "react";
import axios from "axios";

function UploadCard() {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState(null);
    const [explanation, setExplanation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [column1, setColumn1] = useState("");
    const [column2, setColumn2] = useState("");
    const [correlationResult, setCorrelationResult] = useState(null);
    const [chartType, setChartType] = useState("");
    const [xColumn, setXColumn] = useState("");
    const [yColumn, setYColumn] = useState("");
    const [generatedChart, setGeneratedChart] = useState(null);

    const handleUpload = async () => {
        if (!file) {
            setErrorMsg("Please select a CSV file first.");
            return;
        }

        setErrorMsg("");
        setSummary(null);
        setExplanation(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);

            const response = await axios.post(
                "https://analyzr-backend-ybjn.onrender.com/upload",
                formData
            );

            if (response.data.status === "error") {
                setErrorMsg(response.data.message);
            } else {
                setSummary(response.data.data);

                // Fixed AI summary key
                setExplanation(response.data.llm_Explanation);
            }
        } catch (error) {
            setErrorMsg(
                "Upload failed. Please ensure the backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCorrelation = async () => {
        if (!column1 || !column2) {
            alert("Please select both columns");
            return;
        }

        try {
            const response = await axios.post(
                "https://analyzr-backend-ybjn.onrender.com/correlation",
                {
                    column1,
                    column2,
                }
            );

            setCorrelationResult(response.data);
        } catch (error) {
            console.error(error);
            alert("Failed to calculate correlation");
        }
    };

    const handleGenerateChart = async () => {
        if (!chartType) {
            alert("Please select chart type");
            return;
        }

        if (
            chartType !== "heatmap" &&
            !xColumn
        ) {
            alert("Please select a feature");
            return;
        }

        try {
            const payload = {
                chart_type: chartType,
                x_column: xColumn,
            };

            if (
                chartType === "scatter" &&
                yColumn
            ) {
                payload.y_column = yColumn;
            }

            const response = await axios.post(
                "https://analyzr-backend-ybjn.onrender.com/generate-chart",
                payload
            );

            setGeneratedChart(response.data.image);

        } catch (error) {
            console.error(error);
            alert("Failed to generate chart");
        }
    };

    const downloadReport = () => {
        window.open(
            "https://analyzr-backend-ybjn.onrender.com/download-report",
            "_blank"
        );
    };
    return (
        <div className="card">
            <h2>Analyze CSV Data</h2>

            <div className="upload-section">
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                        setErrorMsg("");
                    }}
                />

                <button
                    className="primary"
                    onClick={handleUpload}
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Upload & Analyze"}
                </button>
            </div>

            {errorMsg && (
                <div className="error-message">
                    {errorMsg}
                </div>
            )}

            {loading && (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <div className="loading-text">
                        Analyzing dataset with AI...
                    </div>
                </div>
            )}

            {summary && !loading && (
                <div className="summary">

                    <h3>Analysis Results</h3>

                    <button
                        className="primary"
                        onClick={downloadReport}
                        style={{
                            marginBottom: "20px"
                        }}
                    >
                        📥 Download Report
                    </button>

                    {/* AI Summary */}
                    {explanation && (
                        <div className="explanation-panel">
                            <h4>🤖 AI Insights</h4>
                            <p>{explanation}</p>
                        </div>
                    )}

                    {/* Dataset Overview */}
                    <h4>📊 Dataset Overview</h4>

                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                            marginBottom: "20px",
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                padding: "15px",
                                borderRadius: "10px",
                                background: "#1f2937",
                                minWidth: "150px",
                            }}
                        >
                            <h3>{summary.rows}</h3>
                            <p>Rows</p>
                        </div>

                        <div
                            style={{
                                padding: "15px",
                                borderRadius: "10px",
                                background: "#1f2937",
                                minWidth: "150px",
                            }}
                        >
                            <h3>{summary.columns}</h3>
                            <p>Columns</p>
                        </div>
                    </div>

                    {/* Missing Values */}
                    <div className="section">
                        <h4>📋 Missing Values</h4>

                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                            }}
                        >
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            borderBottom: "1px solid #555",
                                            textAlign: "left",
                                            padding: "10px",
                                        }}
                                    >
                                        Column
                                    </th>

                                    <th
                                        style={{
                                            borderBottom: "1px solid #555",
                                            textAlign: "left",
                                            padding: "10px",
                                        }}
                                    >
                                        Missing Count
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {Object.entries(
                                    summary.missing_values || {}
                                ).map(([column, count]) => (
                                    <tr key={column}>
                                        <td style={{ padding: "10px" }}>
                                            {column}
                                        </td>

                                        <td style={{ padding: "10px" }}>
                                            {count}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="section">
                        <h4>📄 Dataset Preview</h4>

                        {summary.preview &&
                            summary.preview.length > 0 && (

                                <div
                                    style={{
                                        overflowX: "auto",
                                        marginTop: "15px",
                                    }}
                                >
                                    <table
                                        style={{
                                            width: "100%",
                                            borderCollapse: "collapse",
                                        }}
                                    >
                                        <thead>
                                            <tr>
                                                {Object.keys(
                                                    summary.preview[0]
                                                ).map((column) => (
                                                    <th
                                                        key={column}
                                                        style={{
                                                            padding: "10px",
                                                            textAlign: "left",
                                                            borderBottom:
                                                                "1px solid #444",
                                                        }}
                                                    >
                                                        {column}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {summary.preview.map(
                                                (row, index) => (
                                                    <tr key={index}>
                                                        {Object.values(row).map(
                                                            (
                                                                value,
                                                                idx
                                                            ) => (
                                                                <td
                                                                    key={idx}
                                                                    style={{
                                                                        padding:
                                                                            "10px",
                                                                        borderBottom:
                                                                            "1px solid #333",
                                                                    }}
                                                                >
                                                                    {String(
                                                                        value
                                                                    )}
                                                                </td>
                                                            )
                                                        )}
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                    </div>

                    {/* Correlation Explorer */}
                    <div className="section">
                        <h4>🔗 Correlation Explorer</h4>

                        <div
                            style={{
                                display: "flex",
                                gap: "15px",
                                flexWrap: "wrap",
                                marginBottom: "15px",
                            }}
                        >
                            <select
                                value={column1}
                                onChange={(e) => setColumn1(e.target.value)}
                                style={{
                                    padding: "10px",
                                    borderRadius: "8px",
                                    minWidth: "180px",
                                }}
                            >
                                <option value="">Select Column 1</option>

                                {summary.column_names?.map((column) => (
                                    <option
                                        key={column}
                                        value={column}
                                    >
                                        {column}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={column2}
                                onChange={(e) => setColumn2(e.target.value)}
                                style={{
                                    padding: "10px",
                                    borderRadius: "8px",
                                    minWidth: "180px",
                                }}
                            >
                                <option value="">Select Column 2</option>

                                {summary.column_names?.map((column) => (
                                    <option
                                        key={column}
                                        value={column}
                                    >
                                        {column}
                                    </option>
                                ))}
                            </select>

                            <button
                                className="primary"
                                onClick={handleCorrelation}
                            >
                                Check Correlation
                            </button>
                        </div>

                        {correlationResult && (
                            <div
                                style={{
                                    background: "#1f2937",
                                    padding: "15px",
                                    borderRadius: "10px",
                                    marginTop: "10px",
                                }}
                            >
                                <h4>
                                    Correlation:
                                    {" "}
                                    {correlationResult.correlation}
                                </h4>

                                <p>
                                    {correlationResult.interpretation}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Charts */}
                    <div className="section">
                        <h4>📊 Visualization Studio</h4>

                        <div
                            style={{
                                display: "flex",
                                gap: "15px",
                                flexWrap: "wrap",
                                marginBottom: "20px",
                            }}
                        >

                            {/* Chart Type */}
                            <select
                                value={chartType}
                                onChange={(e) =>
                                    setChartType(e.target.value)
                                }
                                style={{
                                    padding: "10px",
                                    borderRadius: "8px",
                                    minWidth: "180px",
                                }}
                            >
                                <option value="">
                                    Select Chart Type
                                </option>

                                <option value="histogram">
                                    Histogram
                                </option>

                                <option value="scatter">
                                    Scatter Plot
                                </option>

                                <option value="bar">
                                    Bar Chart
                                </option>

                                <option value="box">
                                    Box Plot
                                </option>

                                <option value="heatmap">
                                    Heatmap
                                </option>
                            </select>

                            {/* X Column */}
                            {chartType !== "heatmap" && (
                                <select
                                    value={xColumn}
                                    onChange={(e) => setXColumn(e.target.value)}
                                    style={{
                                        padding: "10px",
                                        borderRadius: "8px",
                                        minWidth: "180px",
                                    }}
                                >
                                    <option value="">
                                        Select Feature
                                    </option>

                                    {summary.column_names?.map((column) => (
                                        <option
                                            key={column}
                                            value={column}
                                        >
                                            {column}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {/* Y Column */}
                            {chartType === "scatter" && (
                                <select
                                    value={yColumn}
                                    onChange={(e) =>
                                        setYColumn(e.target.value)
                                    }
                                    style={{
                                        padding: "10px",
                                        borderRadius: "8px",
                                        minWidth: "180px",
                                    }}
                                >
                                    <option value="">
                                        Select Y Column
                                    </option>

                                    {summary.column_names?.map((column) => (
                                        <option
                                            key={column}
                                            value={column}
                                        >
                                            {column}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <button
                                className="primary"
                                onClick={handleGenerateChart}
                            >
                                Generate Chart
                            </button>
                        </div>

                        {generatedChart && (
                            <div
                                style={{
                                    marginTop: "20px",
                                }}
                            >
                                <img
                                    src={`data:image/png;base64,${generatedChart}`}
                                    alt="Generated Chart"
                                    style={{
                                        width: "100%",
                                        borderRadius: "12px",
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}


export default UploadCard;
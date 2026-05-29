import { useState } from "react";
import axios from "axios";

function UploadCard() {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState(null);
    const [explanation, setExplanation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

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
                "http://127.0.0.1:8000/upload",
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

                    {/* Correlation Section */}
                    <div className="section">
                        <h4>📈 Correlation Analysis</h4>

                        <p>
                            Correlation matrix calculated successfully.
                        </p>

                        <p>
                            Heatmap visualization will be added in the next
                            version for better interpretation.
                        </p>
                    </div>

                    {/* Charts */}
                    {summary.charts && (
                        <div className="charts">
                            <h4>📊 Visualizations</h4>

                            {summary.charts.histogram && (
                                <div style={{ marginBottom: "20px" }}>
                                    <h5>Histogram</h5>

                                    <img
                                        src={`data:image/png;base64,${summary.charts.histogram}`}
                                        alt="Histogram"
                                        style={{
                                            width: "100%",
                                            borderRadius: "10px",
                                        }}
                                    />
                                </div>
                            )}

                            {summary.charts.scatter_plot && (
                                <div style={{ marginBottom: "20px" }}>
                                    <h5>Scatter Plot</h5>

                                    <img
                                        src={`data:image/png;base64,${summary.charts.scatter_plot}`}
                                        alt="Scatter Plot"
                                        style={{
                                            width: "100%",
                                            borderRadius: "10px",
                                        }}
                                    />
                                </div>
                            )}

                            {summary.charts.bar_chart && (
                                <div style={{ marginBottom: "20px" }}>
                                    <h5>Bar Chart</h5>

                                    <img
                                        src={`data:image/png;base64,${summary.charts.bar_chart}`}
                                        alt="Bar Chart"
                                        style={{
                                            width: "100%",
                                            borderRadius: "10px",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default UploadCard;
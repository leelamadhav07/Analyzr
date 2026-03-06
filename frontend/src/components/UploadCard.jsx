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
            setErrorMsg("Please select a file first.");
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
                setExplanation(response.data["llm Explanation"]);
            }
        } catch (error) {
            setErrorMsg("Upload failed. Please ensure the backend is running.");
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
                    <div className="loading-text">Analyzing dataset with AI...</div>
                </div>
            )}

            {summary && !loading && (
                <div className="summary">
                    <h3>Analysis Results</h3>

                    {/* AI Summary */}
                    {explanation && (
                        <div className="explanation-panel">
                            <h4>AI Summary</h4>
                            <p>{explanation}</p>
                        </div>
                    )}

                    {/* Dataset Info */}
                    <div className="dataset-info">
                        <p><strong>Rows:</strong> {summary.rows}</p>
                        <p><strong>Columns:</strong> {summary.columns}</p>
                    </div>

                    {/* Missing Values */}
                    <div className="section">
                        <h4>Missing Values</h4>
                        <pre>{JSON.stringify(summary.missing_values, null, 2)}</pre>
                    </div>

                    {/* Correlation */}
                    <div className="section">
                        <h4>Correlation Matrix</h4>
                        <pre>{JSON.stringify(summary.correlation, null, 2)}</pre>
                    </div>

                    {/* Charts */}
                    {summary.charts && (
                        <div className="charts">
                            <h4>Charts</h4>

                            {summary.charts.histogram && (
                                <div>
                                    <h5>Histogram</h5>
                                    <img
                                        src={`data:image/png;base64,${summary.charts.histogram}`}
                                        alt="Histogram"
                                        style={{ width: "100%", borderRadius: "10px" }}
                                    />
                                </div>
                            )}

                            {summary.charts.scatter_plot && (
                                <div>
                                    <h5>Scatter Plot</h5>
                                    <img
                                        src={`data:image/png;base64,${summary.charts.scatter_plot}`}
                                        alt="Scatter"
                                        style={{ width: "100%", borderRadius: "10px" }}
                                    />
                                </div>
                            )}

                            {summary.charts.bar_chart && (
                                <div>
                                    <h5>Bar Chart</h5>
                                    <img
                                        src={`data:image/png;base64,${summary.charts.bar_chart}`}
                                        alt="Bar"
                                        style={{ width: "100%", borderRadius: "10px" }}
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

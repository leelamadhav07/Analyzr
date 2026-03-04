import Navbar from "../components/Navbar";
import UploadCard from "../components/UploadCard";

function Dashboard() {
    return (
        <div className="dashboard">
            <Navbar />
            <div className="content">
                <UploadCard />
            </div>
        </div>
    );
}

export default Dashboard;
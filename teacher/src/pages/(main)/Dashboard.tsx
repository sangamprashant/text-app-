import { PageHeader } from "../../components";
import Stats from "./dashboard/Stats";

const Dashboard = () => {
    return (
        <>
            <PageHeader title="Quizly Dashboard" />
            <div className="p-4">
                <Stats />
            </div>
        </>
    );
};

export default Dashboard;

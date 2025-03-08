import { MdOutlineQuiz } from "react-icons/md";
import { PageHeader } from "../../../components";
import { ViewQuizComponent } from "../../../components/teacher";
import RollCheck from "../../../utilities/checks/RollCheck";

export const ViewQuizPage = () => {
    return (
        <RollCheck role="teacher">
            <>
                <PageHeader title="View Quizzes" icon={<MdOutlineQuiz />} />
                <ViewQuizComponent />
            </>
        </RollCheck>
    );
};

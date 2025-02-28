import { MdOutlineQuiz } from "react-icons/md"
import { PageHeader } from "../../../components"
import { AddQuizComponent } from "../../../components/teacher"
import RollCheck from "../../../utilities/checks/RollCheck"

export const AddQuizPage = () => {
    return (
        <RollCheck role='teacher'>
            <>
                <PageHeader title="Add Quiz For Your Students" icon={<MdOutlineQuiz />} />
                <AddQuizComponent />
            </>
        </RollCheck>
    )
}

import { PiStudent } from 'react-icons/pi'
import { PageHeader } from '../../../components'
import RollCheck from '../../../utilities/checks/RollCheck'
import { MyStudentsComponent } from '../../../components/teacher'


const MyStudentPage = () => {
    return (
        <RollCheck role='teacher'>
            <>
                <PageHeader title="Students under my course" icon={<PiStudent />} />
                <MyStudentsComponent />
            </>
        </RollCheck>
    )
}

export default MyStudentPage
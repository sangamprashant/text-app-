import { PiStudent } from 'react-icons/pi'
import { PageHeader } from '../../../components'
import { Admin } from '../../../components/admin'
import RollCheck from '../../../utilities/checks/RollCheck'

const ViewStudentsPage = () => {
    return (
        <RollCheck role='admin'>
            <>
                <PageHeader title="Manage Students" icon={<PiStudent />} />
                <Admin.ViewStudentC />
            </>
        </RollCheck>
    )
}

export default ViewStudentsPage
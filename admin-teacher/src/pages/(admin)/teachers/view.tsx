import { PiChalkboardTeacherLight } from 'react-icons/pi'
import { PageHeader } from '../../../components'
import { Admin } from '../../../components/admin'
import RollCheck from '../../../utilities/checks/RollCheck'

const ViewTeachersPage = () => {
    return (
        <RollCheck role='admin'>
            <>
                <PageHeader title="Manage Teachers" icon={<PiChalkboardTeacherLight />} />
                <Admin.ViewTeachersC />
            </>
        </RollCheck>
    )
}

export default ViewTeachersPage
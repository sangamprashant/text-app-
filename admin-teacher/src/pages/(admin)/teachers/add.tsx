import { PiChalkboardTeacherLight } from 'react-icons/pi'
import { PageHeader } from '../../../components'
import { Admin } from '../../../components/admin'
import RollCheck from '../../../utilities/checks/RollCheck'

const AddTeacherPage = () => {
    return (
        <RollCheck role='admin'>
            <>
                <PageHeader title="Add a Teacher" icon={<PiChalkboardTeacherLight />} />
                <Admin.AddTeacherC />
            </>
        </RollCheck>
    )
}

export default AddTeacherPage
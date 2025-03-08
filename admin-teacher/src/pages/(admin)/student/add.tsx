import { PiStudent } from 'react-icons/pi'
import { PageHeader } from '../../../components'
import { Admin } from '../../../components/admin'
import RollCheck from '../../../utilities/checks/RollCheck'

const AddStudentPage = () => {
    return (
        <RollCheck role='admin'>
            <>
                <PageHeader title="Add a Student" icon={<PiStudent />} />
                <Admin.AddStudentC />
            </>
        </RollCheck>
    )
}

export default AddStudentPage
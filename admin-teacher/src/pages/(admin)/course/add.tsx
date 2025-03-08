import { PiBooksThin } from 'react-icons/pi'
import { PageHeader } from '../../../components'
import RollCheck from '../../../utilities/checks/RollCheck'
import { Admin } from '../../../components/admin'

const AddCoursePage = () => {
    return (
        <RollCheck role='admin'>
            <>
                <PageHeader title="Add a Course" icon={<PiBooksThin />} />
                <Admin.AddCourse />
            </>
        </RollCheck>
    )
}

export default AddCoursePage
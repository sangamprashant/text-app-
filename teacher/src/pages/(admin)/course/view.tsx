import { PiBooksThin } from 'react-icons/pi'
import { PageHeader } from '../../../components'
import RollCheck from '../../../utilities/checks/RollCheck'
import { Admin } from '../../../components/admin'

const ViewCoursePage = () => {
    return (
        <RollCheck role='admin'>
            <>
                <PageHeader title="Manage Courses" icon={<PiBooksThin />} />
                <Admin.ViewCourse />
            </>
        </RollCheck>
    )
}

export default ViewCoursePage
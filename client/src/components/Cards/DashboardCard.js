import {
    Image
} from '@mui/icons-material';

const DashboardCard = () => {
    return (
        <div className='card-container'>
            <div className='w-100 card-header d-flex'>
                <h5 className="m-0">Title</h5>
                <div className="text-end w-100">
                    <Image/>
                </div>
            </div>
            <div className="card-content ">
                <h3>3000</h3>
            </div>
        </div>
    )
}

export default DashboardCard;
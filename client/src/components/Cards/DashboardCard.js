<<<<<<< HEAD
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
=======
import { Col } from "react-bootstrap";

const DashboardCard = ({
    title,
    icon,
    number,
}) => {
    return (
        <Col md={3} sm={12}>
            <div className='card-container'>
                <div className='w-100 card-header d-flex'>
                    <h5 className="m-0 w-100">
                        {title}
                    </h5>
                    <div className="text-end">
                        {icon}
                    </div>
                </div>
                <div className="card-content">
                    <h1>
                        {number}
                    </h1>
                </div>
            </div>
        </Col>
    );
>>>>>>> 1ec3338ddce2e6a5e398b58ea071b815f25afdc8
}

export default DashboardCard;
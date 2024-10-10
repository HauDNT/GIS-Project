import { useState, useEffect } from "react";
import { useNavigate, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import Loading from '../../components/Loading.js';

function Customers() {
    const [customers, setCustomers] = useState([]);

    const [isLoading, setLoading] = useState(true);


    return (
        <Container>
            {
                isLoading ? (
                    <Loading/>
                ) : (
                    <div>123</div>
                )
            }
        </Container>
    )
}

export default Customers;
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Logout = () => {

  const storedData = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (storedData){
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate("/login");
    }
    }, [navigate, storedData]);
  return (
    <></>

  );
};

export default Logout;


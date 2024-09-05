import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';

const useLogout = () => {
  const { setUser, setLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    setLoading(true);
    setUser(null);
    localStorage.removeItem('user');
    setLoading(false);
    navigate('/signin');
  };

  return logout;
};

export default useLogout;

import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useUser } from '../hooks';
import Spinner from '../spinner';

const RoleGuard: React.FC = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate('/login', { replace: true });
      } else if (user.role !== 'admin') {
        navigate('/', { replace: true });
      }
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return <Spinner isLoading={true} />;
  }

  return user && user.role === 'admin' ? <Outlet /> : null;
};

export default RoleGuard;
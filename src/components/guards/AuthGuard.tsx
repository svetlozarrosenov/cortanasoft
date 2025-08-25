import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useUser } from '../hooks';
import Spinner from '../spinner';

const AuthGuard: React.FC = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, user, navigate]);
  if (isLoading) {
    return <Spinner isLoading={true} />;
  }

  return user ? <Outlet /> : null;
};

export default AuthGuard;
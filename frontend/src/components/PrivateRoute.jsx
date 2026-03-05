import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useAuth();

    if (loading) return <p>Carregando...</p>;

    if (!user) return <Navigate to="/login" />;

    if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;

    return children;
};

export default PrivateRoute;

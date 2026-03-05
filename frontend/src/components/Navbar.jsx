import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <Link to="/" style={styles.logo}>Reserva de Salas</Link>
            <div style={styles.links}>
                {user ? (
                    <>
                        <Link to="/rooms" style={styles.link}>Salas</Link>
                        <Link to="/my-reservations" style={styles.link}>Minhas Reservas</Link>
                        {user.role === 'admin' && (
                            <>
                                <Link to="/admin/rooms" style={styles.link}>Gerenciar Salas</Link>
                                <Link to="/admin/reservations" style={styles.link}>Todas Reservas</Link>
                            </>
                        )}
                        <span style={styles.user}>Olá, {user.name}</span>
                        <button onClick={handleLogout} style={styles.button}>Sair</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Cadastro</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#1a1a2e',
        color: '#fff'
    },
    logo: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#e94560',
        textDecoration: 'none'
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '14px'
    },
    user: {
        color: '#e94560',
        fontSize: '14px'
    },
    button: {
        padding: '8px 16px',
        backgroundColor: '#e94560',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default Navbar;

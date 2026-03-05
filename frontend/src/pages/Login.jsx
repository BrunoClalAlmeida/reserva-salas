import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success('Login realizado com sucesso!');
            navigate('/rooms');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erro ao fazer login');
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Entrar</button>
                <p style={styles.text}>
                    Não tem conta? <Link to="/register" style={styles.link}>Cadastre-se</Link>
                </p>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '40px',
        backgroundColor: '#16213e',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '400px'
    },
    title: {
        color: '#e94560',
        textAlign: 'center',
        marginBottom: '10px'
    },
    input: {
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #333',
        backgroundColor: '#0f3460',
        color: '#fff',
        fontSize: '14px'
    },
    button: {
        padding: '12px',
        backgroundColor: '#e94560',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    text: {
        color: '#ccc',
        textAlign: 'center',
        fontSize: '14px'
    },
    link: {
        color: '#e94560',
        textDecoration: 'none'
    }
};

export default Login;

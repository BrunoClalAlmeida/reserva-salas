import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await api.get('/rooms');
            setRooms(response.data);
        } catch (error) {
            toast.error('Erro ao carregar salas');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p style={{ color: '#fff', textAlign: 'center' }}>Carregando...</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Salas Disponíveis</h2>
            <div style={styles.grid}>
                {rooms.length === 0 ? (
                    <p style={{ color: '#ccc' }}>Nenhuma sala cadastrada.</p>
                ) : (
                    rooms.map((room) => (
                        <div key={room._id} style={styles.card}>
                            <h3 style={styles.cardTitle}>{room.name}</h3>
                            <p style={styles.cardText}>Capacidade: {room.capacity} pessoas</p>
                            <p style={styles.cardText}>{room.description}</p>
                            <button
                                onClick={() => navigate(`/reserve/${room._id}`)}
                                style={styles.button}
                            >
                                Reservar
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '30px',
        maxWidth: '1000px',
        margin: '0 auto'
    },
    title: {
        color: '#e94560',
        marginBottom: '20px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
    },
    card: {
        backgroundColor: '#16213e',
        padding: '20px',
        borderRadius: '10px',
        border: '1px solid #0f3460'
    },
    cardTitle: {
        color: '#e94560',
        marginBottom: '10px'
    },
    cardText: {
        color: '#ccc',
        fontSize: '14px',
        marginBottom: '5px'
    },
    button: {
        marginTop: '10px',
        padding: '10px 20px',
        backgroundColor: '#e94560',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%'
    }
};

export default Rooms;

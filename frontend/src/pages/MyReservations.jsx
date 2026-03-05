import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const MyReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await api.get('/reservations/my');
            setReservations(response.data);
        } catch (error) {
            toast.error('Erro ao carregar reservas');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        try {
            await api.patch(`/reservations/${id}/cancel`);
            toast.success('Reserva cancelada!');
            fetchReservations();
        } catch (error) {
            toast.error('Erro ao cancelar reserva');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pendente: '#f39c12',
            aprovada: '#27ae60',
            recusada: '#e74c3c',
            cancelada: '#95a5a6'
        };
        return colors[status] || '#fff';
    };

    if (loading) return <p style={{ color: '#fff', textAlign: 'center' }}>Carregando...</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Minhas Reservas</h2>
            {reservations.length === 0 ? (
                <p style={{ color: '#ccc' }}>Você não tem reservas.</p>
            ) : (
                reservations.map((res) => (
                    <div key={res._id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h3 style={styles.roomName}>{res.room?.name || 'Sala removida'}</h3>
                            <span style={{
                                ...styles.status,
                                backgroundColor: getStatusColor(res.status)
                            }}>
                                {res.status}
                            </span>
                        </div>
                        <p style={styles.text}>Data: {res.date}</p>
                        <p style={styles.text}>Horário: {res.startTime} - {res.endTime}</p>
                        {res.reason && <p style={styles.text}>Motivo: {res.reason}</p>}
                        {(res.status === 'pendente' || res.status === 'aprovada') && (
                            <button
                                onClick={() => handleCancel(res._id)}
                                style={styles.cancelButton}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '30px',
        maxWidth: '800px',
        margin: '0 auto'
    },
    title: {
        color: '#e94560',
        marginBottom: '20px'
    },
    card: {
        backgroundColor: '#16213e',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '15px',
        border: '1px solid #0f3460'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
    },
    roomName: {
        color: '#fff',
        margin: 0
    },
    status: {
        padding: '5px 12px',
        borderRadius: '15px',
        color: '#fff',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    text: {
        color: '#ccc',
        fontSize: '14px',
        margin: '5px 0'
    },
    cancelButton: {
        marginTop: '10px',
        padding: '8px 20px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default MyReservations;

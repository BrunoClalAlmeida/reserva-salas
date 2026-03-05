import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await api.get('/reservations');
            setReservations(response.data);
        } catch (error) {
            toast.error('Erro ao carregar reservas');
        } finally {
            setLoading(false);
        }
    };

    const handleStatus = async (id, status) => {
        try {
            await api.patch(`/reservations/${id}/status`, { status });
            toast.success(`Reserva ${status}!`);
            fetchReservations();
        } catch (error) {
            toast.error('Erro ao atualizar status');
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
            <h2 style={styles.title}>Todas as Reservas (Admin)</h2>
            {reservations.length === 0 ? (
                <p style={{ color: '#ccc' }}>Nenhuma reserva encontrada.</p>
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
                        <p style={styles.text}>Usuário: {res.user?.name} ({res.user?.email})</p>
                        <p style={styles.text}>Data: {res.date}</p>
                        <p style={styles.text}>Horário: {res.startTime} - {res.endTime}</p>
                        {res.reason && <p style={styles.text}>Motivo: {res.reason}</p>}
                        {res.status === 'pendente' && (
                            <div style={styles.actions}>
                                <button
                                    onClick={() => handleStatus(res._id, 'aprovada')}
                                    style={styles.approveButton}
                                >
                                    Aprovar
                                </button>
                                <button
                                    onClick={() => handleStatus(res._id, 'recusada')}
                                    style={styles.rejectButton}
                                >
                                    Recusar
                                </button>
                            </div>
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
    actions: {
        display: 'flex',
        gap: '10px',
        marginTop: '10px'
    },
    approveButton: {
        padding: '8px 20px',
        backgroundColor: '#27ae60',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    rejectButton: {
        padding: '8px 20px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default AdminReservations;

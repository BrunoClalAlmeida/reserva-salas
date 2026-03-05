import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const ReserveRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await api.get(`/rooms/${id}`);
                setRoom(response.data);
            } catch (error) {
                toast.error('Sala não encontrada');
                navigate('/rooms');
            }
        };
        fetchRoom();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/reservations', {
                room: id,
                date,
                startTime,
                endTime,
                reason
            });
            toast.success('Reserva criada com sucesso!');
            navigate('/my-reservations');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erro ao criar reserva');
        }
    };

    if (!room) return <p style={{ color: '#fff', textAlign: 'center' }}>Carregando...</p>;

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Reservar: {room.name}</h2>
                <p style={styles.info}>Capacidade: {room.capacity} pessoas</p>
                <label style={styles.label}>Data</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={styles.input}
                    required
                />
                <label style={styles.label}>Horário de Início</label>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    style={styles.input}
                    required
                />
                <label style={styles.label}>Horário de Término</label>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    style={styles.input}
                    required
                />
                <label style={styles.label}>Motivo (opcional)</label>
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={styles.textarea}
                    placeholder="Ex: Reunião de grupo, estudo..."
                />
                <button type="submit" style={styles.button}>Confirmar Reserva</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '30px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '40px',
        backgroundColor: '#16213e',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '500px'
    },
    title: {
        color: '#e94560',
        marginBottom: '5px'
    },
    info: {
        color: '#ccc',
        fontSize: '14px',
        marginBottom: '10px'
    },
    label: {
        color: '#ccc',
        fontSize: '14px'
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #333',
        backgroundColor: '#0f3460',
        color: '#fff',
        fontSize: '14px'
    },
    textarea: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #333',
        backgroundColor: '#0f3460',
        color: '#fff',
        fontSize: '14px',
        minHeight: '60px',
        resize: 'vertical'
    },
    button: {
        marginTop: '10px',
        padding: '12px',
        backgroundColor: '#e94560',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    }
};

export default ReserveRoom;

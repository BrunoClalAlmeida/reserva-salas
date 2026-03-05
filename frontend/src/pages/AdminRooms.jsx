import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);

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

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/rooms', {
                name,
                capacity: Number(capacity),
                description
            });
            toast.success('Sala criada!');
            setName('');
            setCapacity('');
            setDescription('');
            fetchRooms();
        } catch (error) {
            toast.error('Erro ao criar sala');
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/rooms/${id}`);
            toast.success('Sala removida!');
            fetchRooms();
        } catch (error) {
            toast.error('Erro ao remover sala');
        }
    };

    if (loading) return <p style={{ color: '#fff', textAlign: 'center' }}>Carregando...</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Gerenciar Salas (Admin)</h2>

            <form onSubmit={handleCreate} style={styles.form}>
                <h3 style={styles.subtitle}>Criar Nova Sala</h3>
                <input
                    type="text"
                    placeholder="Nome da sala"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="number"
                    placeholder="Capacidade"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    style={styles.input}
                    required
                    min="1"
                />
                <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={styles.textarea}
                />
                <button type="submit" style={styles.button}>Criar Sala</button>
            </form>

            <h3 style={styles.subtitle}>Salas Cadastradas</h3>
            {rooms.length === 0 ? (
                <p style={{ color: '#ccc' }}>Nenhuma sala cadastrada.</p>
            ) : (
                rooms.map((room) => (
                    <div key={room._id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div>
                                <h4 style={styles.roomName}>{room.name}</h4>
                                <p style={styles.text}>Capacidade: {room.capacity}</p>
                                <p style={styles.text}>{room.description}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(room._id)}
                                style={styles.deleteButton}
                            >
                                Excluir
                            </button>
                        </div>
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
    subtitle: {
        color: '#fff',
        marginBottom: '15px',
        marginTop: '30px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '20px',
        backgroundColor: '#16213e',
        borderRadius: '10px'
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
        padding: '12px',
        backgroundColor: '#e94560',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
    },
    card: {
        backgroundColor: '#16213e',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '10px',
        border: '1px solid #0f3460'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    roomName: {
        color: '#e94560',
        margin: '0 0 5px 0'
    },
    text: {
        color: '#ccc',
        fontSize: '14px',
        margin: '3px 0'
    },
    deleteButton: {
        padding: '8px 20px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default AdminRooms;

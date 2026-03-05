import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthProvider } from '../context/AuthContext';

describe('Navbar', () => {
    test('deve renderizar o logo Reserva de Salas', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                </AuthProvider>
            </BrowserRouter>
        );
        expect(screen.getByText('Reserva de Salas')).toBeDefined();
    });

    test('deve mostrar links de Login e Cadastro quando nao logado', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                </AuthProvider>
            </BrowserRouter>
        );
        expect(screen.getByText('Login')).toBeDefined();
        expect(screen.getByText('Cadastro')).toBeDefined();
    });
});

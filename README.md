# Sistema de Reserva de Salas

Sistema web para reserva de salas de estudo, desenvolvido como atividade final da disciplina de Desenvolvimento de Software em Nuvem - ADS / IA (EAD - Unifor).

## Tecnologias

- **Front-end:** React (Vite)
- **Back-end:** Node.js + Express
- **Banco de Dados:** MongoDB Atlas
- **Container:** Docker
- **CI/CD:** GitHub Actions
- **Deploy Front:** Vercel
- **Deploy Back:** Render
- **Documentação API:** Swagger/OpenAPI

## Como Rodar Localmente

### Pré-requisitos
- Node.js 20+
- Docker (opcional)
- Conta no MongoDB Atlas

### Backend

cd backend
cp .env.example .env
npm install
npm run dev

### Frontend

cd frontend
npm install
npm run dev

### Docker

docker-compose up --build

## Documentação da API

Após rodar o backend, acesse: http://localhost:5000/api-docs

## Deploy

- **Frontend:** https://reserva-salas-frontend.vercel.app
- **Backend:** https://reserva-salas-backend.onrender.com

## Equipe

| Nome | Papel |
|------|-------|
| Bruno Clal de Almeida | Arquiteto de Software em Nuvem e Desenvolvedora Front-end|
| Cristiano da Costa Silva | Desenvolvedor Back-end e Responsável por Qualidade e Testes |
| Laís Ferreira | Engenheira DevOps e Documentação e Integração |

## Licença

MIT

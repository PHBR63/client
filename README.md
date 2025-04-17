# Ficha Paranormal - Gerenciador de Campanhas para Ordem Paranormal RPG

Este é um aplicativo web desenvolvido para facilitar o gerenciamento de campanhas do Ordem Paranormal RPG, permitindo que mestres e jogadores tenham uma experiência mais imersiva e organizada.

## Funcionalidades Principais

- Gerenciamento de usuários (mestres e jogadores)
- Criação e administração de campanhas
- Sistema de fichas de personagens
- Rolagem de dados integrada
- Chat em tempo real
- Gerenciamento de rituais e habilidades
- Sistema de NEX e progressão

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- MongoDB
- Socket.IO
- JWT para autenticação

### Frontend
- React
- Material-UI
- Socket.IO Client
- React Router

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
```

2. Instale as dependências do backend:
```bash
npm install
```

3. Instale as dependências do frontend:
```bash
cd client
npm install
```

4. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ficha-paranormal
JWT_SECRET=seu_segredo_jwt_aqui
NODE_ENV=development
```

## Executando o Projeto

1. Inicie o servidor backend:
```bash
npm run dev
```

2. Em outro terminal, inicie o frontend:
```bash
cd client
npm start
```

O aplicativo estará disponível em:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Estrutura do Projeto

```
ficha-paranormal/
├── client/                 # Frontend React
├── server.js              # Ponto de entrada do servidor
├── package.json           # Dependências do backend
└── .env                   # Variáveis de ambiente
```

## Contribuição

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes. 
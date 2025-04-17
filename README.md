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
- Suporte a múltiplos idiomas (Português e Inglês)
- Tema claro/escuro
- Efeitos visuais com Particles.js
- Animações suaves
- Design responsivo
- Acessibilidade
- Analytics integrado

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- MongoDB
- Socket.IO
- JWT para autenticação

### Frontend
- React 18
- Material-UI
- Styled Components
- React Router
- i18next
- Yup
- Jest
- React Testing Library
- Socket.IO Client
- Vercel Analytics

## Requisitos

- Node.js 16+
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/ficha-paranormal.git
cd ficha-paranormal
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

## Testes

Para executar os testes:
```bash
npm test
# ou
yarn test
```

Para ver a cobertura de testes:
```bash
npm test -- --coverage
# ou
yarn test --coverage
```

## Estrutura do Projeto

```
ficha-paranormal/
├── client/                # Frontend React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── config/
│   │   ├── locales/
│   │   └── __tests__/
│   ├── public/
│   └── package.json
├── server.js             # Ponto de entrada do servidor
├── package.json          # Dependências do backend
└── .env                  # Variáveis de ambiente
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Contato

- Email: seu-email@exemplo.com
- Discord: seu-usuario#1234
- Twitter: @seu-usuario

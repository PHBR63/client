import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Send as SendIcon,
  Add as AddIcon,
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { theme } from '../config/theme';

// Componentes estilizados
const LobbyContainer = styled(Box)(({ theme: muiTheme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${theme.backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: muiTheme.spacing(4),
  color: theme.colors.text,
}));

const CampaignInfo = styled(Paper)(({ theme: muiTheme }) => ({
  padding: muiTheme.spacing(4),
  marginBottom: muiTheme.spacing(4),
  background: theme.colors.secondary,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.accent}`,
  '& h2': {
    fontFamily: theme.fonts.title,
    color: theme.colors.primary,
    marginBottom: muiTheme.spacing(2),
  },
  '& p': {
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
    marginBottom: muiTheme.spacing(2),
  },
}));

const PlayersList = styled(Paper)(({ theme: muiTheme }) => ({
  padding: muiTheme.spacing(4),
  background: theme.colors.secondary,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.accent}`,
  height: '100%',
}));

const ChatContainer = styled(Paper)(({ theme: muiTheme }) => ({
  padding: muiTheme.spacing(4),
  background: theme.colors.secondary,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.accent}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const ChatMessages = styled(Box)(({ theme: muiTheme }) => ({
  flex: 1,
  overflowY: 'auto',
  marginBottom: muiTheme.spacing(2),
  padding: muiTheme.spacing(2),
  '& .message': {
    marginBottom: muiTheme.spacing(2),
    padding: muiTheme.spacing(2),
    borderRadius: muiTheme.shape.borderRadius,
    maxWidth: '80%',
    '&.master': {
      backgroundColor: `${theme.colors.primary}40`,
      marginLeft: 'auto',
    },
    '&.player': {
      backgroundColor: `${theme.colors.accent}20`,
      marginRight: 'auto',
    },
  },
}));

const ChatInput = styled(Box)(({ theme: muiTheme }) => ({
  display: 'flex',
  gap: muiTheme.spacing(2),
}));

const CampaignLobby = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMaster, setIsMaster] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => {
    // Simular carregamento de dados da campanha
    setCampaign({
      id: campaignId,
      name: 'A Maldição do Vale',
      description: 'Uma investigação sobrenatural em um vale isolado...',
      difficulty: 'Médio',
      houseRules: 'Nenhuma regra da casa específica',
      master: 'Mestre João',
    });

    // Simular lista de jogadores
    setPlayers([
      { id: 1, name: 'João', character: 'Detetive Silva', class: 'Especialista', online: true },
      { id: 2, name: 'Maria', character: 'Dr. Santos', class: 'Ocultista', online: false },
    ]);

    // Simular mensagens do chat
    setMessages([
      { id: 1, sender: 'master', text: 'Bem-vindos à campanha!', timestamp: '10:00' },
      { id: 2, sender: 'player', text: 'Obrigado! Estou ansioso para começar.', timestamp: '10:01' },
    ]);

    // Simular verificação de mestre
    setIsMaster(true);
  }, [campaignId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: isMaster ? 'master' : 'player',
          text: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setNewMessage('');
    }
  };

  const handleInvitePlayer = () => {
    if (inviteEmail.trim()) {
      // Simular envio de convite
      console.log('Convite enviado para:', inviteEmail);
      setInviteDialogOpen(false);
      setInviteEmail('');
    }
  };

  const handleStartSession = () => {
    navigate(`/session/${campaignId}`);
  };

  return (
    <LobbyContainer>
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Coluna da esquerda - Informações e Jogadores */}
        <Box sx={{ flex: 1 }}>
          <CampaignInfo>
            <Typography variant="h2">{campaign?.name}</Typography>
            <Typography>{campaign?.description}</Typography>
            <Typography>Dificuldade: {campaign?.difficulty}</Typography>
            <Typography>Regras da Casa: {campaign?.houseRules}</Typography>
            <Typography>Mestre: {campaign?.master}</Typography>
            {isMaster && (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/campaign/edit/${campaignId}`)}
                sx={{ mt: 2 }}
              >
                Editar Campanha
              </Button>
            )}
          </CampaignInfo>

          <PlayersList>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Jogadores
            </Typography>
            <List>
              {players.map((player) => (
                <React.Fragment key={player.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={player.character}
                      secondary={`${player.name} (${player.class})`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => navigate(`/character/edit/${player.id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
            {isMaster && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setInviteDialogOpen(true)}
                sx={{ mt: 2 }}
              >
                Convidar Jogador
              </Button>
            )}
          </PlayersList>
        </Box>

        {/* Coluna da direita - Chat */}
        <ChatContainer sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Chat
          </Typography>
          <ChatMessages>
            {messages.map((message) => (
              <Box
                key={message.id}
                className={`message ${message.sender}`}
              >
                <Typography variant="body2" color="textSecondary">
                  {message.timestamp}
                </Typography>
                <Typography>{message.text}</Typography>
              </Box>
            ))}
          </ChatMessages>
          <ChatInput>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <SendIcon />
            </IconButton>
          </ChatInput>
        </ChatContainer>
      </Box>

      {/* Botão Iniciar Sessão (apenas para mestre) */}
      {isMaster && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={handleStartSession}
          >
            Iniciar Sessão
          </Button>
        </Box>
      )}

      {/* Modal de Convite */}
      <Dialog open={inviteDialogOpen} onClose={() => setInviteDialogOpen(false)}>
        <DialogTitle>Convidar Jogador</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email do Jogador"
            type="email"
            fullWidth
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInviteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleInvitePlayer} color="primary">
            Enviar Convite
          </Button>
        </DialogActions>
      </Dialog>
    </LobbyContainer>
  );
};

export default CampaignLobby; 
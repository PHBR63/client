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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Card,
  CardContent,
  Tabs,
  Tab,
  Badge,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Send as SendIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Casino as CasinoIcon,
  Map as MapIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { theme } from '../config/theme';
import ParticlesBackground from '../components/ParticlesBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Componentes estilizados
const SessionContainer = styled(Box)(({ theme: muiTheme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${theme.backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: muiTheme.spacing(4),
  color: theme.colors.text,
}));

const GamePanel = styled(Paper)(({ theme: muiTheme }) => ({
  padding: muiTheme.spacing(4),
  background: theme.colors.secondary,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.accent}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const CharacterSheet = styled(Paper)(({ theme: muiTheme }) => ({
  padding: muiTheme.spacing(4),
  background: theme.colors.secondary,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.accent}`,
  height: '100%',
  overflowY: 'auto',
}));

const MapContainer = styled(Paper)(({ theme: muiTheme }) => ({
  padding: muiTheme.spacing(4),
  background: theme.colors.secondary,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.accent}`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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
    '&.roll': {
      backgroundColor: `${theme.colors.primary}20`,
      textAlign: 'center',
    },
  },
}));

const ChatInput = styled(Box)(({ theme: muiTheme }) => ({
  display: 'flex',
  gap: muiTheme.spacing(2),
}));

const CharacterCard = styled(Paper)(({ theme: muiTheme }) => ({
  padding: muiTheme.spacing(2),
  background: theme.colors.secondary,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.accent}`,
  marginBottom: muiTheme.spacing(2),
  '&:hover': {
    borderColor: theme.colors.primary,
  },
}));

const StatInput = styled(TextField)(({ theme: muiTheme }) => ({
  '& .MuiOutlinedInput-root': {
    color: theme.colors.text,
    background: 'rgba(0, 0, 0, 0.2)',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.colors.primary,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.colors.primary,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.colors.textSecondary,
  },
}));

const Session = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isMaster, setIsMaster] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [diceRoll, setDiceRoll] = useState({
    attribute: '',
    skill: '',
    bonus: 0,
    trained: false,
    result: null,
  });
  const [mapZoom, setMapZoom] = useState(100);
  const [showMasterPanel, setShowMasterPanel] = useState(false);
  const [scene, setScene] = useState('Interlúdio');
  const [newNpc, setNewNpc] = useState({
    name: '',
    phrase: '',
    pv: 0,
    pe: 0,
    sanidade: 0
  });

  useEffect(() => {
    // Simular carregamento de dados da sessão
    setIsMaster(true); // Simular que o usuário é o mestre
    setCharacters([
      {
        id: 1,
        name: 'Detetive Silva',
        class: 'Especialista',
        pv: 15,
        pe: 5,
        sanity: 20,
        image: null,
      },
      {
        id: 2,
        name: 'Dr. Santos',
        class: 'Ocultista',
        pv: 12,
        pe: 8,
        sanity: 18,
        image: null,
      },
    ]);
  }, [sessionId]);

  const handleRollDice = () => {
    const bonus = diceRoll.bonus + (diceRoll.trained ? 5 : 0);
    const baseRoll = Math.floor(Math.random() * 20) + 1;
    const bonusRolls = Array(bonus).fill(0).map(() => Math.floor(Math.random() * 20) + 1);
    const allRolls = [baseRoll, ...bonusRolls];
    const result = Math.max(...allRolls);

    setDiceRoll({ ...diceRoll, result });
    addMessage({
      type: 'roll',
      text: `Rolagem de ${diceRoll.attribute} + ${diceRoll.skill}${diceRoll.trained ? ' (treinado)' : ''}: ${result} (${allRolls.join(', ')})`,
    });
  };

  const handleUpdateCharacter = (characterId, field, value) => {
    setCharacters(characters.map(char => {
      if (char.id === characterId) {
        return { ...char, [field]: value };
      }
      return char;
    }));
  };

  const addMessage = (message) => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        ...message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addMessage({
        type: isMaster ? 'master' : 'player',
        text: newMessage,
      });
      setNewMessage('');
    }
  };

  const handleEndSession = () => {
    navigate(`/campaign/lobby/${sessionId}`);
  };

  const handleAddNpc = (e) => {
    e.preventDefault();
    if (!newNpc.name || !newNpc.phrase) return;
    
    const newCharacter = {
      id: characters.length + 1,
      name: newNpc.name,
      class: 'NPC',
      pv: newNpc.pv,
      maxPv: newNpc.pv,
      pe: newNpc.pe,
      maxPe: newNpc.pe,
      sanidade: newNpc.sanidade,
      maxSanidade: newNpc.sanidade,
      player: 'Mestre',
      phrase: newNpc.phrase
    };

    setCharacters([...characters, newCharacter]);
    setNewNpc({ name: '', phrase: '', pv: 0, pe: 0, sanidade: 0 });
    addMessage({
      type: 'master',
      text: `NPC "${newNpc.name}" adicionado à cena: "${newNpc.phrase}"`
    });
  };

  return (
    <SessionContainer>
      <ParticlesBackground />
      <Navbar />
      
      <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Coluna da esquerda - Fichas */}
        <Box sx={{ flex: 1 }}>
          <CharacterSheet>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Personagens
            </Typography>
            <List>
              {characters.map((character) => (
                <React.Fragment key={character.id}>
                  <CharacterCard>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: theme.colors.primary, mr: 2 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ color: theme.colors.text }}>
                          {character.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.colors.textSecondary }}>
                          {character.class} - {character.player}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => setSelectedCharacter(character)}
                        sx={{ color: theme.colors.primary }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                      <StatInput
                        label="PV"
                        type="number"
                        value={character.pv}
                        onChange={(e) => handleUpdateCharacter(character.id, 'pv', parseInt(e.target.value) || 0)}
                        inputProps={{ min: 0, max: character.maxPv }}
                      />
                      <StatInput
                        label="PE"
                        type="number"
                        value={character.pe}
                        onChange={(e) => handleUpdateCharacter(character.id, 'pe', parseInt(e.target.value) || 0)}
                        inputProps={{ min: 0, max: character.maxPe }}
                      />
                      <StatInput
                        label="Sanidade"
                        type="number"
                        value={character.sanidade}
                        onChange={(e) => handleUpdateCharacter(character.id, 'sanidade', parseInt(e.target.value) || 0)}
                        inputProps={{ min: 0, max: character.maxSanidade }}
                      />
                    </Box>
                    {character.phrase && (
                      <Typography variant="body2" sx={{ mt: 2, color: theme.colors.textSecondary }}>
                        "{character.phrase}"
                      </Typography>
                    )}
                  </CharacterCard>
                </React.Fragment>
              ))}
            </List>
          </CharacterSheet>
        </Box>

        {/* Coluna do meio - Mapa e Rolagem */}
        <Box sx={{ flex: 2 }}>
          <MapContainer>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <IconButton onClick={() => setMapZoom(prev => Math.min(prev + 10, 200))}>
                <ZoomInIcon />
              </IconButton>
              <IconButton onClick={() => setMapZoom(prev => Math.max(prev - 10, 50))}>
                <ZoomOutIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                width: '100%',
                height: '400px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px dashed rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography>Mapa Interativo (Placeholder)</Typography>
            </Box>
          </MapContainer>

          <GamePanel sx={{ mt: 2 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Rolagem de Dados
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Atributo</InputLabel>
                <Select
                  value={diceRoll.attribute}
                  onChange={(e) => setDiceRoll({ ...diceRoll, attribute: e.target.value })}
                >
                  <MenuItem value="Força">Força</MenuItem>
                  <MenuItem value="Agilidade">Agilidade</MenuItem>
                  <MenuItem value="Intelecto">Intelecto</MenuItem>
                  <MenuItem value="Presença">Presença</MenuItem>
                  <MenuItem value="Vigor">Vigor</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Perícia</InputLabel>
                <Select
                  value={diceRoll.skill}
                  onChange={(e) => setDiceRoll({ ...diceRoll, skill: e.target.value })}
                >
                  <MenuItem value="Atletismo">Atletismo</MenuItem>
                  <MenuItem value="Furtividade">Furtividade</MenuItem>
                  <MenuItem value="Ocultismo">Ocultismo</MenuItem>
                  <MenuItem value="Percepção">Percepção</MenuItem>
                  <MenuItem value="Persuasão">Persuasão</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Bônus"
                type="number"
                value={diceRoll.bonus}
                onChange={(e) => setDiceRoll({ ...diceRoll, bonus: parseInt(e.target.value) || 0 })}
                sx={{ width: '100px' }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={diceRoll.trained}
                    onChange={(e) => setDiceRoll({ ...diceRoll, trained: e.target.checked })}
                    sx={{ color: theme.colors.primary }}
                  />
                }
                label="Treinado (+5)"
              />
              <Button
                variant="contained"
                startIcon={<CasinoIcon />}
                onClick={handleRollDice}
                disabled={!diceRoll.attribute || !diceRoll.skill}
              >
                Rolar
              </Button>
            </Box>
            {diceRoll.result && (
              <Typography variant="h4" sx={{ textAlign: 'center', color: theme.colors.primary }}>
                Resultado: {diceRoll.result}
              </Typography>
            )}
          </GamePanel>
        </Box>

        {/* Coluna da direita - Chat e Painel do Mestre */}
        <Box sx={{ flex: 1 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 2 }}
          >
            <Tab label="Chat" />
            {isMaster && <Tab label="Painel do Mestre" />}
          </Tabs>

          {activeTab === 0 ? (
            <ChatContainer>
              <ChatMessages>
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    className={`message ${message.type}`}
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
          ) : (
            <GamePanel>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Painel do Mestre
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Controle de Cena */}
                <FormControl fullWidth>
                  <InputLabel>Cena Atual</InputLabel>
                  <Select
                    value={scene}
                    onChange={(e) => setScene(e.target.value)}
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Ação">Ação</MenuItem>
                    <MenuItem value="Investigação">Investigação</MenuItem>
                    <MenuItem value="Interlúdio">Interlúdio</MenuItem>
                  </Select>
                </FormControl>

                {/* Adicionar NPC */}
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Adicionar NPC
                </Typography>
                <Box component="form" onSubmit={handleAddNpc} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Nome do NPC"
                    value={newNpc.name}
                    onChange={(e) => setNewNpc({ ...newNpc, name: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="Frase-chave"
                    value={newNpc.phrase}
                    onChange={(e) => setNewNpc({ ...newNpc, phrase: e.target.value })}
                    fullWidth
                  />
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                    <TextField
                      label="PV"
                      type="number"
                      value={newNpc.pv}
                      onChange={(e) => setNewNpc({ ...newNpc, pv: parseInt(e.target.value) || 0 })}
                    />
                    <TextField
                      label="PE"
                      type="number"
                      value={newNpc.pe}
                      onChange={(e) => setNewNpc({ ...newNpc, pe: parseInt(e.target.value) || 0 })}
                    />
                    <TextField
                      label="Sanidade"
                      type="number"
                      value={newNpc.sanidade}
                      onChange={(e) => setNewNpc({ ...newNpc, sanidade: parseInt(e.target.value) || 0 })}
                    />
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!newNpc.name || !newNpc.phrase}
                  >
                    Adicionar NPC
                  </Button>
                </Box>

                <Button
                  variant="contained"
                  color="error"
                  onClick={handleEndSession}
                  sx={{ mt: 2 }}
                >
                  Encerrar Sessão
                </Button>
              </Box>
            </GamePanel>
          )}
        </Box>
      </Box>

      <Footer />
    </SessionContainer>
  );
};

export default Session; 
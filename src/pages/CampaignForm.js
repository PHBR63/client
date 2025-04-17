import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import ParticlesBackground from '../components/ParticlesBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Estilização dos componentes
const CampaignFormContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #111827 0%, #1F2937 100%);
  position: relative;
  overflow: hidden;
`;

const FormCard = styled(motion.div)`
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(139, 0, 0, 0.3);
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: rgba(139, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 1.5rem;
  }
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    color: #F9FAFB;
    background: rgba(17, 24, 39, 0.5);
    border-radius: 8px;

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: rgba(139, 0, 0, 0.5);
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #8B0000;
    }
  }

  & .MuiInputLabel-root {
    color: #6B7280;
  }

  & .MuiInputLabel-root.Mui-focused {
    color: #8B0000;
  }
`;

const StyledSelect = styled(Select)`
  & .MuiSelect-select {
    color: #F9FAFB;
    background: rgba(17, 24, 39, 0.5);
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: rgba(139, 0, 0, 0.3);
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: rgba(139, 0, 0, 0.5);
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #8B0000;
  }
`;

const PlayerChip = styled(Chip)`
  background: rgba(139, 0, 0, 0.2);
  color: #F9FAFB;
  margin: 0.25rem;

  & .MuiChip-deleteIcon {
    color: #F9FAFB;
  }

  &:hover {
    background: rgba(139, 0, 0, 0.3);
  }
`;

const ActionButton = styled(Button)`
  background: #8B0000;
  color: #F9FAFB;
  padding: 0.75rem 1.5rem;
  font-family: 'Cinzel', serif;
  text-transform: none;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #6B0000;
    transform: scale(1.05);
  }

  &.secondary {
    background: transparent;
    border: 1px solid #8B0000;
    color: #8B0000;

    &:hover {
      background: rgba(139, 0, 0, 0.1);
    }
  }
`;

const CampaignForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  // Estados
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    difficulty: 'normal',
    houseRules: '',
    players: [],
  });
  const [newPlayer, setNewPlayer] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Carregar dados da campanha se estiver editando
  useEffect(() => {
    if (isEditing) {
      // Simular carregamento de dados da API
      setIsLoading(true);
      setTimeout(() => {
        setFormData({
          name: 'Campanha de Exemplo',
          description: 'Uma campanha misteriosa e sombria',
          difficulty: 'normal',
          houseRules: 'Regras personalizadas aqui',
          players: ['jogador1@exemplo.com', 'jogador2@exemplo.com'],
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [isEditing]);

  // Validação
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manipuladores de eventos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddPlayer = (e) => {
    if (e.key === 'Enter' && newPlayer.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newPlayer)) {
        setAlert({
          show: true,
          message: 'Email inválido',
          type: 'error',
        });
        return;
      }
      setFormData(prev => ({
        ...prev,
        players: [...prev.players, newPlayer.trim()],
      }));
      setNewPlayer('');
    }
  };

  const handleRemovePlayer = (playerToRemove) => {
    setFormData(prev => ({
      ...prev,
      players: prev.players.filter(player => player !== playerToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAlert({
        show: true,
        message: `Campanha ${isEditing ? 'atualizada' : 'criada'} com sucesso!`,
        type: 'success',
      });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setAlert({
        show: true,
        message: 'Erro ao salvar campanha',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowDeleteDialog(false);
      setAlert({
        show: true,
        message: 'Campanha excluída com sucesso!',
        type: 'success',
      });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setAlert({
        show: true,
        message: 'Erro ao excluir campanha',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CampaignFormContainer>
      <ParticlesBackground />
      <Navbar />
      
      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: '#F9FAFB',
            fontFamily: 'Cinzel, serif',
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          {isEditing ? 'Editar Campanha' : 'Criar Campanha'}
        </Typography>

        {alert.show && (
          <Alert
            severity={alert.type}
            onClose={() => setAlert({ ...alert, show: false })}
            sx={{ marginBottom: '1rem' }}
          >
            {alert.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <StyledTextField
              label="Nome da Campanha"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              required
              fullWidth
            />

            <StyledTextField
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="difficulty-label" sx={{ color: '#6B7280' }}>
                Dificuldade
              </InputLabel>
              <StyledSelect
                labelId="difficulty-label"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                label="Dificuldade"
              >
                <MenuItem value="easy">Fácil</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="hard">Difícil</MenuItem>
              </StyledSelect>
            </FormControl>

            <StyledTextField
              label="Regras da Casa"
              name="houseRules"
              value={formData.houseRules}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />

            <Box>
              <Typography
                variant="subtitle1"
                sx={{ color: '#F9FAFB', marginBottom: '0.5rem' }}
              >
                Jogadores Convidados
              </Typography>
              <StyledTextField
                label="Adicionar Jogador (Email)"
                value={newPlayer}
                onChange={(e) => setNewPlayer(e.target.value)}
                onKeyPress={handleAddPlayer}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => {
                        if (newPlayer.trim()) {
                          handleAddPlayer({ key: 'Enter' });
                        }
                      }}
                      sx={{ color: '#8B0000' }}
                    >
                      <AddIcon />
                    </IconButton>
                  ),
                }}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                {formData.players.map((player) => (
                  <PlayerChip
                    key={player}
                    label={player}
                    onDelete={() => handleRemovePlayer(player)}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              {isEditing && (
                <ActionButton
                  variant="outlined"
                  className="secondary"
                  onClick={() => setShowDeleteDialog(true)}
                  startIcon={<DeleteIcon />}
                >
                  Excluir
                </ActionButton>
              )}
              <ActionButton
                variant="outlined"
                className="secondary"
                onClick={() => navigate('/dashboard')}
              >
                Cancelar
              </ActionButton>
              <ActionButton
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar'}
              </ActionButton>
            </Box>
          </Box>
        </form>
      </FormCard>

      <Footer />

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        PaperProps={{
          sx: {
            background: '#1F2937',
            color: '#F9FAFB',
          },
        }}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir esta campanha? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowDeleteDialog(false)}
            sx={{ color: '#F9FAFB' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            sx={{ color: '#8B0000' }}
            disabled={isLoading}
          >
            {isLoading ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>
    </CampaignFormContainer>
  );
};

export default CampaignForm; 
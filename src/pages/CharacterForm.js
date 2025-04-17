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
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  FormControlLabel,
  Slider,
  Paper,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Card,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PreviousIcon,
  Edit as EditIcon,
  Person as PersonIcon,
  Send as SendIcon,
  Upload as UploadIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import ParticlesBackground from '../components/ParticlesBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchCharacter, saveCharacter } from '../api/character';
import { styled as muiStyled } from '@mui/material/styles';
import { theme } from '../config/theme';

// Estilização dos componentes
const CharacterFormContainer = styled(Box)`
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

const AttributeSlider = styled(Slider)`
  & .MuiSlider-track {
    background: #8B0000;
  }

  & .MuiSlider-thumb {
    background: #8B0000;
  }

  & .MuiSlider-rail {
    background: #4B5563;
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

// Schema de validação
const characterSchema = yup.object().shape({
  name: yup.string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),
  class: yup.string().required('Classe é obrigatória'),
  background: yup.string(),
  attributes: yup.object().shape({
    strength: yup.number().min(0).max(5),
    agility: yup.number().min(0).max(5),
    intellect: yup.number().min(0).max(5),
    will: yup.number().min(0).max(5),
    charisma: yup.number().min(0).max(5),
  }),
  skills: yup.array().of(yup.string()),
  equipment: yup.array().of(yup.string()),
  rituals: yup.array().of(yup.string()),
});

const PreviewCard = muiStyled(Card)(({ theme: muiTheme }) => ({
  marginTop: muiTheme.spacing(4),
  background: theme.colors.secondary,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.accent}`,
  '& .MuiCardMedia-root': {
    height: 200,
    objectFit: 'cover',
  },
}));

const CharacterForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const queryClient = useQueryClient();

  // Estados
  const [activeStep, setActiveStep] = useState(0);
  const [newEquipment, setNewEquipment] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [character, setCharacter] = useState({
    name: '',
    class: '',
    background: '',
    attributes: {
      strength: 0,
      agility: 0,
      intellect: 0,
      will: 0,
      charisma: 0,
    },
    skills: [],
    equipment: [],
    rituals: [],
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [availableRituals, setAvailableRituals] = useState([]);
  const [totalPE, setTotalPE] = useState(0);

  // Formulário
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(characterSchema),
    defaultValues: {
      name: '',
      class: '',
      background: '',
      attributes: {
        strength: 0,
        agility: 0,
        intellect: 0,
        will: 0,
        charisma: 0,
      },
      skills: [],
      equipment: [],
      rituals: [],
    }
  });

  // Dados do formulário
  const formData = watch();

  // Query para carregar personagem existente
  const { data: characterData, isLoading } = useQuery(
    ['character', id],
    () => fetchCharacter(id),
    {
      enabled: isEditing,
      onSuccess: (data) => {
        Object.entries(data).forEach(([key, value]) => {
          setValue(key, value);
        });
        setCharacter(data);
      }
    }
  );

  // Mutation para salvar personagem
  const saveMutation = useMutation(
    (data) => saveCharacter(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['character']);
        setAlert({
          show: true,
          message: `Personagem ${isEditing ? 'atualizado' : 'criado'} com sucesso!`,
          type: 'success',
        });
        setTimeout(() => navigate('/campaign/lobby'), 1500);
      },
      onError: (error) => {
        setAlert({
          show: true,
          message: 'Erro ao salvar personagem',
          type: 'error',
        });
      }
    }
  );

  // Validação por etapa
  const validateStep = (step) => {
    let isValid = true;
    
    switch (step) {
      case 0:
        isValid = !errors.name && !errors.class;
        break;
      case 1: {
        const totalPoints = Object.values(formData.attributes).reduce((a, b) => a + b, 0);
        isValid = totalPoints <= 10;
        break;
      }
      case 2: {
        const maxSkills = getMaxSkills(formData.class);
        isValid = formData.skills.length <= maxSkills;
        break;
      }
      default:
        isValid = true;
    }
    
    return isValid;
  };

  // Manipuladores de eventos
  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleAddEquipment = (e) => {
    if (e.key === 'Enter' && newEquipment.trim()) {
      setValue('equipment', [...formData.equipment, newEquipment.trim()]);
      setNewEquipment('');
    }
  };

  const handleRemoveEquipment = (item) => {
    setValue('equipment', formData.equipment.filter(e => e !== item));
  };

  const handleSkillToggle = (skill) => {
    const maxSkills = getMaxSkills(formData.class);
    if (formData.skills.includes(skill)) {
      setValue('skills', formData.skills.filter(s => s !== skill));
    } else if (formData.skills.length < maxSkills) {
      setValue('skills', [...formData.skills, skill]);
    }
  };

  const handleRitualToggle = (ritual) => {
    if (formData.rituals.includes(ritual)) {
      setValue('rituals', formData.rituals.filter(r => r !== ritual));
    } else {
      setValue('rituals', [...formData.rituals, ritual]);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setCharacter({ ...character, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateStats = () => {
    const { vigor, presence } = character.attributes;
    const pv = 10 + vigor * 2;
    const pe = 5 + presence * 2;
    const sanity = 20 + presence;
    return { pv, pe, sanity };
  };

  const handleRitualChange = (ritualId) => {
    const ritual = availableRituals.find(r => r.id === ritualId);
    if (ritual) {
      const newTotalPE = totalPE + ritual.cost;
      if (newTotalPE <= calculateStats().pe) {
        setTotalPE(newTotalPE);
        setCharacter({
          ...character,
          rituals: [...character.rituals, ritual],
        });
      }
    }
  };

  const handleRemoveRitual = (ritualId) => {
    const ritual = character.rituals.find(r => r.id === ritualId);
    if (ritual) {
      setTotalPE(totalPE - ritual.cost);
      setCharacter({
        ...character,
        rituals: character.rituals.filter(r => r.id !== ritualId),
      });
    }
  };

  const onSubmit = (data) => {
    saveMutation.mutate(data);
  };

  // Cálculos
  const calculatePV = () => {
    const basePV = character.class === 'Combatente' ? 20 :
                   character.class === 'Especialista' ? 15 :
                   character.class === 'Ocultista' ? 12 : 0;
    return basePV + (character.attributes.strength * 2);
  };

  const calculatePE = () => {
    return 5 + character.attributes.will;
  };

  const calculateSanity = () => {
    return 5 + character.attributes.intellect;
  };

  // Constantes
  const MAX_ATTRIBUTE_POINTS = 10;
  const SKILLS = [
    'Atletismo', 'Furtividade', 'Ocultismo', 'Percepção',
    'Persuasão', 'Reflexos', 'Sobrevivência', 'Vontade'
  ];
  const RITUALS = [
    { name: 'Medo', description: 'Causa medo em criaturas próximas' },
    { name: 'Sangue', description: 'Manipula o sangue de criaturas' },
    { name: 'Morte', description: 'Interage com a morte e o além' },
    { name: 'Conhecimento', description: 'Acessa conhecimentos ocultos' },
    { name: 'Energia', description: 'Manipula energias paranormais' }
  ];

  const getMaxSkills = (characterClass) => {
    switch (characterClass) {
      case 'Combatente': return 2;
      case 'Especialista': return 5;
      case 'Ocultista': return 3;
      default: return 0;
    }
  };

  useEffect(() => {
    // Simular carregamento de rituais disponíveis
    setAvailableRituals([
      { id: 1, name: 'Visão do Oculto', cost: 2, description: 'Permite ver o paranormal' },
      { id: 2, name: 'Proteção Contra o Mal', cost: 3, description: 'Protege contra influências malignas' },
    ]);
  }, []);

  return (
    <CharacterFormContainer>
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
          {isEditing ? 'Editar Personagem' : 'Criar Personagem'}
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

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Informações Básicas</StepLabel>
          </Step>
          <Step>
            <StepLabel>Atributos</StepLabel>
          </Step>
          <Step>
            <StepLabel>Perícias</StepLabel>
          </Step>
          <Step>
            <StepLabel>Equipamentos</StepLabel>
          </Step>
          <Step>
            <StepLabel>Rituais</StepLabel>
          </Step>
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <StyledTextField
                label="Nome do Personagem"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
              />

              <FormControl fullWidth error={!!errors.class}>
                <InputLabel id="class-label">Classe</InputLabel>
                <StyledSelect
                  labelId="class-label"
                  {...register('class')}
                  label="Classe"
                >
                  <MenuItem value="Combatente">Combatente</MenuItem>
                  <MenuItem value="Especialista">Especialista</MenuItem>
                  <MenuItem value="Ocultista">Ocultista</MenuItem>
                </StyledSelect>
                {errors.class && (
                  <Typography color="error" variant="caption">
                    {errors.class.message}
                  </Typography>
                )}
              </FormControl>

              <StyledTextField
                label="História/Background"
                {...register('background')}
                multiline
                rows={4}
                fullWidth
              />

              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<UploadIcon />}
                  sx={{ mb: 2 }}
                >
                  Upload de Imagem
                </Button>
              </label>
              {previewImage && (
                <PreviewCard>
                  <CardMedia
                    component="img"
                    image={previewImage}
                    alt="Preview do personagem"
                  />
                </PreviewCard>
              )}
            </Box>
          )}

          {activeStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Typography variant="h6" sx={{ color: '#F9FAFB' }}>
                Atributos (Total: {Object.values(formData.attributes).reduce((a, b) => a + b, 0)}/{MAX_ATTRIBUTE_POINTS})
              </Typography>

              {Object.entries(formData.attributes).map(([attr, value]) => (
                <Box key={attr} sx={{ mb: 2 }}>
                  <Typography sx={{ color: '#F9FAFB', mb: 1 }}>
                    {attr.charAt(0).toUpperCase() + attr.slice(1)}: {value}
                  </Typography>
                  <AttributeSlider
                    value={value}
                    onChange={(_, newValue) => setValue(`attributes.${attr}`, newValue)}
                    min={0}
                    max={5}
                    step={1}
                  />
                </Box>
              ))}

              <Paper sx={{ p: 2, mt: 2, bgcolor: 'rgba(17, 24, 39, 0.5)' }}>
                <Typography variant="h6" sx={{ color: '#F9FAFB', mb: 1 }}>
                  Status Calculados
                </Typography>
                <Typography sx={{ color: '#F9FAFB' }}>
                  PV: {calculatePV()}
                </Typography>
                <Typography sx={{ color: '#F9FAFB' }}>
                  PE: {calculatePE()}
                </Typography>
                <Typography sx={{ color: '#F9FAFB' }}>
                  Sanidade: {calculateSanity()}
                </Typography>
              </Paper>
            </Box>
          )}

          {activeStep === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Typography variant="h6" sx={{ color: '#F9FAFB' }}>
                Perícias ({formData.skills.length}/{getMaxSkills(formData.class)} selecionadas)
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
                {SKILLS.map(skill => (
                  <FormControlLabel
                    key={skill}
                    control={
                      <Checkbox
                        checked={formData.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        sx={{
                          color: '#8B0000',
                          '&.Mui-checked': {
                            color: '#8B0000',
                          },
                        }}
                      />
                    }
                    label={skill}
                    sx={{ color: '#F9FAFB' }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {activeStep === 3 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Typography variant="h6" sx={{ color: '#F9FAFB' }}>
                Equipamentos
              </Typography>

              <StyledTextField
                label="Adicionar Equipamento"
                value={newEquipment}
                onChange={(e) => setNewEquipment(e.target.value)}
                onKeyPress={handleAddEquipment}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => {
                        if (newEquipment.trim()) {
                          handleAddEquipment({ key: 'Enter' });
                        }
                      }}
                      sx={{ color: '#8B0000' }}
                    >
                      <AddIcon />
                    </IconButton>
                  ),
                }}
              />

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.equipment.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    onDelete={() => handleRemoveEquipment(item)}
                    sx={{
                      bgcolor: 'rgba(139, 0, 0, 0.2)',
                      color: '#F9FAFB',
                      '& .MuiChip-deleteIcon': {
                        color: '#F9FAFB',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {activeStep === 4 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Typography variant="h6" sx={{ color: '#F9FAFB' }}>
                Rituais (1º Círculo)
              </Typography>

              <Typography>PE Total: {totalPE}/{calculateStats().pe}</Typography>

              <List>
                {availableRituals.map((ritual) => (
                  <ListItem key={ritual.id}>
                    <ListItemText
                      primary={ritual.name}
                      secondary={`Custo: ${ritual.cost} PE - ${ritual.description}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleRitualChange(ritual.id)}
                        disabled={totalPE + ritual.cost > calculateStats().pe}
                      >
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Typography variant="h3" sx={{ mt: 4 }}>Rituais Selecionados</Typography>
              <List>
                {character.rituals.map((ritual) => (
                  <ListItem key={ritual.id}>
                    <ListItemText
                      primary={ritual.name}
                      secondary={`Custo: ${ritual.cost} PE`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveRitual(ritual.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <ActionButton
              variant="outlined"
              className="secondary"
              onClick={() => navigate('/campaign/lobby')}
              disabled={saveMutation.isLoading}
            >
              Cancelar
            </ActionButton>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {activeStep > 0 && (
                <ActionButton
                  variant="outlined"
                  className="secondary"
                  onClick={handleBack}
                  disabled={saveMutation.isLoading}
                  startIcon={<PreviousIcon />}
                >
                  Anterior
                </ActionButton>
              )}

              {activeStep < 4 ? (
                <ActionButton
                  onClick={handleNext}
                  disabled={saveMutation.isLoading}
                  endIcon={<NextIcon />}
                >
                  Próximo
                </ActionButton>
              ) : (
                <ActionButton
                  type="submit"
                  disabled={saveMutation.isLoading}
                >
                  {saveMutation.isLoading ? 'Salvando...' : 'Salvar'}
                </ActionButton>
              )}
            </Box>
          </Box>
        </form>
      </FormCard>

      <Footer />
    </CharacterFormContainer>
  );
};

export default CharacterForm; 
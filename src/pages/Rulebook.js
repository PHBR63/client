import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Button,
  Divider,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tooltip,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  ArrowBack as ArrowBackIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { theme } from '../config/theme';
import ParticlesBackground from '../components/ParticlesBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Componentes estilizados
const RulebookContainer = styled(Box)(({ theme: muiTheme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${theme.backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: muiTheme.spacing(4),
  color: theme.colors.text,
}));

const SearchContainer = styled(Paper)(({ theme: muiTheme }) => ({
  padding: muiTheme.spacing(2),
  background: theme.colors.secondary,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.accent}`,
  marginBottom: muiTheme.spacing(4),
  '&:hover': {
    borderColor: theme.colors.primary,
  },
}));

const CategoryContainer = styled(Paper)(({ theme: muiTheme }) => ({
  padding: muiTheme.spacing(2),
  background: theme.colors.secondary,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.accent}`,
  marginBottom: muiTheme.spacing(2),
  '&:hover': {
    borderColor: theme.colors.primary,
  },
}));

const RuleItem = styled(ListItem)(({ theme: muiTheme }) => ({
  padding: muiTheme.spacing(2),
  background: 'rgba(0, 0, 0, 0.2)',
  marginBottom: muiTheme.spacing(1),
  borderRadius: muiTheme.shape.borderRadius,
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.3)',
  },
}));

const Rulebook = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('rulebookFavorites');
    return saved ? JSON.parse(saved) : {};
  });
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [rules, setRules] = useState({
    'Criação de Personagem': [
      {
        title: 'Passo a Passo',
        description: 'Criação de Agentes da Ordem seguindo etapas definidas: conceito, origem, atributos, classe, etc.',
        example: '1. Conceito > 2. Origem > 3. Atributos > 4. Classe > 5. Perícias > 6. Equipamentos',
      },
      {
        title: 'Atributos Básicos',
        description: '5 atributos (0 a 5, sendo 1 a média humana): Agilidade, Força, Intelecto, Presença e Vigor.',
        example: 'Força 3 = +3 em testes de Força e +3 em dano de armas corpo a corpo',
      },
      {
        title: 'Origens',
        description: '24 origens diferentes, cada uma com 2 perícias treinadas e um poder especial.',
        example: 'Origem: Acadêmico - Perícias: Investigação e Ocultismo - Poder: Estudioso',
      },
      {
        title: 'Classes e Trilhas',
        description: '3 classes: Combatente, Especialista, Ocultista. Cada uma com trilhas específicas por NEX.',
        example: 'Ocultista > Trilha: Graduado > NEX 5%: Poder Paranormal',
      },
      {
        title: 'NEX (Exposição Paranormal)',
        description: 'Inicia em 5%, aumenta +5% por missão. Aumenta PV, PE, SAN, habilidades e limite de PE/turno.',
        example: 'NEX 15%: +5 PV, +5 PE, +5 SAN, +5 PE/turno',
      },
    ],
    'Perícias e Testes': [
      {
        title: 'Lista de Perícias',
        description: 'Acrobacia, Atletismo, Intuição, Investigação, Ocultismo, Tecnologia, Medicina, Furtividade, Crime, Diplomacia, Intimidação, Percepção, Pontaria, Luta, Reflexos, Vontade.',
        example: 'Perícia de Luta: Atributo-base Força, usado para ataques corpo a corpo',
      },
      {
        title: 'Graus de Treinamento',
        description: 'Destinado (+0), Treinado (+5), Veterano (+10), Expert (+15).',
        example: 'Perícia Treinada: d20 + Atributo + 5',
      },
      {
        title: 'Teste de Perícia',
        description: 'Rola 1d20 por ponto no atributo-base, soma bônus de treinamento, compara com DT.',
        example: 'Teste de Ocultismo (Intelecto 3, Treinado): 3d20 + 5, pega o maior',
      },
      {
        title: 'Testes de Resistência',
        description: 'Fortitude (Vigor), Reflexos (Agilidade), Vontade (Presença) para resistir a perigos.',
        example: 'Teste de Fortitude contra veneno: d20 + Vigor',
      },
    ],
    'Combate': [
      {
        title: 'Estrutura de Combate',
        description: 'Dividido em rodadas (~6s) e turnos. Ordem por iniciativa (teste de Agilidade).',
        example: 'Iniciativa: d20 + Agilidade, maior rola primeiro',
      },
      {
        title: 'Ações por Turno',
        description: '1 Ação Padrão + 1 Ação de Movimento por turno. Ações Livres e Reações conforme regras.',
        example: 'Ação Padrão: Atacar, Ação de Movimento: Mover-se',
      },
      {
        title: 'Ataques e Dano',
        description: 'Teste de ataque (1d20 + perícia) vs Defesa. Dano = dados da arma + modificadores.',
        example: 'Ataque com Espada: d20 + Luta vs Defesa, Dano: 1d8 + Força',
      },
      {
        title: 'Ferimento e Morte',
        description: 'PV = 0 → Morrendo. Regras para estabilização e cura.',
        example: 'Morrendo: Teste de Fortitude DT 15 por rodada, 3 falhas = morte',
      },
      {
        title: 'Condições',
        description: 'Desprevenido, Surpreendido, Atordoado, etc. Afetam atributos e ações.',
        example: 'Desprevenido: -5 em Defesa, não pode usar Reflexos',
      },
    ],
    'Equipamentos e Recursos': [
      {
        title: 'Patente e Suprimentos',
        description: 'Cada patente tem acesso a itens específicos e limite de carga.',
        example: 'Agente Especial: Categoria II, Carga: Força + Intelecto',
      },
      {
        title: 'Capacidade de Carga',
        description: 'Calculada por Força + Intelecto. Itens ocupam espaços conforme peso/volume.',
        example: 'Força 3 + Intelecto 2 = 5 espaços de carga',
      },
      {
        title: 'Categorias de Itens',
        description: 'Armas, armaduras e equipamentos divididos em categorias I, II, III, etc.',
        example: 'Categoria I: Pistola, Categoria II: Rifle, Categoria III: Equipamento Pesado',
      },
      {
        title: 'Itens Paranormais',
        description: 'Objetos amaldiçoados com efeitos especiais e custos em SAN.',
        example: 'Máscara do Medo: +5 em Intimidação, -1 SAN por uso',
      },
    ],
    'Elementos Paranormais': [
      {
        title: 'Membrana',
        description: 'Barreira entre Realidade e Outro Lado. Pode enfraquecer e permitir manifestações.',
        example: 'Ritual realizado: Membrana enfraquece em 1d4 níveis',
      },
      {
        title: 'Entidades Paranormais',
        description: 'Criaturas de Sangue, Morte, Conhecimento, Energia e Ameaças da Realidade.',
        example: 'Zumbi de Sangue: PV 25, Defesa 12, Ataque +8, Dano 2d6+4',
      },
      {
        title: 'Sanidade (SAN)',
        description: 'Saúde mental. Perde SAN ao sofrer dano mental; 0 SAN = colapso e transtornos.',
        example: 'Ver um cadáver: -1d4 SAN, Teste de Vontade DT 15 para reduzir pela metade',
      },
      {
        title: 'Rituais',
        description: 'Magias com custo em PE, testes de resistência e efeitos variados.',
        example: 'Cicatrização: 2 PE, DT 15, cura 2d6+2 PV',
      },
      {
        title: 'Interlúdios',
        description: 'Momentos de descanso para recuperação via Dormir, Relaxar, Alimentar-se, etc.',
        example: 'Dormir: +1d4 PV, +1d4 PE, +1d4 SAN',
      },
    ],
    'Regras do Mestre': [
      {
        title: 'Papel do Mestre',
        description: 'Conduzir narrativa, criar suspense, arbitrar regras e DTs.',
        example: 'DT 15: Desafio médio, DT 20: Desafio difícil',
      },
      {
        title: 'Gerador de Missões',
        description: 'Tabelas para criar casos aleatórios com elementos paranormais.',
        example: 'Local: Hospital Abandonado, Ameaça: Criatura de Sangue, Objetivo: Recuperar Artefato',
      },
      {
        title: 'NPCs e Aliados',
        description: 'Fichas simplificadas para coadjuvantes com atributos básicos.',
        example: 'Detetive Silva: Força 2, Agilidade 3, Intelecto 4, Presença 3, Vigor 2',
      },
      {
        title: 'Regras Opcionais',
        description: 'Contagem de munição, dano localizado, morte súbita, etc.',
        example: 'Dano Localizado: -5 no teste, +5 no dano',
      },
    ],
  });

  // Salvar favoritos no localStorage
  useEffect(() => {
    localStorage.setItem('rulebookFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleCategory = (category) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    });
  };

  const toggleFavorite = (category, ruleIndex) => {
    const key = `${category}-${ruleIndex}`;
    setFavorites(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredRules = Object.entries(rules).reduce((acc, [category, items]) => {
    // Filtro por categoria selecionada
    if (selectedCategory && selectedCategory !== category) {
      return acc;
    }

    const filteredItems = items.filter((item, index) => {
      // Filtro por termo de busca
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por favoritos
      const isFavorite = favorites[`${category}-${index}`];
      if (showOnlyFavorites && !isFavorite) {
        return false;
      }

      return matchesSearch;
    });

    if (filteredItems.length > 0) {
      acc[category] = filteredItems;
    }
    return acc;
  }, {});

  const getRelatedRules = (currentCategory, currentRule) => {
    const related = [];
    Object.entries(rules).forEach(([category, items]) => {
      items.forEach((item, index) => {
        if (category === currentCategory && item === currentRule) return;
        
        // Lógica para encontrar regras relacionadas
        if (
          item.title.toLowerCase().includes(currentRule.title.toLowerCase()) ||
          currentRule.title.toLowerCase().includes(item.title.toLowerCase()) ||
          item.description.toLowerCase().includes(currentRule.title.toLowerCase())
        ) {
          related.push({ category, item, index });
        }
      });
    });
    return related;
  };

  return (
    <RulebookContainer>
      <ParticlesBackground />
      <Navbar />
      
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h2" sx={{ color: theme.colors.primary }}>
            Livro de Regras
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ bgcolor: theme.colors.primary }}
          >
            Voltar
          </Button>
        </Box>

        <SearchContainer>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar regras..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: theme.colors.primary }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: theme.colors.text,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.colors.primary,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.colors.primary,
                  },
                },
              }}
            />
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Categoria"
              >
                <MenuItem value="">Todas</MenuItem>
                {Object.keys(rules).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={showOnlyFavorites}
                onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                sx={{ color: theme.colors.primary }}
              />
            }
            label="Mostrar apenas favoritos"
          />
        </SearchContainer>

        <Box sx={{ display: 'grid', gap: 4 }}>
          {Object.entries(filteredRules).map(([category, items]) => (
            <CategoryContainer key={category}>
              <Box
                onClick={() => toggleCategory(category)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    color: theme.colors.primary,
                  },
                }}
              >
                <Typography variant="h4" sx={{ flex: 1 }}>
                  {category}
                </Typography>
                <IconButton>
                  {expandedCategories[category] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
              <Collapse in={expandedCategories[category]}>
                <List>
                  {items.map((item, index) => {
                    const isFavorite = favorites[`${category}-${index}`];
                    const relatedRules = getRelatedRules(category, item);
                    
                    return (
                      <React.Fragment key={index}>
                        <RuleItem>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h6" sx={{ color: theme.colors.primary }}>
                                  {item.title}
                                </Typography>
                                <IconButton
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(category, index);
                                  }}
                                  size="small"
                                >
                                  {isFavorite ? (
                                    <StarIcon sx={{ color: theme.colors.primary }} />
                                  ) : (
                                    <StarBorderIcon sx={{ color: theme.colors.textSecondary }} />
                                  )}
                                </IconButton>
                              </Box>
                            }
                            secondary={
                              <>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                  {item.description}
                                </Typography>
                                <Typography variant="body2" sx={{ color: theme.colors.textSecondary }}>
                                  Exemplo: {item.example}
                                </Typography>
                                {relatedRules.length > 0 && (
                                  <Box sx={{ mt: 2 }}>
                                    <Typography variant="subtitle2" sx={{ color: theme.colors.primary }}>
                                      Regras Relacionadas:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                      {relatedRules.map(({ category: relatedCategory, item: relatedItem }, idx) => (
                                        <Chip
                                          key={idx}
                                          icon={<LinkIcon />}
                                          label={relatedItem.title}
                                          onClick={() => {
                                            setSelectedCategory(relatedCategory);
                                            setExpandedCategories(prev => ({
                                              ...prev,
                                              [relatedCategory]: true
                                            }));
                                          }}
                                          sx={{
                                            bgcolor: theme.colors.secondary,
                                            color: theme.colors.text,
                                            '&:hover': {
                                              bgcolor: theme.colors.primary,
                                            },
                                          }}
                                        />
                                      ))}
                                    </Box>
                                  </Box>
                                )}
                              </>
                            }
                          />
                        </RuleItem>
                        {index < items.length - 1 && <Divider sx={{ my: 1 }} />}
                      </React.Fragment>
                    );
                  })}
                </List>
              </Collapse>
            </CategoryContainer>
          ))}
        </Box>
      </Box>

      <Footer />
    </RulebookContainer>
  );
};

export default Rulebook; 
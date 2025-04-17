import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon,
  Add as AddIcon,
  ExitToApp as ExitIcon,
  Group as GroupIcon,
  PlayCircle as PlayIcon,
  PauseCircle as PauseIcon,
  CheckCircle as CheckIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Particles from 'react-particles-js';

const DashboardContainer = styled(Box)`
  min-height: 100vh;
  background: linear-gradient(135deg, #111827 0%, #1F2937 100%);
  position: relative;
  overflow: hidden;
`;

const Navbar = styled(Box)`
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(139, 0, 0, 0.3);
`;

const Logo = styled(Typography)`
  font-family: 'Cinzel', serif;
  color: #F9FAFB;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const NavLinks = styled(Box)`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Typography)`
  color: #6B7280;
  cursor: pointer;
  transition: color 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    color: #8B0000;
  }

  &.active {
    color: #8B0000;
    font-weight: 600;
  }
`;

const MainContent = styled(Box)`
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(Typography)`
  font-family: 'Cinzel', serif;
  color: #F9FAFB;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const CreateButton = styled(Button)`
  background: #8B0000;
  color: #F9FAFB;
  padding: 0.75rem 1.5rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    background: #A00000;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(139, 0, 0, 0.3);
  }
`;

const CampaignCard = styled(motion(Paper))`
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 1rem;
  height: 100%;
  border: 1px solid rgba(139, 0, 0, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    border-color: #8B0000;
    box-shadow: 0 8px 16px rgba(139, 0, 0, 0.2);
  }
`;

const CampaignTitle = styled(Typography)`
  font-family: 'Cinzel', serif;
  color: #F9FAFB;
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const CampaignDescription = styled(Typography)`
  color: #6B7280;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
`;

const CampaignFooter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const StatusBadge = styled(Badge)`
  & .MuiBadge-badge {
    background-color: ${props => {
      switch (props.status) {
        case 'active': return '#4CAF50';
        case 'paused': return '#FFC107';
        case 'finished': return '#9E9E9E';
        default: return '#8B0000';
      }
    }};
  }
`;

const Footer = styled(Box)`
  background: rgba(31, 41, 55, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem;
  margin-top: 4rem;
  border-top: 1px solid rgba(139, 0, 0, 0.3);
`;

const FooterLink = styled(Typography)`
  color: #6B7280;
  cursor: pointer;
  transition: color 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    color: #8B0000;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulação de dados de campanhas
  useEffect(() => {
    const mockCampaigns = [
      {
        id: 1,
        name: 'A Ordem do Caos',
        description: 'Uma campanha sombria onde os jogadores investigam desaparecimentos misteriosos em uma pequena cidade.',
        status: 'active',
        players: 4,
        isMaster: true
      },
      {
        id: 2,
        name: 'O Segredo de Arkham',
        description: 'Os jogadores são recrutados para investigar uma série de eventos paranormais em um antigo asilo.',
        status: 'paused',
        players: 5,
        isMaster: false
      }
    ];

    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // TODO: Implementar logout
    navigate('/login');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <PlayIcon color="success" />;
      case 'paused': return <PauseIcon color="warning" />;
      case 'finished': return <CheckIcon color="disabled" />;
      default: return null;
    }
  };

  return (
    <DashboardContainer>
      <Particles
        params={{
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: '#8B0000'
            },
            shape: {
              type: 'circle'
            },
            opacity: {
              value: 0.5,
              random: true
            },
            size: {
              value: 3,
              random: true
            },
            line_linked: {
              enable: false
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: true
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              },
              onclick: {
                enable: true,
                mode: 'push'
              }
            }
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />

      <Navbar>
        <Logo>Ordem Paranormal RPG</Logo>
        
        <NavLinks>
          <NavLink className="active">Dashboard</NavLink>
          <NavLink>Regras</NavLink>
          <NavLink>Perfil</NavLink>
          <IconButton onClick={handleLogout} color="inherit">
            <ExitIcon />
          </IconButton>
        </NavLinks>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { handleMenuClose(); navigate('/dashboard'); }}>
              Dashboard
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); navigate('/rules'); }}>
              Regras
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
              Perfil
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              Sair
            </MenuItem>
          </Menu>
        </Box>
      </Navbar>

      <MainContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <SectionTitle>Suas Campanhas</SectionTitle>
          <CreateButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/campaigns/new')}
          >
            Criar Nova Campanha
          </CreateButton>
        </Box>

        <Grid container spacing={3}>
          {isLoading ? (
            <Grid item xs={12}>
              <Typography color="#6B7280" align="center">
                Carregando campanhas...
              </Typography>
            </Grid>
          ) : campaigns.length === 0 ? (
            <Grid item xs={12}>
              <Typography color="#6B7280" align="center">
                Nenhuma campanha encontrada. Crie uma agora!
              </Typography>
            </Grid>
          ) : (
            campaigns.map((campaign) => (
              <Grid item xs={12} sm={6} key={campaign.id}>
                <CampaignCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => navigate(`/campaigns/${campaign.id}`)}
                >
                  <CampaignTitle>{campaign.name}</CampaignTitle>
                  <CampaignDescription>{campaign.description}</CampaignDescription>
                  <CampaignFooter>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StatusBadge
                        status={campaign.status}
                        badgeContent={getStatusIcon(campaign.status)}
                      >
                        <GroupIcon color="action" />
                      </StatusBadge>
                      <Typography color="#6B7280" variant="body2">
                        {campaign.players} jogadores
                      </Typography>
                    </Box>
                    {campaign.isMaster && (
                      <Tooltip title="Configurações da Campanha">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/campaigns/${campaign.id}/settings`);
                          }}
                        >
                          <SettingsIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </CampaignFooter>
                </CampaignCard>
              </Grid>
            ))
          )}
        </Grid>
      </MainContent>

      <Footer>
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <FooterLink>Sobre</FooterLink>
          </Grid>
          <Grid item>
            <FooterLink>Contato</FooterLink>
          </Grid>
          <Grid item>
            <FooterLink component="a" href="https://x.com" target="_blank">
              X
            </FooterLink>
          </Grid>
          <Grid item>
            <FooterLink component="a" href="https://discord.com" target="_blank">
              Discord
            </FooterLink>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="#6B7280"
          align="center"
          sx={{ mt: 2 }}
        >
          Powered by xAI
        </Typography>
      </Footer>
    </DashboardContainer>
  );
};

export default Dashboard; 
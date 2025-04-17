import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  useTheme,
  IconButton,
  Link,
  Divider,
} from '@mui/material';
import {
  Twitter as TwitterIcon,
  Discord as DiscordIcon,
  GitHub as GitHubIcon,
  Campaign as CampaignIcon,
  Person as PersonIcon,
  Casino as CasinoIcon,
  Chat as ChatIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Facebook,
  Instagram,
} from '@mui/icons-material';
import {
  HeroSection,
  HeroContent,
  FeatureCard,
  TestimonialCard,
  Footer,
  SocialIcon,
} from '../styles/HomeStyles';
import { theme } from '../config/theme';

// Carregar particles.js
const loadParticles = () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
  script.async = true;
  document.body.appendChild(script);
  return script;
};

// Dados mockados
const features = [
  {
    icon: <CampaignIcon className="icon" />,
    title: 'Gerenciamento de Campanhas',
    description: 'Crie e gerencie suas campanhas de RPG com facilidade. Mantenha o controle de sessões, NPCs e locais importantes.',
  },
  {
    icon: <PersonIcon className="icon" />,
    title: 'Fichas de Personagens',
    description: 'Crie e personalize fichas de personagens detalhadas. Mantenha todas as informações importantes em um só lugar.',
  },
  {
    icon: <CasinoIcon className="icon" />,
    title: 'Rolagem de Dados',
    description: 'Rolagem de dados integrada com diferentes tipos de dados e sistemas de RPG. Compartilhe os resultados em tempo real.',
  },
  {
    icon: <ChatIcon className="icon" />,
    title: 'Comunicação em Tempo Real',
    description: 'Chat integrado para comunicação entre jogadores e mestre. Compartilhe imagens, links e muito mais.',
  },
];

const testimonials = [
  {
    text: 'O FichaParanormal revolucionou a forma como eu mestro minhas campanhas. A organização e as ferramentas são incríveis!',
    author: 'João Silva',
    role: 'Mestre de RPG',
  },
  {
    text: 'Finalmente encontrei uma plataforma que atende todas as minhas necessidades como jogador. Recomendo muito!',
    author: 'Maria Santos',
    role: 'Jogadora',
  },
  {
    text: 'A interface é intuitiva e as funcionalidades são exatamente o que eu precisava para minhas campanhas de terror.',
    author: 'Pedro Oliveira',
    role: 'Mestre de RPG',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const script = loadParticles();
    script.onload = () => {
      window.particlesJS('particles-js', theme.particlesConfig);
    };

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      document.body.removeChild(script);
    };
  }, []);

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <Box>
      <HeroSection>
        <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%' }} />
        <HeroContent>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: theme.typography.h1.fontFamily,
              fontSize: { xs: '2.5rem', md: '4rem' },
              marginBottom: 4,
              animation: 'fadeIn 1s ease-in',
            }}
          >
            Ordem Paranormal RPG
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ marginBottom: 4, opacity: 0.9 }}
          >
            Crie, jogue e mergulhe em aventuras sobrenaturais com seus amigos
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                padding: '12px 32px',
                fontSize: '1.2rem',
              }}
            >
              Entrar
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                padding: '12px 32px',
                fontSize: '1.2rem',
              }}
            >
              Registrar
            </Button>
          </Box>
        </HeroContent>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ marginBottom: 6 }}
        >
          Recursos Principais
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard>
                {feature.icon}
                <Typography variant="h5" component="h3" sx={{ mt: 2, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ backgroundColor: theme.palette.background.paper, py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{ marginBottom: 6 }}
          >
            Sobre o Jogo
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph>
                Inspirado nas histórias de Rafael "Cellbit" Lange, Ordem Paranormal RPG é um jogo de
                mesa onde jogadores enfrentam horrores sobrenaturais, mistérios e dilemas morais.
              </Typography>
              <Typography variant="body1" paragraph>
                Explore um mundo repleto de segredos antigos, criaturas do além e conspirações
                sombrias. Cada decisão importa, cada revelação muda tudo.
              </Typography>
              <Button
                variant="outlined"
                href="https://ordemparanormal.com.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                Saiba mais sobre o jogo
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/game-preview.jpg"
                alt="Cena de jogo do Ordem Paranormal"
                sx={{
                  width: '100%',
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[4],
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ marginBottom: 6 }}
        >
          O que dizem nossos usuários
        </Typography>
        <Box sx={{ position: 'relative', mt: 4 }}>
          <TestimonialCard>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {testimonials[currentTestimonial].text}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              {testimonials[currentTestimonial].author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {testimonials[currentTestimonial].role}
            </Typography>
          </TestimonialCard>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <IconButton onClick={handlePrevTestimonial}>
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={handleNextTestimonial}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>

      <Footer>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Ficha Paranormal
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Uma plataforma dedicada ao Ordem Paranormal RPG
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Links Úteis
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link href="#" color="inherit">
                  Sobre
                </Link>
                <Link href="#" color="inherit">
                  Contato
                </Link>
                <Link href="#" color="inherit">
                  Termos de Uso
                </Link>
                <Link href="#" color="inherit">
                  Política de Privacidade
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Redes Sociais
              </Typography>
              <Box>
                <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon />
                </SocialIcon>
                <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                  <DiscordIcon />
                </SocialIcon>
                <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                </SocialIcon>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Ficha Paranormal. Todos os direitos reservados.
          </Typography>
        </Container>
      </Footer>
    </Box>
  );
};

export default Home; 
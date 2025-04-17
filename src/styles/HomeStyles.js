import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { theme } from '../config/theme';

export const HeroSection = styled(Box)(({ theme: muiTheme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${theme.backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.colors.text,
  textAlign: 'center',
  padding: muiTheme.spacing(8),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
    zIndex: 1,
  },
}));

export const HeroContent = styled(Box)(({ theme: muiTheme }) => ({
  position: 'relative',
  zIndex: 2,
  maxWidth: '800px',
  margin: '0 auto',
  padding: muiTheme.spacing(4),
  animation: 'fadeIn 1s ease-in',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  '& h1': {
    fontFamily: theme.fonts.title,
    fontSize: '4rem',
    marginBottom: muiTheme.spacing(4),
  },
  '& p': {
    fontFamily: theme.fonts.body,
    fontSize: '1.5rem',
    marginBottom: muiTheme.spacing(4),
    color: theme.colors.textSecondary,
  },
}));

export const FeatureCard = styled(Paper)(({ theme: muiTheme }) => ({
  padding: muiTheme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  background: theme.colors.secondary,
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease-in-out',
  border: `1px solid ${theme.colors.accent}`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 10px 20px ${theme.colors.accent}40`,
    background: `${theme.colors.secondary}dd`,
  },
  '& .icon': {
    fontSize: '3rem',
    marginBottom: muiTheme.spacing(2),
    color: theme.colors.primary,
  },
  '& h3': {
    fontFamily: theme.fonts.title,
    color: theme.colors.text,
    marginBottom: muiTheme.spacing(1),
  },
  '& p': {
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
}));

export const TestimonialCard = styled(Paper)(({ theme: muiTheme }) => ({
  padding: muiTheme.spacing(4),
  background: theme.colors.secondary,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.accent}`,
  borderRadius: muiTheme.shape.borderRadius,
  textAlign: 'center',
  minWidth: '300px',
  margin: muiTheme.spacing(2),
  '& p': {
    fontFamily: theme.fonts.body,
    fontStyle: 'italic',
    fontSize: '1.1rem',
    lineHeight: 1.6,
    color: theme.colors.textSecondary,
    marginBottom: muiTheme.spacing(2),
  },
  '& .author': {
    fontFamily: theme.fonts.title,
    color: theme.colors.primary,
    marginBottom: muiTheme.spacing(0.5),
  },
  '& .role': {
    fontFamily: theme.fonts.body,
    color: theme.colors.textSecondary,
  },
}));

export const Footer = styled(Box)(({ theme: muiTheme }) => ({
  backgroundColor: theme.colors.background,
  padding: muiTheme.spacing(6, 0),
  marginTop: muiTheme.spacing(8),
  borderTop: `1px solid ${theme.colors.accent}`,
  '& a': {
    color: theme.colors.textSecondary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.colors.text,
    },
  },
}));

export const SocialIcon = styled('a')(({ theme: muiTheme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  margin: muiTheme.spacing(0, 1),
  color: theme.colors.text,
  backgroundColor: `${theme.colors.accent}40`,
  borderRadius: '50%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.colors.accent,
    transform: 'translateY(-2px)',
  },
  '& svg': {
    fontSize: '1.5rem',
  },
})); 
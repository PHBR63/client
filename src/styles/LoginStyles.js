import { styled } from '@mui/material/styles';
import { Box, Paper, TextField, Button, Checkbox, FormControlLabel, IconButton, Alert, Snackbar, Skeleton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { theme } from '../config/theme';

export const LoginContainer = styled(Box)(({ theme: muiTheme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${theme.backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
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

export const LoginCard = styled(Paper)(({ theme: muiTheme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: muiTheme.spacing(4),
  width: '100%',
  maxWidth: '400px',
  background: `${theme.colors.secondary}dd`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.colors.accent}`,
  borderRadius: muiTheme.shape.borderRadius,
  animation: 'fadeIn 0.5s ease-in',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  [muiTheme.breakpoints.down('sm')]: {
    width: '90%',
    padding: muiTheme.spacing(3),
  },
}));

export const LoginTitle = styled('h1')(({ theme: muiTheme }) => ({
  fontFamily: theme.fonts.title,
  color: theme.colors.text,
  textAlign: 'center',
  marginBottom: muiTheme.spacing(4),
  fontSize: '2.5rem',
  [muiTheme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

export const LoginForm = styled('form')(({ theme: muiTheme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: muiTheme.spacing(3),
}));

export const StyledTextField = styled(TextField)(({ theme: muiTheme }) => ({
  '& .MuiOutlinedInput-root': {
    color: theme.colors.text,
    '& fieldset': {
      borderColor: theme.colors.accent,
    },
    '&:hover fieldset': {
      borderColor: theme.colors.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.colors.primary,
      boxShadow: `0 0 10px ${theme.colors.primary}40`,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.colors.textSecondary,
    '&.Mui-focused': {
      color: theme.colors.primary,
    },
  },
  '& .MuiInputAdornment-root': {
    color: theme.colors.textSecondary,
  },
}));

export const LoginButton = styled(Button)(({ theme: muiTheme }) => ({
  backgroundColor: theme.colors.primary,
  color: theme.colors.text,
  fontFamily: theme.fonts.body,
  padding: muiTheme.spacing(1.5),
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#6B0000',
    transform: 'scale(1.02)',
    boxShadow: `0 0 15px ${theme.colors.primary}80`,
  },
  '&:active': {
    transform: 'scale(0.98)',
  },
}));

export const RememberMe = styled(FormControlLabel)(({ theme: muiTheme }) => ({
  color: theme.colors.textSecondary,
  '& .MuiCheckbox-root': {
    color: theme.colors.accent,
    '&.Mui-checked': {
      color: theme.colors.primary,
    },
  },
}));

export const LinksContainer = styled(Box)(({ theme: muiTheme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: muiTheme.spacing(1),
  '& a': {
    color: theme.colors.textSecondary,
    textDecoration: 'none',
    fontSize: '0.875rem',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: theme.colors.primary,
      textDecoration: 'underline',
    },
  },
}));

export const RegisterLink = styled('div')(({ theme: muiTheme }) => ({
  textAlign: 'center',
  marginTop: muiTheme.spacing(2),
  '& a': {
    color: theme.colors.primary,
    textDecoration: 'none',
    fontFamily: theme.fonts.body,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export const ErrorMessage = styled('div')(({ theme: muiTheme }) => ({
  color: theme.colors.primary,
  textAlign: 'center',
  marginTop: muiTheme.spacing(2),
  fontFamily: theme.fonts.body,
  padding: muiTheme.spacing(1),
  borderRadius: muiTheme.shape.borderRadius,
  backgroundColor: `${theme.colors.primary}20`,
}));

export const Footer = styled(Box)(({ theme: muiTheme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: muiTheme.spacing(2),
  textAlign: 'center',
  color: theme.colors.textSecondary,
  fontFamily: theme.fonts.body,
  fontSize: '0.875rem',
  '& a': {
    color: theme.colors.primary,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export const LoadingSkeleton = styled(Skeleton)(({ theme: muiTheme }) => ({
  backgroundColor: `${theme.colors.secondary}40`,
  borderRadius: muiTheme.shape.borderRadius,
  marginBottom: muiTheme.spacing(2),
}));

export const StyledSnackbar = styled(Snackbar)(({ theme: muiTheme }) => ({
  '& .MuiSnackbarContent-root': {
    backgroundColor: theme.colors.secondary,
    color: theme.colors.text,
    fontFamily: theme.fonts.body,
  },
}));

export const StyledAlert = styled(Alert)(({ theme: muiTheme }) => ({
  backgroundColor: `${theme.colors.secondary}dd`,
  color: theme.colors.text,
  fontFamily: theme.fonts.body,
  '& .MuiAlert-icon': {
    color: theme.colors.primary,
  },
}));

export const ThemeToggle = styled(IconButton)(({ theme: muiTheme }) => ({
  position: 'absolute',
  top: muiTheme.spacing(2),
  right: muiTheme.spacing(2),
  color: theme.colors.text,
  '&:hover': {
    color: theme.colors.primary,
  },
}));

export const ParticlesContainer = styled(Box)(({ theme: muiTheme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
}));

export const LanguageSelector = styled(Box)(({ theme: muiTheme }) => ({
  position: 'absolute',
  top: muiTheme.spacing(2),
  left: muiTheme.spacing(2),
  '& button': {
    color: theme.colors.text,
    margin: muiTheme.spacing(0, 1),
    '&:hover': {
      color: theme.colors.primary,
    },
  },
})); 
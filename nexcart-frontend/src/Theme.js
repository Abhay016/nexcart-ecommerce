// src/theme.js
import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // brand blue
      dark: '#1e40af',
      light: '#60a5fa',
    },
    secondary: {
      main: '#f97316', // accent orange
    },
    background: {
      default: '#f9fafb', // light gray background
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    h5: {
      fontWeight: 600,
      color: '#111827',
    },
    body1: {
      color: '#374151',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 20px',
        },
        containedPrimary: {
          background: 'linear-gradient(90deg, #2563eb, #1e40af)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(90deg, #1e40af, #2563eb)',
          },
        },
        outlinedPrimary: {
          borderColor: '#2563eb',
          color: '#2563eb',
          '&:hover': {
            borderColor: '#1e40af',
            color: '#1e40af',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: '#d1d5db',
            },
            '&:hover fieldset': {
              borderColor: '#2563eb',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563eb',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#2563eb',
          '&.Mui-checked': {
            color: '#2563eb',
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          marginBottom: '1.5rem',
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-active': {
            color: '#2563eb',
          },
          '&.Mui-completed': {
            color: '#1e40af',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

export default Theme;

import { colorsTuple, createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'primary',
  colors: {
    primary: colorsTuple('#ed145b'),
    secondary: colorsTuple('#333639'),
    secondaryLight: colorsTuple('#91a3ad'),
  },
  black: '#303030',
  white: '#ffffff',
  fontSizes: {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
  },
  spacing: {
    xs: '8px',
    lg: '24px',
  },
  fontFamily: "'Nunito', sans-serif",
  headings: {
    fontFamily: "'Nunito', sans-serif",
    sizes: {
      h1: {
        fontSize: '32px',
      },
      h2: {
        fontSize: '24px',
      },
    },
  },
  components: {
    Menu: {
      styles: {
        item: {
          fontSize: '14px',
          fontWeight: 600,
        },
        itemSection: {
          marginRight: '16px',
        },
        dropdown: {
          borderRadius: '16px',
          padding: '16px',
        },
      },
    },
  },
});

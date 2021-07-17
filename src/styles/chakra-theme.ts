import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: baseTheme.colors.teal,
  },
  fonts: {
    body: 'Poppins, sans-serif',
    heading: 'Poppins, sans-serif',
    monospace: 'Menlo, monospace',
  },
  textStyles: {
    body: {
      fontFamily: 'Lato, sans-serif',
    },
    heading: {
      fontFamily: 'Poppins, sans-serif',
    },
  },

  // components: {
  //   Input: {
  //     baseStyle: { _focus: { borderColor: 'brand', boxShadow: 'brand' } },
  //   },
  // },
  initialColorMode: 'light',
  useSystemColorMode: false,
});

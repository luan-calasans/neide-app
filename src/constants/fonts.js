// Configuração padronizada das fontes Montserrat
export const Fonts = {
  // Pesos principais da fonte
  thin: 'Montserrat_100Thin',
  extraLight: 'Montserrat_200ExtraLight',
  light: 'Montserrat_300Light',
  regular: 'Montserrat_400Regular',
  medium: 'Montserrat_500Medium',
  semiBold: 'Montserrat_600SemiBold',
  bold: 'Montserrat_700Bold',
  extraBold: 'Montserrat_800ExtraBold',
  black: 'Montserrat_900Black',
  
  // Versões itálicas
  italic: 'Montserrat_400Regular_Italic',
  mediumItalic: 'Montserrat_500Medium_Italic',
  semiBoldItalic: 'Montserrat_600SemiBold_Italic',
  boldItalic: 'Montserrat_700Bold_Italic',
};

// Estilos de texto padrão para reutilização
export const FontStyles = {
  // Headers
  h1: {
    fontFamily: Fonts.bold,
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontFamily: Fonts.semiBold,
    fontSize: 28,
    lineHeight: 36,
  },
  h3: {
    fontFamily: Fonts.semiBold,
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    lineHeight: 28,
  },
  h5: {
    fontFamily: Fonts.medium,
    fontSize: 18,
    lineHeight: 24,
  },
  h6: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    lineHeight: 22,
  },
  
  // Body text
  bodyLarge: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  bodySmall: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    lineHeight: 18,
  },
  
  // Special text
  caption: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: 16,
  },
  overline: {
    fontFamily: Fonts.semiBold,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1,
  },
  button: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonLarge: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
  },
  
  // Input text
  input: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  
  // Labels
  label: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 20,
  },
  labelSmall: {
    fontFamily: Fonts.medium,
    fontSize: 12,
    lineHeight: 16,
  },
  
  // Navigation
  tabLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    lineHeight: 16,
  },
}; 
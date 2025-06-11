import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 24,
    fontFamily: 'Montserrat_700Bold',
    color: '#d81b60',
    marginBottom: 16,
    textAlign: 'center',
  },
  errorDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
  },
  retryButton: {
    backgroundColor: '#d81b60',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
  },
}); 
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#d81b60',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  logoProfile: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 5,
  },
  headerTitle: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: '#f8bbd0',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactLabel: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  contactValue: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    color: '#333',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff8e1',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#fff176',
  },
  addressInfo: {
    flex: 1,
    marginLeft: 16,
  },
  addressLabel: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
    color: '#f57f17',
    marginBottom: 4,
  },
  addressValue: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  addressNote: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 12,
    color: '#f57f17',
    fontStyle: 'italic',
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  logoutText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
    color: '#d32f2f',
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  footerText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 4,
  },
}); 
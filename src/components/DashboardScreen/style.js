import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header Styles
  headerContainer: {
    marginBottom: 20,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 25,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoHeader: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  header: {
    fontSize: 28,
    fontFamily: 'Montserrat_700Bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: 'rgba(255,255,255,0.8)',
  },

  // Stats Container
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    marginBottom: 15,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  statGradient: {
    padding: 20,
    borderRadius: 20,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 32,
    fontFamily: 'Montserrat_700Bold',
    color: '#fff',
  },
  statTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    fontFamily: 'Montserrat_400Regular',
    color: 'rgba(255,255,255,0.7)',
  },

  // Alerts Container
  alertsContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  alertsTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  alertsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  alertCard: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    minWidth: 100,
  },
  dangerAlert: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  warningAlert: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  alertNumber: {
    fontSize: 24,
    fontFamily: 'Montserrat_700Bold',
    color: '#1a1a1a',
    marginTop: 8,
  },
  alertText: {
    fontSize: 12,
    fontFamily: 'Montserrat_500Medium',
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },

  // Highlight Container
  highlightContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  highlightGradient: {
    padding: 25,
    borderRadius: 20,
  },
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  highlightTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat_700Bold',
    color: '#8b4513',
    marginLeft: 10,
  },
  highlightProduct: {
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#5d4e75',
    marginBottom: 15,
    lineHeight: 24,
  },
  highlightStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  highlightStat: {
    alignItems: 'center',
  },
  highlightStatNumber: {
    fontSize: 24,
    fontFamily: 'Montserrat_700Bold',
    color: '#8b4513',
  },
  highlightStatLabel: {
    fontSize: 12,
    fontFamily: 'Montserrat_500Medium',
    color: '#8b4513',
    opacity: 0.8,
    marginTop: 4,
  },

  // Controls Container
  controlsContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  controlsTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#1a1a1a',
    marginBottom: 15,
  },

  // Period Controls
  periodScroll: {
    flexDirection: 'row',
  },
  periodCard: {
    marginRight: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  periodCardActive: {
    elevation: 6,
    shadowOpacity: 0.2,
  },
  periodGradient: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 100,
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
    marginTop: 8,
    textAlign: 'center',
  },

  // Top Buttons
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  topButtonActive: {
    backgroundColor: '#d81b60',
    borderColor: '#d81b60',
    elevation: 3,
    shadowColor: '#d81b60',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  topButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#666',
  },
  topButtonTextActive: {
    color: '#fff',
  },

  // Center Container (Loading/Error states)
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'Montserrat_500Medium',
    color: '#333',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#d81b60',
    textAlign: 'center',
  },
  errorSubtext: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: '#666',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 25,
    backgroundColor: '#d81b60',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#d81b60',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },

  // No Data Container
  noDataContainer: {
    alignItems: 'center',
    padding: 40,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noDataText: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#666',
    textAlign: 'center',
  },
  noDataSubtext: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: '#999',
    textAlign: 'center',
  },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Montserrat_400Regular',
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
}); 
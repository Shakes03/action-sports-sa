import { StyleSheet } from 'react-native';

const $green = '#2e8b57';
const $white = '#ffffff';
const $darkGreen = '#006400';
const $black = '#000000';
const $deepskyblue = '#87cefa';

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: $black,
  },
  leagueHeader: {
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: $black,
  },
  text: {
    color: $white,
    position: 'absolute',
    fontSize: 20,
    marginLeft: 100,
  },
  textCard: {
    color: $white,
    position: 'absolute',
    fontSize: 20,
    marginLeft: 20,
  },
  textDivision: {
    color: $white,
    fontSize: 25,
    backgroundColor: $green,
    marginLeft: 20,
  },
  textLeague: {
    color: $white,
    fontSize: 12,
    backgroundColor: $green,
    marginLeft: 20,
  },
  textDate: {
    color: $black,
    fontSize: 22,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  textTime: {
    color: $black,
    fontSize: 15,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
  },
  textVs: {
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 5,
    color: $white,
    fontSize: 18,
  },
  textVsLink: {
    marginTop: 5,
    marginBottom: 20,
    marginLeft: 5,
    color: $deepskyblue,
    fontSize: 18,
  },
  textScore: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    color: $white,
    fontSize: 18,
  },
  textScoreLink: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    color: $deepskyblue,
    fontSize: 18,
  },
  textTableHeading: {
    marginTop: 5,
    marginLeft: 5,
    color: $black,
    fontSize: 20,
  },
  textTableBody: {
    marginTop: 5,
    marginLeft: 5,
    color: $white,
    fontSize: 20,
  },
  textTableBodyLink: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    color: $deepskyblue,
    fontSize: 20,
  },
  textTableBodyPlayer: {
    marginTop: 10,
    marginLeft: 5,
    color: $white,
    fontSize: 18,
  },
  textTableBodyPlayerStats: {
    marginTop: 5,
    marginLeft: 5,
    color: $white,
    fontSize: 16,
  },
  tableCard: {
    // marginBottom: 3,
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 10,
    // borderBottomColor: 'white',
    // borderBottomWidth: 1,
    backgroundColor: $green,
  },
  card: {
    height: 100,
    marginBottom: 3,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: $green,
    borderColor: $darkGreen,
    borderWidth: 1,
  },
  fixturesCardSection: {
    marginTop: 3,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: $green,
    // borderTopColor: $darkGreen,
    // borderWidth: 1,
  },
  fixturesCardDetail: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: $green,
    // borderBottomColor: $darkGreen,
    // borderWidth: 1,
  },
  cardImage: {
    marginLeft: 20,
    width: 50,
    height: 50,
    position: 'absolute',
  },
  headerImage: {
    marginTop: 8,
    alignSelf: 'flex-start',
    width: 50,
    height: 50,
    position: 'absolute',
  },
  chevronImage: {
    right: 15,
    paddingTop: 15,
    position: 'absolute',
    width: 20,
    height: 20,
  },
  button: {
    height: 80,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: $green,
    borderColor: $darkGreen,
    borderWidth: 1,
  },
  swipeOutButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: $black,
    marginBottom: 3,
    borderColor: $black,
    borderWidth: 1,
  },
  imgBackground: {
    flex: 1,
    width: null,
    height: null,
  },
});

module.exports = {
  styles,
};

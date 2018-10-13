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
    margin: 15,
    marginLeft: 45,
    marginRight: 45,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: $black,
  },
  leagueHeader: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: $black,
  },
  text: {
    color: $white,
    position: 'absolute',
    fontSize: 20,
    marginLeft: 100,
  },
  textCenter: {
    margin: 10,
    color: $black,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 25,
  },
  textCard: {
    color: $white,
    position: 'absolute',
    fontSize: 20,
    marginLeft: 20,
  },
  divButton: {
    height: 50,
    marginHorizontal: 10,
    marginVertical: 15,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: $white,
    borderColor: $darkGreen,
    borderWidth: 1,
  },
  textButton: {
    color: $green,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  textDivision: {
    color: $white,
    fontSize: 20,
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
    color: $white,
    textAlign: 'center',
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  textDateBlack: {
    color: $black,
    textAlign: 'center',
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  textTime: {
    textAlign: 'center',
    color: $white,
    fontSize: 15,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
  },
  textTimeBlack: {
    textAlign: 'center',
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
    marginTop: 5,
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
    marginLeft: 10,
    alignSelf: 'flex-start',
    width: 50,
    height: 50,
    position: 'absolute',
  },
  chevronImage: {
    right: 15,
    marginTop: 15,
    position: 'absolute',
    opacity: 0.5,
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
  line: {
    borderWidth: 0.2,
    borderColor: $white,
    margin: 10,
  },
});

module.exports = {
  styles,
};

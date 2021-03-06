import {StyleSheet} from 'react-native';
import stylesTables from './style-sheet-tables';
import stylesButtons from './style-sheet-buttons';
import stylesLines from './style-sheet-lines';

import {
  $green,
  $white,
  $offwhite,
  $black,
  $darkGreen,
  $deepskyblue,
} from './colors';

const styles = StyleSheet.create(
  Object.assign(
    {
      activity: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      header: {
        backgroundColor: 'darkseagreen',
        // elevation: 3,
      },
      elevation: {
        elevation: 3,
        backgroundColor: 'white',
      },
      textHeader: {
        margin: 15,
        marginLeft: 45,
        marginRight: 45,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 20,
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
        color: $darkGreen,
        position: 'absolute',
        fontSize: 20,
        marginLeft: 100,
      },
      textCenter: {
        margin: 10,
        color: $black,
        justifyContent: 'center',
        fontSize: 25,
      },
      textCard: {
        color: $darkGreen,
        marginLeft: 55,
        marginRight: 55,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 18,
      },
      textDivision: {
        color: $green,
        fontSize: 20,
        // backgroundColor: $green,
        marginLeft: 20,
      },
      textLeague: {
        color: $green,
        fontSize: 12,
        // backgroundColor: $green,
        alignItems: 'center',
        textAlign: 'center',
      },
      textDate: {
        color: $green,
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20,
      },
      textDateBlack: {
        color: $black,
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
      },
      textTime: {
        textAlign: 'center',
        color: $black,
        fontSize: 12,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 15,
      },
      textTimeBlack: {
        textAlign: 'center',
        color: $black,
        fontSize: 12,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 15,
      },
      textVs: {
        marginTop: 5,
        marginBottom: 20,
        marginLeft: 5,
        color: $black,
        fontSize: 16,
      },
      textVsLink: {
        marginTop: 5,
        marginBottom: 20,
        marginLeft: 5,
        color: $deepskyblue,
        fontSize: 16,
      },
      textScore: {
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
        color: $black,
        fontSize: 16,
      },
      textScoreLink: {
        marginTop: 5,
        marginBottom: 5,
        textAlign: 'center',
        color: $deepskyblue,
        fontSize: 16,
      },
      card: {
        height: 100,
        // marginBottom: 3,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: $white,
        // borderColor: $darkGreen,
        // borderWidth: 1,
      },
      fixturesCardSection: {
        marginTop: 5,
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: $green,
        // borderTopColor: $darkGreen,
        // borderWidth: 1,
      },
      fixturesCardDetail: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: $green,
        // borderBottomColor: $darkGreen,
        // borderWidth: 1,
      },
      cardImage: {
        marginLeft: 20,
        width: 30,
        height: 30,
        position: 'absolute',
      },
      headerImage: {
        marginTop: 15,
        marginLeft: 15,
        alignSelf: 'flex-start',
        width: 30,
        height: 30,
        position: 'absolute',
      },
      chevronImage: {
        right: 15,
        marginTop: 15,
        position: 'absolute',
        opacity: 0.2,
        width: 14,
        height: 14,
      },
      imgBackground: {
        flex: 1,
        width: null,
        height: null,
      },
    },
    stylesTables,
    stylesButtons,
    stylesLines,
  ),
);

module.exports = {
  styles,
};

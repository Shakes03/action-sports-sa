import {StyleSheet} from 'react-native';
import {
  $green,
  $white,
  $offwhite,
  $black,
  $darkGreen,
  $deepskyblue,
} from './colors';

const styles = {
  textTableHeading: {
    marginTop: 5,
    marginLeft: 5,
    color: $black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textTableBody: {
    marginTop: 5,
    marginLeft: 5,
    color: $black,
    fontSize: 16,
  },
  textTableBodyLink: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    color: $deepskyblue,
    fontSize: 16,
  },
  textTableBodyPlayer: {
    marginTop: 10,
    marginLeft: 5,
    color: $green,
    fontSize: 16,
  },
  textTableBodyPlayerStats: {
    marginLeft: 5,
    color: $black,
    fontSize: 16,
  },
  tableCard: {
    flex: 1,
    paddingLeft: 10,
    paddingBottom: 10,
  },
};

module.exports = styles;

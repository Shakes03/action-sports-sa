import { StyleSheet } from 'react-native';
import {
  $green,
  $white,
  $offwhite,
  $black,
  $darkGreen,
  $deepskyblue,
} from './colors';

const styles = {
  divButton: {
    height: 50,
    marginHorizontal: 10,
    marginVertical: 15,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'darkseagreen',
    elevation: 3,
  },
  textButton: {
    color: $black,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
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
    opacity: 0.4,
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
};

module.exports = styles;

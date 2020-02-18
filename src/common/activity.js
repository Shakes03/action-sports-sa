import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

export default class Activity extends React.PureComponent {
  render() {
    return (
      <View style={styles.view}>
        <ActivityIndicator size="large" style={styles.activity} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
  },
  activity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

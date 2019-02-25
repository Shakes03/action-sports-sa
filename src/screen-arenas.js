import React from 'react';
import {
  ActivityIndicator, FlatList, Text, View, TouchableOpacity,
} from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import { arenasList } from './data';

const { styles } = require('../src/constants/style-sheet');

export default class Arenas extends React.Component {
  static navigationOptions = {
    title: 'Arenas',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    return fetch('http://actionsport.spawtz.com/External/Fixtures/')
      .then(response => response.text())
      .then((responseText) => {
        const list = arenasList(responseText);
        this.setState({
          isLoading: false,
          dataSource: list,
        }, () => {});
      }).catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{
          flex: 1,
          padding: 20,
        }}
        >
          <ActivityIndicator size="large" style={styles.activity} />
        </View>);
    }

    function adBanner(index) {
      let adB;
      if (index > 0 && index % 6 === 0) {
        adB = (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <AdMobBanner
              adSize="smartBanner"
              adUnitID="ca-app-pub-1949277801081319/6218814838"
              onAdFailedToLoad={error => console.log(error)}
            />
          </View>
        );
      } else adB = <View></View>
      return adB;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}><Text style={styles.textHeader}>Arenas</Text></View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item, index }) => (
            <View style={{
              flex: 1,
            }}
            >
              {adBanner(index)}
              <TouchableOpacity
                style={styles.card}
                onPress={() => this.props.navigation.push('sports', {
                  arenaUrl: item.url,
                  arenaName: item.name,
                })}
              >
                <Text style={styles.textCard}>{item.name}</Text>
              </TouchableOpacity>
              <View style={styles.fullLine} />
            </View>)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>);
  }
}

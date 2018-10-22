import React from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import { arenasList } from './data';

const { styles } = require('./style-sheet');

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

    return (
      <View style={{ flex: 1 }}>
        <Image
          style={styles.headerImage}
          source={require('./assets/Multi_Sport.png')}
        />
        <Text style={styles.header}>Arenas</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={{
              flex: 1,
            }}
            >
              <TouchableOpacity
                style={styles.card}
                onPress={() => this.props.navigation.push('sports', {
                  arenaUrl: item.url,
                  arenaName: item.name,
                })}
              >
                <Text style={styles.textCard}>{item.name}</Text>
              </TouchableOpacity>
            </View>)}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-1949277801081319/2535626942"
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => console.error(error)}
          />
        </View>
      </View>);
  }
}

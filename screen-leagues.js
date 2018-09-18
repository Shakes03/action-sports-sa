import React from 'react';
import Swipeout from 'react-native-swipeout';
import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { leaguesList } from './data';

const { styles } = require('./style-sheet');

export default class Leagues extends React.Component {
  static navigationOptions = {
    title: 'Leagues',
  };
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const sport = navigation.getParam('sport', 'NO-SPORT');
    const arenaUrl = navigation.getParam('arenaUrl', 'NO-URL');
    const iconPath = navigation.getParam('iconPath', 'require(\'./assets/Multi_Sport.png\')');

    this.state = {
      isLoading: true, sport, arenaUrl, iconPath,
    };
  }

  componentDidMount() {
    return fetch(`http://actionsport.spawtz.com${this.state.arenaUrl}`)
      .then(response => response.text())
      .then((responseText) => {
        const { sport } = this.state;
        const list = leaguesList(responseText, sport);
        this.setState({
          isLoading: false,
          dataSource: list,
        }, () => {});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator size="large" style={styles.activity} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Image
          style={styles.headerImage}
          source={this.state.iconPath}
        />
        <Text style={styles.header}>{this.state.sport}</Text>
        <FlatList
          data={this.state.dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <Swipeout
                right={[{
                  component: <TouchableOpacity
                    style={styles.swipeOutButton}
                    onPress={() =>
                      this.props.navigation.push('fixtures', {
                      fixtures: item.fixtures,
                      division: item.division,
                    })}
                  >
                    <Text style={{ color: 'white' }}>   Fixtures   </Text>
                             </TouchableOpacity>,
                }, {
                  component: <TouchableOpacity
                    style={styles.swipeOutButton}
                    onPress={() =>
                    this.props.navigation.push('division', {
                    standings: item.standings,
                    division: item.division,
                    fixtures: item.fixtures,
                    })}
                  >
                    <Text style={{ color: 'white' }}>  Standings  </Text>
                             </TouchableOpacity>,
                }]}
                left={[]}
                autoClose
              >
                <View style={styles.card}>
                  <Text style={styles.textLeague}>{item.season}</Text>
                  <Text style={styles.textDivision}>{item.division}</Text>
                  <Image
                    style={styles.chevronImage}
                    source={require('./assets/double-arrow-left.png')}
                  />
                </View>
              </Swipeout>
            </View>)
          }
        />
      </View>
    );
  }
}

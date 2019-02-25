import React from 'react';
import Swipeout from 'react-native-swipeout';
import { AdMobBanner } from 'react-native-admob';
import {
 ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity 
} from 'react-native';
import { leaguesList, allFixturesAndStandings } from './data';

const { styles } = require('../src/constants/style-sheet');

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
        const standingsAndFixtures = allFixturesAndStandings(responseText, sport);
        this.setState({
          isLoading: false,
          dataSource: list,
          standings: standingsAndFixtures.standings,
          fixtures: standingsAndFixtures.fixtures,
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
        <Image
          style={styles.headerImage}
          source={this.state.iconPath}
        />
        <View style={styles.header}><Text style={styles.textHeader}>{this.state.sport}</Text></View>
        <View style={styles.elevation}>
          <View style={{
            marginTop: 5, flexDirection: 'row', justifyContent: 'space-between',
          }}
          >
            <TouchableOpacity
              style={styles.divButton}
              onPress={() => this.props.navigation.push('fixtures', {
                fixtures: this.state.fixtures,
                division: 'All',
              })}
            >
              <Image
                style={{
                  position: 'absolute', marginLeft: 15, marginTop: 15, width: 25, height: 25,
                }}
                source={require('./assets/calendar.png')}
              />
              <Text style={styles.textButton}>Fixtures</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.divButton}
              onPress={() => this.props.navigation.push('players', {
                statistics: this.state.fixtures.replace('Fixtures.aspx', 'Statistics.aspx'),
              })}
            >
              <Image
                style={{
                  position: 'absolute', marginLeft: 15, marginTop: 15, width: 25, height: 25,
                }}
                source={require('./assets/graph.png')}
              />
              <Text style={styles.textButton}>MVPs</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.fullLine} />
        </View>
        <FlatList
          data={this.state.dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1 }}>
              {adBanner(index)}
              <Swipeout
                right={[{
                  component: <TouchableOpacity
                    style={styles.swipeOutButton}
                    onPress={() => this.props.navigation.push('fixtures', {
                        fixtures: item.fixtures,
                        division: item.division,
                      })}
                  >
                    <Text style={{ color: 'white' }}>   Fixtures   </Text>
                  </TouchableOpacity>,
                }, {
                  component: <TouchableOpacity
                    style={styles.swipeOutButton}
                    onPress={() => this.props.navigation.push('division', {
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
                  <Text style={styles.textCard}>{item.division}</Text>
                  <Image
                    style={styles.chevronImage}
                    source={require('./assets/double-arrow-left.png')}
                  />                  
                </View>
              </Swipeout>
              <View style={styles.fullLine} />
            </View>)
          }
        />
      </View>
    );
  }
}

import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
// import Swipeout from 'react-native-swipeout';
import Activity from './common/activity';

import {SwipeListView} from 'react-native-swipe-list-view';
import {allFixturesAndStandings, leaguesList} from './data';

const {styles} = require('../src/constants/style-sheet');

export default class Leagues extends React.Component {
  static navigationOptions = {
    title: 'Leagues',
  };

  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const sport = navigation.getParam('sport', 'NO-SPORT');
    const arenaUrl = navigation.getParam('arenaUrl', 'NO-URL');
    const iconPath = navigation.getParam(
      'iconPath',
      "require('./assets/Multi_Sport.png')",
    );

    this.state = {
      isLoading: true,
      sport,
      arenaUrl,
      iconPath,
    };
  }

  componentDidMount() {
    return fetch(`http://actionsport.spawtz.com${this.state.arenaUrl}`)
      .then(response => response.text())
      .then(responseText => {
        const {sport} = this.state;
        const list = leaguesList(responseText, sport);
        const standingsAndFixtures = allFixturesAndStandings(
          responseText,
          sport,
        );
        this.setState(
          {
            isLoading: false,
            dataSource: list,
            standings: standingsAndFixtures.standings,
            fixtures: standingsAndFixtures.fixtures,
          },
          () => {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return <Activity />;
    }

    return (
      <View style={{flex: 1}}>
        <Image style={styles.headerImage} source={this.state.iconPath} />
        <View style={styles.header}>
          <Text style={styles.textHeader}>{this.state.sport}</Text>
        </View>
        <View style={styles.elevation}>
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.divButton}
              onPress={() =>
                this.props.navigation.push('fixtures', {
                  fixtures: this.state.fixtures,
                  division: 'All',
                })
              }>
              <Image
                style={{
                  position: 'absolute',
                  marginLeft: 15,
                  marginTop: 15,
                  width: 25,
                  height: 25,
                }}
                source={require('./assets/calendar.png')}
              />
              <Text style={styles.textButton}>Fixtures</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.divButton}
              onPress={() =>
                this.props.navigation.push('players', {
                  statistics: this.state.fixtures.replace(
                    'Fixtures.aspx',
                    'Statistics.aspx',
                  ),
                })
              }>
              <Image
                style={{
                  position: 'absolute',
                  marginLeft: 15,
                  marginTop: 15,
                  width: 25,
                  height: 25,
                }}
                source={require('./assets/graph.png')}
              />
              <Text style={styles.textButton}>MVPs</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SwipeListView
          data={this.state.dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text style={styles.textLeague}>{item.season}</Text>
              <Text style={styles.textCard}>{item.division}</Text>
              <Image
                style={styles.chevronImage}
                source={require('./assets/double-arrow-left.png')}
              />
            </View>
          )}
          renderHiddenItem={({item}) => (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.swipeOutButton}
                onPress={() =>
                  this.props.navigation.push('fixtures', {
                    fixtures: item.fixtures,
                    division: item.division,
                  })
                }>
                <View>
                  <Text style={{color: 'white'}}> Fixtures </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.swipeOutButton}
                onPress={() =>
                  this.props.navigation.push('division', {
                    standings: item.standings,
                    division: item.division,
                    fixtures: item.fixtures,
                  })
                }>
                <Text style={{color: 'white'}}> Standings </Text>
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-150}
        />
      </View>
    );
  }
}

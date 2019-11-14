import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {YellowBox, AsyncStorage} from 'react-native';

import Arenas from './src/screen-arenas';
import Sports from './src/screen-sports';
import Leagues from './src/screen-leagues';
import Division from './src/screen-division';
import Fixtures from './src/screen-fixtures';
import Team from './src/screen-team';
import Players from './src/screen-players';

YellowBox.ignoreWarnings([
  'AsyncStorage',
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  "Warning: Can't",
  'Require cycle',
  'Warning: Encountered',
  'Virtualized',
]);

export default class App extends React.Component {
  state = {
    screen: '',
    arenaName: '',
    arenaUrl: '',
    standingsUrl: '',
    fixturesUrl: '',
    hasFavourite: false,
    division: '',
  };

  componentDidMount = async () => {
    await this.getKey();
  };

  async getKey() {
    try {
      const screen = await AsyncStorage.getItem('screen');
      const arenaName = await AsyncStorage.getItem('arenaName');
      const arenaUrl = await AsyncStorage.getItem('arenaUrl');
      const standingsUrl = await AsyncStorage.getItem('standingsUrl');
      const fixturesUrl = await AsyncStorage.getItem('fixturesUrl');
      const hasFavourite = await AsyncStorage.getItem('hasFavourite');
      const division = await AsyncStorage.getItem('division');
      this.setState({
        screen,
        arenaName,
        arenaUrl,
        standingsUrl,
        hasFavourite,
        division,
        fixturesUrl,
      });
    } catch (error) {
      console.log(`Error retrieving data${error}`);
    }
  }

  render() {
    const route = {};
    route.initialRouteName = this.state.screen;
    const RootStack = createAppContainer(
      createStackNavigator(
        {
          arenas: Arenas,
          sports: Sports,
          leagues: Leagues,
          division: Division,
          fixtures: Fixtures,
          team: Team,
          players: Players,
        },
        route,
      ),
    );
    const propsForTheScreen = {
      arenaName: this.state.arenaName,
      arenaUrl: this.state.arenaUrl,
      standingsUrl: this.state.standingsUrl,
      fixturesUrl: this.state.fixturesUrl,
      hasFavourite: this.state.hasFavourite,
      division: this.state.division,
    };
    return <RootStack screenProps={propsForTheScreen} />;
  }
}

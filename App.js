import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {YellowBox, AsyncStorage} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

import Activity from './src/common/activity';

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
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      screen: '',
      arenaName: '',
      arenaUrl: '',
      standingsUrl: '',
      fixturesUrl: '',
      hasFavourite: false,
      division: '',
      rated: false,
      favouritesList: [],
      tabsList: {},
    };
  }

  async componentDidMount() {
    await this.getKey();
  }

  async getKey() {
    try {
      const screen = await AsyncStorage.getItem('screen');
      const arenaName = await AsyncStorage.getItem('arenaName');
      const arenaUrl = await AsyncStorage.getItem('arenaUrl');
      const standingsUrl = await AsyncStorage.getItem('standingsUrl');
      const fixturesUrl = await AsyncStorage.getItem('fixturesUrl');
      const hasFavourite = await AsyncStorage.getItem('hasFavourite');
      const division = await AsyncStorage.getItem('division');
      const rated = await AsyncStorage.getItem('rated');
      const favouritesList = await AsyncStorage.getItem('favouritesList');

      const list = JSON.parse(favouritesList);
      console.log('L', list);
      this.setState({
        screen,
        arenaName,
        arenaUrl,
        standingsUrl,
        hasFavourite,
        division,
        fixturesUrl,
        rated,
        favouritesList,
        list: list || [],
      });
      this.setState({isLoading: false});
    } catch (error) {
      console.log(`Error retrieving data${error}`);
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Activity />;
    } else {
      let tabsList = {};
      this.state.list.forEach(i =>
        Object.assign(tabsList, {[i.division]: Division}),
      );
      if (Object.keys(tabsList).length === 0) {
        tabsList = {team: Division};
      }

      const tabs = createMaterialTopTabNavigator(tabsList, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
          scrollEnabled: true,
          activeTintColor: 'tomato',
          style: {
            backgroundColor: 'white',
          },
          labelStyle: {
            fontSize: 14,
            color: 'teal',
          },
        },
      });
      const RootStack = createAppContainer(
        createStackNavigator(
          {
            arenas: Arenas,
            sports: Sports,
            leagues: Leagues,
            division: tabs,
            fixtures: Fixtures,
            team: Team,
            players: Players,
          },
          {
            initialRouteName: this.state.screen,
            headerMode: 'none',
            navigationOptions: {
              headerVisible: false,
            },
          },
        ),
      );

      const propsForTheScreen = {
        arenaName: this.state.arenaName,
        arenaUrl: this.state.arenaUrl,
        standingsUrl: this.state.standingsUrl,
        fixturesUrl: this.state.fixturesUrl,
        hasFavourite: this.state.hasFavourite,
        division: this.state.division,
        rated: this.state.rated,
        favouritesList: this.state.favouritesList,
      };
      return <RootStack screenProps={propsForTheScreen} />;
    }
  }
}

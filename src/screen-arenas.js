import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';

import {arenasList} from './data';
import Activity from './common/activity';

const {styles} = require('../src/constants/style-sheet');

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
      .then(responseText => {
        const list = arenasList(responseText);
        this.setState(
          {
            isLoading: false,
            dataSource: list,
          },
          () => {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      bottomDivider
      chevron
      onPress={() =>
        this.props.navigation.push('sports', {
          arenaUrl: item.url,
          arenaName: item.name,
        })
      }
    />
  );

  render() {
    if (this.state.isLoading) {
      return <Activity />;
    }

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Arenas</Text>
        </View>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.dataSource}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

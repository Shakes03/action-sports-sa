import React from 'react';
import { ActivityIndicator, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { sportsList } from './data';

const { styles } = require('../src/constants/style-sheet');

export default class Sports extends React.Component {
  static navigationOptions = {
    title: 'Sports',
  };
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const arenaUrl = navigation.getParam('arenaUrl', this.props.screenProps.arenaUrl);
    const arenaName = navigation.getParam('arenaName', this.props.screenProps.arenaName);
    this.state = {
      isLoading: true, arenaUrl, arenaName, checked: true,
    };
  }

  componentDidMount() {
    return fetch(`http://actionsport.spawtz.com${this.state.arenaUrl}`)
      .then(response => response.text())
      .then((responseText) => {
        const list = sportsList(responseText);
        this.setState({
          isLoading: false,
          dataSource: (list.length !== 0) ? list : [{ name: this.state.arenaName }],
        }, () => {});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onClick(value) {
    this.state.checked = !value;
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
        <View style={styles.header}><Text style={styles.textHeader}>{this.state.arenaName}</Text></View>
        <View style={styles.fullLine} />
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => {
              let icon;
              if (item.name.includes('Cricket')) {
                icon = require('./assets/Indoor_Cricket.png');
              } else if (item.name.includes('Soccer')) {
                icon = require('./assets/Indoor_Soccer.png');
              } else if (item.name.includes('Hockey')) {
                icon = require('./assets/Action_Hockey.png');
              } else if (item.name.includes('Netball')) {
                icon = require('./assets/Netball.png');
              } else if (item.name.includes('Volleyball')) {
                icon = require('./assets/Volleyball.png');
              } else {
                icon = require('./assets/Multi_Sport.png');
              }

              return (
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                      this.props.navigation.push('leagues', {
                      arenaUrl: this.state.arenaUrl,
                      sport: item.name,
                      iconPath: icon,
                    })}
                  >
                    <Image
                      style={styles.cardImage}
                      source={icon}
                    />
                    <Text style={styles.textCard}>{item.name}</Text>
                  </TouchableOpacity>
                  <View style={styles.fullLine} />
                </View>);
            }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

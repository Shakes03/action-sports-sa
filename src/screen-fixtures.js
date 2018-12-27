import React from 'react';
import { ActivityIndicator, SectionList, Text, View, TouchableOpacity } from 'react-native';
import { fixturesList } from './data';

const { styles } = require('../src/constants/style-sheet');

export default class Fixtures extends React.Component {
  static navigationOptions = {
    title: 'Fixtures',
  };
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const fixturesUrl = navigation.getParam('fixtures', this.props.screenProps.fixturesUrl);
    const division = navigation.getParam('division', this.props.screenProps.division);

    this.state = { isLoading: true, fixturesUrl, division };
  }

  componentDidMount() {
    return fetch(`http://actionsport.spawtz.com${this.state.fixturesUrl}`)
      .then(response => response.text())
      .then((responseText) => {
        const list = fixturesList(responseText);
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
        <View style={styles.header}><Text style={styles.textHeader}>{this.state.division}</Text></View>
        <View style={styles.fullLine} />
        <View style={{ flex: 1 }}>
          <SectionList
            renderItem={({ item, index }) => (
              <View style={styles.fixturesCardDetail}>
                <Text style={styles.textTime} key={index}>{item.time} at {item.court}</Text>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.push('team', {
                      teamUrl: item.homeTeamUrl,
                      teamName: item.homeTeam,
                    })}
                  >
                    <Text style={styles.textVsLink}>{item.homeTeam}</Text>
                  </TouchableOpacity>
                  <Text style={styles.textVs} key={index}>vs</Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.push('team', {
                        teamUrl: item.awayTeamUrl,
                        teamName: item.awayTeam,
                      })}
                  >
                    <Text style={styles.textVsLink}>{item.awayTeam}</Text>
                  </TouchableOpacity>
                </View>
              </View>)
              }
            renderSectionHeader={({ section: { date } }) => (
              <View style={styles.fixturesCardSection}>
                <Text style={styles.textDate}>{date}</Text>
                <View style={styles.line} />
              </View>
              )}
            sections={this.state.dataSource}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      </View>
    );
  }
}

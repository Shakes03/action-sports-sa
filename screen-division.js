import React from 'react';
import { ActivityIndicator, Modal, FlatList, SectionList, Linking, ScrollView, Text, Image, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import CheckBox from 'react-native-modest-checkbox';
import { teamsList, resultsList } from './data';

const { styles } = require('./style-sheet');

export default class Division extends React.Component {
  static navigationOptions = {
    title: 'Division',
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const standingsUrl = navigation.getParam('standings', this.props.screenProps.standingsUrl);
    const fixturesUrl = navigation.getParam('fixtures', this.props.screenProps.fixturesUrl);
    const division = navigation.getParam('division', this.props.screenProps.division);
    const { hasFavourite } = this.props.screenProps;
    this.state = {
      modalVisible: false, isLoading: true, standingsUrl, fixturesUrl, hasFavourite, pointsBreakdown: 'No points breakdown', division,
    };
  }

  componentDidMount() {
    return fetch(`http://actionsport.spawtz.com${this.state.standingsUrl}`)
      .then(response => response.text())
      .then((responseText) => {
        const list = teamsList(responseText);
        const listResults = resultsList(responseText);
        this.setState({
          isLoading: false,
          dataSource: list,
          dataResults: listResults,
        }, () => {});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  async saveKey({ screen, standingsUrl, division, fixturesUrl }) {
    try {
      await AsyncStorage.setItem('hasFavourite', 'true');
      await AsyncStorage.setItem('screen', screen);
      await AsyncStorage.setItem('standingsUrl', standingsUrl);
      await AsyncStorage.setItem('fixturesUrl', fixturesUrl);
      await AsyncStorage.setItem('division', division);
    } catch (error) {
      console.log(`Error saving data${error}`);
    }
  }

  async resetKeys() {
    try {
      await AsyncStorage.setItem('screen', 'arenas');
      await AsyncStorage.setItem('hasFavourite', 'false');
      await AsyncStorage.removeItem('arenaName');
      await AsyncStorage.removeItem('arenaUrl');
      await AsyncStorage.removeItem('standingsUrl');
      await AsyncStorage.removeItem('fixturesUrl');
      await AsyncStorage.removeItem('division');
    } catch (error) {
      console.warn(`Error saving data${error}`);
    }
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
        <Text style={styles.header}>{this.state.division}</Text>
        <TouchableOpacity style={{ position: 'absolute' }} onPress={() => this.props.navigation.push('arenas', {})} >
          <Image
            style={{
 marginLeft: 15, marginTop: 15, width: 30, height: 30, alignSelf: 'flex-start',
}}
            source={require('./assets/home-icon.png')}
          />
        </TouchableOpacity>
        <View style={{
 alignSelf: 'flex-end', paddingTop: 15, marginRight: 25, position: 'absolute',
}}
        >
          <CheckBox
            label=""
            checked={(this.state.hasFavourite === 'true' && this.state.division === this.props.screenProps.division)}
            checkedImage={require('./assets/yellow-star-icon.png')}
            uncheckedImage={require('./assets/yellow-star-icon-grey.png')}
            onChange={checked => ((checked.checked === true) ?
              this.saveKey({
                screen: 'division',
                standingsUrl: this.state.standingsUrl,
                division: this.state.division,
                fixturesUrl: this.state.fixturesUrl,
              }) :
              this.resetKeys())
            }
          />
        </View>
        <ScrollView>
          <View style={{
 paddingLeft: 10, paddingBottom: 10, borderBottomColor: 'white', borderBottomWidth: 1, backgroundColor: '#2e8b57',
}}
          >
            <Grid>
              <Col size={50}><Text style={styles.textTableHeading}>TEAM</Text></Col>
              <Col size={12}><Text style={styles.textTableHeading}>P</Text></Col>
              <Col size={12}><Text style={styles.textTableHeading}>W</Text></Col>
              <Col size={12}><Text style={styles.textTableHeading}>L</Text></Col>
              <Col size={14}><Text style={styles.textTableHeading}>PTS</Text></Col>
            </Grid>
          </View>
          <Modal
            animationType="fade"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {}}
          >
            <View style={{
 flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
}}
            >
              <View style={{
  marginTop: 60, marginBottom: 30, marginHorizontal: 10, backgroundColor: '#fffafa', opacity: 0.97, borderWidth: 1, borderColor: 'white',
}}
              >
                <Text style={styles.textDateBlack}>Points breakdown</Text>
                <TouchableOpacity
                  style={{
         alignSelf: 'flex-end', marginTop: 5, paddingRight: 15, position: 'absolute',
        }}
                  onPress={() => {
                     this.setModalVisible(!this.state.modalVisible);
                   }}
                >
                  <Image
                    style={{ width: 30, height: 30, opacity: 0.6 }}
                    source={require('./assets/close-icon.png')}
                  />
                </TouchableOpacity>
                <FlatList
                  data={this.state.pointsBreakdown}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                  const bonusPointsList = item.points.split(' |');
                  const bonusPointsListKeyed = bonusPointsList.map(i => ({ point: i }));
                  return (
                    <View>
                      <Text style={styles.textTimeBlack}>{item.match}</Text>
                      <FlatList
                        data={bonusPointsListKeyed}
                        renderItem={({ item }) => <Text style={{ marginLeft: 30 }}>{item.point}</Text>}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>);
                  }
                }
                />
              </View>
            </View>
          </Modal>
          <FlatList
            data={this.state.dataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.tableCard}>
                <Grid>
                  <Col size={50}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.push('team', {
                      teamUrl: item.teamUrl,
                      teamName: item.team,
                    })}
                    >
                      <Text style={styles.textTableBodyLink}>{item.team}</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col size={12}><Text style={styles.textTableBody}>{item.played}</Text></Col>
                  <Col size={12}><Text style={styles.textTableBody}>{item.wins}</Text></Col>
                  <Col size={12}><Text style={styles.textTableBody}>{item.losses}</Text></Col>
                  <Col size={14}>
                    <TouchableOpacity onPress={() => {
                        this.setState({ pointsBreakdown: item.pointsBreakdown });
                        return this.setModalVisible(true);
                      }}
                    >
                      <Text style={styles.textTableBodyLink}>{item.points}</Text>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>)
            }
          />
          <View style={{ marginTop: 5, backgroundColor: '#2e8b57' }}>
            <TouchableOpacity
              style={styles.divButton}
              onPress={() => this.props.navigation.push('fixtures', {
              fixtures: this.state.fixturesUrl,
              division: this.state.division,
            })}
            >
              <Image
                style={{
                  position: 'absolute', marginLeft: 15, marginTop: 15, width: 30, height: 30,
                }}
                source={require('./assets/calendar.png')}
              />
              <Text style={styles.textButton}>Fixtures</Text>
            </TouchableOpacity>
            <Text style={styles.textCenter}>Results</Text>
          </View>
          <SectionList
            renderItem={({ item, index }) => (
              <View style={{ backgroundColor: '#2e8b57', paddingBottom: 10 }}>
                <Text style={styles.textTime} key={index}>{item.time} at {item.court}</Text>
                <Text style={styles.textScore} key={index}>{item.homeTeam} vs {item.awayTeam}</Text>
                <TouchableOpacity onPress={() => { Linking.openURL(`http://actionsport.spawtz.com${item.scoreUrl}`); }}>
                  <Text style={styles.textScoreLink} key={index}>{item.score}</Text>
                </TouchableOpacity>
              </View>)
            }
            renderSectionHeader={({ section: { date } }) => (
              <View style={{ backgroundColor: '#2e8b57', marginTop: 5 }}>
                <Text style={styles.textDate}>{date}</Text>
                <View style={styles.line} />
              </View>
            )}
            sections={this.state.dataResults}
            keyExtractor={(item, index) => item + index}
          />
        </ScrollView>
      </View>
    );
  }
}

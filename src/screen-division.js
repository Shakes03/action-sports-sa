import React from 'react';
import {
  Modal,
  FlatList,
  SectionList,
  Linking,
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import {Overlay, Button} from 'react-native-elements';

import Rate, {AndroidMarket} from 'react-native-rate';
import RNRestart from 'react-native-restart'; // Import package from node modules

// Immediately reload the React Native Bundle

import {Col, Grid} from 'react-native-easy-grid';
import CheckBox from 'react-native-check-box';
import {teamsList, resultsList} from './data';
import Activity from './common/activity';

const {styles} = require('../src/constants/style-sheet');

export default class Division extends React.Component {
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    const {navigation} = this.props;

    const favouritesList = navigation.getParam(
      'favouritesList',
      this.props.screenProps.favouritesList,
    );

    const standingsUrl = navigation.getParam('standings');

    let pageList;
    if (
      Array.isArray(JSON.parse(favouritesList)) &&
      JSON.parse(favouritesList).length &&
      !standingsUrl
    ) {
      pageList = JSON.parse(favouritesList).filter(
        x => x.division === navigation.state.routeName,
      );
    } else {
      pageList = [
        {
          standingsUrl: navigation.getParam(
            'standings',
            this.props.screenProps.standingsUrl,
          ),
          fixturesUrl: navigation.getParam(
            'fixtures',
            this.props.screenProps.fixturesUrl,
          ),
          division: navigation.getParam(
            'division',
            this.props.screenProps.division,
          ),
          isFavorite: false,
        },
      ];
    }

    const {hasFavourite, rated} = this.props.screenProps;

    this.state = {
      hasRated: false,
      isVisible: true,
      modalVisible: false,
      isLoading: true,
      standingsUrl: pageList[0].standingsUrl,
      fixturesUrl: pageList[0].fixturesUrl,
      hasFavourite,
      pointsBreakdown: 'No points breakdown',
      division: pageList[0].division,
      isChecked: pageList[0].isFavorite,
      rated,
      refreshing: false,
      favouritesList: JSON.parse(favouritesList || '[]'),
      favModalVisible: false,
    };
  }

  componentDidMount() {
    return fetch(`http://actionsport.spawtz.com${this.state.standingsUrl}`)
      .then(response => response.text())
      .then(responseText => {
        const list = teamsList(responseText);
        const listResults = resultsList(responseText);
        this.setState(
          {
            isLoading: false,
            dataSource: list,
            dataResults: listResults,
          },
          () => {},
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  async saveAppRatingKey() {
    try {
      await AsyncStorage.setItem('rated', 'true');
    } catch (error) {
      console.log(`Error saving data${error}`);
    }
  }

  showFavModal(state) {
    return (
      <Overlay width="80%" height={150} isVisible={state.favModalVisible}>
        <View>
          <Text
            style={{
              margin: 15,
              marginLeft: 45,
              marginRight: 45,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: 20,
              color: 'black',
            }}>
            {state.isChecked ? 'Added\nto' : 'Removed\nfrom'} your favorites.
          </Text>
          <Button
            buttonStyle={{backgroundColor: 'forestgreen'}}
            raised
            title="OK"
            onPress={() => {
              this.setState({favModalVisible: false});
              RNRestart.Restart();
            }}
          />
        </View>
      </Overlay>
    );
  }

  async saveKey({screen, standingsUrl, division, fixturesUrl}) {
    await AsyncStorage.removeItem('division');
    const favouritesList = this.state.favouritesList;
    favouritesList.push({
      screen,
      standingsUrl,
      division,
      fixturesUrl,
      isFavorite: true,
    });
    try {
      await AsyncStorage.setItem('hasFavourite', 'true');
      await AsyncStorage.setItem('screen', screen);
      await AsyncStorage.setItem('standingsUrl', standingsUrl);
      await AsyncStorage.setItem('fixturesUrl', fixturesUrl);
      await AsyncStorage.setItem('division', division);
      await AsyncStorage.setItem(
        'favouritesList',
        JSON.stringify(favouritesList),
      );
      this.setState({
        favModalVisible: !this.state.favModalVisible,
      });
    } catch (error) {
      console.warn(`Error saving data${error}`);
    }
  }

  async resetKeys() {
    const favouritesList = this.state.favouritesList;
    let favListRemoveItem;
    if (favouritesList.length !== 0) {
      favListRemoveItem = favouritesList.filter(
        x => x.standingsUrl !== this.state.standingsUrl,
      );
    }

    try {
      await AsyncStorage.removeItem('arenaName');
      await AsyncStorage.removeItem('arenaUrl');
      await AsyncStorage.removeItem('standingsUrl');
      await AsyncStorage.removeItem('fixturesUrl');
      await AsyncStorage.removeItem('division');
      await AsyncStorage.setItem(
        'favouritesList',
        JSON.stringify(favListRemoveItem),
      );
      if (favListRemoveItem.length === 0) {
        await AsyncStorage.setItem('screen', 'arenas');
        await AsyncStorage.setItem('hasFavourite', 'false');
      }
      this.setState({
        favModalVisible: !this.state.favModalVisible,
      });
    } catch (error) {
      console.warn(`Error saving data${error}`);
    }
  }

  render() {
    if (this.state.isLoading) {
      return <Activity />;
    }

    return (
      <View style={{flex: 1}}>
        {this.showFavModal(this.state)}
        <Overlay
          isVisible={!this.state.rated}
          onBackdropPress={() => this.setState({rated: true})}>
          <View
            style={{
              width: '100%',
              height: '90%',
              overflow: 'hidden',
              // alignItems: 'center',
              position: 'relative',
            }}>
            <Image
              resizeMode="center"
              style={{flex: 1, height: undefined, width: undefined}}
              source={require('./assets/google-play-logo.png')}
            />
            <Button
              title="Rate App"
              onPress={() => {
                const options = {
                  GooglePackageName: 'com.actionsportssa',
                  preferredAndroidMarket: AndroidMarket.Google,
                };
                Rate.rate(options, success => {
                  if (success) {
                    // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                    this.saveAppRatingKey();
                  }
                });
              }}
            />
          </View>
        </Overlay>

        <View style={styles.header}>
          <Text style={styles.textHeader}>{this.state.division}</Text>
        </View>
        <TouchableOpacity
          style={{elevation: 5, position: 'absolute'}}
          onPress={() => this.props.navigation.push('arenas', {})}>
          <Image
            style={{
              marginLeft: 15,
              marginTop: 15,
              width: 30,
              height: 30,
              alignSelf: 'flex-start',
            }}
            source={require('./assets/home-icon.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            elevation: 5,
            alignSelf: 'flex-end',
            paddingTop: 15,
            marginRight: 25,
            position: 'absolute',
          }}>
          <CheckBox
            checkedImage={
              <Image
                source={require('./assets/yellow-star-icon.png')}
                style={{
                  right: 15,
                  marginTop: 3,
                  width: 30,
                  height: 30,
                  alignSelf: 'flex-start',
                }}
              />
            }
            unCheckedImage={
              <Image
                source={require('./assets/yellow-star-icon-grey.png')}
                style={{
                  right: 15,
                  marginTop: 3,
                  width: 30,
                  height: 30,
                  alignSelf: 'flex-start',
                }}
              />
            }
            onClick={() => {
              this.setState({
                hasFavourite: !this.state.isChecked,
                isChecked: !this.state.isChecked,
              });
              !this.state.isChecked
                ? this.saveKey({
                    screen: 'division',
                    standingsUrl: this.state.standingsUrl,
                    division: this.state.division,
                    fixturesUrl: this.state.fixturesUrl,
                  })
                : this.resetKeys();
            }}
            isChecked={this.state.isChecked}
          />
        </View>
        <View style={styles.elevation}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.divButton}
              onPress={() =>
                this.props.navigation.push('fixtures', {
                  fixtures: this.state.fixturesUrl,
                  division: this.state.division,
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
                  statistics: this.state.fixturesUrl.replace(
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
        <ScrollView>
          <View style={{paddingLeft: 10, paddingBottom: 10}}>
            <Grid>
              <Col size={50}>
                <Text style={styles.textTableHeading}>TEAM</Text>
              </Col>
              <Col size={12}>
                <Text style={styles.textTableHeading}>P</Text>
              </Col>
              <Col size={12}>
                <Text style={styles.textTableHeading}>W</Text>
              </Col>
              <Col size={12}>
                <Text style={styles.textTableHeading}>L</Text>
              </Col>
              <Col size={14}>
                <Text style={styles.textTableHeading}>PTS</Text>
              </Col>
            </Grid>
          </View>
          <View style={styles.fullLine} />
          <Modal
            animationType="fade"
            transparent
            visible={this.state.modalVisible}
            onRequestClose={() => {}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                elevation={6}
                style={{
                  marginTop: 60,
                  marginBottom: 30,
                  marginHorizontal: 10,
                  backgroundColor: '#fffafa',
                  opacity: 0.97,
                  borderWidth: 1,
                  borderColor: 'white',
                }}>
                <Text style={styles.textDateBlack}>Points breakdown</Text>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    marginTop: 5,
                    paddingRight: 15,
                    position: 'absolute',
                  }}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Image
                    style={{width: 30, height: 30, opacity: 0.6}}
                    source={require('./assets/close-icon.png')}
                  />
                </TouchableOpacity>
                <FlatList
                  data={this.state.pointsBreakdown}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => {
                    const bonusPointsList = item.points.split(' |');
                    const bonusPointsListKeyed = bonusPointsList.map(i => ({
                      point: i,
                    }));
                    return (
                      <View>
                        <Text style={styles.textTimeBlack}>{item.match}</Text>
                        <FlatList
                          data={bonusPointsListKeyed}
                          renderItem={({item}) => (
                            <Text style={{marginLeft: 30}}>{item.point}</Text>
                          )}
                          keyExtractor={(item, index) => index.toString()}
                        />
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </Modal>
          <FlatList
            data={this.state.dataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.tableCard}>
                <Grid>
                  <Col size={50}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.push('team', {
                          teamUrl: item.teamUrl,
                          teamName: item.team,
                        })
                      }>
                      <Text style={styles.textTableBodyLink}>{item.team}</Text>
                    </TouchableOpacity>
                  </Col>
                  <Col size={12}>
                    <Text style={styles.textTableBody}>{item.played}</Text>
                  </Col>
                  <Col size={12}>
                    <Text style={styles.textTableBody}>{item.wins}</Text>
                  </Col>
                  <Col size={12}>
                    <Text style={styles.textTableBody}>{item.losses}</Text>
                  </Col>
                  <Col size={14}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          pointsBreakdown: item.pointsBreakdown,
                        });
                        return this.setModalVisible(true);
                      }}>
                      <Text style={styles.textTableBodyLink}>
                        {item.points}
                      </Text>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>
            )}
          />
          <View style={styles.fullLine} />
          <View style={styles.header}>
            <Text style={styles.textHeader}>Results</Text>
          </View>
          <SectionList
            renderItem={({item, index}) => (
              <View style={{paddingBottom: 10}}>
                <Text style={styles.textTime} key={index}>
                  {item.time} at {item.court}
                </Text>
                <Text style={styles.textScore} key={index}>
                  {item.homeTeam} vs {item.awayTeam}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      `http://actionsport.spawtz.com${item.scoreUrl}`,
                    );
                  }}>
                  <Text style={styles.textScoreLink} key={index}>
                    {item.score}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            renderSectionHeader={({section: {date}}) => (
              <View>
                <View style={styles.line} />
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

import React from 'react';
import {FlatList, Text, View} from 'react-native';
import Activity from './common/activity';

import {Col, Grid} from 'react-native-easy-grid';
import {playerList} from './data';

const {styles} = require('../src/constants/style-sheet');

export default class Team extends React.Component {
  static navigationOptions = {
    title: 'Team',
  };
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    const teamUrl = navigation.getParam('teamUrl', 'NO-team');
    const teamName = navigation.getParam('teamName', 'Players');
    this.state = {isLoading: true, teamUrl, teamName};
  }

  componentDidMount() {
    return fetch(
      `http://actionsport.spawtz.com/External/Fixtures/${this.state.teamUrl}`,
    )
      .then(response => response.text())
      .then(responseText => {
        const list = playerList(responseText);
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

  render() {
    if (this.state.isLoading) {
      return <Activity />;
    }

    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>{this.state.teamName}</Text>
        </View>
        <View
          style={{
            paddingLeft: 5,
            paddingBottom: 30,
            backgroundColor: 'white',
          }}>
          <Grid>
            <Col size={15}>
              <Text style={styles.textTableHeading}>G</Text>
            </Col>
            <Col size={15}>
              <Text style={styles.textTableHeading}>R</Text>
            </Col>
            <Col size={15}>
              <Text style={styles.textTableHeading}>RA</Text>
            </Col>
            <Col size={15}>
              <Text style={styles.textTableHeading}>W</Text>
            </Col>
            <Col size={15}>
              <Text style={styles.textTableHeading}>RC</Text>
            </Col>
            <Col size={15}>
              <Text style={styles.textTableHeading}>C</Text>
            </Col>
            <Col size={15}>
              <Text style={styles.textTableHeading}>CA</Text>
            </Col>
          </Grid>
        </View>
        <View style={styles.fullLine} />
        <FlatList
          data={this.state.dataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={{paddingLeft: 5}}>
              <View style={{marginVertical: 8}}>
                <Text style={styles.textTableBodyPlayer}>
                  {item.player} ({item.contributionAverage})
                </Text>
                <Grid>
                  <Col size={15}>
                    <Text style={styles.textTableBodyPlayerStats}>
                      {item.played}
                    </Text>
                  </Col>
                  <Col size={15}>
                    <Text style={styles.textTableBodyPlayerStats}>
                      {item.runs}
                    </Text>
                  </Col>
                  <Col size={15}>
                    <Text style={styles.textTableBodyPlayerStats}>
                      {item.runsAverage}
                    </Text>
                  </Col>
                  <Col size={15}>
                    <Text style={styles.textTableBodyPlayerStats}>
                      {item.wickets}
                    </Text>
                  </Col>
                  <Col size={15}>
                    <Text style={styles.textTableBodyPlayerStats}>
                      {item.runsConceded}
                    </Text>
                  </Col>
                  <Col size={15}>
                    <Text style={styles.textTableBodyPlayerStats}>
                      {item.contribution}
                    </Text>
                  </Col>
                  <Col size={15}>
                    <Text style={styles.textTableBodyPlayerStats}>
                      {item.contributionAverage}
                    </Text>
                  </Col>
                </Grid>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

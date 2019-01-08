import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, Image, View } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import CollapseView from 'react-native-collapse-view';
import { divisionPlayerList } from './data';

const { styles } = require('../src/constants/style-sheet');

export default class Players extends React.Component {
  static navigationOptions = {
    title: 'Players',
  };
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const statistics = navigation.getParam('statistics', 'NO-team');
    const teamName = navigation.getParam('teamName', 'Players');
    this.state = { isLoading: true, statistics, teamName };
  }

  componentDidMount() {
    return fetch(`http://actionsport.spawtz.com${this.state.statistics}`)
      .then(response => response.text())
      .then((responseText) => {
        const list = divisionPlayerList(responseText);
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
        <View style={styles.header}><Text style={styles.textHeader}>{this.state.teamName}</Text></View>
        <View style={styles.fullLine} />
        <ScrollView style={styles.tableCard}>
          <View style={{
 paddingLeft: 5, paddingBottom: 10, borderBottomColor: 'white', borderBottomWidth: 1,
}}
          >
            <Grid>
              <Col size={15}><Text style={styles.textTableHeading}>G</Text></Col>
              <Col size={15}><Text style={styles.textTableHeading}>R</Text></Col>
              <Col size={15}><Text style={styles.textTableHeading}>RA</Text></Col>
              <Col size={15}><Text style={styles.textTableHeading}>W</Text></Col>
              <Col size={15}><Text style={styles.textTableHeading}>RC</Text></Col>
              <Col size={15}><Text style={styles.textTableHeading}>C</Text></Col>
              <Col size={15}><Text style={styles.textTableHeading}>CA</Text></Col>
            </Grid>
          </View>
          <View style={styles.fullLine} />
          <FlatList
            data={this.state.dataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={{ paddingLeft: 5 }}>
                <CollapseView
                  renderView={
                    collapse => (
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 }}>
                        <Text style={styles.textTableBodyPlayer}>{index + 1}.{item.player} ({item.contributionAverage})</Text>
                        <Text style={{ fontSize: 12, right: 20, bottom: 22, position: 'absolute' }}>{item.team} - {item.division}</Text>
                        <Image
                          style={styles.chevronImage}
                          source={(collapse) ? require('./assets/arrow-up.png') : require('./assets/arrow-down.png')}
                        />
                      </View>
                    )
                  }
                  renderCollapseView={
                    collapse => (
                      <Grid>
                        <Col size={15}><Text style={styles.textTableBodyPlayerStats}>{item.played}</Text></Col>
                        <Col size={15}><Text style={styles.textTableBodyPlayerStats}>{item.runs}</Text></Col>
                        <Col size={15}><Text style={styles.textTableBodyPlayerStats}>{item.runsAverage}</Text></Col>
                        <Col size={15}><Text style={styles.textTableBodyPlayerStats}>{item.wickets}</Text></Col>
                        <Col size={15}><Text style={styles.textTableBodyPlayerStats}>{item.runsConceded}</Text></Col>
                        <Col size={15}><Text style={styles.textTableBodyPlayerStats}>{item.contribution}</Text></Col>
                        <Col size={15}><Text style={styles.textTableBodyPlayerStats}>{item.contributionAverage}</Text></Col>
                      </Grid>
                      )
                  }
                />

              </View>)
          }
          />
        </ScrollView>
      </View>
    );
  }
}

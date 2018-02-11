import React from 'react';
import { Platform, Button, ScrollView, StyleSheet, Alert, Text, View, TouchableHighlight, AsyncStorage } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { MonoText } from '../components/StyledText';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Studentai',
  };
  constructor(){
    super()
    this.state = {
      list: ''
    }
    try {
      AsyncStorage.getItem('DB_form').then((value) => {
        this.setState({
          list: JSON.parse(value)
        })
      })
    } catch (error){
      console.log(error)
    }
  }
  
  parse(){
    if(this.state.list){
      return this.state.list.map((data, i) => {
        return(
          
          <View
          key={i}>
          <Text> {data.vardas} </Text>
          <Text> {data.pavarde} </Text>
          <Text> {data.kursas} </Text>
          
          </View>
        )
      })
    }
  }

  cleanMemoryX(){
    AsyncStorage.clear();
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView >
        {this.parse()}
      </ScrollView>


      <View style={styles.tabBarInfoContainer}>


          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <TouchableHighlight
        onPress={() => this.cleanMemoryX()}>
            <MonoText style={styles.codeHighlightText}>Istrinti studentu istorija</MonoText>
            </TouchableHighlight>
          </View>
        </View>

      </View>
      

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  navigationFilename: {
    marginTop: 5,
  },
  codeHighlightText: {
    textAlign: 'center',
    color: 'blue',
  }
})
;
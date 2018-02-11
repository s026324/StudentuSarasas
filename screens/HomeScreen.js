import React from 'react';
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import LinksScreen from './LinksScreen';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

    constructor(props) {
      super(props);
      this.state = {
        vardas: '',
        pavarde: '',
        kursas: ''
        };
    }
changeVardas(vardas)
{
  this.setState({vardas})
}
changePavarde(pavarde)
{
  this.setState({pavarde})
}
changeKursas(kursas)
{
this.setState({kursas})
}

buttonPressed(){
  const array = [];
  const {navigate} = this.props.navigation;
  if(this.state.vardas && this.state.pavarde && this.state.kursas)
  {
    const dataSend = {
      vardas : this.state.vardas,
      pavarde : this.state.pavarde,
      kursas : this.state.kursas
    }
    array.push(dataSend);
    try {
      AsyncStorage.getItem('DB_form').then((value) =>{
        if(value !== null){
          const d = JSON.parse(value);
          d.push(dataSend)
          AsyncStorage.setItem('DB_form', JSON.stringify(d)).then(() =>{
            this.props.navigator.push({
              title: 'Skelbimai',
              component: LinksScreen
            })
            })
          } else {
            AsyncStorage.setItem('DB_form', JSON.stringify(array)).then(() => {
              this.props.navigator.push({
                title: 'Skelbimai',
                component: LinksScreen
            })
          })

        }
        })
        }
      
      catch (error) {
        console.log(error)
      }
    } else {
      Alert.alert('Uzpildykite visus langus')
    }
  }
    


  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/studentai.png')
                  : require('../assets/images/studentai.png')
              }
              style={styles.welcomeImage}
            />

         <View style={styles.getStartedContainer}>


            <Text style={styles.getStartedText}>STUDENTU SARASAS</Text>



            <Text style={styles.aprasymas}>
              Prasome ivesti Varda, Pavarde ir Kursa noredami prideti studenta prie duomenu bazes
            </Text>
          </View>


          </View>

          <Text>Vardas</Text>
        <TextInput
        placeholder = "Iveskite varda"
        value={this.state.vardas}
        onChangeText={(vardas) => this.changeVardas(vardas)}/>

        <Text>Pavarde</Text>
        <TextInput
                placeholder = "Iveskite pavarde"
        value={this.state.pavarde}
        onChangeText={(pavarde) => this.changePavarde(pavarde)}/>

        <Text>Kursas</Text>
        <TextInput
                placeholder = "Iveskite kursa"
        value={this.state.kursas}
        onChangeText={(kursas) => this.changeKursas(kursas)}/>

 


        </ScrollView>

        <View style={styles.tabBarInfoContainer}>


          <View style={styles.codeHighlightContainer}>
          <TouchableHighlight
        onPress={() => this.buttonPressed()}>
            <MonoText style={styles.codeHighlightText}>Issaugoti</MonoText>
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
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },

  codeHighlightText: {
    color: 'blue',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 25,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
    aprasymas: {
      fontSize: 17,
      color: 'rgba(96,100,0, 1)',
      lineHeight: 24,
      textAlign: 'center',
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
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
});

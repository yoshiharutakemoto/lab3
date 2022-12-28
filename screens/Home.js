import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import { StyleSheet, Text, View, Button, TouchableOpacity,TextInput ,Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';  
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React,{useState,useEffect} from 'react';

const Stack =  createNativeStackNavigator();

const Home = (props) => {
const formatNumber = number => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
}
const [remainigSecs,setRemainingSecs] = useState(0);
const [isActive, setIsActive] = useState(false);
const [isActive4, setIsActive4] = useState(false);
const {mins,secs} = getRemaining(remainigSecs);



const toggle = () => {
  setIsActive(!isActive);
 
}

const reset = () => {
  setRemainingSecs(0);
  setIsActive(false);
}

useEffect(() => {
  let interval = null;
  if (isActive) {
    interval = setInterval(() => {
      setRemainingSecs(remainigSecs => remainigSecs + 1);
    }, 1000);
  } else if (!isActive && remainigSecs !== 0) {
    clearInterval(interval);
  }
  return () => clearInterval(interval);
}, [isActive,remainigSecs]);


const screen = Dimensions.get('window')
return(
  <View style={styles.container}>
    <StatusBar style='light-content'></StatusBar>
    <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
    <TouchableOpacity style={styles.button} onPress= {toggle}  >
      <Text style={styles.buttonText} >{isActive ? 'Stop' : 'Start'}</Text>
    </TouchableOpacity>
  
    <TouchableOpacity onPress={reset} style={[styles.button2, styles.buttonReset]}>
        <Text style={[styles.buttonText, styles.buttonTextReset]}>Clear</Text>
    </TouchableOpacity>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button:{
    backgroundColor:'#148E00',
    marginTop:100,
    top:40,
    paddingLeft:80,
    paddingRight:80 , paddingTop:15,paddingBottom:15
  },

  buttonText:{
    fontSize:30,
    fontWeight:'bold',
  },

  button2:{
    backgroundColor:'#148E00',
    marginTop:20,
    top:40,
    paddingLeft:80,
    paddingRight:80 , paddingTop:15,paddingBottom:15
  },

  timerText: {
    color: '#000000',
    fontSize: 90,
    marginBottom: 20
},  
})

export default Home;

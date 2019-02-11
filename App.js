/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Image,FlatList, StyleSheet, Text, View } from "react-native";

// this is just a simple source, not real rotten tomatoes data
var REQUEST_URL = 
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      loaded: false,
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData(){
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          data: this.state.data.concat(responseData.movies),
          loaded:true,
      });
    });
  }



  render() {
    if(!this.state.loaded){
      return this.renderLoadingView();
    }

    return (
      <FlatList
        data = {this.state.data}
        renderItem={this.renderMovie}
        style={styles.list}
        keyExtractor={item => item.id}
        />
      );
  }

  renderLoadingView(){
    return(
      <View style={styles.container}>
        <Text>
          Loading Movies Data.......XD
        </Text>
      </View>
    );
  }

  renderMovie({item}){
    return (
      <View style={styles.container}>
       <Image 
        source={{uri: item.posters.thumbnail}} 
        style={styles.thumbnail} 
        />
       <View style={styles.rightContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.year}>{item.year}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex:1,
  },
  title :{
    fontSize:20,
    marginBottom:8,
    textAlign:'center',
  },
  year:{
    textAlign:'center',
  },
  list:{
    paddingTop:20,
    backgroundColor:'#F5FCFF'
  },
  thumbnail:{
    width: 53,
    height: 81
  }
});

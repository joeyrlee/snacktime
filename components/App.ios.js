import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Switch,
  Linking
} from 'react-native';
import styles from '../styles.ios.js';
import Nav from './Navbar.ios.js';
import SearchBar from './Searchbar.ios.js';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import UserPage from './UserPage.ios.js';
import * as app from '../actions/appActions.ios.js';
import getApp from '../reducers/appReducers.ios.js';
import camera from './Camera.ios.js';
import FacebookLogin from './FacebookLogin.ios.js';
var SafariView = require('react-native-safari-view');

class App extends Component {
  constructor(props) {
    super(props);
  }

  border(color) {
    return {
      borderColor: color,
      borderWidth: 5,
    }
  }

  changeToUserPage() {
    this.props.navigator.push({
      component: UserPage,
      passProps: { store: this.props.store}
    })
  }

  changeNavigationHome() {
    this.props.navigator.push({
      id: 'Home'
    })
  }

  changeNavigationCamera() {
    this.props.navigator.push({
      component: camera,
      passProps: { store: this.props.store }
    })
  }

  handleTwitterLogin() {
    SafariView.isAvailable()
      .then(SafariView.show({
        url: 'https://github.com/naoufal'
      }))
      .catch(error => {
        // Fallback WebView code for iOS 8 and earlier
        Linking.openURL('https://api.twitter.com/oauth/authenticate?oauth_token=')
      });
  }

  rendering() {
    actions.rendering();
    this.forceUpdate()
  }

  render() {
    const {state, actions} = this.props;
    if (state.rendering) {
      return (
        <Image 
          source= {{uri: 'https://media.blueapron.com/assets/loader/pot-loader-6047abec2ec57c18d848f623c036f7fe80236dce689bb48279036c4f914d0c9e.gif'}}
          style = {styles.loadingGif}
        />
      )
    }
    return (
      <View style={[styles.container]}>
        <View style={[styles.navigation]} >
          <Nav
            changeNavigationCamera={this.changeNavigationCamera.bind(this)}
            changeToUserPage={this.changeToUserPage.bind(this)}
          />
        </View>
        <View style={styles.app} >
          <Image style={styles.welcomeImage} source={require('../public/snacktimewelcome.jpg')}/>
          <FacebookLogin />

          {/* Experimental twitter OAuth safari view controller 3-legged OAuth login */}
          <TouchableOpacity onPress={() => handleTwitterLogin()}>

          </TouchableOpacity>

        </View>
        { /* conditional camera / search bar render */
          state.showSearchBar
            ?
              (
                <View style={[styles.searchBarPictureFrame]} >
                  <SearchBar store={this.props.store}
                             navigator={this.props.navigator}
                             rendering={actions.rendering}
                             lagOut={actions.laggedOut}
                             isRendering={state.rendering}
                  />
                </View>
              )
            :
              (
                <TouchableHighlight style={[styles.buttonView]}
                                    onPress={this.changeNavigationCamera.bind(this)}
                >
                  <Image
                    style={[styles.takePicture]}
                    source={{uri: 'https://s3.amazonaws.com/features.ifttt.com/newsletter_images/2015_February/camera512x512+(1).png'}}
                  />
                </TouchableHighlight>
              )
        }
        <View style={{flexDirection: 'row'}}>
          <Switch
            onValueChange={actions.showSearchBar}
            style={styles.switch}
            value={state.showSearchBar}
          />
        </View>
      </View>
    );
  }
}

export default connect(state => ({
    state: state.app
  }),
  (dispatch) => ({
    actions: bindActionCreators(app.default, dispatch)
  })
)(App);

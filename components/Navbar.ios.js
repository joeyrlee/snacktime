import React, { Component } from 'react';
import {
  Linking,
  Alert,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from '../styles.ios.js';

export default class Nav extends Component {
  border(color) {
    return {
      borderColor: color,
      borderWidth: 5,
    }
  }

  //DRY click handler for social media deep linking
  shareToSocialMedia(deepLink, appName, storeURL) {
    //deep link into the provided app if installed
    Linking.canOpenURL(appName.toLowerCase() + '://').then(supported => {
      if (!supported) {
        Alert.alert(`You must install the ${appName} app in order to use this feature.`,
                    '',
                    [{text: `Install ${appName}`, onPress: () => Linking.openURL(storeURL)},
                     {text: 'Not Now'}]
        );
      //else direct user to the proper app store link
      } else {
        return Linking.openURL(deepLink);
      }
    }).catch(err => console.error('Error: ', err));
  }

  render() {
    return (
      <View style={[styles.navigation]}>
        <TouchableHighlight style={styles.glyphicon} onPress={this.props.changeToUserPage}>
          <Image source={{uri: 'https://cdn3.iconfinder.com/data/icons/glypho-free/64/home-128.png'}} style={styles.glyphicon} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.glyphicon}
          onPress={this.props.changeNavigationCamera}
        >
          <Image source={{uri: 'https://cdn4.iconfinder.com/data/icons/world-travel-guide/512/travel-05-512.png'}} style={styles.glyphicon} />
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.glyphicon}
          onPress={() => this.shareToSocialMedia('instagram://camera', 'Instagram', 'https://itunes.apple.com/us/app/instagram/id389801252?mt=8')}
        >
          <Image source={{uri: 'https://cdn3.iconfinder.com/data/icons/picons-social/57/78-instagram-512.png'}} style={styles.glyphicon} />
        </TouchableHighlight>
      </View>
    )
  }
}

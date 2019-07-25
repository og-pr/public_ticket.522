import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Styles from '../../common/style';
import * as CONSTANTS from '../../common/constants.js';

export default () => 
  <View style={Styles.header}>
    <Text style={Styles.text}>{CONSTANTS.PAGE_TITLE}</Text>
  </View>;
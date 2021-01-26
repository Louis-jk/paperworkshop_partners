import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Header from '../Header';

const Privacy = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <SafeAreaView style={styles.container}>
      <Header title={routeName} navigation={navigation} />
      <View>
        <Text>개인정보 처리방침</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Privacy;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {PropsWithChildren, useCallback} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';
import codePush from 'react-native-code-push';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {REACT_APP_APP_THEME} from '@env';

const isDarkMode = REACT_APP_APP_THEME === 'DARK';
let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const App = () => {
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleTestCrash = useCallback(() => {
    Crashes.generateTestCrash();
  }, []);

  const handleTestError = useCallback(() => {
    throw new Error('This is a test error!');
  }, []);

  const handleTestEventOne = useCallback(() => {
    Analytics.trackEvent('Track event one');
  }, []);

  const handleTestEventTwo = useCallback(() => {
    Analytics.trackEvent('Track event two', {property: 'property 1'});
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        />
        <Section title="Test Diagnostics">
          <Button title="Test crash app" onPress={handleTestCrash} />
          <View style={styles.sectionBtn}>
            <Button title="Test error" onPress={handleTestError} />
          </View>
        </Section>
        <Section title="Test analytics event">
          <Button title="Test event one" onPress={handleTestEventOne} />
          <View style={styles.sectionBtn}>
            <Button title="Test event two" onPress={handleTestEventTwo} />
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  sectionBtn: {
    marginTop: 10,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default codePush(codePushOptions)(App);

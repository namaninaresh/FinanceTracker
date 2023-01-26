import React from 'react';
import {StyleSheet, View, Text, ScrollView, RefreshControl} from 'react-native';
import Dashboard from '../components/molecules/Dashboard';
import Recent from '../components/molecules/Recent';
import AppLayout from '../layout/AppLayout';

const Home = props => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <AppLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <Dashboard />
          <Recent />
          <Dashboard />
          <Recent />
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;

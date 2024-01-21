import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Books from '../components/molecules/Books';
import AppLayout from '../layout/AppLayout';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../styles';
const Home = ({navigation}) => {
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
          <Books />
        </View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: colors.BLACK_3,
              borderRadius: 50,
            }}
            onPress={() => navigation.navigate('AddBook')}>
            <Icon name="plus-circle" size={30} color={colors.GREEN_DARK} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Home;

import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/atoms/Button';
import AppLayout from '../layout/AppLayout';
import {clearCache} from '../store/StoreAsync';
import {colors} from '../styles';

const items = [
  {
    title: 'Accounts',
    iconName: 'bank',
    navigation: 'Accounts',
  },
  /*{
    title: 'Cash',
    iconName: 'cash',
    navigation: 'Accounts',
  }, */
  {
    title: 'Debit Loans',
    iconName: 'account-cash',
    navigation: 'Loans',
  },
  {
    title: 'Credit Loans',
    iconName: 'cash-refund',
    navigation: 'Loans',
  },
  {
    title: 'Stats',
    iconName: 'chart-line',
    navigation: null,
  },
  {
    title: 'Bills',
    iconName: 'clipboard-text',
    navigation: 'Bills',
  },
  {
    title: 'All Transactions',
    iconName: 'bank-transfer',
    navigation: 'All Transactions',
  },
  {
    title: 'Settings',
    iconName: 'cog-outline',
    navigation: 'Settings',
  },
  {
    title: 'Clear Cache',
    iconName: 'delete-outline',
    onPress: clearCache,
    navigation: null,
  },
  {
    title: 'Logout',
    iconName: 'logout',
    navigation: null,
  },
];

const ProfileHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.userIconContainer}>
        <Image
          source={require('../assets/user.webp')}
          style={styles.userIcon}
        />
      </View>
      <View>
        <Text style={[styles.usertitle]}>Chinna Namani</Text>
        <Text style={styles.userdescription}>lobelychinna@</Text>
        <Button
          title={'Edit Profile'}
          style={{marginHorizontal: 0, marginVertical: 0}}
          onPress={() => navigation.navigate('EditProfile')}
          // onPress={() => navigation.navigate('Modal', {message: 'Success'})}
        />
        {/*<TouchableOpacity
      style={styles.editProfilebtn}
      onPress={() => {
        navigation.navigate('EditProfile');
      }}>
      <Text
        style={{
          color: colors.GREEN_DARK,
          fontWeight: '700',
        }}>
        Edit Profile
      </Text>
    </TouchableOpacity> */}
      </View>
    </View>
  );
};

const Profile = props => {
  const navigation = useNavigation();
  return (
    <AppLayout>
      <View style={styles.container}>
        {/* {<ProfileHeader />} */}
        <ScrollView
          contentContainerStyle={{
            width: '100%',
          }}>
          <View
            style={{
              borderRadius: 10,
              marginVertical: 10,
            }}>
            <View
              style={[styles.card, {flexDirection: 'column', width: '100%'}]}>
              {items.map((item, index) => (
                <TouchableOpacity
                  style={[styles.listItem]}
                  key={index}
                  onPress={
                    item.onPress
                      ? item.onPress
                      : () => {
                          item.navigation &&
                            navigation.navigate(item.navigation, {
                              page: item.title,
                            });
                        }
                  }>
                  <Icon color={colors.WHITE_2} name={item.iconName} size={20} />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Icon color={colors.WHITE_2} name="chevron-right" size={24} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 0,
    marginTop: 20,
  },
  editProfilebtn: {
    padding: 10,
    backgroundColor: 'rgba(131, 191, 110, 0.15)',
    // backgroundColor: '#307ecc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: colors.BLACK_4,

    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  userIconContainer: {
    alignItems: 'center',
    borderRadius: 60,
    height: 90,
    justifyContent: 'center',
    backgroundColor: colors.BLACK_2,
    width: 90,
    marginHorizontal: 10,
    marginRight: 20,
  },
  userIcon: {
    borderRadius: 50,
    height: 70,
    width: 70,
  },
  usertitle: {
    fontWeight: '800',
    color: colors.WHITE_2,
  },
  userdescription: {
    paddingVertical: 10,
    fontWeight: '300',
    letterSpacing: 1,
    color: colors.WHITE_3,
  },

  card: {
    padding: 10,

    borderRadius: 10,
    backgroundColor: colors.BLACK_4,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  cardTitle: {
    flex: 1,
    paddingVertical: 10,
    color: colors.WHITE_2,
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  separator: {
    marginVertical: 5,
    borderBottomWidth: 1,
    opacity: 0.4,
  },
});

export default Profile;

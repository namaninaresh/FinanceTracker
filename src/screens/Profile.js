import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
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
import {UserContext} from '../context/UserContext';
import AppLayout from '../layout/AppLayout';
import {clearCache} from '../store/StoreAsync';
import {colors} from '../styles';

const items = [
  {
    title: 'Emails',
    iconName: 'bank',
    navigation: 'EmailTransaction',
  },
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
      <View style={styles.userIconContainer}></View>
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
  const {profileData} = useContext(UserContext);

  return (
    <AppLayout>
      <View style={styles.headerContainer}>
        {/* Left Section (30%) */}
        <View style={styles.leftSection}>
          <Image
            source={require('../assets/user.png')} // Replace with your icon path
            style={styles.profileIcon}
          />
        </View>

        {/* Right Section (70%) */}
        <View style={styles.rightSection}>
          <Text style={[styles.usertitle]}>{profileData.username}</Text>
          <Text style={styles.userdescription}>{profileData.email}</Text>
          <Button
            title={'Edit Profile'}
            style={{marginHorizontal: 0, marginVertical: 0}}
            onPress={() => navigation.navigate('EditProfile', {title: 'Edit'})}
            // onPress={() => navigation.navigate('Modal', {message: 'Success'})}
          />
        </View>
      </View>

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
  leftSection: {
    flex: 0.32,
    //backgroundColor: '#3498db', // Left section background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSection: {
    flex: 0.68,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40, // To make it round
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emailText: {
    width: '100%',
    fontSize: 16,
    color: '#7f8c8d', // Light gray color
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
    width: '100%',
  },
  userIconContainer: {
    alignItems: 'center',
    borderRadius: 60,
    height: 90,
    justifyContent: 'center',
    backgroundColor: colors.BLACK_2,
    backgroundColor: 'yellow',
    width: 90,
    marginHorizontal: 10,
    maxWidth: '30%',
    marginRight: 20,
  },
  userIcon: {
    borderRadius: 50,
    height: 70,
    width: 70,
  },
  usertitle: {
    fontWeight: '800',
    fontSize: 18,
    color: colors.WHITE_2,
  },
  userdescription: {
    paddingVertical: 10,
    //letterSpacing: 1,
    fontSize: 12,
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

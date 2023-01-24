import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import AppLayout from '../layout/AppLayout';
import {Colors} from '../styles';

const items = [
  {
    title: 'Accounts',
    iconName: 'bank-plus',
    navigation: null,
  },
  {
    title: 'Cash',
    iconName: 'cash-multiple',
    navigation: null,
  },
  {
    title: 'Debit Loans',
    iconName: 'account-cash',
    navigation: null,
  },
  {
    title: 'Credit Loans',
    iconName: 'cash-refund',
    navigation: null,
  },
  {
    title: 'Stats',
    iconName: 'chart-line',
    navigation: null,
  },
  {
    title: 'All Transactions',
    iconName: 'bank-transfer',
    navigation: null,
  },
  {
    title: 'Settings',
    iconName: 'cog-outline',
    navigation: null,
  },
  {
    title: 'Clear Cache',
    iconName: 'delete-outline',
    navigation: null,
  },
  {
    title: 'Logout',
    iconName: 'logout',
    navigation: null,
  },
];

const Profile = props => {
  return (
    <AppLayout>
      <View style={styles.container}>
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
            <TouchableOpacity style={styles.editProfilebtn}>
              <Text style={{color: Colors.GREEN_DARK, fontWeight: '700'}}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            width: '100%',
          }}>
          <View
            style={{
              borderRadius: 10,
              marginHorizontal: 20,
              marginVertical: 10,
            }}>
            <View
              style={[styles.card, {flexDirection: 'column', width: '100%'}]}>
              {items.map((item, index) => (
                <TouchableOpacity style={[styles.listItem]} key={index}>
                  <Icon color={Colors.WHITE_2} name={item.iconName} size={20} />
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Icon color={Colors.WHITE_2} name="chevron-right" size={24} />
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
    backgroundColor: Colors.BLACK_4,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  userIconContainer: {
    alignItems: 'center',
    borderRadius: 60,
    height: 90,
    justifyContent: 'center',
    backgroundColor: Colors.BLACK_2,
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
    color: Colors.WHITE_2,
  },
  userdescription: {
    paddingVertical: 10,
    fontWeight: '300',
    letterSpacing: 1,
    color: Colors.WHITE_3,
  },

  card: {
    padding: 10,

    borderRadius: 10,
    backgroundColor: Colors.BLACK_4,
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
    color: Colors.WHITE_2,
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
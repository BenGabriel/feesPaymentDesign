import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../utils/colors';
import {heightRes, widthRes} from '../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import textStyle from '../utils/textStyle';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Profile = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.user);
  return (
    <View style={styles.container}>
      <Ionicons
        name="chevron-back-outline"
        size={widthRes(6)}
        onPress={() => navigation.goBack()}
      />
      <Image
        source={require('../images/unnlogo.png')}
        style={{
          width: widthRes(20),
          height: widthRes(20),
          alignSelf:'center',
          marginVertical: heightRes(3)
        }}
        resizeMode="contain"
      />
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.content}>
            <Text style={styles.contentText}>Full name</Text>
          </View>
          <Text style={styles.contentDetail}>
            {user.firstName} {user.lastName}
          </Text>
        </View>
        <View>
          <View style={styles.content}>
            <Text style={styles.contentText}>Reg No</Text>
          </View>
          <Text style={styles.contentDetail}>{user.regno}</Text>
        </View>
        <View>
          <View style={styles.content}>
            <Text style={styles.contentText}>Faculty</Text>
          </View>
          <Text style={styles.contentDetail}>Physical Science</Text>
        </View>
        <View>
          <View style={styles.content}>
            <Text style={styles.contentText}>Department</Text>
          </View>
          <Text style={styles.contentDetail}>{user.department}</Text>
        </View>
        <View>
          <View style={styles.content}>
            <Text style={styles.contentText}>Level</Text>
          </View>
          <Text style={styles.contentDetail}>{user.level}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: heightRes(2),
  },
  topText: {
    ...textStyle.defaultBoldLargeTitle,
    textAlign: 'center',
    marginVertical: heightRes(5),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 4,
    shadowOffset: {width: 2, height: 2},
    shadowColor: colors.black,
    shadowOpacity: 0.4,
    shadowRadius: 3,
    padding: heightRes(3),
  },
  content: {
    marginTop: heightRes(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentText: [
    textStyle.defaultRegularSubheadline,
  ],
  contentDetail: [textStyle.defaultBoldHeadline, {marginTop: heightRes(1)}],
});

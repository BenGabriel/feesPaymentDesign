import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../utils/colors';
import textStyle from '../utils/textStyle';
import {heightRes, widthRes} from '../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../redux/slice/user/userSlice';
import Button from '../components/Button';

const Home = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [years, setYears] = useState([]);

  useEffect(() => {
    const newYears = [...Array(user.years)].map((_, i) => `${i + 1}00`);
    setYears(newYears);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/unnlogo.png')}
        style={{
          width: widthRes(10),
          height: widthRes(10),
        }}
        resizeMode="contain"
      />
      <View style={styles.top}>
        <Text
          style={[textStyle.defaultBoldBody, {flex: 1}]}
          onPress={() => dispatch(logoutUser())}>
          Welcome {user?.firstName},
        </Text>
        <Ionicons
          name="person-circle-outline"
          size={widthRes(9)}
          color={colors.primary}
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      <View style={styles.contentContainer}>
        {years.length === 0
          ? null
          : years.map(t => (
              <View key={t} style={styles.content}>
                <Text
                  style={[
                    styles.contentText,
                    {opacity: parseInt(user?.level) < parseInt(t) ? 0.5 : 1},
                  ]}>
                  {t} Level
                </Text>
                <View style={{width: '35%'}}>
                  <Button
                    title={
                      parseInt(user?.level) <= parseInt(t) ? 'Generate' : 'View'
                    }
                    containerStyle={{borderRadius: 6}}
                    disable={parseInt(user?.level) < parseInt(t)}
                    click={() =>
                      parseInt(user?.level) <= parseInt(t)
                        ? navigation.navigate('GenerateInvoice', {level: t})
                        : navigation.navigate('ViewPayment', {level: t})
                    }
                  />
                </View>
              </View>
            ))}
      </View>
      <View style={styles.info}>
        <Text
          style={[textStyle.defaultRegularFootnote, {color: colors.primary}]}>
          You can view and print school fees receipt of past years
        </Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: heightRes(2.5),
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: heightRes(1.8),
  },

  contentContainer: {
    marginTop: heightRes(5),
    borderWidth: 1,
    width: '100%',
    borderBottomWidth: 0,
    borderColor: colors.gray,
  },

  content: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: heightRes(2),
    paddingVertical: heightRes(1),
    flexDirection: 'row',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    borderColor: colors.gray,
  },
  contentText: {
    ...textStyle.defaultBoldSubheadline,
  },
  info: {
    backgroundColor: '#DBFFF2',
    alignItems: 'center',
    padding: heightRes(1.7),
    borderRadius: 10,
    marginTop: heightRes(7),
  },
});

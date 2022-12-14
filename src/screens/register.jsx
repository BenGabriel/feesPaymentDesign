import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import colors from '../utils/colors';
import Input from '../components/Input';
import {heightRes, widthRes} from '../utils/responsive';
import Button from '../components/Button';
import textStyle from '../utils/textStyle';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch} from 'react-redux';
import {saveUser} from '../redux/slice/user/userSlice';
const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [departmentError, setDepartmentError] = useState('');
  const [openLevel, setOpenLevel] = useState(false);
  const [level, setLevel] = useState(null);
  const [levelError, setLevelError] = useState('');
  const [years, setYears] = useState(0);

  const [items, setItems] = useState([
    {label: 'Computer Science', value: 'Computer Science', years: 4},
    {label: 'Geology', value: 'Geology', years: 5},
    {label: 'Mathematics', value: 'Mathematics', years: 4},
    {label: 'Physics and Astronomy', value: 'Physics and Astronomy', years: 4},
    {
      label: 'Pure and Industrial Chemistry',
      value: 'Pure and Industrial Chemistry',
      years: 4,
    },
    {label: 'Statistics', value: 'Statistics', years: 4},
    {
      label: 'Science Laboratory Technology',
      value: 'Science Laboratory Technology',
      years: 5,
    },
  ]);

  const [levels, setLevels] = useState([{label: '100', value: '100'}]);

  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    regno: '',
    password: '',
  });

  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    regno: '',
    password: '',
  });

  const onChange = useCallback(
    (name, value) => {
      setError(prev => ({...prev, [name]: ''}));
      setDetails(prev => ({...prev, [name]: value}));
    },
    [details],
  );

  const errorHandler = useCallback(
    (name, value) => {
      setError(prev => ({...prev, [name]: value}));
    },
    [details],
  );

  useEffect(() => {
    setLevels(
      [...Array(years)].map((_, i) => ({
        label: `${i + 1}00`,
        value: `${i + 1}00`,
      })),
    );
  }, [years]);

  const handleSubmit = () => {
    if (details.firstName.length < 2) {
      return errorHandler('firstName', 'Enter a valid first name');
    }
    if (details.lastName.length < 2) {
      return errorHandler('lastName', 'Enter a valid last name');
    }
    if (details.regno.length < 11) {
      return errorHandler('regno', 'Enter a valid reg number');
    }
    if (value === null) {
      return setDepartmentError('Select your Department');
    }
    if (level === null) {
      return setLevelError('Select your level');
    }
    if (details.password.length < 6) {
      return errorHandler(
        'password',
        'Password must be more than 6 characters',
      );
    }
    const data = {
      firstName: details.firstName,
      lastName: details.lastName,
      regno: details.regno,
      department: value,
      years,
      level,
      password: details.password,
    };

    dispatch(saveUser(data));
    navigation.replace('Login');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}
      showsVerticalScrollIndicator={false}>
      <Image
        source={require('../images/unnlogo.png')}
        style={{
          width: widthRes(26),
          height: widthRes(26),
        }}
        resizeMode="contain"
      />
      <View style={{width: '100%'}}>
        <Text style={styles.text}>First Name</Text>
        <Input
          error={error.firstName}
          onChange={text => onChange('firstName', text)}
        />
        <Text style={styles.text}>Last Name</Text>
        <Input
          error={error.lastName}
          onChange={text => onChange('lastName', text)}
        />
        <Text style={styles.text}>Reg No.</Text>
        <Input
          error={error.regno}
          onChange={text => onChange('regno', text)}
          maxlength={11}
        />

        <Text style={styles.text}>Department</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={value => {
            setOpen(value), setDepartmentError('');
          }}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select your Department"
          style={{
            borderWidth: 1,
            borderColor: colors.gray,
          }}
          dropDownDirection="TOP"
          flatListProps={{
            nestedScrollEnabled: true,
          }}
          onSelectItem={item => setYears(item.years)}
        />
        {departmentError && <Text style={styles.error}>{departmentError}</Text>}
        <Text style={styles.text}>Level</Text>
        <DropDownPicker
          open={openLevel}
          value={level}
          items={levels}
          setOpen={value => {
            setOpenLevel(value), setLevelError('');
          }}
          setValue={setLevel}
          setItems={setLevels}
          placeholder="Select your level"
          style={{
            borderWidth: 1,
            borderColor: colors.gray,
          }}
          dropDownDirection="TOP"
          flatListProps={{
            nestedScrollEnabled: true,
          }}
        />

        {levelError && <Text style={styles.error}>{levelError}</Text>}
        <Text style={styles.text}>Password</Text>
        <Input
          error={error.password}
          onChange={text => onChange('password', text)}
          secure
        />
        <Text
          style={{
            textAlign: 'right',
            ...textStyle.defaultRegularFootnote,
            marginTop: heightRes(1),
          }}>
          Already have an account?{' '}
          <Text
            style={{color: colors.primary}}
            onPress={() => navigation.goBack()}>
            Sign In
          </Text>
        </Text>
      </View>
      <Button
        title="Register"
        containerStyle={{
          marginVertical: heightRes(5),
        }}
        click={handleSubmit}
      />
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.white,
    padding: heightRes(3),
  },
  text: {
    ...textStyle.defaultBoldSubheadline,
    marginTop: heightRes(2),
    marginBottom: heightRes(0.7),
  },
  error: {
    ...textStyle.defaultRegularFootnote,
    color: colors.red,
    marginTop: 5,
  },
});

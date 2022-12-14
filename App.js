import {SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/login';
import colors from './src/utils/colors';
import Register from './src/screens/register';
import store, {persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Home from './src/screens/home';
import Profile from './src/screens/profile';
import ViewPayment from './src/screens/viewPayment';
import GenerateInvoice from './src/screens/generateInvoice';

const {Navigator, Screen} = createStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
            <Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Screen component={Login} name="Login" />
              <Screen component={Register} name="Register" />
              <Screen component={Home} name="Home" />
              <Screen component={ViewPayment} name="ViewPayment" />
              <Screen component={GenerateInvoice} name="GenerateInvoice" />
              <Screen component={Profile} name="Profile" />
            </Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

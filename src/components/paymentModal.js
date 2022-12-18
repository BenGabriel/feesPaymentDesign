import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {heightRes, widthRes} from '../utils/responsive';
import colors from '../utils/colors';
import Button from './Button';
import textStyle from '../utils/textStyle';
import Input from './Input';
import Ionicons from 'react-native-vector-icons/Ionicons';
const PaymentModal = ({visible, click, close}) => {
  const [value, setValue] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');

  const disable = Boolean(
    value.length < 12 || cvv.length < 3 || expiry.length < 4,
  );
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: heightRes(1),
        }}>
        <View
          style={{
            width: '100%',
            backgroundColor: colors.white,
            borderRadius: 20,
            padding: heightRes(3),
          }}>
          <Ionicons
            name="close"
            size={widthRes(6)}
            onPress={close}
            style={{alignSelf: 'flex-end', marginBottom: 10}}
          />
          <Text
            style={[
              textStyle.defaultBoldTitle3,
              {marginBottom: heightRes(2), textAlign: 'center'},
            ]}>
            Enter Your card details
          </Text>
          <Text
            style={[
              textStyle.defaultRegularFootnote,
              {marginBottom: heightRes(2)},
            ]}>
            Card number
          </Text>
          <Input placeholder="5555****" onChange={setValue} maxlength={16} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{width: '30%'}}>
              <Text
                style={[
                  textStyle.defaultRegularFootnote,
                  {marginVertical: heightRes(1), alignSelf: 'flex-start'},
                ]}>
                Expiry date
              </Text>
              <Input placeholder="0231" onChange={setExpiry} maxlength={4}/>
            </View>
            <View style={{width: '30%'}}>
              <Text
                style={[
                  textStyle.defaultRegularFootnote,
                  {marginVertical: heightRes(1), alignSelf: 'flex-start'},
                ]}>
                CVV
              </Text>
              <Input placeholder="123" onChange={setCvv} maxlength={3} />
            </View>
          </View>
          <Button
            title="Pay"
            containerStyle={{marginTop: heightRes(2)}}
            click={click}
            disable={disable}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({});

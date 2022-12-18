import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../utils/colors';
import {heightRes, widthRes} from '../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import textStyle from '../utils/textStyle';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import RRRModal from '../components/rrrModal';
import {saveRRR, updateLevel} from '../redux/slice/user/userSlice';
import PaymentModal from '../components/paymentModal';

const GenerateInvoice = ({
  route: {
    params: {level},
  },
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user, rrr} = useSelector(state => state.user);
  const [visible, setVisible] = useState(false);
  const [payVisible, setPayVisible] = useState(false);
  const [rrrValue, setRRRValue] = useState(rrr);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setVisible(false);
    setPayVisible(true);
  };

  const generate = () => {
    const number = Math.floor(Math.random() * 123456789123);
    setRRRValue(`${number}`);
    dispatch(saveRRR(`${number}`));
    setVisible(true);
  };

  const close = () => {
    setModal(false);
    navigation.replace('Home');
  };

  const handlePayWithCard = () => {
    setPayVisible(false);
    setLoading(true);
    setModal(true);
    const newLevel = parseInt(user?.level) + 100;
    dispatch(updateLevel(`${newLevel}`));

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Ionicons
        name="chevron-back-outline"
        size={widthRes(6)}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={[textStyle.defaultRegularFootnote]}>
          University of Nigeria Nsukka
        </Text>
        <Text
          style={[
            textStyle.defaultBoldFootnote,
            {marginVertical: heightRes(1)},
          ]}>
          SCHOOL FEE RECEIPT
        </Text>
        <Image
          source={require('../images/unnlogo.png')}
          style={{
            width: widthRes(10),
            height: widthRes(10),
          }}
          resizeMode="contain"
        />
        <View style={styles.ItemContainer}>
          <View style={styles.item}>
            <Text style={styles.listText}>Student Name</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Reg Number</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>{user?.regno}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Department</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>{user?.department}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Level</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>{level}</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>FEE</Text>
            <View
              style={[
                styles.leftItemContainer,
                {paddingVertical: heightRes(2)},
              ]}>
              <Text style={styles.itemText}>AMOUNT</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Faculty Dues</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>500</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>ICT</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>3700</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>ID Card</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>500</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Exam Fee</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>5000</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Dev Fee</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>15000</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Course Reg</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>500</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Health Fee</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>2000</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Internet Fee</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>8000</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>Library Fee</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>1000</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.listText}>SUG</Text>
            <View style={styles.leftItemContainer}>
              <Text style={styles.itemText}>800</Text>
            </View>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Total</Text>
            <View
              style={[
                styles.leftItemContainer,
                {paddingVertical: heightRes(2)},
              ]}>
              <Text style={styles.itemText}>₦37000</Text>
            </View>
          </View>
        </View>
      </View>
      <Button
        title={rrr ? 'Pay' : 'Generate Invoice'}
        containerStyle={{marginVertical: heightRes(3)}}
        click={() => (rrr ? setVisible(true) : generate())}
      />
      <RRRModal
        visible={visible}
        click={handleClick}
        rrrValue={rrrValue}
        close={() => setVisible(false)}
      />
      <PaymentModal
        visible={payVisible}
        click={handlePayWithCard}
        close={() => setPayVisible(false)}
      />
      <Modal visible={modal} style={{flex: 1}}>
        {loading ? (
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              animating={loading}
              color={colors.primary}
              size={widthRes(20)}
            />
          </View>
        ) : (
          <View style={styles.modalContent}>
            <Ionicons
              name="checkmark-circle"
              color="green"
              size={widthRes(20)}
              style={{marginVertical: heightRes(1)}}
            />
            <Text style={textStyle.defaultBoldHeadline}>
              Payment Successful
            </Text>
            <Text style={textStyle.defaultRegularBody}>
              you have paid your school fees for {level} level
            </Text>
            <Button
              title="Proceed"
              click={close}
              containerStyle={{
                width: '80%',
                marginTop: heightRes(4),
              }}
            />
          </View>
        )}
      </Modal>
    </ScrollView>
  );
};

export default GenerateInvoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: heightRes(1.5),
  },
  content: {
    flex: 1,
    marginVertical: heightRes(1),
    alignItems: 'center',
    borderWidth: 0.5,
    paddingTop: heightRes(3),
  },
  ItemContainer: {
    borderTopWidth: 0.5,
    width: '100%',
    marginTop: heightRes(1),
    flex: 1,
  },
  leftItemContainer: {
    borderLeftWidth: 0.7,
    padding: heightRes(0.6),
    width: '65%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.7,
    paddingHorizontal: heightRes(0.7),
  },
  itemText: [
    textStyle.defaultBoldFootnote,
    {
      textAlign: 'left',
    },
  ],
  listText: textStyle.defaultRegularFootnote,
  modalContent: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

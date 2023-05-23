import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, { useContext, useState } from 'react';
import CustomInput from '../../components/customInput/Custominput';
import { useForm } from 'react-hook-form';
import CustomBtn from '../../components/customBtn/CustomBtn';
import { Colors } from '../../constants/Colors';
import { Box, CheckIcon, Select } from 'native-base';
import { Platform } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { AuthContext } from '../../context/AuthProvider';

const AddCoupons = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [date, setDate] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const store = authCtx.store;
  const storeId = store._id;
  const handleValueChange = (value) => {
    setSelectedValue(value);
  };
  const handleChange = (proposDate) => {
    setDate(proposDate);
    console.log(proposDate);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${baseUrl}/vouchers/addVoucher/${storeId}`,
        data,
        {
          headers: {
            'x-access-token': token,
          },
        }
      );

      Alert.alert('Success', 'Coupon created successfully');

      console.log(response.data);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating the coupon');

      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={{ marginVertical: '30%' }}>
        <Text style={styles.title}>Ajouter un coupon</Text>

        <View contentContainerStyle={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom du coupon</Text>
            <CustomInput
              name="name_V"
              control={control}
              rules={{ required: 'Le nom du coupon est requis' }}
              placeHolder="Nom du coupon"
              iconName="tag"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <CustomInput
              name="description"
              control={control}
              rules={{ required: 'La description est requise' }}
              placeHolder="Description"
              iconName="info"
              multiline
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date de validité</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerButtonText}>
                {selectedDate
                  ? selectedDate.toLocaleDateString()
                  : 'Date de validité'}
              </Text>
            </TouchableOpacity>
            <Modal
              visible={showDatePicker}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setShowDatePicker(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <DatePicker
                    mode="calendar"
                    minDate="1940-01-01"
                    date={date}
                    onDateChange={handleChange}
                    customStyles={{
                      dateText: {
                        fontSize: 18,
                        color: '#000',
                      },
                      placeholderText: {
                        fontSize: 18,
                        color: '#c4c4c4',
                      },
                    }}
                  />

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowDatePicker(false)}
                  >
                    <Text style={styles.closeButtonText}>Fermer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '4%',
            }}
          >
            <Text style={styles.label}>Nombre</Text>
            <CustomInput
              name="available_vouchers"
              control={control}
              rules={{
                required: 'Le nombre de coupons disponibles est requis',
              }}
              placeHolder="Nombre"
              iconName="copy"
              keyboardType="numeric"
              type="THERD"
            />
            <Text style={styles.label}>Remise %</Text>
            <Box>
              <Select
                selectedValue={selectedValue}
                onValueChange={handleValueChange}
                placeholder=" Remie %"
                style={styles.select}
                textStyle={styles.selectText}
                _selectedItem={{
                  bg: 'danger.50',
                  endIcon: <CheckIcon size="5" />,
                }}
                colorScheme="danger"
              >
                <Select.Item label="5%" value="5" />
                <Select.Item label="10%" value="10" />
                <Select.Item label="20%" value="20" />
                <Select.Item label="30%" value="30" />
                <Select.Item label="40%" value="40" />
              </Select>
            </Box>
          </View>
        </View>
        <View style={{ marginTop: '10%', alignItems: 'center' }}>
          <CustomBtn
            style={styles.scanAgainBtn}
            text={'Ajouter'}
            onPress={handleSubmit(onSubmit)}
            type="REDBTN"
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#FBF5F5',

    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {},
  inputContainer: {
    marginVertical: 10,
    width: '80%',
  },
  select: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  selectText: {
    fontSize: 16,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  datePickerButtonText: {
    fontSize: 18,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
  },
});

export default AddCoupons;

import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { Box, CheckIcon, Select } from 'native-base';
import { Colors } from '../../constants/Colors';
import DatePicker, {
  getFormatedDate,
  getToday,
} from 'react-native-modern-datepicker';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { AuthContext } from '../../context/AuthProvider';
import CustomInput from '../../components/customInput/Custominput';
import CustomBtn from '../../components/customBtn/CustomBtn';
import {
  SpeedDialComponent,
  SpeedDialContent,
} from '../../components/SpeedDeal/SpeedDeal';

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
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
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

  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 4),
    'YYYY/MM/DD'
  );
  const showAlert = () => {
    Alert.alert(
      'Champs incomplets',
      'Veuillez remplir tous les champs du formulaire',
      [{ text: 'OK', onPress: () => console.log('Alerte fermée') }],
      { cancelable: false }
    );
  };
  const onSubmit = async (data) => {
    if (
      !data.name_V ||
      !data.description ||
      !date ||
      !data.available_vouchers ||
      !selectedValue
    ) {
      showAlert();
      return;
    }

    try {
      const requestData = {
        ...data,
        validity_date: date,
        discount: selectedValue,
      };

      const response = await axios.post(
        `${baseUrl}/vouchers/addVoucher/${storeId}`,
        requestData,
        {
          headers: {
            'x-access-token': token,
          },
        }
      );

      Alert.alert('Success', 'Coupon Ajouté avec succès');

      console.log(response.data);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating the coupon');

      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.formContainer}>
        <Text style={styles.title}>Ajouter un coupon</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nom du coupon</Text>
          <CustomInput
            name="name_V"
            control={control}
            placeHolder="Nom du coupon"
            iconName="tag"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <CustomInput
            name="description"
            control={control}
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
              {date ? date : 'Date de validité'}
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
                  date={date}
                  minimumDate={startDate}
                  onDateChange={handleChange}
                  name="validity_date"
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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>
          <CustomInput
            name="available_vouchers"
            control={control}
            placeHolder="Nombre"
            iconName="copy"
            keyboardType="numeric"
            type="THERD"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Remise %</Text>
          <Box>
            <Select
              selectedValue={selectedValue}
              minWidth="40"
              onValueChange={handleValueChange}
              placeholder="Remise %"
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

        <View style={styles.buttonContainer}>
          <CustomBtn
            style={styles.scanAgainBtn}
            text={'Ajouter'}
            onPress={handleSubmit(onSubmit)}
            type="REDBTN"
          />
        </View>
      </View>

      <SpeedDialComponent />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '30%',
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
  inputContainer: {
    marginVertical: 10,
    width: '80%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4%',
  },
  select: {
    flexDirection: 'row',

    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 22,
    paddingVertical: 18,
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
  buttonContainer: {
    marginTop: '10%',
    alignItems: 'center',
  },
});

export default AddCoupons;

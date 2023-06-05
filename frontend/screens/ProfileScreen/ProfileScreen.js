import React, { useContext, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { useForm } from 'react-hook-form';

import { EMAIL_REGEX, PWD_REGEX } from '../../config/config';

import Custominput from '../../components/customInput/Custominput';
import CustomBtn from '../../components/customBtn/CustomBtn';
import { Colors } from '../../constants/Colors';
import { baseUrl } from '../../config/config';
import axios from 'axios';

import { AuthContext } from '../../context/AuthProvider';
const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('1234567890');
  const [isEditingData, setIsEditingData] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const user = authCtx.user;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const pwd = watch('password');

  const passwordInputRef = useRef(null);
  const confirmPwdInputRef = useRef(null);

  const handleEditData = () => {
    setIsEditingData(true);
  };

  const handleCancelEdit = () => {
    setIsEditingData(false);
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const handleCancelPasswordEdit = () => {
    setIsEditingPassword(false);

    if (passwordInputRef.current && confirmPwdInputRef.current) {
      passwordInputRef.current.clear();
      confirmPwdInputRef.current.clear();
    }
  };

  const handleSavePassword = (data) => {
    const config = {
      headers: {
        'x-access-token': authCtx.token,
      },
    };
    axios
      .put(
        `${baseUrl}/users/${user._id}/password`,
        {
          newPassword: data.password,
          confirmPassword: data.confirmPwd,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        setIsEditingPassword(false);

        Alert.alert('Succès', 'Le mot de passe a été modifié avec succès');
      })
      .catch((error) => {
        console.log(error.response.data);
        Alert.alert(
          'Erreur',
          "Une erreur s'est produite lors de la modification du mot de passe"
        );
      });
  };
  const handleSaveData = (data) => {
    const config = {
      headers: {
        'x-access-token': authCtx.token,
      },
    };
    axios
      .put(
        `${baseUrl}/users/${user._id}/update`,
        {
          email: data.email,
          telephone: data.phone,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        setIsEditingData(false);

        Alert.alert('Succès', 'Les  vos donnée  on a été modifié avec succès');
      })
      .catch((error) => {
        console.log(error.response.data);
        Alert.alert(
          'Erreur',
          "Une erreur s'est produite lors de la modification des vos donnée"
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.profileImage}
          source={require('../../assets/image/avatar.png')}
        />
      </View>
      <View style={styles.contentContainer}>
        {isEditingPassword ? (
          <>
            <Text style={styles.label}>Nouveaux Mot de Passe:</Text>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Custominput
                ref={passwordInputRef}
                name="password"
                control={control}
                rules={{
                  required: 'Le mot de passe est requis',
                  minLength: {
                    value: 8,
                    message: 'Le mot de passe doit avoir au moins 8 caractères',
                  },
                  pattern: {
                    value: PWD_REGEX,
                    message:
                      'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre',
                  },
                }}
                placeHolder="Mot de passe"
                secureTextEntry={true}
                iconName="lock"
                type="SEC"
              />
            </View>
            <Text style={styles.label}>Confirm Password:</Text>
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Custominput
                ref={confirmPwdInputRef}
                name="confirmPwd"
                control={control}
                rules={{
                  validate: (value) =>
                    value === pwd || 'Le mot de passe ne correspond pas',
                }}
                placeHolder="Confirmer le mot de passe"
                secureTextEntry={true}
                iconName="lock"
                type="SEC"
              />
            </View>
            <View style={styles.buttonContainer}>
              <CustomBtn
                text="Modifier"
                onPress={handleSubmit(handleSavePassword)}
                type="WHITE3"
                nameIcon="pencil"
                sizeIcon={20}
                colorIcon="black"
              />
              <CustomBtn
                text="Annuler"
                onPress={handleCancelPasswordEdit}
                type="WHITE3"
                nameIcon="close"
                sizeIcon={20}
                colorIcon="black"
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.infoContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.text}>
                  {user.nom},{user.prenom}
                </Text>
              </View>
            </View>
            {isEditingData ? (
              <>
                <View style={styles.infoContainer}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <Custominput
                      name="email"
                      control={control}
                      rules={{
                        pattern: {
                          value: EMAIL_REGEX,
                          message: "L'email est invalide",
                        },
                      }}
                      placeHolder="Email"
                      iconName="email"
                      type="THERD"
                      defaultValue={email}
                    />
                  </View>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Phone:</Text>
                    <Custominput
                      name="phone"
                      control={control}
                      rules={{
                        minLength: {
                          value: 8,
                          message: 'Numéro de télephone inccorecte',
                        },
                      }}
                      placeHolder="Numéro de télephone"
                      iconName="phone"
                      type="THERD"
                      defaultValue={phone}
                    />
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <CustomBtn
                    text="Modifier"
                    onPress={handleSubmit(handleSaveData)}
                    type="WHITE3"
                    nameIcon="pencil"
                    sizeIcon={20}
                    colorIcon="black"
                  />
                  <CustomBtn
                    text="Annuler"
                    onPress={handleCancelEdit}
                    type="WHITE3"
                    nameIcon="close"
                    sizeIcon={20}
                    colorIcon="black"
                  />
                </View>
              </>
            ) : (
              <>
                <View style={styles.infoContainer}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.text}>{user.email}</Text>
                  </View>
                </View>
                <View style={styles.infoContainer}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Phone:</Text>
                    <Text style={styles.text}>{user.telephone}</Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <CustomBtn
                  text="Modifier mot de passe"
                  onPress={handleEditPassword}
                  type="REDBTN3"
                  nameIcon="lock-closed-outline"
                  sizeIcon={20}
                  colorIcon={Colors.white}
                />
                <View style={styles.divider} />
                <CustomBtn
                  text="Modifier donnée"
                  onPress={handleEditData}
                  type="WHITE3"
                  nameIcon="pencil"
                  sizeIcon={20}
                  colorIcon="black"
                />
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#FBF5F5',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'lightgray',
    marginVertical: 10,
  },
  contentContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: Colors.white,
    paddingHorizontal: '10%',
    paddingVertical: height * 0.05,
    marginTop: '4%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: 'lightgray',
  },
  profileImage: {
    width: 100,
    height: 120,
    borderRadius: 40,
  },
  infoContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 5,
    fontFamily: 'poppins',
    color: Colors.darkred,
  },
  text: {
    fontSize: 18,
    fontFamily: 'inter',
    fontWeight: '600',
  },
  input: {
    height: 80,

    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  editButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

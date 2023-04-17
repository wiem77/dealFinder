import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomBtn from '../../components/customBtn/CustomBtn'


const WelcomeScreen = () => {
  return (
    <View>
     <CustomBtn   text={'Se Connecter '}
              onPress={() => console.log('Guest ')}
              />
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../config/config';

const ReservationScreen = () => {
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId = '645aa4b1ec2213962cb67c39';
  const [reservationData, setReservationData] = useState();
  useEffect(() => {
    let isMounted = true;

    const fetchVoucherData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/reservation/userReservation/${userId}`
        );
        console.log(response.data);

        const reservationObject = response.data.reduce((acc, cur) => {
          acc[cur._id] = {
            ...cur,
            user: cur.user.reduce((subAcc, subCur) => {
              subAcc[subCur._id] = subCur;
              return subAcc;
            }, {}),
            voucher: cur.voucher.reduce((subAcc, subCur) => {
              vouAcc[vouCur._id] = vouCur;
              return vouAcc;
            }, {}),
          };
          return acc;
        }, {});
        setReservationData(reservationObject);
        console.log('reservationObject', reservationObject);
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setHasFetchedData(true);
        }
      }
    };

    if (!hasFetchedData) {
      fetchVoucherData();
    }

    return () => {
      isMounted = false;
    };
  }, [hasFetchedData]);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default ReservationScreen;

const styles = StyleSheet.create({});

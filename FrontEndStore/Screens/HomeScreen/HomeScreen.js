import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import { ListItem, SearchBar, Button, Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { AuthContext } from '../../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../constants/Colors';
import {
  SpeedDialComponent,
  SpeedDialContent,
} from '../../components/SpeedDeal/SpeedDeal';
const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(true);
  const authCtx = useContext(AuthContext);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const token = authCtx.token;
  const store = authCtx.store;
  const id = store?._id;
 
  const fetchData = async () => {
    try {
      console.log(id);
      const response = await axios.get(`${baseUrl}/vouchers/byStoreId/${id}`);
      const vouchers = response.data.vouchers;
      setFilteredData(vouchers);
      setIsLoading(false);
      console.log('vouchers', vouchers);
      await AsyncStorage.setItem('vouchers', JSON.stringify(vouchers));
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleRefresh = async () => {
    setIsLoading(true);
    await fetchData();
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredItems = filteredData.filter(
      (item) =>
        item.name_V.toLowerCase().includes(text.toLowerCase().trim()) ||
        item.discount.toString().includes(text)
    );
    setFilteredData(filteredItems);
  };

  const handleDelete = async (id) => {
    console.log(id);

    Alert.alert(
      'Confirmation',
      'Êtes-vous sûr de vouloir supprimer ce voucher ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              const config = {
                headers: {
                  'x-access-token': token,
                },
              };

              await axios.delete(
                `${baseUrl}/vouchers/deleteVoucher/${id}`,
                config
              );

              const updatedData = filteredData.filter((item) => item.id !== id);
              setFilteredData(updatedData);
              await AsyncStorage.setItem(
                'vouchers',
                JSON.stringify(updatedData)
              );

              Alert.alert('Succès', 'Le voucher a été supprimé avec succès.');
            } catch (error) {
              console.log(error);

              Alert.alert(
                'Erreur',
                "Une erreur s'est produite lors de la suppression du voucher."
              );
            }
          },
        },
      ]
    );
  };
  const handleFilter = () => {
    if (showAll) {
      const filteredItems = filteredData.filter((item) => item.is_available);
      setFilteredData(filteredItems);
    } else {
      fetchData();
    }
    setShowAll(!showAll);
  };

  const renderItem = ({ item }) => {
    let discountColor;
    let availabilityColor;
    let availabilityIcon;
    if (item.is_available) {
      if (item.discount === 10) discountColor = '#FFC107';
      else if (item.discount === 20) discountColor = '#FF5722';
      else if (item.discount === 30) discountColor = '#E91E63';
      else if (item.discount === 40) discountColor = '#9C27B0';
      else if (item.discount === 25) discountColor = '#9C27B0';
      else if (item.discount === 15) discountColor = '#00C853';
      availabilityColor = item.available_vouchers > 0 ? '#000000' : '#808080';
      availabilityIcon = (
        <Icon name="check-circle" type="font-awesome" color="#00C853" />
      );
    } else {
      discountColor = '#808080';
      availabilityColor = '#808080';
      availabilityIcon = (
        <Icon name="times-circle" type="font-awesome" color="#F44336" />
      );
    }

    const swipeoutBtns = [
      {
        text: 'Supprimer',
        backgroundColor: '#FF0000',
        onPress: () => handleDelete(item._id),
      },
    ];

    return (
      <Swipeout right={swipeoutBtns} autoClose={true}>
        <ListItem bottomDivider>
          <View style={styles.discountContainer}>
            <Text
              style={[
                styles.discountText,
                {
                  backgroundColor: discountColor,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 4,
                  marginBottom: 8,
                },
              ]}
            >
              {item.discount}%
            </Text>
          </View>
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontFamily: 'inter',
                fontSize: 20,
                color: Colors.darkred,
              }}
            >
              {item.name_V}
            </ListItem.Title>
            <View style={styles.itemDetailsContainer}>
              <View></View>
              <View
                style={[
                  styles.itemDetailText,
                  {
                    color: availabilityColor,
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginRight: 16,
                  },
                ]}
              >
                <Text style={styles.labelText}> Disponibles :</Text>
                <Text style={styles.infoText}> {item.available_vouchers}</Text>
                <Text style={{ marginTop: -3 }}> {availabilityIcon}</Text>
              </View>
            </View>
            <View style={styles.itemDetailText}>
              <Text style={styles.labelText}> Date d'éxpirastion :</Text>
              <Text style={styles.infoText}>
                {item.validity_date.slice(0, 10)}
              </Text>
            </View>
            {/* <ListItem.Subtitle
              style={{ fontFamily: 'inter', color: Colors.text, fontSize: 15 }}
            >
              {item.description}
            </ListItem.Subtitle> */}
          </ListItem.Content>
        </ListItem>
      </Swipeout>
    );
  };

  const renderEmptyResult = () => (
    <View style={styles.emptyResultContainer}>
      <Text style={styles.emptyResultText}>
        {showAll
          ? 'Aucun résultat trouvé'
          : "Il n'y a pas de coupon non valides"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Icon
            name="refresh"
            type="material-community"
            size={24}
            onPress={handleRefresh}
            containerStyle={styles.refreshIconContainer}
          />
          <Text style={styles.heading}>Coupons</Text>
        </View>
      </SafeAreaView>
      <SearchBar
        placeholder="Rechercher par nom ou remise"
        value={searchText}
        onChangeText={handleSearch}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />
      <View style={styles.filterContainer}>
        <Icon
          name={showAll ? 'filter' : 'filter-remove'}
          type="material-community"
          size={24}
          onPress={handleFilter}
          containerStyle={styles.filterIconContainer}
        />
        <Text style={styles.filterText}>
          {showAll
            ? 'Filtrer les coupons valides'
            : 'Afficher tous les coupons'}
        </Text>
      </View>
      {isLoading ? (
        <Text>Chargement en cours...</Text>
      ) : filteredData.length === 0 ? (
        renderEmptyResult()
      ) : (
        <>
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </>
      )}
      <SpeedDialComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FBF5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  heading: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  refreshIconContainer: {
    marginLeft: -8,
  },
  filterButtonContainer: {
    marginLeft: 8,
  },
  filterButton: {
    backgroundColor: '#FFC107',
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 16,
  },
  searchBarInputContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  discountContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 8,
  },
  discountText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  itemDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Ajout de cette ligne
    marginTop: 3,
  },

  itemDetailText: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  labelText: { fontSize: 18, fontFamily: 'inter', color: Colors.black },
  infoText: { fontSize: 18, fontFamily: 'inter', color: Colors.text },
  emptyResultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyResultText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
  },
  filterIconContainer: {
    marginRight: 8,
  },
  filterText: {
    fontSize: 16,
    fontFamily: 'inter',
  },
});

export default HomeScreen;

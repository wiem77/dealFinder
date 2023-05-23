import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ListItem, SearchBar, Button } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import axios from 'axios';
import { baseUrl } from '../../config/config';
import { AuthContext } from '../../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const store = authCtx.store;
  const id = store._id;
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

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredItems = filteredData.filter(
      (item) =>
        item.name_V.toLowerCase().includes(text.toLowerCase()) ||
        item.validity_date.includes(text)
    );
    setFilteredData(filteredItems);
  };

  const handleDelete = async (id) => {
    const updatedData = filteredData.filter((item) => item.id !== id);
    setFilteredData(updatedData);
  
    await AsyncStorage.setItem('vouchers', JSON.stringify(updatedData));
  };

  const renderItem = ({ item }) => {
    let discountColor;
    let availabilityColor;
    if (item.is_available) {
      if (item.discount === 10) discountColor = '#FFC107';
      else if (item.discount === 20) discountColor = '#FF5722';
      else if (item.discount === 30) discountColor = '#E91E63';
      else if (item.discount === 40) discountColor = '#9C27B0';
      availabilityColor = item.available_vouchers > 0 ? '#000000' : '#808080';
    } else {
      discountColor = '#808080';
      availabilityColor = '#808080';
    }

    const swipeoutBtns = [
      {
        text: 'Supprimer',
        backgroundColor: '#FF0000',
        onPress: () => handleDelete(item.id),
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
            <ListItem.Title>{item.name_V}</ListItem.Title>
            <View style={styles.itemDetailsContainer}>
              <Text
                style={[
                  styles.itemDetailText,
                  {
                    color: availabilityColor,
                    textAlign: 'right',
                    marginRight: 16,
                  },
                ]}
              >
                Disponibles : {item.available_vouchers}
              </Text>
            </View>
            <Text style={styles.itemDetailText}>
              Validité : {item.validity_date.slice(0, 10)}
            </Text>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Swipeout>
    );
  };

  const renderEmptyResult = () => (
    <View style={styles.emptyResultContainer}>
      <Text style={styles.emptyResultText}>Aucun résultat trouvé</Text>
    </View>
  );

  const handleRefresh = async () => {
    setIsLoading(true);
    await fetchData();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Inbox</Text>
      <SearchBar
        placeholder="Rechercher par nom ou validité"
        value={searchText}
        onChangeText={handleSearch}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
      />
      {isLoading ? (
        <Text>Chargement en cours...</Text>
      ) : filteredData.length === 0 ? (
        renderEmptyResult()
      ) : (
        <>
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <Button
            title="Actualiser"
            onPress={handleRefresh}
            containerStyle={styles.refreshButtonContainer}
            buttonStyle={styles.refreshButton}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FBF5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 12,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 16,
  },
  searchBarInputContainer: {
    backgroundColor: '#EDEDED',
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
    justifyContent: 'space-between',
    marginTop: 3,
  },
  itemDetailText: {
    fontSize: 14,
  },
  emptyResultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyResultText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  refreshButtonContainer: {
    marginTop: 16,
    alignSelf: 'center',
  },
  refreshButton: {
    backgroundColor: '#FFC107',
  },
});

export default HomeScreen;

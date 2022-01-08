import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { Card, FAB } from 'react-native-paper';

const Home = ({ navigation }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const result = await fetch('http://ecd9-46-193-64-19.ngrok.io/employees');
      const finalResult = await result.json();
      setData(finalResult);
      setLoading(false);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(async () => {
    fetchData();
  }, []);

  // function to render each employee for Flatlist
  const renderCards = (item) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() => navigation.navigate('Profile', { item })}
      >
        <View style={styles.myViewCard}>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={{
              uri: item.picture,
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.position}</Text>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data.data}
        renderItem={({ item }) => {
          return renderCards(item);
        }}
        keyExtractor={(item) => item._id}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        theme={{ colors: { accent: '#006aff' } }}
        onPress={() => navigation.navigate('Create Employee')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mycard: {
    margin: 5,
  },
  myViewCard: {
    flexDirection: 'row',
    padding: 6,
  },
  text: {
    fontSize: 18,
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 16,
  },
});

export default Home;

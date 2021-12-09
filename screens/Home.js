import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Card, FAB } from 'react-native-paper';

const Home = ({ navigation }) => {
  const data = [
    {
      id: '1',
      name: 'Anthony T. Adjei',
      email: 'tonyteyeadjei@gmail.com',
      salary: '$4000',
      phone: '0758410782',
      position: 'Front-end Engineer',
      picture:
        'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    },
    {
      id: '2',
      name: 'Morkesh Guno',
      email: 'morkesh@gmail.com',
      salary: '$3000',
      phone: '0758410782',
      position: 'Cloud Technician',
      picture:
        'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    },
    {
      id: '3',
      name: 'Alexandra Vitovich',
      email: 'alexvitovich@gmail.com',
      salary: '$6500',
      phone: '0758410782',
      position: 'App Developer',
      picture:
        'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    },
    {
      id: '4',
      name: 'Yaw Berko',
      email: 'yawberko@gmail.com',
      salary: '$7000',
      phone: '0758410782',
      position: 'DevOps Lead',
      picture:
        'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    },
  ];
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
              uri: 'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
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
        data={data}
        renderItem={({ item }) => {
          return renderCards(item);
        }}
        keyExtractor={(item) => item.id}
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

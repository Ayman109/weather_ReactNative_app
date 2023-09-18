import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  FlatList,
  TextInput
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import { format } from 'date-fns';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState(null);
  const currentTime = new Date();

 

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast?q='+location+'&appid=.............&units=metric'
      );
      setData(response.data);
      
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchData();

  }, [location]);

  return (
    <SafeAreaView style={styles.container}>
     <TextInput
        style={{
          height: 40,
          paddingLeft: 10,
          margin: 10,
          background: "white",
          borderRadius: 10,
      }
        }
        placeholder="location"
        onChangeText={text => setLocation(text)}
      />
      <Text style={styles.city}>{data?.city.name}</Text>
      <Text style={styles.date}>{"Aujourd'hui"}</Text>
      <Image
        source={{
          uri:
            'https://openweathermap.org/img/wn/' +
            data?.list[0].weather[0].icon +
            '@2x.png',
        }}
        style={styles.image}
      />

      <Text style={styles.temp}>
        {Math.floor(data?.list[0].main.temp) + '°C'}
      </Text>
      <Text style={styles.info}>{data?.list[0].weather[0].description}</Text>
      <View style={styles.listcontainer}>
        <FlatList style={{ overflow: scroll}}
          data={data?.list.slice(0, 10)}
          horizontal={true} // Set horizontal prop to true
          renderItem={({ item }) => (
            <View style={styles.listitem}>
              <Text style={{ textAlign: 'center' }}>
                {format(new Date(item.dt_txt), 'HH') + 'h'}
              </Text>
              <Image
                source={{
                  uri:
                    'https://openweathermap.org/img/wn/' +
                    item?.weather[0].icon +
                    '@2x.png',
                }}
                style={styles.icon}
              />

              <Text style={{ textAlign: 'center' }}>
                {Math.floor(item.main.temp) + '°C'}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#6c6c6c',
    padding: 8,
    alignItems: 'center',
  },
  city: {
    fontSize: 'x-large',
    fontWeight: 600,
    textAlign: 'center',
    color: 'white',
    paddingTop: 15,
  },

  date: {
    fontSize: 'medium',
    fontWeight: 300,
    textAlign: 'center',
    color: 'white',
    paddingTop: 5,
  },

  temp: {
    fontSize: 'xx-large',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingTop: 15,
  },
  info: {
    fontSize: 'medium',
    fontWeight: 600,
    textAlign: 'center',
    color: 'white',
    paddingTop: 8,
  },

  image: {
    width: 150,
    height: 150,
  },
  icon: {
    width: 40,
    height: 40,
  },
  listcontainer: {
    fex: 1,
    margin: 10,
    marginTop: 60,
    overflowy : "scroll",
    width: "100%"  ,
    justifyContent: "center",
    textAlign :"center",
    alignContent:"center",
    alignItems: "center"
    
  },

  listitem: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    alignItems: 'center',
    width: 'fit-content',
    height: 100,
    padding: 10,
    margin: 5,
  },
});

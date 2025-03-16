import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import pueblosMagicos from '../../data/pueblos'; 

export default function MapsTab() {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 21.049296396548176,
    longitude:   -86.84683797270299,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });


  const goToLocation = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 1000);
    }
  };

  const { width, height } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: { flex: 1 },
    map: {
      width,
      height,
      zIndex: 1, 
    },
    listContainer: {
      position: 'absolute',
      bottom: 8,
      left: 0,
      right: 0,
      zIndex: 10, 
    },
    card: {
      width: 200,
      backgroundColor: '#c5dafc',
      marginHorizontal: 10,
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    image: {
      width: '100%',
      height: 100,
      borderRadius: 10,
      marginBottom: 5,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    description: {
      fontSize: 12,
      marginVertical: 5,
    },
    button: {
      marginTop: 5,
      backgroundColor: '#0059ff',
      borderRadius: 10,
      padding: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

  console.log('Pueblos:', pueblosMagicos); 

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(reg) => setRegion(reg)}
      >
        <Marker
          coordinate={{ latitude: 21.049296396548176 , longitude:-86.84683797270299 }}
          title="UT Cancún"
          description="Universidad Tecnológica de Cancún"
        />
      </MapView>

      <View style={styles.listContainer}>
        <FlatList
          data={pueblosMagicos}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.imagen }} style={styles.image} />
              <Text style={styles.title}>{item.nombre}</Text>
              <Text style={styles.description}>{item.descripcion}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => goToLocation(item.latitude, item.longitude)}
              >
                <Text style={styles.buttonText}>Ir a la ubicación</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

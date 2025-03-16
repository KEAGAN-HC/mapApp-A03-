import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import listaPueblos from '../components/listaPueblos';
import pueblosMagicos from '../data/pueblosMagicos';

export default function MapScreen() {
  const mapRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: 21.049296396548176,
    longitude: -86.84683797270299,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const goToLocation = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        500
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(reg) => setRegion(reg)}
      >
        <Marker
          coordinate={{ latitude: 21.101614, longitude: -86.874230 }}
          title="UT Cancún"
          description="Universidad Tecnológica de Cancún"
        />
      </MapView>

      <listaPueblos data={pueblosMagicos} onSelectTown={goToLocation} />
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width,
    height,
  },
});

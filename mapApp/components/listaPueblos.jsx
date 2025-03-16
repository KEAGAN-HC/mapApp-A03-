import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function MagicTownsList({ data, onSelectTown }) {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
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
              onPress={() => onSelectTown(item.latitude, item.longitude)}
            >
              <Text style={styles.buttonText}>Ir al Mapa</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    position: 'absolute',
    bottom: 20,
  },
  card: {
    width: 200,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 6,
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
    backgroundColor: '#007aff',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

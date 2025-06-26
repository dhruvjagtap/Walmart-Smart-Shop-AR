import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ShoppingListComponent() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 10,
    width: '100%',
    height: 80,
    elevation: 2,
  },
});

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TopBar from '../components/TopBar';
import ListCard from '../components/ListCard';
import productsData from '../assets/data/mock_products.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { ScrollView } from 'react-native-gesture-handler';

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice: number;
  categoryPath: string;
  imageUrl: string;
  aisle: string;
  isEcoFriendly: boolean;
  ecoScore: string;
  tags: string[];
  description: string;
  relatedProductIds: string[];
};

type ProductItem = {
  id?: string;
  name: string;
  brand?: string;
  price: number;
  checked: boolean;
  isEcoFriendly?: boolean;
  ecoScore?: string;
};

export default function ShopList() {
  const STORAGE_KEY = '@smartshop_lists';

  const [lists, setLists] = useState<Record<string, ProductItem[]>>({
    Default: [],
  });
  const [currentList, setCurrentList] = useState<string>('Default');
  const [inputValue, setInputValue] = useState('');
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  

  const user = auth().currentUser;

  useEffect(() => {
    const normalized = productsData.map(p => ({
      ...p,
      salePrice: p.salePrice ?? 0,
    }));
    setAllProducts(normalized);
  }, []);

  useEffect(() => {
    const loadLists = async () => {
      try {
        if (user) {
          const doc = await firestore().collection('users').doc(user.uid).get();
          if (doc.exists() && doc.data()?.lists) {
            setLists(doc.data()?.lists);
          }
        } else {
          const local = await AsyncStorage.getItem(STORAGE_KEY);
          if (local) setLists(JSON.parse(local));
        }
      } catch (e) {
        console.error('Load error:', e);
      } finally {
        setLoading(false);
      }
    };
    loadLists();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .set({ lists }, { merge: true })
        .catch(console.error);
    }
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists)).catch(
      console.error,
    );
  }, [lists]);

  const addProduct = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const already = lists[currentList]?.some(
      p => p.name.toLowerCase() === trimmed.toLowerCase(),
    );
    if (already) return Alert.alert('Already in list');

    const newItem = { name: trimmed, price: 0, checked: false };
    setLists(prev => ({
      ...prev,
      [currentList]: [...(prev[currentList] ?? []), newItem],
    }));

    setInputValue('');
    setFilteredSuggestions([]);
    Keyboard.dismiss();
  };

  const handleSuggestionPress = (product: Product) => {
    const already = lists[currentList]?.some(
      p => p.name.toLowerCase() === product.name.toLowerCase(),
    );
    if (already) return Alert.alert('Already in list');

    const newItem: ProductItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.salePrice || product.price,
      checked: false,
      isEcoFriendly: product.isEcoFriendly ?? false,
      ecoScore: product.ecoScore ?? 'F',
    };

    setLists(prev => ({
      ...prev,
      [currentList]: [...(prev[currentList] ?? []), newItem],
    }));

    setInputValue('');
    setFilteredSuggestions([]);
    Keyboard.dismiss();
  };

  const deleteProduct = (name: string) => {
    setLists(prev => ({
      ...prev,
      [currentList]: (prev[currentList] ?? []).filter(p => p.name !== name),
    }));
  };

  const toggleChecked = (i: number) => {
    setLists(prev => {
      const updated = [...(prev[currentList] ?? [])];
      updated[i].checked = !updated[i].checked;
      return { ...prev, [currentList]: updated };
    });
  };

  const renameList = () => {
    setRenameValue('');
    setRenameModalVisible(true);
  };

  const confirmRename = () => {
    const newName = renameValue.trim();
    if (!newName) return Alert.alert('Enter a valid name');
    if (lists[newName]) return Alert.alert('List already exists');

    setLists(prev => {
      const updated = { ...prev };
      updated[newName] = updated[currentList];
      delete updated[currentList];
      return updated;
    });

    setCurrentList(newName);
    setRenameModalVisible(false);
  };

  const deleteList = () => {
    if (currentList === 'Default')
      return Alert.alert("Can't delete Default list");

    Alert.alert('Delete List?', `Delete "${currentList}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setLists(prev => {
            const updated = { ...prev };
            delete updated[currentList];
            return updated;
          });
          setCurrentList('Default');
        },
      },
    ]);
  };

  const currentItems = lists[currentList] ?? [];

  const total = currentItems
    .filter(p => p.checked)
    .reduce((sum, p) => sum + p.price, 0);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    const matches = allProducts.filter(p =>
      p.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredSuggestions(matches.slice(0, 5));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#fb8500" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <TopBar showGreeting={false} title="Shopping List" />
        <View style={styles.container}>
          <Text style={styles.header}>Current List: {currentList}</Text>

          <View style={styles.actionsRow}>
            <TouchableOpacity onPress={renameList} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Rename</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteList}
              style={[styles.actionButton, { backgroundColor: '#ffd6d6' }]}
            >
              <Text style={[styles.actionButtonText, { color: '#d00000' }]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dropdownWrapper}>
            <Picker
              selectedValue={currentList}
              onValueChange={val => setCurrentList(val)}
              style={styles.picker}
            >
              {Object.keys(lists).map(name => (
                <Picker.Item key={name} label={name} value={name} />
              ))}
            </Picker>
            <TouchableOpacity
              style={styles.newListButton}
              onPress={() => {
                const newList = `List ${Object.keys(lists).length + 1}`;
                setLists(prev => ({ ...prev, [newList]: [] }));
                setCurrentList(newList);
              }}
            >
              <Text style={styles.addButtonText}>+ New</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={inputValue}
              onChangeText={handleInputChange}
              placeholder="Enter product..."
              style={styles.input}
            />
            <TouchableOpacity onPress={addProduct} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {filteredSuggestions.length > 0 && (
            <FlatList
              data={filteredSuggestions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSuggestionPress(item)}
                  style={styles.suggestionItem}
                >
                  <Text>
                    {item.name} - ₹{item.salePrice || item.price}
                  </Text>
                </TouchableOpacity>
              )}
              style={styles.suggestionList}
            />
          )}

          <FlatList
            data={currentItems}
            keyExtractor={(item, idx) => `${item.name}-${idx}`}
            renderItem={({ item, index }) => (
              <ListCard
                productName={item.name}
                price={item.price}
                checked={item.checked}
                onDelete={() => deleteProduct(item.name)}
                onToggle={() => toggleChecked(index)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </View>

        {total > 0 && (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Total (Checked): ₹{total.toFixed(2)}
            </Text>
          </View>
        )}

        {/* Rename Modal */}
        <Modal visible={renameModalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                Rename List
              </Text>
              <TextInput
                value={renameValue}
                onChangeText={setRenameValue}
                placeholder="New list name"
                style={styles.modalInput}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity onPress={() => setRenameModalVisible(false)}>
                  <Text style={{ color: '#888' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmRename}>
                  <Text style={{ color: '#3a86ff', fontWeight: 'bold' }}>
                    Rename
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  inputContainer: { flexDirection: 'row', marginBottom: 12, gap: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  addButton: { backgroundColor: '#3a86ff', padding: 12, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  picker: { flex: 1, backgroundColor: '#f1f3f5', borderRadius: 8 },
  newListButton: {
    marginLeft: 10,
    backgroundColor: '#3a86ff',
    padding: 10,
    borderRadius: 8,
  },
  suggestionList: { maxHeight: 120, backgroundColor: '#eee', borderRadius: 8 },
  suggestionItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ddd' },
  actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  actionButton: { backgroundColor: '#e0f0ff', padding: 10, borderRadius: 8 },
  actionButtonText: { color: '#3a86ff' },
  totalContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: '#f1f3f5',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  totalText: { fontSize: 14, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

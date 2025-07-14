import React, { useRef, useState, useEffect } from 'react';
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
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TopBar from '../components/TopBar';
import ListCard from '../components/ListCard';
import productsData from '../assets/data/mock_products.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Snackbar } from 'react-native-paper';
import Haptic from 'react-native-haptic-feedback';
import { useProductContext } from '../context/ProductContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigationState } from '@react-navigation/native';

type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice: number;
  isEcoFriendly: boolean;
  ecoScore: string;
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

type ShopListStackParamList = {
  ShopListMain: undefined;
  WebAR: undefined;
};

const STORAGE_KEY = '@smartshop_lists';

export default function ShopList() {
  const inputRef = useRef<TextInput>(null);

  const [lists, setLists] = useState<Record<string, ProductItem[]>>({});
  const [currentList, setCurrentList] = useState('Default');
  const [inputValue, setInputValue] = useState('');
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [toolsModalVisible, setToolsModalVisible] = useState(false);
  const navigation =
    useNavigation<StackNavigationProp<ShopListStackParamList>>();
  const { setSelectedListName } = useProductContext();
  const navState = useNavigationState(state => state);

  const { setConfirmedItems } = useProductContext();

  const user = auth().currentUser;

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  useEffect(() => {
    const normalized = productsData.map(p => ({
      ...p,
      salePrice: p.salePrice ?? 0,
    }));
    setAllProducts(normalized);

    console.log('Current navigator routes:', navState?.routes);
  }, []);

  useEffect(() => {
    const loadLists = async () => {
      try {
        let cloudLists: any = {};

        if (user) {
          const doc = await firestore().collection('users').doc(user.uid).get();
          if (doc.exists() && doc.data()?.lists) {
            cloudLists = doc.data()?.lists;
          }
        } else {
          const local = await AsyncStorage.getItem(STORAGE_KEY);
          if (local) cloudLists = JSON.parse(local);
        }

        setLists(cloudLists);
      } catch (e) {
        console.error('Failed to load lists:', e);
      } finally {
        setLoading(false);
      }
    };

    loadLists();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        firestore()
          .collection('users')
          .doc(user.uid)
          .set({ lists }, { merge: true })
          .catch(console.error);
      }
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists)).catch(
        console.error,
      );
    }
  }, [lists]);
  const addProduct = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const already = lists[currentList]?.some(
      p => p.name.toLowerCase() === trimmed.toLowerCase(),
    );
    if (already) return showSnackbar('Product already in list');

    const match = allProducts.find(
      p => p.name.toLowerCase() === trimmed.toLowerCase(),
    );

    const newItem: ProductItem = {
      name: trimmed,
      price: match?.salePrice || match?.price || 0,
      checked: false,
      brand: match?.brand,
      isEcoFriendly: match?.isEcoFriendly ?? false,
      ecoScore: match?.ecoScore ?? 'F',
    };

    const updated = [...(lists[currentList] || []), newItem];
    setLists(prev => ({ ...prev, [currentList]: updated }));

    setInputValue('');
    setFilteredSuggestions([]);
    Keyboard.dismiss();
    showSnackbar('Product added');
  };

  const toggleChecked = (i: number) => {
    setLists(prev => {
      const updated = [...(prev[currentList] ?? [])];
      updated[i].checked = !updated[i].checked;
      return { ...prev, [currentList]: updated };
    });
  };

  const deleteProduct = (name: string) => {
    setLists(prev => ({
      ...prev,
      [currentList]: (prev[currentList] ?? []).filter(p => p.name !== name),
    }));
    showSnackbar('Product deleted');
  };

  const confirmList = async () => {
    if (currentList === 'Confirmed') return;

    const confirmedItems = lists[currentList]?.filter(p => p.checked);
    if (!confirmedItems || confirmedItems.length === 0) {
      return showSnackbar('Please check items before starting shopping');
    }

    const newItems = confirmedItems.map(item => ({
      ...item,
      confirmedAt: new Date().toISOString(),
    }));

    const updatedConfirmed = [...(lists['Confirmed'] ?? []), ...newItems];

    setLists(prev => ({
      ...prev,
      Confirmed: updatedConfirmed,
    }));

    setConfirmedItems(updatedConfirmed);

    try {
      if (user) {
        await firestore()
          .collection('users')
          .doc(user.uid)
          .set(
            {
              lists: {
                ...lists,
                Confirmed: updatedConfirmed,
              },
              confirmedList: updatedConfirmed,
            },
            { merge: true },
          );
      } else {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...lists,
            Confirmed: updatedConfirmed,
          }),
        );
        await AsyncStorage.setItem(
          '@smartshop_confirmedList',
          JSON.stringify(updatedConfirmed),
        );
      }
    } catch (e) {
      console.error('Error saving confirmed list:', e);
      showSnackbar('Something went wrong. Try again.');
    }
  };

  const handleStartShopping = async () => {
    navigation.navigate('WebAR');

    await confirmList();
    // const handleStartAR = () => {
    setSelectedListName('Default');
    // };
  };

  const deleteList = () => {
    if (currentList === 'Default' || currentList === 'Confirmed') {
      return showSnackbar("Can't delete this list");
    }

    Alert.alert('Delete?', `Delete "${currentList}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = { ...lists };
          delete updated[currentList];
          setLists(updated);
          setCurrentList('Default');

          if (user) {
            await firestore()
              .collection('users')
              .doc(user.uid)
              .update({
                [`lists.${currentList}`]: firestore.FieldValue.delete(),
              });
          }
          showSnackbar('List deleted');
        },
      },
    ]);
  };

  const renameList = () => {
    setRenameValue('');
    setRenameModalVisible(true);
  };

  const confirmRename = () => {
    const newName = renameValue.trim();
    if (!newName) return showSnackbar('Enter a name');
    if (lists[newName]) return showSnackbar('List already exists');
    if (currentList === 'Confirmed')
      return showSnackbar("Can't rename static list");

    const updated = { ...lists };
    updated[newName] = updated[currentList];
    delete updated[currentList];

    setLists(updated);
    setCurrentList(newName);
    setRenameModalVisible(false);
    showSnackbar(`Renamed to "${newName}"`);
  };
  const currentItems = lists[currentList] ?? [];

  const total = currentItems
    .filter(p => p.checked)
    .reduce((sum, p) => sum + p.price, 0);
  const checkedCount = currentItems.filter(p => p.checked).length;
  const totalCount = currentItems.length;

  const handleInputChange = (text: string) => {
    setInputValue(text);
    const matches = allProducts.filter(
      p =>
        p.name.toLowerCase().startsWith(text.toLowerCase()) ||
        p.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredSuggestions(matches.slice(0, 5));
  };

  const handleSuggestionPress = (product: Product) => {
    const already = lists[currentList]?.some(
      p => p.name.toLowerCase() === product.name.toLowerCase(),
    );
    if (already) return showSnackbar('Product already in list');

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
    Haptic.trigger('impactLight');
    showSnackbar('Added from suggestions');
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <TopBar showGreeting={false} title="Shopping List" />
        <View style={styles.container}>
          <View style={styles.actionsRow}>
            <Text style={styles.header}>{currentList}</Text>
            {/* 
            <TouchableOpacity onPress={renameList} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>
                Rename
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={deleteList}
              style={[styles.actionButton, { backgroundColor: '#ffd6d6' }]}
            >
              <Text style={[styles.actionButtonText, { color: '#d00000' }]}>
                Delete
              </Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={confirmList}
              style={[styles.actionButton, { backgroundColor: '#d1f5d3' }]}
            >
              <Text style={[styles.actionButtonText, { color: '#28a745' }]}>
                Confirm
              </Text>
            </TouchableOpacity> */}
            <View style={{ flexDirection: 'row', gap: 8, marginRight: 10 }}>
              <TouchableOpacity
                onPress={handleStartShopping}
                style={styles.startShoppingButton}
              >
                <Text
                  style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}
                >
                  Start Shopping
                </Text>
              </TouchableOpacity>
              <Feather
                name="more-vertical"
                size={20}
                color={'#000'}
                onPress={() => setToolsModalVisible(true)}
              />
            </View>
          </View>

          <View style={styles.dropdownWrapper}>
            <Picker
              selectedValue={currentList}
              onValueChange={val => setCurrentList(val)}
              style={styles.picker}
            >
              {Object.keys(lists)
                .filter(name => name !== 'Confirmed')
                .map(name => (
                  <Picker.Item key={name} label={name} value={name} />
                ))}
            </Picker>
            <TouchableOpacity
              style={styles.newListButton}
              onPress={() => {
                const newList = `List ${Object.keys(lists).length}`;
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
                    {item.name} ₹{item.salePrice || item.price}
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
                isEco={item.isEcoFriendly}
                ecoScore={item.ecoScore}
              />
            )}
            contentContainerStyle={{ paddingBottom: 100 }}
          />

          {totalCount > 0 && (
            <View style={styles.summaryBox}>
              <Text style={styles.summaryText}>
                ✓ {checkedCount} of {totalCount} items
              </Text>
              <Text style={styles.summaryText}>Total: ₹{total.toFixed(2)}</Text>
            </View>
          )}
        </View>

        <Modal
          visible={toolsModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setRenameModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setToolsModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 20,
                  width: '50%',
                  borderRadius: 10,
                  gap: 10,
                }}
              >
                <TouchableOpacity onPress={renameList}>
                  <View style={{ flexDirection: 'row', margin: 10, gap: 8 }}>
                    <FontAwesome name="pencil-square-o" size={20} />
                    <Text style={styles.toolsText}>Rename List</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteList}>
                  <View style={{ flexDirection: 'row', margin: 10, gap: 10 }}>
                    <FontAwesome5 name="trash" size={18} />
                    <Text style={styles.toolsText}>Delete List</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Rename Modal */}
        <Modal
          visible={renameModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setRenameModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setToolsModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  <MaterialCommunityIcons name="rename" size={20} /> Rename List
                </Text>
                <TextInput
                  value={renameValue}
                  onChangeText={setRenameValue}
                  placeholder="New list name"
                  style={styles.modalInput}
                />
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    onPress={() => setRenameModalVisible(false)}
                  >
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
          </TouchableWithoutFeedback>
        </Modal>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2500}
          action={{
            label: 'OK',
            onPress: () => setSnackbarVisible(false),
          }}
          style={{
            backgroundColor: '#333',
            borderRadius: 8,
            margin: 16,
            marginBottom: 50,
          }}
        >
          <Text style={{ color: '#fff' }}>{snackbarMessage}</Text>
        </Snackbar>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 16 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
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
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  suggestionList: {
    maxHeight: 150,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#e6f0ff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 30,
  },
  actionButtonText: { color: '#3a86ff', fontSize: 10 },
  summaryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e6f4ea',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 50,
  },
  summaryText: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 14,
  },
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
  startShoppingButton: {
    borderRadius: 8,
    backgroundColor: '#6a994e',
    padding: 8,
    marginBottom: 10,
  },
  toolsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

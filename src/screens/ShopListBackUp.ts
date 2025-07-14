// // import React, { useRef, useState, useEffect } from 'react';
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   TextInput,
// //   TouchableOpacity,
// //   FlatList,
// //   KeyboardAvoidingView,
// //   Platform,
// //   Alert,
// //   Modal,
// //   ActivityIndicator,
// //   Keyboard,
// //   SafeAreaView,
// // } from 'react-native';
// // import { Picker } from '@react-native-picker/picker';
// // import TopBar from '../components/TopBar';
// // import ListCard from '../components/ListCard';
// // import productsData from '../assets/data/mock_products.json';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import auth from '@react-native-firebase/auth';
// // import firestore from '@react-native-firebase/firestore';
// // import Haptic from 'react-native-haptic-feedback';
// // import { Snackbar } from 'react-native-paper';
// // import recDataJson from '../assets/data/recommendations.json';

// // const recData: { [key: string]: string[] } = recDataJson;

// // type Product = {
// //   id: string;
// //   name: string;
// //   brand: string;
// //   price: number;
// //   salePrice: number;
// //   categoryPath: string;
// //   imageUrl: string;
// //   aisle: string;
// //   isEcoFriendly: boolean;
// //   ecoScore: string;
// //   tags: string[];
// //   description: string;
// //   relatedProductIds: string[];
// // };

// // type ProductItem = {
// //   id?: string;
// //   name: string;
// //   brand?: string;
// //   price: number;
// //   checked: boolean;
// //   isEcoFriendly?: boolean;
// //   ecoScore?: string;
// // };

// // export default function ShopList() {
// //   const STORAGE_KEY = '@smartshop_lists';
// //   const inputRef = useRef<TextInput>(null);

// //   const [lists, setLists] = useState<Record<string, ProductItem[]>>({
// //     Default: [],
// //   });
// //   const [currentList, setCurrentList] = useState<string>('Default');
// //   const [inputValue, setInputValue] = useState('');
// //   const [renameModalVisible, setRenameModalVisible] = useState(false);
// //   const [renameValue, setRenameValue] = useState('');
// //   const [allProducts, setAllProducts] = useState<Product[]>([]);
// //   const [filteredSuggestions, setFilteredSuggestions] = useState<Product[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [snackbarVisible, setSnackbarVisible] = useState(false);
// //   const [snackbarMessage, setSnackbarMessage] = useState('');
// //   const [suggestions, setSuggestions] = useState<string[]>([]);

// //   const showSnackbar = (message: string) => {
// //     setSnackbarMessage(message);
// //     setSnackbarVisible(true);
// //   };

// //   const user = auth().currentUser;

// //   useEffect(() => {
// //     const normalized = productsData.map(p => ({
// //       ...p,
// //       salePrice: p.salePrice ?? 0,
// //     }));
// //     setAllProducts(normalized);
// //   }, []);

// //   useEffect(() => {
// //     const loadLists = async () => {
// //       try {
// //         if (user) {
// //           const doc = await firestore().collection('users').doc(user.uid).get();
// //           if (doc.exists() && doc.data()?.lists) {
// //             setLists(doc.data()?.lists);
// //           }
// //         } else {
// //           const local = await AsyncStorage.getItem(STORAGE_KEY);
// //           if (local) setLists(JSON.parse(local));
// //         }
// //       } catch (e) {
// //         console.error('Load error:', e);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadLists();
// //   }, []);

// //   useEffect(() => {
// //     if (!loading && user) {
// //       firestore()
// //         .collection('users')
// //         .doc(user.uid)
// //         .set({ lists }, { merge: true })
// //         .catch(console.error);
// //     }
// //     AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists)).catch(
// //       console.error,
// //     );
// //   }, [lists]);

// //   const addProduct = () => {
// //     const trimmed = inputValue.trim();
// //     if (!trimmed) return;

// //     const baseName = trimmed.toLowerCase(); // or product.name.toLowerCase()
// //     if (recData[baseName]) {
// //       setSuggestions(recData[baseName]);
// //     }

// //     const already = lists[currentList]?.some(
// //       p => p.name.toLowerCase() === trimmed.toLowerCase(),
// //     );
// //     if (already) return showSnackbar('Product already in list');

// //     const newItem = { name: trimmed, price: 0, checked: false };
// //     setLists(prev => ({
// //       ...prev,
// //       [currentList]: [...(prev[currentList] ?? []), newItem],
// //     }));

// //     setInputValue('');
// //     setFilteredSuggestions([]);
// //     Keyboard.dismiss();
// //     showSnackbar('Product added to list');
// //     Haptic.trigger('impactLight');
// //     setTimeout(() => inputRef.current?.focus(), 100);
// //   };

// //   const handleSuggestionPress = (product: Product) => {
// //     const already = lists[currentList]?.some(
// //       p => p.name.toLowerCase() === product.name.toLowerCase(),
// //     );
// //     if (already) return showSnackbar('Product already in list');

// //     const newItem: ProductItem = {
// //       id: product.id,
// //       name: product.name,
// //       brand: product.brand,
// //       price: product.salePrice || product.price,
// //       checked: false,
// //       isEcoFriendly: product.isEcoFriendly ?? false,
// //       ecoScore: product.ecoScore ?? 'F',
// //     };

// //     setLists(prev => ({
// //       ...prev,
// //       [currentList]: [...(prev[currentList] ?? []), newItem],
// //     }));

// //     setInputValue('');
// //     setFilteredSuggestions([]);
// //     Haptic.trigger('impactLight');
// //     setTimeout(() => inputRef.current?.focus(), 100);
// //   };

// //   const deleteProduct = (name: string) => {
// //     setLists(prev => ({
// //       ...prev,
// //       [currentList]: (prev[currentList] ?? []).filter(p => p.name !== name),
// //     }));
// //     Haptic.trigger('notificationWarning');
// //   };

// //   const toggleChecked = (i: number) => {
// //     setLists(prev => {
// //       const updated = [...(prev[currentList] ?? [])];
// //       updated[i].checked = !updated[i].checked;
// //       return { ...prev, [currentList]: updated };
// //     });
// //     Haptic.trigger('impactLight');
// //   };

// //   const renameList = () => {
// //     setRenameValue('');
// //     setRenameModalVisible(true);
// //   };

// //   const confirmRename = () => {
// //     const newName = renameValue.trim();
// //     if (!newName) return showSnackbar('Enter a valid name');
// //     if (lists[newName]) return showSnackbar('List already exists');

// //     setLists(prev => {
// //       const updated = { ...prev };
// //       updated[newName] = updated[currentList];
// //       delete updated[currentList];
// //       return updated;
// //     });

// //     setCurrentList(newName);
// //     setRenameModalVisible(false);
// //     showSnackbar(`Renamed to "${newName}"`);
// //   };

// //   const deleteList = () => {
// //     if (currentList === 'Default') {
// //       showSnackbar("Can't delete Default list");
// //       return;
// //     }

// //     Alert.alert('Delete List?', `Delete "${currentList}"?`, [
// //       { text: 'Cancel', style: 'cancel' },
// //       {
// //         text: 'Delete',
// //         style: 'destructive',
// //         onPress: () => {
// //           setLists(prev => {
// //             const updated = { ...prev };
// //             delete updated[currentList];
// //             return updated;
// //           });
// //           setCurrentList('Default');
// //         },
// //       },
// //     ]);
// //   };

// //   const currentItems = lists[currentList] ?? [];
// //   const total = currentItems
// //     .filter(p => p.checked)
// //     .reduce((sum, p) => sum + p.price, 0);
// //   const checkedCount = currentItems.filter(p => p.checked).length;
// //   const totalCount = currentItems.length;
// //   const progressText = `✓ ${checkedCount} of ${totalCount} items`;

// //   const handleInputChange = (text: string) => {
// //     setInputValue(text);
// //     const matches = allProducts.filter(p =>
// //       p.name.toLowerCase().includes(text.toLowerCase()),
// //     );
// //     setFilteredSuggestions(matches.slice(0, 5));
// //   };

// //   if (loading) {
// //     return (
// //       <SafeAreaView style={styles.centered}>
// //         <ActivityIndicator size="large" color="#d81e5b" />
// //       </SafeAreaView>
// //     );
// //   }

// //   const handleAddSuggested = (itemName: string) => {
// //     const already = lists[currentList]?.some(
// //       p => p.name.toLowerCase() === itemName.toLowerCase(),
// //     );
// //     if (already) return;

// //     const newItem = {
// //       name: itemName,
// //       price: 0,
// //       checked: false,
// //     };

// //     setLists(prev => ({
// //       ...prev,
// //       [currentList]: [...(prev[currentList] ?? []), newItem],
// //     }));

// //     setSuggestions([]); // Clear after adding
// //   };

// //   return (
// //     <SafeAreaView style={styles.wrapper}>
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
// //         style={{ flex: 1 }}
// //       >
// //         <TopBar showGreeting={false} title="Shopping List" />
// //         <View style={styles.container}>
// //           <View style={styles.actionsRow}>
// //             <Text style={styles.header}>{currentList}</Text>
// //             <TouchableOpacity onPress={renameList} style={styles.actionButton}>
// //               <Text style={styles.actionButtonText}>Rename</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               onPress={deleteList}
// //               style={[styles.actionButton, { backgroundColor: '#ffd6d6' }]}
// //             >
// //               <Text style={[styles.actionButtonText, { color: '#d00000' }]}>
// //                 Delete
// //               </Text>
// //             </TouchableOpacity>
// //           </View>

// //           <View style={styles.dropdownWrapper}>
// //             <Picker
// //               selectedValue={currentList}
// //               onValueChange={val => setCurrentList(val)}
// //               style={styles.picker}
// //             >
// //               {Object.keys(lists).map(name => (
// //                 <Picker.Item key={name} label={name} value={name} />
// //               ))}
// //             </Picker>
// //             <TouchableOpacity
// //               style={styles.newListButton}
// //               onPress={() => {
// //                 const newList = `List ${Object.keys(lists).length + 1}`;
// //                 setLists(prev => ({ ...prev, [newList]: [] }));
// //                 setCurrentList(newList);
// //               }}
// //             >
// //               <Text style={styles.addButtonText}>+ New</Text>
// //             </TouchableOpacity>
// //           </View>

// //           <View style={styles.inputContainer}>
// //             <TextInput
// //               ref={inputRef}
// //               value={inputValue}
// //               onChangeText={handleInputChange}
// //               placeholder="Enter product..."
// //               style={styles.input}
// //             />
// //             <TouchableOpacity onPress={addProduct} style={styles.addButton}>
// //               <Text style={styles.addButtonText}>Add</Text>
// //             </TouchableOpacity>
// //           </View>

// //           {filteredSuggestions.length > 0 && (
// //             <FlatList
// //               data={filteredSuggestions}
// //               keyExtractor={item => item.id}
// //               renderItem={({ item }) => (
// //                 <TouchableOpacity
// //                   onPress={() => handleSuggestionPress(item)}
// //                   style={styles.suggestionItem}
// //                 >
// //                   <View
// //                     style={{
// //                       flexDirection: 'row',
// //                       justifyContent: 'space-between',
// //                     }}
// //                   >
// //                     <Text style={{ fontWeight: '600' }}>
// //                       {item.name} {item.isEcoFriendly && '🌿'}
// //                     </Text>
// //                     <Text style={{ color: '#555' }}>
// //                       ₹{item.salePrice || item.price}
// //                     </Text>
// //                   </View>
// //                 </TouchableOpacity>
// //               )}
// //               style={styles.suggestionList}
// //             />
// //           )}

// //           {currentItems.length === 0 ? (
// //             <View style={{ alignItems: 'center', marginTop: 50 }}>
// //               <Text style={{ fontSize: 16, color: '#777' }}>
// //                 Your list is empty. Start adding items!
// //               </Text>
// //             </View>
// //           ) : (
// //             <FlatList
// //               data={currentItems}
// //               keyExtractor={(item, idx) => `${item.name}-${idx}`}
// //               renderItem={({ item, index }) => (
// //                 <ListCard
// //                   productName={item.name}
// //                   price={item.price}
// //                   checked={item.checked}
// //                   onDelete={() => deleteProduct(item.name)}
// //                   onToggle={() => toggleChecked(index)}
// //                   isEco={item.isEcoFriendly}
// //                   ecoScore={item.ecoScore}
// //                 />
// //               )}
// //               contentContainerStyle={{ paddingBottom: 80 }}
// //             />
// //           )}
// //         </View>
// //         {suggestions.length > 0 && (
// //           <View style={{ marginTop: 20 }}>
// //             <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
// //               You may also need:
// //             </Text>
// //             {suggestions.map((item, idx) => (
// //               <TouchableOpacity
// //                 key={idx}
// //                 onPress={() => handleAddSuggested(item)}
// //                 style={{
// //                   padding: 10,
// //                   backgroundColor: '#e0f0ff',
// //                   marginVertical: 4,
// //                   borderRadius: 8,
// //                 }}
// //               >
// //                 <Text style={{ fontSize: 14 }}>{item}</Text>
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //         )}

// //         {currentList.length > 0 && (
// //           <View style={styles.summaryBox}>
// //             <Text style={styles.summaryText}>{progressText}</Text>
// //             <Text style={styles.summaryText}>
// //               Total (Checked): ₹{total.toFixed(2)}
// //             </Text>
// //           </View>
// //         )}

// //         {/* Rename Modal */}
// //         <Modal visible={renameModalVisible} transparent animationType="slide">
// //           <View style={styles.modalOverlay}>
// //             <View style={styles.modalContainer}>
// //               <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
// //                 Rename List
// //               </Text>
// //               <TextInput
// //                 value={renameValue}
// //                 onChangeText={setRenameValue}
// //                 placeholder="New list name"
// //                 style={styles.modalInput}
// //               />
// //               <View style={styles.modalActions}>
// //                 <TouchableOpacity onPress={() => setRenameModalVisible(false)}>
// //                   <Text style={{ color: '#888' }}>Cancel</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity onPress={confirmRename}>
// //                   <Text style={{ color: '#3a86ff', fontWeight: 'bold' }}>
// //                     Rename
// //                   </Text>
// //                 </TouchableOpacity>
// //               </View>
// //             </View>
// //           </View>
// //         </Modal>

// //         <Snackbar
// //           visible={snackbarVisible}
// //           onDismiss={() => setSnackbarVisible(false)}
// //           duration={3000}
// //           action={{
// //             label: 'OK',
// //             onPress: () => setSnackbarVisible(false),
// //             textColor: '#ffffff',
// //           }}
// //           style={{
// //             backgroundColor: '#3a86ff', // a nice blue
// //             borderRadius: 8,
// //             marginHorizontal: 16,
// //             marginBottom: 60,
// //           }}
// //         >
// //           <Text style={{ color: '#fff', fontWeight: 'bold' }}>
// //             {snackbarMessage}
// //           </Text>
// //         </Snackbar>
// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   wrapper: { flex: 1, backgroundColor: '#fff' },
// //   container: { flex: 1, padding: 16 },
// //   header: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
// //   inputContainer: { flexDirection: 'row', marginBottom: 12, gap: 10 },
// //   input: {
// //     flex: 1,
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 8,
// //     padding: 10,
// //   },
// //   addButton: { backgroundColor: '#3a86ff', padding: 12, borderRadius: 8 },
// //   addButtonText: { color: '#fff', fontWeight: 'bold' },
// //   dropdownWrapper: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 12,
// //   },
// //   picker: { flex: 1, backgroundColor: '#f1f3f5', borderRadius: 8 },
// //   newListButton: {
// //     marginLeft: 10,
// //     backgroundColor: '#3a86ff',
// //     padding: 10,
// //     borderRadius: 8,
// //   },
// //   suggestionItem: {
// //     padding: 10,
// //     borderBottomWidth: 1,
// //     borderColor: '#ddd',
// //     backgroundColor: '#fff',
// //   },
// //   suggestionList: {
// //     maxHeight: 150,
// //     borderRadius: 8,
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     marginBottom: 12,
// //     backgroundColor: '#f9f9f9',
// //   },
// //   actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
// //   actionButton: {
// //     backgroundColor: '#e6f0ff',
// //     paddingVertical: 10,
// //     paddingHorizontal: 14,
// //     borderRadius: 30,
// //   },
// //   actionButtonText: { color: '#3a86ff', fontSize: 10 },
// //   totalContainer: {
// //     position: 'absolute',
// //     bottom: 50,
// //     left: 0,
// //     right: 0,
// //     backgroundColor: '#f1f3f5',
// //     padding: 8,
// //     borderTopWidth: 1,
// //     borderTopColor: '#ccc',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     zIndex: 10,
// //   },
// //   totalText: { fontSize: 14, fontWeight: '600' },
// //   modalOverlay: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(0,0,0,0.3)',
// //   },
// //   modalContainer: {
// //     backgroundColor: '#fff',
// //     padding: 20,
// //     width: '80%',
// //     borderRadius: 10,
// //   },
// //   modalInput: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 6,
// //     padding: 10,
// //     marginTop: 10,
// //     marginBottom: 20,
// //   },
// //   modalActions: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },
// //   centered: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   summaryBox: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     backgroundColor: '#e6f4ea',
// //     padding: 10,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //     marginBottom: 50,
// //   },
// //   summaryText: {
// //     color: '#2e7d32',
// //     fontWeight: '600',
// //     fontSize: 14,
// //   },
// // });

// import React, { useRef, useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   Modal,
//   ActivityIndicator,
//   Keyboard,
//   SafeAreaView,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import TopBar from '../components/TopBar';
// import ListCard from '../components/ListCard';
// import productsData from '../assets/data/mock_products.json';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import Haptic from 'react-native-haptic-feedback';
// import { Snackbar } from 'react-native-paper';
// import recDataJson from '../assets/data/recommendations.json';

// const recData: { [key: string]: string[] } = recDataJson;

// type Product = {
//   id: string;
//   name: string;
//   brand: string;
//   price: number;
//   salePrice: number;
//   isEcoFriendly: boolean;
//   ecoScore: string;
// };

// type ProductItem = {
//   id?: string;
//   name: string;
//   brand?: string;
//   price: number;
//   checked: boolean;
//   isEcoFriendly?: boolean;
//   ecoScore?: string;
// };

// export default function ShopList() {
//   const STORAGE_KEY = '@smartshop_lists';
//   const inputRef = useRef<TextInput>(null);

//   const [lists, setLists] = useState<Record<string, ProductItem[]>>({
//     Default: [],
//   });
//   const [currentList, setCurrentList] = useState<string>('Default');
//   const [inputValue, setInputValue] = useState('');
//   const [renameModalVisible, setRenameModalVisible] = useState(false);
//   const [renameValue, setRenameValue] = useState('');
//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [filteredSuggestions, setFilteredSuggestions] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [snackbarVisible, setSnackbarVisible] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [suggestions, setSuggestions] = useState<string[]>([]);

//   const user = auth().currentUser;

//   const showSnackbar = (message: string) => {
//     setSnackbarMessage(message);
//     setSnackbarVisible(true);
//   };

//   useEffect(() => {
//     const normalized = productsData.map(p => ({
//       ...p,
//       salePrice: p.salePrice ?? 0,
//     }));
//     setAllProducts(normalized);
//   }, []);

//   useEffect(() => {
//     const loadLists = async () => {
//       try {
//         if (user) {
//           const doc = await firestore().collection('users').doc(user.uid).get();
//           if (doc.exists() && doc.data()?.lists) {
//             setLists(doc.data()?.lists);
//           }
//         } else {
//           const local = await AsyncStorage.getItem(STORAGE_KEY);
//           if (local) setLists(JSON.parse(local));
//         }
//       } catch (e) {
//         console.error('Load error:', e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadLists();
//   }, []);

//   useEffect(() => {
//     if (!loading && user) {
//       firestore()
//         .collection('users')
//         .doc(user.uid)
//         .set({ lists }, { merge: true })
//         .catch(console.error);
//     }
//     AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists)).catch(
//       console.error,
//     );
//   }, [lists]);

//   const addProduct = () => {
//     const trimmed = inputValue.trim();
//     if (!trimmed) return;

//     const baseName = trimmed.toLowerCase();
//     if (recData[baseName]) {
//       setSuggestions(recData[baseName]);
//     }

//     const already = lists[currentList]?.some(
//       p => p.name.toLowerCase() === trimmed.toLowerCase(),
//     );
//     if (already) return showSnackbar('Product already in list');

//     const newItem: ProductItem = {
//       name: trimmed,
//       price: 0,
//       checked: false,
//     };

//     setLists(prev => ({
//       ...prev,
//       [currentList]: [...(prev[currentList] ?? []), newItem],
//     }));

//     setInputValue('');
//     setFilteredSuggestions([]);
//     Keyboard.dismiss();
//     Haptic.trigger('impactLight');
//     showSnackbar('Product added');
//   };

//   const handleSuggestionPress = (product: Product) => {
//     const already = lists[currentList]?.some(
//       p => p.name.toLowerCase() === product.name.toLowerCase(),
//     );
//     if (already) return showSnackbar('Product already in list');

//     const newItem: ProductItem = {
//       id: product.id,
//       name: product.name,
//       brand: product.brand,
//       price: product.salePrice || product.price,
//       checked: false,
//       isEcoFriendly: product.isEcoFriendly ?? false,
//       ecoScore: product.ecoScore ?? 'F',
//     };

//     setLists(prev => ({
//       ...prev,
//       [currentList]: [...(prev[currentList] ?? []), newItem],
//     }));

//     setInputValue('');
//     setFilteredSuggestions([]);
//     Haptic.trigger('impactLight');
//     showSnackbar('Added from suggestions');
//   };

//   const deleteProduct = (name: string) => {
//     setLists(prev => ({
//       ...prev,
//       [currentList]: (prev[currentList] ?? []).filter(p => p.name !== name),
//     }));
//     Haptic.trigger('notificationWarning');
//     showSnackbar('Item deleted');
//   };

//   const toggleChecked = (index: number) => {
//     setLists(prev => {
//       const updated = [...(prev[currentList] ?? [])];
//       updated[index].checked = !updated[index].checked;
//       return { ...prev, [currentList]: updated };
//     });
//     Haptic.trigger('impactLight');
//   };

//   const currentItems = lists[currentList] ?? [];
//   const checkedCount = currentItems.filter(p => p.checked).length;
//   const totalCount = currentItems.length;
//   const total = currentItems
//     .filter(p => p.checked)
//     .reduce((sum, p) => sum + p.price, 0);
//   const progressText = `✓ ${checkedCount} of ${totalCount} items`;

//   const handleInputChange = (text: string) => {
//     setInputValue(text);
//     const matches = allProducts.filter(p =>
//       p.name.toLowerCase().includes(text.toLowerCase()),
//     );
//     setFilteredSuggestions(matches.slice(0, 5));
//   };

//   const handleAddSuggested = (item: string) => {
//     const already = lists[currentList]?.some(
//       p => p.name.toLowerCase() === item.toLowerCase(),
//     );
//     if (already) return;
//     const newItem = { name: item, price: 0, checked: false };
//     setLists(prev => ({
//       ...prev,
//       [currentList]: [...(prev[currentList] ?? []), newItem],
//     }));
//     setSuggestions([]);
//     showSnackbar(`Suggested: ${item} added`);
//   };

//   const renameList = () => {
//     setRenameValue('');
//     setRenameModalVisible(true);
//   };

//   const confirmRename = () => {
//     const newName = renameValue.trim();
//     if (!newName) return showSnackbar('Enter a valid name');
//     if (lists[newName]) return showSnackbar('List already exists');

//     setLists(prev => {
//       const updated = { ...prev };
//       updated[newName] = updated[currentList];
//       delete updated[currentList];
//       return updated;
//     });

//     setCurrentList(newName);
//     setRenameModalVisible(false);
//     showSnackbar(`Renamed to "${newName}"`);
//   };

//   const deleteList = () => {
//     if (currentList === 'Default')
//       return showSnackbar("Can't delete Default list");
//     Alert.alert('Delete List?', `Delete "${currentList}"?`, [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: () => {
//           setLists(prev => {
//             const updated = { ...prev };
//             delete updated[currentList];
//             return updated;
//           });
//           setCurrentList('Default');
//           showSnackbar('List deleted');
//         },
//       },
//     ]);
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.centered}>
//         <ActivityIndicator size="large" color="#fb8500" />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.wrapper}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         style={{ flex: 1 }}
//       >
//         <TopBar title="Shopping List" showGreeting={false} />
//         <View style={styles.container}>
//           {/* List Actions */}
//           <View style={styles.actionsRow}>
//             <Text style={styles.header}>{currentList}</Text>
//             <TouchableOpacity onPress={renameList} style={styles.actionButton}>
//               <Text style={styles.actionButtonText}>Rename</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={deleteList}
//               style={[styles.actionButton, { backgroundColor: '#ffd6d6' }]}
//             >
//               <Text style={[styles.actionButtonText, { color: '#d00000' }]}>
//                 Delete
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* List Selector */}
//           <View style={styles.dropdownWrapper}>
//             <Picker
//               selectedValue={currentList}
//               onValueChange={val => setCurrentList(val)}
//               style={styles.picker}
//             >
//               {Object.keys(lists).map(name => (
//                 <Picker.Item key={name} label={name} value={name} />
//               ))}
//             </Picker>
//             <TouchableOpacity
//               style={styles.newListButton}
//               onPress={() => {
//                 const newList = `List ${Object.keys(lists).length + 1}`;
//                 setLists(prev => ({ ...prev, [newList]: [] }));
//                 setCurrentList(newList);
//               }}
//             >
//               <Text style={styles.addButtonText}>+ New</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Input */}
//           <View style={styles.inputContainer}>
//             <TextInput
//               ref={inputRef}
//               value={inputValue}
//               onChangeText={handleInputChange}
//               placeholder="Enter product..."
//               style={styles.input}
//             />
//             <TouchableOpacity onPress={addProduct} style={styles.addButton}>
//               <Text style={styles.addButtonText}>Add</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Auto Suggestions */}
//           {filteredSuggestions.length > 0 && (
//             <FlatList
//               data={filteredSuggestions}
//               keyExtractor={item => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => handleSuggestionPress(item)}
//                   style={styles.suggestionItem}
//                 >
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                     }}
//                   >
//                     <Text>{item.name}</Text>
//                     <Text>₹{item.salePrice || item.price}</Text>
//                   </View>
//                 </TouchableOpacity>
//               )}
//               style={styles.suggestionList}
//             />
//           )}

//           {/* Recommendations */}
//           {suggestions.length > 0 && (
//             <View style={{ marginTop: 20 }}>
//               <Text
//                 style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 5 }}
//               >
//                 You may also need:
//               </Text>
//               {suggestions.map((item, idx) => (
//                 <TouchableOpacity
//                   key={idx}
//                   onPress={() => handleAddSuggested(item)}
//                   style={{
//                     padding: 10,
//                     backgroundColor: '#e0f0ff',
//                     marginVertical: 4,
//                     borderRadius: 8,
//                   }}
//                 >
//                   <Text>{item}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}

//           {/* List View */}
//           <FlatList
//             data={currentItems}
//             keyExtractor={(item, idx) => `${item.name}-${idx}`}
//             renderItem={({ item, index }) => (
//               <ListCard
//                 productName={item.name}
//                 price={item.price}
//                 checked={item.checked}
//                 onDelete={() => deleteProduct(item.name)}
//                 onToggle={() => toggleChecked(index)}
//                 isEco={item.isEcoFriendly}
//                 ecoScore={item.ecoScore}
//               />
//             )}
//             contentContainerStyle={{ paddingBottom: 100 }}
//           />
//         </View>

//         {/* Summary Footer */}
//         {totalCount > 0 && (
//           <View style={styles.summaryBox}>
//             <Text style={styles.summaryText}>{progressText}</Text>
//             <Text style={styles.summaryText}>
//               Total (Checked): ₹{total.toFixed(2)}
//             </Text>
//           </View>
//         )}

//         {/* Rename Modal */}
//         <Modal visible={renameModalVisible} transparent animationType="slide">
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContainer}>
//               <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
//                 Rename List
//               </Text>
//               <TextInput
//                 value={renameValue}
//                 onChangeText={setRenameValue}
//                 placeholder="New list name"
//                 style={styles.modalInput}
//               />
//               <View style={styles.modalActions}>
//                 <TouchableOpacity onPress={() => setRenameModalVisible(false)}>
//                   <Text style={{ color: '#888' }}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={confirmRename}>
//                   <Text style={{ color: '#3a86ff', fontWeight: 'bold' }}>
//                     Rename
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>

//         {/* Snackbar */}
//         <Snackbar
//           visible={snackbarVisible}
//           onDismiss={() => setSnackbarVisible(false)}
//           duration={3000}
//           style={{
//             backgroundColor: '#2a3d45',
//             borderRadius: 8,
//             margin: 16,
//             marginBottom: 60,
//             // opacity: 0.9,
//           }}
//         >
//           <Text style={{ color: '#fff', fontWeight: 'bold' }}>
//             {snackbarMessage}
//           </Text>
//         </Snackbar>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: { flex: 1, backgroundColor: '#fff' },
//   container: { flex: 1, padding: 16 },
//   header: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
//   inputContainer: { flexDirection: 'row', marginBottom: 12, gap: 10 },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//   },
//   addButton: { backgroundColor: '#3a86ff', padding: 12, borderRadius: 8 },
//   addButtonText: { color: '#fff', fontWeight: 'bold' },
//   dropdownWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   picker: { flex: 1, backgroundColor: '#f1f3f5', borderRadius: 8 },
//   newListButton: {
//     marginLeft: 10,
//     backgroundColor: '#3a86ff',
//     padding: 10,
//     borderRadius: 8,
//   },
//   suggestionItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//   },
//   suggestionList: {
//     maxHeight: 150,
//     borderRadius: 8,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 12,
//     backgroundColor: '#f9f9f9',
//   },
//   actionsRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
//   actionButton: {
//     backgroundColor: '#e6f0ff',
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//     borderRadius: 30,
//   },
//   actionButtonText: { color: '#3a86ff', fontSize: 10 },
//   summaryBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#e6f4ea',
//     padding: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 50,
//   },
//   summaryText: {
//     color: '#2e7d32',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     width: '80%',
//     borderRadius: 10,
//   },
//   modalInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//     padding: 10,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   modalActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

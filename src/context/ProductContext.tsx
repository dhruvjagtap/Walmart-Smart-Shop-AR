import React, { createContext, useContext, useState } from 'react';

type ProductItem = {
  id?: string;
  name: string;
  category?: string;
  brand?: string;
  price: number;
  checked: boolean;
  isEcoFriendly?: boolean;
  ecoScore?: string;
  confirmedAt?: string;
};

type ProductListMap = {
  [listName: string]: ProductItem[];
};

type ProductContextType = {
  confirmedItems: ProductItem[];
  setConfirmedItems: React.Dispatch<React.SetStateAction<ProductItem[]>>;

  lists: ProductListMap;
  setLists: React.Dispatch<React.SetStateAction<ProductListMap>>;

  selectedListName: string;
  setSelectedListName: React.Dispatch<React.SetStateAction<string>>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [confirmedItems, setConfirmedItems] = useState<ProductItem[]>([]);
  const [lists, setLists] = useState<ProductListMap>({});
  const [selectedListName, setSelectedListName] = useState<string>('Default');

  return (
    <ProductContext.Provider
      value={{
        confirmedItems,
        setConfirmedItems,

        lists,
        setLists,

        selectedListName,
        setSelectedListName,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// export const useProductContext = () => {
//   const context = useContext(ProductContext);
//   if (!context) {
//     throw new Error('useProductContext must be used within a ProductProvider');
//   }
//   return context;
// };

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

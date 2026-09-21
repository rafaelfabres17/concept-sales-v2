export type ProductData = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

export type StockItem = {
  productId: ProductData["id"];
  content: string;
};

export function getProductData(): ProductData[] {
  const products: ProductData[] = [
    {
      id: 1010,
      name: "Pacote de Ícones",
      price: 150,
      stock: 0,
    },
    {
      id: 1020,
      name: "Bot de Vendas",
      price: 1000,
      stock: 0,
    },
    {
      id: 1030,
      name: "Bot de Ticket",
      price: 1500,
      stock: 0,
    },
  ];

  return products;
}

export function getStockData(): StockItem[] {
  const stock: StockItem[] = [
    // * Product 1010
    { productId: 1010, content: "x" },
    { productId: 1010, content: "xx" },
    { productId: 1010, content: "xxx" },
    { productId: 1010, content: "xxxx" },
    { productId: 1010, content: "xxxxx" },

    // * Product 1020
    { productId: 1020, content: "x" },

    // * Product 1030
  ];

  return stock;
}

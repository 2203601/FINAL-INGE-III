//fixtures --> datos de prueba

export const mockProducts = [
    {
      _id: "507f1f77bcf86cd799439011",
      name: "Café Colombia Premium",
      origin: "Colombia",
      type: "Arábica",
      price: 24.99,
      roast: "Medium",
      rating: 4.8,
      description: "Café de alta calidad de Colombia",
      createdAt: new Date("2024-01-15")
    },
    {
      _id: "507f1f77bcf86cd799439012",
      name: "Café Brasil Intenso",
      origin: "Brasil",
      type: "Robusta",
      price: 18.50,
      roast: "Dark",
      rating: 4.5,
      description: "Café brasileño de sabor intenso",
      createdAt: new Date("2024-01-16")
    },
    {
      _id: "507f1f77bcf86cd799439013",
      name: "Café Etiopía Suave",
      origin: "Etiopía",
      type: "Arábica",
      price: 28.00,
      roast: "Light",
      rating: 4.9,
      description: "Café etíope de sabor suave",
      createdAt: new Date("2024-01-17")
    }
  ];
  
  export const mockProductsEmpty = [];
  
  export const mockNewProduct = {
    name: "Café Nuevo Test",
    origin: "Costa Rica",
    type: "Arábica",
    price: 22.00,
    roast: "Medium",
    rating: 4.6,
    description: "Producto de prueba"
  };
  
  export const mockInvalidProduct = {
    // Falta name
    origin: "Colombia",
    type: "Arábica",
    price: "invalid", // Precio inválido
    roast: "Medium"
  };
  
  export const mockProductEdgeCases = {
    zeroPrice: {
      name: "Café Gratis",
      origin: "Test",
      type: "Arábica",
      price: 0,
      roast: "Medium",
      rating: 0
    },
    maxPrice: {
      name: "Café Carísimo",
      origin: "Test",
      type: "Arábica",
      price: 999999.99,
      roast: "Medium",
      rating: 5.0
    },
    longName: {
      name: "C".repeat(255),
      origin: "Test",
      type: "Arábica",
      price: 20.00,
      roast: "Medium",
      rating: 4.5
    },
    specialChars: {
      name: "Café ñ á é í ó ú @ # $ %",
      origin: "Test",
      type: "Arábica",
      price: 20.00,
      roast: "Medium",
      rating: 4.5
    },
    unicode: {
      name: "咖啡 Coffee कॉफी قهوة",
      origin: "多国",
      type: "Arábica",
      price: 20.00,
      roast: "Medium",
      rating: 4.5
    }
  };
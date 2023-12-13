import './App.css';
import axios from 'axios';

function App() {
  const addProduct = async () => {
    try {
      const product = {
        name: 'phone',
        price: '2000',
        description: 'iphone',
        imageUrl: '-',
        isActive: true
      };
      const response = await axios.post(
        'http://localhost:3001/api/products',
        product
      );

      console.log('Product added:', response.data);
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };

  return (
    <div className="App">
      <button type="submit" onClick={() => addProduct()}>
        Save To DB
      </button>
    </div>
  );
}

export default App;

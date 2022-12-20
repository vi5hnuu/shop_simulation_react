import { useState } from 'react';
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart';
import CartProvider from './Store/CartProvider'
import firebaseConfig from './firebaseConf';
import { initializeApp } from "firebase/app";

function App() {
  console.log('app');
  const [cartIsShown, setCartIsShown] = useState(false)
  useState(() => {
    initializeApp(firebaseConfig)
  }, [])
  const showCartHandler = () => {
    setCartIsShown(true)
  }
  const hideCartHandler = () => {
    setCartIsShown(false)
  }


  return <CartProvider>
    {cartIsShown && <Cart onClose={hideCartHandler} />}
    <Header onShowCart={showCartHandler} />
    <Meals />
  </CartProvider>
}

export default App;

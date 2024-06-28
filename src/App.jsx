import "./App.css";
import Routing from "./components/Routing/Routing";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI, getCartAPI } from "./services/cartServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

setAuthToken(localStorage.getItem("token"));

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex((item) => item.product._id === product._id);
    if (productIndex === -1) {
      updatedCart.push({ product: product, quantity: quantity });
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);

    addToCartAPI(product._id, quantity)
      .then((res) => {
        toast.success("상품을 추가하였습니다.");
      })
      .catch((err) => {
        toast.error("상품 추가에 실패하였습니다.");
      });
  };

  useEffect(() => {

    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (err) {}

  }, []);

  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        toast.error('카트 가져오기에 실패했습니다.');
      });
  };

  useEffect(() => {
    getCart();
  },[user])

  return (
    <div className="app">
      <Navbar user={user} cartCount={cart.length} />
      <main>
        <ToastContainer position="bottom-right" />
        <Routing addToCart={addToCart} cart={cart} />
      </main>
    </div>
  );
}

export default App;

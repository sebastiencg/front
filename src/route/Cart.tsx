import { Navbar } from "../compoment/Navbar";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

function ProductAddCart() {
  const [cart, setCart] = useState([]); // State pour stocker les produits dans le panier

  useEffect(() => {
    // Fonction pour charger le panier depuis le localStorage au chargement du composant
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []); // Dépendance vide pour exécuter l'effet une seule fois au montage

  const removeFromCart = (productId) => {
    // Fonction pour supprimer un produit du panier
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Mettre à jour le localStorage
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Mettre à jour le localStorage
  };

  const increaseQuantity = (productId) => {
    // Fonction pour augmenter la quantité d'un produit dans le panier
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Mettre à jour le localStorage
  };

  const decreaseQuantity = (productId) => {
    // Fonction pour diminuer la quantité d'un produit dans le panier
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        // Vérifier si la quantité est supérieure à 1 avant de la diminuer
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          // Si la quantité est égale à 1, retourner l'élément sans le modifier
          return item;
        }
      } else {
        // Retourner les autres éléments du panier sans les modifier
        return item;
      }
    });

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Mettre à jour le localStorage
  };


  const removeAllFromCart = () => {
    // Fonction pour vider complètement le panier
    setCart([]);
    localStorage.removeItem('cart'); // Supprimer le panier du localStorage
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="row">
            {cart.map((item) => (
              <div className="col-md-6 mb-4" key={item.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Price: ${item.price}</p>
                    <p className="card-text">Quantity: {item.quantity}</p>
                    <div className="btn-group" role="group" aria-label="Quantity">
                      <button
                        className="btn btn-warning" style={{ marginRight: '10px' ,width:'30px'}}
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-danger mt-2" style={{ marginLeft: '40px' }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-md-12 mt-4">
              <button
                className="btn btn-danger"
                onClick={removeAllFromCart}
              >
                Remove All
              </button>
              <Link className="btn btn-success" to="/payment" style={{ marginLeft: '40px' }}
              >
                finaliser
              </Link>

            </div>
          </div>
        )}
      </div>

    </>
  );
}

export default ProductAddCart;

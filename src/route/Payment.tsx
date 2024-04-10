import  { useState, useEffect } from 'react';
import axios from 'axios';
import {Navbar} from "../compoment/Navbar";
import Jwt from "../jwt/Jwt";

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    const fetchTotalAmount = async () => {
      const token = await Jwt();
      try {
        const payload = storedCart.map(item => ({
          [item.id]: item.quantity
        }));
        console.log(payload);

        const response = await axios.post('https://127.0.0.1:8000/api/order/total',{
          "id":payload
        } , {
          headers: {'Authorization': `Bearer ${token}`}
        }
      );

        console.log(response);
        setTotalAmount(response.data.total);
      } catch (error) {
        console.error('Erreur lors de la récupération du montant total :', error);
      }
    };

    fetchTotalAmount(); // Appeler la fonction pour charger le montant total au chargement de la page
  }, []); // Le tableau vide en tant que deuxième argument signifie que ce useEffect s'exécute une seule fois au chargement

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    // Simuler le traitement du paiement (ici, simplement une console.log)
    console.log('Informations de la carte :', { cardNumber, expiryDate, cvv });
    console.log('Montant total à payer :', totalAmount);

    // Réinitialiser les champs après soumission
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
  };

  return (
    <>
      <Navbar/>
      <div className="container mt-5">
        <h1 className="mb-4">Page de Paiement</h1>
        <form onSubmit={handlePaymentSubmit}>
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Numéro de carte :</label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9101 1121"
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="expiryDate" className="form-label">Date d'expiration :</label>
              <input
                type="text"
                className="form-control"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
              />
            </div>
            <div className="col">
              <label htmlFor="cvv" className="form-label">CVV :</label>
              <input
                type="text"
                className="form-control"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
              />
            </div>
          </div>
          <div className="mb-3">
            Montant total : <strong>{totalAmount} €</strong>
          </div>
          <button type="submit" className="btn btn-success" disabled={loading}>
            Payer
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentPage;

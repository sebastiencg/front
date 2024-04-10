import { useEffect, useState } from 'react';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let url = "https://127.0.0.1:8000";

        // Effectuer une requête GET vers votre endpoint API
        const response = await fetch(url+'/api/order/total');

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          throw new Error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []); // Le tableau de dépendances est vide pour exécuter l'effet une seule fois au chargement

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <strong>Order ID:</strong> {order.id} <br />
            <strong>Customer:</strong> {order.customerName} <br />
            <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)} <br />
            <strong>Status:</strong> {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;

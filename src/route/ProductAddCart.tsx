import {Navbar} from "../compoment/Navbar";
import Jwt from "../jwt/Jwt";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ProductAddCart() {
  type Product = {
    id: number;
    name: string;
    price: number;
  };
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchData() {
    const token = await Jwt();
    try {
      const response = await axios.get<Product>(`https://exam2.miantsebastien.com/api/product/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const productId = response.data.id;
      const productName = response.data.name;
      const productPrice = response.data.price;

      // Récupérer le panier depuis le localStorage
      let productsInCart = JSON.parse(localStorage.getItem('cart')) || [];

      // Vérifier si le produit est déjà dans le panier en comparant les IDs
      const isProductInCart = productsInCart.some((item: Product) => item.id === productId);

      if (!isProductInCart) {
        // Le produit n'est pas encore dans le panier, on l'ajoute
        const productToAdd = { id: productId, name: productName, price: productPrice, quantity: 1 };
        productsInCart.push(productToAdd);

        // Mettre à jour le localStorage avec le nouveau panier
        localStorage.setItem('cart', JSON.stringify(productsInCart));

        // Afficher une notification de succès
        await Swal.fire({
          title: "Succès!",
          text: `Produit "${productName}" ajouté au panier`,
          icon: "success",
          confirmButtonText: 'Cool'
        });

        // Rediriger vers la page du panier
        navigate("/cart");
      } else {
        // Le produit est déjà dans le panier, afficher un message
        await Swal.fire({
          title: "Oops!",
          text: `Le produit "${productName}" est déjà dans votre panier`,
          icon: "info",
          confirmButtonText: "OK"
        });

        // Rediriger vers la page du panier
        navigate("/cart");
      }
    } catch (error) {
      // Erreur lors de la récupération du produit
      await Swal.fire({
        title: "Oops!",
        text: "Produit introuvable",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  }

  useEffect(() => {

    fetchData();
  }, []);
  return (
    <>
    </>
  );
}

export default ProductAddCart;

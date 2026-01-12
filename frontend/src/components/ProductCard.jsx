import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Razorpay from "razorpay";


function ProductCard() {
  const [products, setProducts] = useState([]);

  const Razorpay_key_id = import.meta.env.VITE_RAZORPAY_KEY_ID;

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:5000/courses");
    setProducts(response.data);
  };

  
  const loadScript = (src) => {
      return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
              resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };
    
    const handleBuy = async (productId) => {
        try {
            const response = await axios.post("http://localhost:5000/payments/createOrder", {
                courseId: productId,
            });
            const order = response.data;
            const paymentObject = new window.Razorpay({
                key: Razorpay_key_id,
                amount: order.amount,
                currency: "INR",
                name: "Course Payment",
                description: "Course Payment",
                order_id: order.id,
                handler: (response) => {
                    axios.post("http://localhost:5000/payments/verifyPayment", {
                        order_id: order.id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                    });
                },
            });
            paymentObject.open();
        } catch (error) {
            console.log(error);
        }
    }; 

    useEffect(() => {
      fetchProducts();
      loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }, []);
    
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.price}
                  </span>

                  <button onClick={() => handleBuy(product._id)} className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800 transition">
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

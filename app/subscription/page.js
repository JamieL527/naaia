"use client"
import { useState, useEffect } from "react";
import PricingTable from "../../components/pricingtable";
import getStripe from "../../lib/getstripe";

const baseBtnStyle = "xl:w-1/3 m-auto px-6 py-2 mt-5 text-center text-white bg-indigo-600 rounded-md";

export default function Page() {
  const [productId, setProductId] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Retrieve the email stored in local storage
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setEmail(userEmail);
      console.log("Email found in local storage:", userEmail);
    }else {
      console.log("Email not found in local storage.");
    }
  }, []);

  const handleCreateCheckoutSession = async () => {
    if (!productId || !email) {
      console.error("Plan or email information is missing.");
      return;
    }
    try {
      const res = await fetch(`/api/stripe/checkout-session`, {
        method: "POST",
        body: JSON.stringify({ productId, email }), // Ensure correct keys are used
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const { sessionId } = await res.json();

      if (!sessionId) {
        throw new Error("Failed to create checkout session: No session ID returned.");
      }

      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error during checkout session creation:', error.message);
    }
  };

  return (
    <div className="m-auto w-fit flex flex-col justify-center">
      <h1 className="mt-8 text-2xl text-center font-bold text-gray-800">Choose Your Plan</h1>
      <PricingTable selectedPlan={{ plan: productId, setPlan: setProductId }} />
      <button className={baseBtnStyle} onClick={handleCreateCheckoutSession}>
        Go To Checkout
      </button>
    </div>
  );
}
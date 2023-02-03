import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Stripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [clicked, setClicked] = useState(false)
  useEffect(() => {
    fetch("http://localhost:3005/config").then(async (r) => {
      const result = await r.json()
      setStripePromise(await loadStripe(result.publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3005/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <div>
  <button onClick={() => setClicked(!clicked)} className="flex items-center mt-auto text-black bg-[#a70805] border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">Stripe
           <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-auto" viewBox="0 0 24 24">
           <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
      </button>
      {clicked ?
        <>
          {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm />
            </Elements>
          )}
        </>
        : null
      }
        </div>
  );
}

export default Payment;
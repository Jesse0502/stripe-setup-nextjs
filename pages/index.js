import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import Image from "next/image";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const HomePage = () => {
  const router = useRouter();
  const { success, canceled } = router.query;

  useEffect(() => {
    if (success !== undefined || canceled !== undefined) {
      if (success) {
        console.log("Order placed! You will receive an email confirmation.");
      }

      if (canceled) {
        console.log(
          "Order canceled -- continue to shop around and checkout when you’re ready."
        );
      }
    }
  }, [success, canceled]);

  return (
    <form action="/api/checkout_sessions" method="POST" className="form">
      <section>
        <div>
          <Image
            className="image"
            src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            alt="Some Images"
            width={250}
            height={180}
          />
          <div className="description">
            <h3 className="heading">Some Images</h3>
            <h5 className="price">$30</h5>
          </div>
        </div>
        <input
          className="none"
          defaultValue={JSON.stringify([
            { price: "price_1LSzn8SBGCuGF4wHZRPxWwBQ", quantity: 1 },
            { price: "price_1LSzpSSBGCuGF4wHH7gBuQzv", quantity: 1 },
          ])}
          type="text"
          name="data"
        />
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          .description {
            float: right;
            margin-left: 10px;
          }
          .form {
            margin: auto;
            width: 40%;
            margin-top: 30vh;
          }
          .none {
            display: none;
          }
          .image {
            float: left;
          }
          .heading {
            font-size: 28px;
            font-weight: 200;
          }
          .price {
            font-size: 18px;
            font-weight: bold;
          }
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 450px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 45px;
            padding: 10px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
};

export default HomePage;

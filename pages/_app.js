import "../styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store";
import { store } from "../store";
import Preloader from "../components/Preloader";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { connectDB } from "../config/db";

connectDB();

function MyApp({ Component, pageProps, router }) {
  // set a timeout for the preloader to show
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowPreloader(false);
    }, 6000);
  }, []);

  return (
    <>
      {
        // show the preloader if it's true
        showPreloader ? (
          <Preloader />
        ) : (
          <motion.div
            key={router.route}
            initial={{ opacity: 0.4, transform: "scale(0.9)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
          >
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
              </PersistGate>
            </Provider>
          </motion.div>
        )
      }
    </>
  );
}

export default MyApp;

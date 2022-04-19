import React from "react";
import "./App.css";
import { NavBar, Footer, Welcome, Services, Transactions } from "./components";

export default function App() {
  // const theme = useContext(ThemeContext);
  // const { t, i18n } = useContext(LocalicationContext);
  // const darkMode = theme.state.darkMode;
  // const [currentAccount, setCurrentAccount] = useState("");
  // const [allWaves, setAllWaves] = useState([]);
  // const [contact, setContact] = useState({
  //   name: "",
  //   message: "",
  // });

  // useEffect(() => {
  //   document.body.classList.toggle("bg-black", darkMode);
  //   checkIfWalletIsConnected();
  //   getAllWaves();

  //   return () => {
  //     document.body.classList.remove("bg-black");
  //   };
  // }, [darkMode]);

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <NavBar />
        <Welcome />
      </div>
      <Footer/>
      <Services/>
      <Transactions/>
    </div>
  );
}

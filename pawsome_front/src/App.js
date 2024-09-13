import { Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div className="wrap">
      <Header />
      <main className="content">
        <Routes>
          <Route path="/"></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

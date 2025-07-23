import { Outlet } from "react-router-dom";

import Header from './components/common/Header';
import Footer from './components/common/Footer';



function App() {


  return (
    <div className="bg-black " >
      <Header />

      <main className="pt-20 bg-black  ">
        <Outlet />
      </main>
      
      <Footer />
    </div>

  )
};


export default App;
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalogpage from "./pages/Catalogpage";
import Adminpage from "./pages/Admin/Adminpage";


const App = () => {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Catalogpage />}></Route>
          <Route path="/admin" element={<Adminpage />}></Route>
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  )
}

export default App

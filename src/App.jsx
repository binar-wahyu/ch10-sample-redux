import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactUs from "./pages/ContactUs";
import BranchBali from "./pages/BranchBali";
import BranchJakarta from "./pages/BranchJakarta";
import BranchPadang from "./pages/BranchPadang";
import ArticleDetail from "./pages/ArticleDetail";
import RequireAuth from "./components/RequireAuth";
import { getCurrentUser } from "./store/slices/user";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tentang-kami" element={<h1>Tentang kami</h1>} />
          <Route path="/hubungi-kami" element={<ContactUs />}>
            <Route index element={<h1>Silahkan pilih cabang</h1>} />
            <Route path="bali" element={<BranchBali />} />
            <Route path="jakarta" element={<BranchJakarta />} />
            <Route path="padang" element={<BranchPadang />} />
          </Route>
          <Route
            path="/article/:id"
            element={
              <RequireAuth>
                <ArticleDetail />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

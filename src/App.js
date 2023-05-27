import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Invoices from './scenes/invoices';
import Store from './scenes/stores';
import Bar from './scenes/bar';
import Form from './scenes/form';
import Line from './scenes/line';
import Pie from './scenes/pie';
import FAQ from './scenes/faq';
import Geography from './scenes/geography';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Calendar from './scenes/calendar/calendar';
import StoreForm from './scenes/formStore';
import Category from './scenes/category';
import { Login } from './Login';
import SubCategory from './scenes/subCategory';
import CategoryForm from './scenes/catForm';
import { AuthContext } from './context/AuthProvider';
import AdminLayout from './layout/AdminLayout';
import Test from './Test';

function App() {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.isAuthenticated) {
      navigate('/');
    } else navigate('/Login');
  }, [authCtx]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route path="*" element={<AdminLayout />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

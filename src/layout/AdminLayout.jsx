import Team from '../scenes/team';
import SubCategory from '../scenes/subCategory';
import Dashboard from '../scenes/dashboard';
import Store from '../scenes/stores';
import Category from '../scenes/category';
import CategoryForm from '../scenes/catForm';
import Invoices from '../scenes/invoices';
import Form from '../scenes/form';
import Bar from '../scenes/bar';
import Pie from '../scenes/pie';
import Line from '../scenes/line';
import { FormatQuote } from '@mui/icons-material';
import Calendar from '../scenes/calendar/calendar';
import GeographyChart from '../components/GeographyChart';
import StoreForm from '../scenes/formStore';
import Sidebar from '../scenes/global/Sidebar';
import Topbar from '../scenes/global/Topbar';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

function AdminLayout() {
  //   const [isSidebar, setIsSidebar] = useState(true);
  return (
    <>
      <Sidebar />
      <main style={{ width: '100%' }}>
        <CssBaseline />
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Team />} exact />
          <Route path="/SubCategory" element={<SubCategory />} />
          <Route path="/boutiques" element={<Store />} />
          <Route path="/category" element={<Category />} />
          <Route path="/Addcategory" element={<CategoryForm />} />
          <Route path="/coupons" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FormatQuote />} />
          
          <Route path="/geography" element={<GeographyChart />} />
          <Route path="/AjoutBoutique" element={<StoreForm />} />
        </Routes>
      </main>
    </>
  );
}

export default AdminLayout;

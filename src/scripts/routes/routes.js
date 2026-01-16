import HomePage from '../pages/home/home-page'; // Opsional, bisa dihapus jika Dashboard jadi halaman utama
import Login from '../pages/login/login';
import Register from '../pages/register/register';
import Dashboard from '../pages/dashboard/dashboard';
import Add from '../pages/add/add';

const routes = {
  '/': Dashboard, // Kita set root ke Dashboard dulu (nanti kita kasih logika redirect kalau belum login)
  '/login': Login,
  '/register': Register,
  '/dashboard': Dashboard,
  '/add': Add,
};

export default routes;

import './App.css';
import RegisterForm from './pages/registration/RegisterForm';
import { ToastContainer} from 'react-toastify';
import Login from './pages/login/Login';
import Spinner from '../src/asset/Spinner-1s-200px.svg';
function App() {
  return (
   <>
   <div className='loader-wrapper'>
    <img src={Spinner} alt="loader" />
   </div>
   <ToastContainer/>
   <RegisterForm/>
   <Login/>
   </>
  );
}

export default App;

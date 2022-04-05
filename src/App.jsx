import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import OlvidePassword from './pages/OlvidePassword';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import NuevoPassword from './pages/NuevoPassword';
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';
import RutaProtegida from './layout/RutaProtegida';
import AdministrarPacientes from './pages/AdministrarPacientes';
import EditarPerfil from './pages/EditarPerfil';
import CambiarPassword from './pages/CambiarPassword';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>

          <Routes>
            
            {/* Página de Inicio de Sesión */}
            <Route path="/" element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path="registrar" element={<Registrar/>}/>
              <Route path="olvide-password" element={<OlvidePassword/>}/>
              <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
              <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
            </Route>

            {/* Áreas que necesitan autenticación */}

            <Route path="/admin" element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>}/>
              <Route path="perfil" element={<EditarPerfil/>}/>
              <Route path="cambiar-password" element={<CambiarPassword/>}/>
            </Route>

          </Routes>
          
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
  
}

export default App
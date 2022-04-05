import React, { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if ([email, password].includes('')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true});
      return;
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/login', {email, password});
      localStorage.setItem('token', data.token);
      setAuth(data);
      navigate('/admin');
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }

  }

  const {msg} = alerta;

  return (
    <Fragment>
          <div>
            <h1 className='text-indigo-600 font-black text-6xl'>Inicia Sesión y Administra tus {""} <span className='text-black'>Pacientes</span></h1>
          </div>
          <div className='mt-20 md:mt-5 shadow-lg px-5 py-4 rounded-xl bg-white'>

            { msg && <Alerta alerta={alerta} /> }


            {/* Formulario */}
            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className='my-5'> 
                <label className='uppercase text-gray-600 block text-lg font-bold'>Email</label>
                <input type="email" placeholder='Email de registro' className='border w-full p-2 mt-2 bg-gray-50 rounded-xl'
                  value={email} onChange={e => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className='my-5'>
                <label className='uppercase text-gray-600 block text-lg font-bold'>Contraseña</label>
                <input type="password" placeholder='Ingresa tu contraseña' className='border w-full p-2 mt-2 bg-gray-50 rounded-xl'
                  value={password} onChange={e => setPassword(e.target.value)}
                />
              </div>

              <input type="submit" value="Iniciar sesión" className='bg-indigo-700 text-lgw-full py-2 px-10 rounded-xl text-white uppercase font-bold mt-3 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'/>

            </form>

            <nav className='mt-3 lg:flex lg:justify-between'>
              <Link className='block text-center my-3 text-gray-500' to="/registrar">¿No tienes una cuenta? Crea una aquí</Link>
              <Link className='block text-center my-3 text-gray-500' to="/olvide-password">Olvidé mi contraseña</Link>
            </nav>
          </div>

    </Fragment>
  )
}

export default Login
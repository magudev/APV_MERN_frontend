import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valida campos vacíos
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true});
      return;
    }

    // Valida que coincidan las contraseñas
    if (password !== repetirPassword) {
      setAlerta({ msg: 'Las contraseñas no coinciden', error: true});
      return;
    }

    // Valida longitud de contraseña
    if (password.length < 6) {
      setAlerta({ msg: 'La contraseña debe tener como mínimo 6 caracteres', error: true});
      return;
    }

    setAlerta({});

    // Crear el usuario en la API
    try {
      await clienteAxios.post('/veterinarios', { nombre, email, password });
      setAlerta({
        msg: 'Cuenta creada correctamente. Revisa tu email.',
        error: false
      });
      //Estas lineas hacen reset de los campos una vez se accione y se cree el usuario
      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

  }

  const { msg } = alerta;

  return (
    <Fragment>
        <div>
           <h1 className='text-indigo-600 font-black text-6xl'>Crea tu Cuenta y Administra tus {""}<span className='text-black'>Pacientes</span></h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-4 rounded-xl bg-white'>

          { msg && <Alerta alerta={alerta} /> }

          {/* Formulario */}
          <form onSubmit={handleSubmit}>

            <div className='my-5'> 
              <label className='uppercase text-gray-600 block text-lg font-bold'>Nombre</label>
              <input type="text" placeholder='Tu nombre' className='border w-full p-2 mt-2 bg-gray-50 rounded-xl'
                value={nombre} onChange={e => setNombre(e.target.value)}
              />
            </div>

            <div className='my-5'> 
              <label className='uppercase text-gray-600 block text-lg font-bold'>Email</label>
              <input type="email" placeholder='Email de registro' className='border w-full p-2 mt-2 bg-gray-50 rounded-xl'
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className='my-5'> 
              <label className='uppercase text-gray-600 block text-lg font-bold'>Crea tu contraseña</label>
              <input type="password" placeholder='Ingresa una contraseña' className='border w-full p-2 mt-2 bg-gray-50 rounded-xl'
                value={password} onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div className='my-5'> 
              <label className='uppercase text-gray-600 block text-lg font-bold'>Repite tu contraseña</label>
              <input type="password" placeholder='Repite tu contraseña' className='border w-full p-2 mt-2 bg-gray-50 rounded-xl'
                value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)}
              />
            </div>

            <input type="submit" value="Crear cuenta" className='bg-indigo-700 w-full py-2 px-10 rounded-xl text-white uppercase font-bold mt-3 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'/>

          </form>
           
          <nav className='mt-3 lg:flex lg:justify-between'>
            <Link className='block text-center my-3 text-gray-500' to="/">Ya tienes una cuenta? Inicia sesión</Link>
          </nav>

        </div>

    </Fragment>
  )
}

export default Registrar
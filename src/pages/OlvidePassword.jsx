import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '') {
      setAlerta({ msg: 'El email es obligatorio', error: true });
      return;
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email});
      setAlerta({ msg: data.msg });
      setEmail('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <Fragment>
        <div>
           <h1 className='text-indigo-600 font-black text-6xl'>Recupera tu cuenta y accede a tus {""}<span className='text-black'>Pacientes</span></h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-4 rounded-xl bg-white'>

          { msg && <Alerta alerta={alerta} /> }

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
          >

            <div className='my-5'> 
              <label className='uppercase text-gray-600 block text-lg font-bold'>Email</label>
              <input type="text" placeholder='Email de registro' className='border w-full p-2 mt-2 bg-gray-50 rounded-xl'
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>

            <input type="submit" value="Enviar instrucciones" className='bg-indigo-700 w-full py-2 px-10 rounded-xl text-white uppercase font-bold mt-3 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'/>

          </form>

          <nav className='mt-3 lg:flex lg:justify-between'>
            <Link className='block text-center my-3 text-gray-500' to="/">Ya tienes una cuenta? Inicia sesión</Link>
          </nav>

        </div>
    </Fragment>
  )
}

export default OlvidePassword
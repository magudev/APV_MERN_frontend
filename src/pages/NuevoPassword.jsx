import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setAlerta({ msg : 'Establece tu nueva contraseña'});
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                })
            }
        }
        comprobarToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6 || password === '') {
            setAlerta({ msg: 'La contraseña debe tener al menos 6 caracteres', error: true});
            return;
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`;
            const { data } = await clienteAxios.post(url, { password });

            setAlerta({ msg: data.msg });
            setPassword('');
            setPasswordModificado(true);

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
            <h1 className='text-indigo-600 font-black text-6xl'>Reestablece tu contraseña y Administra tus {""}<span className='text-black'>Pacientes</span></h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-4 rounded-xl bg-white'>

                { msg && <Alerta alerta={alerta} /> }

                { tokenValido && (
                    <form onSubmit={handleSubmit}>
                        <div className='my-5'> 
                            <label className='uppercase text-gray-600 block text-lg font-bold'>Nueva contraseña</label>
                            <input type="password" placeholder='Ingresa una contraseña' className='border w-full p-2 mt-2 bg-gray-50 rounded-xl'
                                value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <input type="submit" value="Crear nueva contraseña" className='bg-indigo-700 w-full py-2 px-10 rounded-xl text-white uppercase font-bold mt-3 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'/>
                    </form>
                )}

                { passwordModificado && 
                    <Link className='block text-center my-3 text-gray-500' to="/">Vuelve a iniciar sesión</Link>
                }
                 
            </div>
        </Fragment>
  )
}

export default NuevoPassword
import React, { useState , useEffect} from 'react';
import { Fragment } from 'react';
import Alerta from './Alerta';
import usePacientes from '../hooks/usePacientes';

const Formulario = () => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [id, setId] = useState(null);
 
  const [alerta, setAlerta] = useState({});
  
  const { guardarPaciente, paciente } = usePacientes();

  useEffect(() => {
    
    if (paciente?.nombre) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(new Date(paciente.fecha).toISOString());
      setSintomas(paciente.sintomas);
      setId(paciente._id);
    }

  }, [paciente]);

  const handleSubmit = e => {
    e.preventDefault();

    // Validar el formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg : 'Todos los campos son obligatiorios',
        error : true
      });
      return;
    }

    
    guardarPaciente({nombre, propietario, email, fecha, sintomas, id });
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setId(null);

  }

  const { msg } = alerta;

  return (
    <Fragment>
      <h2 className='font-black text-2xl text-center'>Administrador de pacientes</h2>
      <p className='text-xl mt-5 mb-10 text-center'>
          Añade tus pacientes {''} 
          <span className='text-indigo-600 font-bold'>y administralos</span>
      </p>
      
      <form className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md' onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label htmlFor='nombre' className='text-gray-700 uppercase font-bold'>Nombre mascota</label>
          <input type="text" id="nombre" placeholder="Nombre de tu mascota" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={nombre} onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='propietario' className='text-gray-700 uppercase font-bold'>Nombre dueño</label>
          <input type="text" id="propietario" placeholder="Nombre del dueño" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={propietario} onChange={e => setPropietario(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='email' className='text-gray-700 uppercase font-bold'>Email dueño</label>
          <input type="email" id="email" placeholder="Email del dueño" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email} onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='fecha' className='text-gray-700 uppercase font-bold'>Fecha alta</label>
          <input type="date" id="fecha" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={fecha} onChange={e => setFecha(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='sintomas' className='text-gray-700 uppercase font-bold'>Síntomas</label>
          <textarea id="sintomas" placeholder="Describe los síntomas" className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={sintomas} onChange={e => setSintomas(e.target.value)}
          />
        </div>

        { msg && <Alerta alerta={alerta}/> }

        <input type="submit" value={ id ? 'Guardar cambios' : 'Agregar paciente'} className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-md mt-5'/>

      </form>
    </Fragment>
  )
}

export default Formulario
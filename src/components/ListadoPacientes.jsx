import React from 'react'
import usePacientes from '../hooks/usePacientes';
import { Fragment } from 'react';
import Paciente from './Paciente';

const ListadoPacientes = () => {

  const { pacientes } = usePacientes();
  
  return (
    <Fragment>
      { pacientes.length ? (
        <Fragment>
          <h2 className='font-black text-2xl text-center'>Listado de pacientes</h2>
          <p className='text-xl mt-5 mb-10 text-center'>
            Administra tus {''} 
            <span className='text-indigo-600 font-bold'>pacientes y citas</span>
          </p>

          { pacientes.map(paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </Fragment>
      ) : (
        <Fragment>
          <h2 className='font-black text-3xl text-center'>No hay pacientes</h2>
          <p className='text-xl mt-5 mb-10 text-center'>
            Comienza agregando pacientes {''} 
            <span className='text-indigo-600 font-bold'>y aparecerán en este lugar</span>
          </p>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ListadoPacientes
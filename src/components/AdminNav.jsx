import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className='flex gap-3'>
        <Link to="/admin/perfil" className='font-bold uppercase text-gray-'>Perfil</Link>
        <Link to="/admin/cambiar-password" className='font-bold uppercase text-gray-'>Cambiar contraseña</Link>
    </nav>
  )
}

export default AdminNav
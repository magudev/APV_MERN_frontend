import React, { Fragment } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const RutaProtegida = () => {

    const { auth, cargando } = useAuth(); 

    if (cargando) {
        return 'Cargando...';
    }

    return (
        <Fragment>
            
            <Header/>

            { auth?._id ? (
                <main className='container mx-auto mt-10'>
                    <Outlet/>
                </main>
            ) : <Navigate to="/"/>}

            <Footer/>

        </Fragment>
    )
}

export default RutaProtegida
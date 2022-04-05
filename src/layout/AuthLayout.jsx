import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Fragment>
        <main className="container mx-auto md:grid md:grid-cols-2 mt-5 gap-12 p-5 items-center">
          <Outlet/>
        </main>
    </Fragment>
  )
}

export default AuthLayout
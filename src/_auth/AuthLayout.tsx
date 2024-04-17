import { Outlet, } from "react-router-dom";  

const AuthLayout = () => {

  return (
    <>
        <section className="flex flex-1 flex-col py-10 justify-center items-center">
            <Outlet/>
        </section>
    </>
  )
}

export default AuthLayout;
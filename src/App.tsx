import { Routes, Route,} from "react-router-dom"
import SignUpPage from "./_auth/forms/SignUpPage"
import SignInPage from "./_auth/forms/SignInPage"
import HomePage from "./_root/pages/HomePage"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import ErrorPage from "./_error/ErrorPage"



function App() {

  return (
    <main className="h-screen app-container">
      <Routes>
        <Route element={<AuthLayout/>}>
          <Route path="/sign-up" element={<SignUpPage/>}/>
          <Route path="/sign-in" element={<SignInPage/>}/>
        </Route>

        <Route element={<RootLayout/>}>
          <Route index element={<HomePage/>}/>
        </Route>
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </main>
  )
}

export default App

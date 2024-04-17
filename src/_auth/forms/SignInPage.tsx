import { HighlightOff } from "@mui/icons-material";
import { Button, TextField, } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignInAccount } from "../../lib/react-query/QueriesAndMutations";

type FormValues = {
  username: string,
  password: string,
}


const SignInPage = () => {
  const { mutateAsync: signInAccount } = useSignInAccount();
  const navigate = useNavigate();

  const saveUserCredentials = (key:string, secret:string) => {
    localStorage.setItem('userKey', key);
    localStorage.setItem('userSecret', secret);
};

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    }
  })

  async function onSubmit(data: FormValues) {
    try {
      const session = await signInAccount(data);

      if (session) {
        saveUserCredentials(session.data.key, session.data.secret);
        reset({
          username: "",
          password: "",
        });
        navigate("/");
      } else {
        console.error("Error logging in");
      }
    } catch (error) {
        console.log(error);
      }
    
  }


  const handleClearPassword = () => {
    reset({ password: '' });
  };

  return (
    <div className='z-10 custom-size py-12 px-7 rounded-xl '>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex justify-center items-center">
            <h1 className="h1-bold custom-font">Sign in</h1>
          </div>
          <div>
            <h2 className="font-semibold custom-font">Username</h2>
            <TextField
              fullWidth
              placeholder="Enter your username"
              type="username"
              {...register("username", { required: true })}
              error={!!errors.username}
              helperText={errors.username ? "Email is required" : ""}
            />
          </div>
          <div>
            <h2 className="font-semibold custom-font">Password</h2>
            <TextField
              fullWidth
              placeholder="Enter your password"
              type="password"
              color="secondary"
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors.password ? "Password is required" : ""}
              InputProps={{
                endAdornment: (
                  <HighlightOff onClick={handleClearPassword} style={{ cursor: 'pointer' }} />
                )
              }}
            />
          </div>
          <div className="pt-5">
            <Button 
              fullWidth 
              sx={{
                backgroundColor: '#6200EE',
              }} 
              type="submit" 
              variant="contained"
            >
              Submit
            </Button>
          </div>
          <p className=" text-center font-semibold custom-font">Don't have an account?
            <Link to="/sign-up" className=" font-semibold custom-font custom-color ml-1 text-small-semibold">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignInPage;
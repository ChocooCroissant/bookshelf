import { HighlightOff } from "@mui/icons-material";
import { Button, TextField, } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserAccountMutation } from "../../lib/react-query/QueriesAndMutations";
import { useState } from "react";


type FormValues = {
  username: string,
  password: string,
  confirmPassword: string,
}



const SignUpPage = () => {
  const { mutateAsync: createUserAccount } = useCreateUserAccountMutation();
  const navigate = useNavigate();

  const saveUserCredentials = (key:string, secret:string) => {
    localStorage.setItem('userKey', key);
    localStorage.setItem('userSecret', secret);
};

  const { watch, register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    }
  })

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  async function onSubmit(data: FormValues) {
    if (data.password !== data.confirmPassword) {
      return;
    }

    const newUser = await createUserAccount(data);

    if(newUser){
      saveUserCredentials(newUser.data.key, newUser.data.secret);
      reset({
        username: "",
        password: "",
        confirmPassword: ""
      });
      navigate("/");
    } else {
      console.error("Error sign up");
    }
  }

  const handleClearPassword = () => {
    reset({ password: '' });
  };
  

  return (
    <div className='flex-1 z-10 custom-size py-12 px-7 rounded-xl '>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex justify-center items-center">
            <h1 className="h1-bold custom-font">Sign up</h1>
          </div>
          <div>
            <h2 className="font-semibold custom-font">Username</h2>
            <TextField
              fullWidth
              placeholder="Enter your username"
              type="username"
              {...register("username", { required: true })}
              error={!!errors.username}
              helperText={errors.username ? "Username is required" : ""}
            />
          </div>
          <div>
            <h2 className={`font-semibold custom-font ${isPasswordFocused ? 'text-red-500' : ''}`}>Password</h2>
            <TextField
              fullWidth
              placeholder="Enter your password"
              type="password"
              color="warning"
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors.password ? "Password is required" : ""}
              InputProps={{
                endAdornment: (
                  <HighlightOff onClick={handleClearPassword} style={{ cursor: 'pointer', color: isPasswordFocused ? 'red' : '' }} />
                )
              }}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />
          </div>
          <div>
            <h2 className="font-semibold custom-font">Confirm Password</h2>
            <TextField
              fullWidth
              placeholder="Enter your confirm password"
              type="password"
              {...register("confirmPassword", { 
                required: true, 
                validate: (value) => value === watch("password") || "Passwords do not match" 
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
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
          <p className=" text-center font-semibold custom-font">Already signed up?
            <Link to="/sign-in" className=" font-semibold custom-font custom-color ml-1 text-small-semibold">Log in</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage;
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const ErrorPage = () => {
    const navigate = useNavigate()

    const handleHomeNavigate = () => {
        navigate('/');
    }

    const handleReloadNavigate = () => {
        window.location.reload();
    }

  return (
    <div className="h-full gap-14 flex flex-col justify-center items-center">
        <div>
            <img 
                src="/public/undrawPage.png" 
                alt="" 
            />
        </div>
      <div className="flex gap-5">
        <div>
            <Button  
                sx={{
                    width: '240px',
                    backgroundColor: '#6200EE',
                    textTransform: 'none',
                    fontFamily: "inherit"
                }} 
                variant="contained"
                onClick={handleHomeNavigate} 
                >
                Go Home Page
            </Button> 
        </div>
        <div>
            <Button
                sx={{
                    width: '240px',
                    backgroundColor: 'white',
                    borderColor: '#6200EE',
                    border: "1px solid",
                    color: '#6200EE',
                    textTransform: 'none',
                    fontFamily: "inherit",
                    '&:hover': {
                        backgroundColor: 'white', // Установка цвета фона при наведении
                  }      
                }} 
                onClick={handleReloadNavigate} 
                variant="contained"
              >
                Reload Page
            </Button>  
        </div> 
      </div>
    </div>
  );
}

export default ErrorPage;
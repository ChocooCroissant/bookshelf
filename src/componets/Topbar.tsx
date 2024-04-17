import { Link } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CircleIcon from '@mui/icons-material/Circle';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import WbCloudyOutlinedIcon from '@mui/icons-material/WbCloudyOutlined';
import { IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useForm } from 'react-hook-form';
import { searchBooks } from '../lib/api/api';
import { useState } from 'react';

type FormValues = {
  search: string,
}


const Topbar = () => {
  const [ inputState, setInputState ] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      search: "",
    }
  })  



  async function onSubmit(data: FormValues) {
    const bookFound = await searchBooks(data);

    if(!bookFound){
      return console.log("Error not found books");
    }

  }


  function handleFocus() {
    setInputState(!inputState);
  }

  function handleBlur() {
    setInputState(!inputState);
  }

  return (
    <section className='w-4/5 m-auto'>
      <div className='flex-between py-5'>
        <div className='flex gap-6 justify-center items-center'>
          <WbCloudyOutlinedIcon 
            fontSize='large'
            sx={{
                color: '#6200EE',
            }}
          />
          <DoneOutlinedIcon
          className='custom-doneIcon'
            fontSize='inherit'
            sx={{
              color: 'white',
            }}
          />
          <p style={{color: "#6200EE"}} className='custom-font h3-bold font-bold'>Books 
            <span className='text-white'> List</span>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=' relative'>
              <input
                {...register("search", { required: true })}
                type='search'
                placeholder="Search for any training you want"
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`cursor-pointer pl-14 py-2 px-4 border rounded-md ${inputState ? 'bg-white' : 'bg-transparent'} 
                  ${inputState ? 'border-gray-400' : 'border-transparent'} w-96 outline-none`}
              />
              <IconButton type="submit">
                <SearchOutlinedIcon
                  sx={{
                    color: inputState ? 'black' :'white',
                    position: 'absolute',
                    right: '360px',
                    top: '-5px',
                  }}
              />
              </IconButton>
            </div>  
          </form>
        </div>

        <div className='gap-6 flex justify-center items-center '>
          <NotificationsNoneIcon fontSize='large'/>
          <CircleIcon className='custom-frame' fontSize='inherit' color='error'/>
          <Link to="/">
            <img 
              src="/public/user.png" 
              alt="user"
              className='custom-border h-10 w-10 object-cover rounded-full'
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Topbar;

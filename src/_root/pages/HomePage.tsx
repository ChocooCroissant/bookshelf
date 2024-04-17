import { Button } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useEffect, useState } from "react";
import CreateBookModal from "../../componets/CreateBookModal";
import { BookResponse, IBookIsbn, IBookStatus } from "../../types";
import { createBook, deleteUserBook, editUserBook, getAllBooks } from "../../lib/api/api";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";
import CreateEditModal from "../../componets/CreateEditModal";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const HomePage = () => {
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [bookId, setBookId] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [books, setBooks] = useState<BookResponse[]>([]);
  const navigate = useNavigate();
  const [btns, setBtns] = useState<boolean[]>([]);

  
  const handleBtns = (index: number) => {
    const newBtns = [...btns];
    newBtns[index] = !newBtns[index];
    setBtns(newBtns);
  }
  const handleEditModalOpen = (id: number) => {
    setBookId(id);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setModalOpen(false);
  };

  const handleEditBook = async (status: IBookStatus) => {
    try {
      await editUserBook(status, bookId);
  } catch (error) {
      console.error("Error deleting book:", error);
  }
   
  }

  const handleCreateBook = async (data: IBookIsbn) => {
    try {
      const newBook =  await createBook(data);
      
      setNotificationVisible(true);
      if (!books || books.length === 0) {
        setBooks([{
          book: {
            id: newBook.data.id,
            isbn: newBook.data.isbn,
            title: newBook.data.title,
            cover: newBook.data.cover,
            author: newBook.data.author,
            published: newBook.data.published,
            pages: newBook.data.pages
          },
          status: 0
        }]);
      } else {
        setBooks(prevBooks => [...prevBooks, {
          book: {
            id: newBook.data.id,
            isbn: newBook.data.isbn,
            title: newBook.data.title,
            cover: newBook.data.cover,
            author: newBook.data.author,
            published: newBook.data.published,
            pages: newBook.data.pages
          },
          status: 0
        }]);
      }

      setTimeout(() => {
        setNotificationVisible(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
    

  };

  const handleDelete = async (id: number) => {
    try {
        await deleteUserBook(id);
        const loadedBooks = await getAllBooks();
        setBooks(loadedBooks.data);
        setBtns(Array.from({ length: books.length }, () => false));
    } catch (error) {
        console.error("Error deleting book:", error);
    }
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedBooks = await getAllBooks();  
        setBooks(loadedBooks.data);        
      } catch (error) {
        console.error("Error loading books:", error);
      }
    };

    if (localStorage.getItem("userKey") === '' || localStorage.getItem("userKey") === null) {
      setTimeout(() => {
        navigate('/bookshelf/sign-up');
      }, 0);
    } else {
      setTimeout(() => {
        navigate('/bookshelf');
        fetchData();
      }, 0);
    }

  }, []);

  return (
    <div className="w-4/5 m-auto pt-9">
      <div className="flex justify-between items-center">
        <p className='font-bold text-3xl leading-normal text-white'>You've got 
          <span style={{color: "#6200EE"}}> 7 books</span>
        </p>
        <Button 
          className="font-sans"
          sx={{
            backgroundColor: '#6200EE',
            textTransform: 'none',
          }} 
          onClick={handleCreateModalOpen} 
          variant="contained"
          startIcon={<AddOutlinedIcon/>}
        >
          Create a book 
        </Button>
      </div>
      <p className="font-normal text-base leading-normal text-white">Your books today</p>
      <CreateBookModal 
        open={modalOpen} 
        handleClose={handleCreateModalClose} 
        handleSubmit={handleCreateBook} 
      />
      <div className="custom-bookshelf pt-9">
        {books && books.length > 0 ? (
          books.map((item, index) => (
            <div onClick={() => handleBtns(index)} key={index} className="custom-box relative">
              <div>
                <div className=" w-80 h-28">
                  <h2 className="flex-1 book-heading">{item.book.title}</h2>
                  <div className="book-p-container">
                    <p className="book-p cursor-pointer">Cover: <a className=" text-blue-500 book-p" href={item.book.cover}>{item.book.cover}</a></p>
                    <p className="book-p">Pages: {item.book.pages}</p>
                    <p className="book-p">Published: {item.book.published}</p>
                    <p className="book-p">Isbn: {item.book.isbn}</p>
                  </div>
                </div>
                <div className="flex justify-between mt-4 w-80 h-6">
                  <p>
                    {item.book.author} / {item.book.published}
                  </p>
                  <div>
                    <p></p>
                  </div>
                </div>
              </div>
              {btns[index] && (
                <div className="z-10 flex gap-0.5 flex-col absolute top-2 -right-8">
                  <button
                    className="bg-red-700  w-8 h-8 rounded-tr-md rounded-tl-md rounded-br-md rounded-bl-none"
                    onClick={() => handleDelete(item.book.id)}
                  >
                    <DeleteOutlineOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: "white",
                      }}
                    />
                  </button>
                  <button
                    onClick={() => handleEditModalOpen(item.book.id)}
                    className="bg-violet-700  w-8 h-8 rounded-tr-md rounded-tl-none rounded-br-md rounded-bl-md"
                  >
                    <BorderColorOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: "white",
                      }}
                    />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-white mt-4">No books available</p>
        )}
      </div>
      <CreateEditModal 
        open={editModalOpen} 
        handleClose={handleEditModalClose} 
        handleSubmit={handleEditBook} 
      />
      {notificationVisible && (
        <div className="absolute bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md">
          <div className="flex">
            <div className="pr-4">
              <CheckCircleOutlineIcon/>
            </div>
            <div>
              Book added successfully!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
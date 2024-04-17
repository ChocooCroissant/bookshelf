import axios from 'axios';
import CryptoJS from 'crypto-js';
import { BookResponse, IBookIsbn, IBookTitle, INewUser} from '../../types';


export async function createUserAccount(user: INewUser) {
    try {
        const url = 'https://no23.lavina.tech/signup';
        const name = user.username;
        const email = `${user.username}@gmail.com`; 
        const key = user.username;
        const secret = user.password;
        const body = { name, email, key, secret };

        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function signInAccount(user: INewUser) {
    try {
        const url = 'https://no23.lavina.tech/myself';
        const key = user.username;
        const secret = user.password;
        const method = 'GET';
        const signStr = `${method}/myself${secret}`;
        const sign = CryptoJS.MD5(signStr).toString();

        const response = await axios.get(url, {
            headers: {
                'Key': key,
                'Sign': sign
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error log in:', error);
        throw error;
    }
    
}

export async function searchBooks(book: IBookTitle) {
    try {
        const key = localStorage.getItem('userKey'); 
        const secret = localStorage.getItem('userSecret');
        const method = 'GET';
        const title = book.title;
        const signStr = `${method}/books/${title}${secret}`;
        const sign = CryptoJS.MD5(signStr).toString();
        const url = `https://no23.lavina.tech/books/${title}`;

        const response = await axios.get(url, {
            headers: {
                'Key': key,
                'Sign': sign
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error searching for book:', error);
        throw error;
    }
}

export async function createBook(isbn: IBookIsbn) {
    try {
        const key = localStorage.getItem('userKey'); 
        const secret = localStorage.getItem('userSecret');
        const method = 'POST';
        const signStr = `${method}/books${JSON.stringify(isbn)}${secret}`;
        const sign = CryptoJS.MD5(signStr).toString();
        const url = `https://no23.lavina.tech/books`;

        const response = await axios.post(url, isbn, {
            headers: {
                'Key': key,
                'Sign': sign
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
}

export async function getAllBooks() {
    try {
        const key = localStorage.getItem('userKey'); 
        const secret = localStorage.getItem('userSecret');
        const method = 'GET';
        const signStr = `${method}/books${secret}`;
        const sign = CryptoJS.MD5(signStr).toString();
        const url = `https://no23.lavina.tech/books`;

        const response = await axios.get(url, {
            headers: {
                'Key': key,
                'Sign': sign
            }
        });

        return response.data;
    } catch (error) {
        // Обработка ошибки
        console.error('Error searching for books:', error);
        throw error;
    }
}

export async function deleteUserBook(bookId: BookResponse) {
    const key = localStorage.getItem('userKey'); 
    const secret = localStorage.getItem('userSecret');
    const method = 'DELETE';
    const url = `https://no23.lavina.tech/books/${bookId}`;
    const signStr = `${method}/books/${bookId}${secret}`;
    const sign = CryptoJS.MD5(signStr).toString();

    try {
        const response = await axios.delete(url, {
            headers: {
                'Key': key,
                'Sign': sign
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
}

export async function editUserBook(status: number, id: number) {
    const key = localStorage.getItem('userKey'); 
    const secret = localStorage.getItem('userSecret');
    const method = 'PATCH';
    const url = `https://no23.lavina.tech/books/${id}`;
    const signStr = `${method}/books/${id}${JSON.stringify(status)}${secret}`;
    const sign = CryptoJS.MD5(signStr).toString();

    try {
        const response = await axios.patch(url, status, {
            headers: {
                'Key': key,
                'Sign': sign
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error editing book:', error);
        throw error;
    }
}

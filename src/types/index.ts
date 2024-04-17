export type INewUser = {
    username: string | null;
    password: string | null;
}

export type IBookTitle = {
    search: string;
}

export type IBookIsbn = {
    isbn?: string;
}

export type IBookStatus = {
    status?: number;
}

export type IUser = {
    key: string;
    secret: string;
}

export type IContextType = {
    user: IUser,
    setUser: React.Dispatch<React.SetStateAction<IUser>>
};

export type BookResponse = {
    book: {
      id: number;
      isbn: string;
      title: string;
      cover: string;
      author: string;
      published: number;
      pages: number;
    };
    status: number;
  };
  
  

export type IBookId = {
    id: number;
}
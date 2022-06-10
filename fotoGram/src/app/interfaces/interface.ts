export interface PostResponse {
    ok?:    boolean;
    page?:  number;
    posts?: Post[];
}

export interface Post {
    _id?:      string;
    created?:  Date;
    menssage?: string;
    img?:      string[];
    coords?:   string;
    user?:     User;
}


export interface User {
    _id?:    string;
    nombre?: string;
    avatar?: string;
    email?:  string;
}



export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Picture {
  medium: string;
  large: string;
  thumbnail: string;
}

export interface UserResult {
  id: { name: string; value: string | null };
  gender: 'female' | 'male';
  name: Name;
  email: string;
  phone: string;
  picture: Picture;
  nat: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };

  // noops
  location: object;
  dob: { date: string; age: number };
  registered: object;
  cell: string;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
}

export interface GetUsersResponse {
  results: UserResult[];
  // info: Info;
}

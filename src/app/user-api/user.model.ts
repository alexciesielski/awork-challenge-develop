import { UserResult } from './user-result.model';

interface LoginInfo {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export type UserGroupCategory = keyof Pick<User, 'nat' | 'gender' | 'age'>;

export interface User {
  /** concatenation of ID property key values */
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: 'female' | 'male';
  email: string;
  phone: string;
  image: string;
  nat: string;
  login: LoginInfo;

  /**
   * Gets an image source url with a query string to prevent caching
   * Note: Do not remove the query string.
   */
  // get imageSrc(): string {
  //   return `${this.image}?id=${this.login?.uuid}`
  // }

  /**
   * Maps the api result to an array of User objects
   * @param {UserResult[]} userResults
   * @returns {User[]}
   */
  // static mapFromUserResult(userResults: UserResult[]): User[] {
  //   return userResults.map(user => new User({
  //     firstname: user.name.first,
  //     lastname: user.name.last,
  //     email: user.email,
  //     phone: user.phone,
  //     image: user.picture.medium,
  //     nat: user.nat,
  //     login: user.login
  //   }))
  // }
}

export function mapUser(user: UserResult): User {
  return {
    id: `${user.login.uuid}`,
    firstname: user.name.first,
    lastname: user.name.last,
    email: user.email,
    phone: user.phone,
    image: user.picture.medium,
    nat: user.nat,
    login: user.login,
    gender: user.gender,
    age: user.dob.age,
  };
}

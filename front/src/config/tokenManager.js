
import { currentUser } from "../model/currentUserData";
let token = ''
export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem('token',token)
};

export const getToken = () => {
  token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user) {
    currentUser.userId = user.userId;
    currentUser.department = user.department;
    currentUser.role = user.role;
    currentUser.email = user.email;
    currentUser.username = user.username;
  }
 

  return token;
};


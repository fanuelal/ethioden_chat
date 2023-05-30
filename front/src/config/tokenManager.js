<<<<<<< Updated upstream
let token = ''

export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem('token',token)
};

export const getToken = () => {

    token = localStorage.getItem('token')
  
=======
let token = '';

export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = () => {
>>>>>>> Stashed changes
  return token;
};

let token = ''

export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem('token',token)
};

export const getToken = () => {

    token = localStorage.getItem('token')
  
  return token;
};

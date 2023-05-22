let token = '';

export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem('token',token)
};

export const getToken = () => {
  if(token !==null){
    token = localStorage.getItem('token')
  }
  return token;
};

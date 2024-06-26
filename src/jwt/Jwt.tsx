import axios from "axios";

async function Jwt() {
  const tokenString = localStorage.getItem('token');
  const token = tokenString ? JSON.parse(tokenString) : null;

  const url = "https://exam2.miantsebastien.com";


  if (token) {
    try {
      const response = await axios.get(url+"/api/profile/", {
        headers: { 'Authorization': `Bearer ${token.access}` }
      });
      return token.access;
    } catch (error) {
      try {
        const refreshResponse = await axios.post(url+"/api/token/refresh/", {
          refresh: token.refresh,

        });

        const data = { access: refreshResponse.data.access, refresh: token.refresh };

        const dataString = JSON.stringify(data);

        localStorage.setItem('token', dataString);

        return data.access;
      } catch (error) {
        return null;
      }
    }
  } else {
    return null;
  }
}

export default Jwt;

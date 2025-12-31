

// import axios, { AxiosInstance } from "axios"

// const clienteHttp: AxiosInstance = axios.create({
//     baseURL: "http://localhost:300/"
// });

// export default clienteHttp;




// import axios, { AxiosInstance } from "axios";

// const  clienteHttp: AxiosInstance = axios.create({
//     baseURL: "http://localhost:3000/"
// })

// export default clienteHttp;


import axios, { AxiosInstance } from "axios";

const clienteHttp: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL || "http://localhost:3000/"
})

export default clienteHttp;




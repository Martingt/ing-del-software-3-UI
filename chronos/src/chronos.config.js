
const Config = {
  currentProfile: "localDev",
  localDev: {
    backendUrl:"http://127.0.0.1:8000/",
    resources:"http://127.0.0.1:3000/resources/"
  },
  cloud: {
    backendUrl:"https://chronos-backend-is3-uca.herokuapp.com/",
    resources:"http://chronos-is3-uca.herokuapp.com/resources/"
  }
}

export default Config;


const Config = {
  currentProfile: "cloud",
  localDev: {
    backendUrl:"http://127.0.0.1:8000/",
    resources:"http://127.0.0.1:3000/resources/",
    createTask: "http://127.0.0.1:8000/tasks"
  },
  cloud: {
    backendUrl:"https://chronos-backend-is3-uca.herokuapp.com/",
    createTask:"https://chronos-backend-is3-uca.herokuapp.com/tasks",
    resources:"http://chronos-is3-uca.herokuapp.com/resources/"
  }
}

export default Config;

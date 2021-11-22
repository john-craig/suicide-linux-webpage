const API_URL="http://localhost:8282"
//const API_URL="http://backend:8282"
//const API_URL = process.env.BACKEND_IP + "8282";
//const API_URL = "/api"
console.log("API URL: ", API_URL)

/*
  Queue Functions
*/

export async function sendCommand(command){
  const url = API_URL + "/command"
  var response;
  console.log(command)

  try {
    response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin':'*'
          // 'Content-Type': 'application/x-www-form-urlencoded',
          
        },
        body: JSON.stringify(command) // body data type must match "Content-Type" header
      });

    response = await response.json()
    
  } catch(error) {
    console.log(error)
  }

  return response;
}

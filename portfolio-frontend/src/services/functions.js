const API_URL="http://localhost:8282"

/*
  Queue Functions
*/

export async function sendCommand(command){
  const url = API_URL + "/command"
  var response;

  try {
    response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(command) // body data type must match "Content-Type" header
      });

    response = await response.json()
    console.log(response)
  } catch(error) {

  }

  return response;
}
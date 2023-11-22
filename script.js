const form = document.getElementById("myForm");
const clientName = document.getElementById("userName");
const clientEmail = document.getElementById("userEmail");
const clientAddress = document.getElementById("userAddress");
const clientTiming = document.getElementById("userTiming");
const formBtn = document.getElementById("formButton");

// We need to get data from backend whenever user loads the page
// It can be when user visits for the first time or refresh the page
// Event is 'DOM Content Loaded' which gets fired when we refresh or load the page

document.addEventListener("DOMContentLoaded", getAllData);

formBtn.addEventListener("click", formSubmit);

async function formSubmit(e) {
  e.preventDefault();
  const data = {
    name: clientName.value,
    email: clientEmail.value,
    address: clientAddress.value,
    time: clientTiming.value,
  };

  // sending data to backend
  const responseData = await sendData(data);

  if (
    responseData.name &&
    responseData.email &&
    responseData.address &&
    responseData.time
  ) {
    // create Element Function
    uiCreator(responseData);
    clientName.value = "";
    clientEmail.value = "";
    clientAddress.value = "";
    clientTiming.value = "";
  } else {
    alert("Please Fill the Form");
  }
}

// This function will send data to the backend
async function sendData(formData) {
  const response = await fetch(
    "https://crudcrud.com/api/50d7474d5fab4bbb91db81349a8fc1bc/listData",
    {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  // sending data to form submit function to create list items in UI
  return data;
}

function uiCreator(responseData) {
  const card = document.createElement("div");
  card.classList.add("list");

  const name = document.createElement("h1");
  name.innerHTML = responseData.name;

  const email = document.createElement("h2");
  email.innerHTML = responseData.email;

  const address = document.createElement("h3");
  address.innerHTML = responseData.address;

  const time = document.createElement("h4");
  time.innerHTML = responseData.time;

  card.appendChild(name);
  card.appendChild(email);
  card.appendChild(address);
  card.appendChild(time);

  const listContainer = document.getElementById("listContainer");
  listContainer.appendChild(card);
}

async function getAllData() {
  const receivedData = await fetch(
    "https://crudcrud.com/api/50d7474d5fab4bbb91db81349a8fc1bc/listData",
    {
      method: "GET",
    }
  );
  const data = await receivedData.json();

  for (let i = 0; i <= data.length; i++) {
    uiCreator(data[i]);
  }
}

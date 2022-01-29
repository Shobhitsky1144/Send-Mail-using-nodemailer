const sendMail = () => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const contact = document.querySelector("#contact").value;

  const data = { name, email, contact };

  fetch("http://localhost:8000/sendMail", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("Mails sent", response);
    })
    .catch((err) => console.log(err));
  return false;
};

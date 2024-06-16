const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const mess = document.getElementById("mesage");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Message ${mess.value}`;

  Email.send({
    SecureToken: "",
    To: "",
    From: "",
    Subject: subject.value,
    Body: bodyMessage,
  }).then(() => {
    Swal.fire({
      title: "Enviado!",
      text: "Mensaje enviado correctamente!",
      icon: "success",
    });

    fullName.value = "";
    email.value = "";
    subject.value = "";
    mess.value = "";
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  sendEmail();
});

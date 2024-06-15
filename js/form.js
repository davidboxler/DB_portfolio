const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const mess = document.getElementById("mesage");

function sendEmail() {
  const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Message ${mess.value}`;

  Email.send({
    SecureToken: "77c489c8-a51c-4cc5-814c-59c98afc5279",
    To: "davidboxler47@gmail.com",
    From: "davidboxler47@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
        if(message == "OK") {
            Swal.fire({
                title: "Enviado!",
                text: "Mensaje enviado correctamente!",
                icon: "success"
            })

            fullName.value = ""
            email.value = ""
            subject.value = ""
            mess.value = ""
        }        
    }
);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  sendEmail();
});

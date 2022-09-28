const loginForm = document.getElementById("login-form");
const alert = document.getElementById("alert");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  grecaptcha.ready(function() {
    grecaptcha.execute('6LdkhKUfAAAAADJBuUTN8si--Xv9R77_PZEZAA3t', {action: 'submit'}).then(async function(token) {
        const email = event.target[0].value;
        const password = event.target[1].value;
      
        try {
          const response = await fetch(
            "https://go.lxpia.com/api/users/authenticate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({ email, password, token, recaptcha: true, text: "" }),
            }
          );
      
          const data = await response.json();
      
          if (!data.token) {
            alert.innerText = `Error: ${data.message || "unknown"}`;
            alert.style.display = "block";
          } else {
            location.replace(`https://go.lxpia.com/auth/me?t=${data.token}`);
          }
        } catch (error) {
          alert.innerText = `Error: ${error.message || "unknown"}`;
          alert.style.display = "block";
        }
    });
  });
});

const loginForm = document.getElementById('login-form')
const alert = document.getElementById('alert')

loginForm.addEventListener('submit', async event => {
  event.preventDefault()

  const email = event.target[0].value
  const password = event.target[1].value

  try {
    const response = await fetch(
      'https://api.lxpia.com/api/users/authenticate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : '*'
        },
        body: JSON.stringify({ email, password }),
      }
    )

    const data = await response.json()

    if (!data.token) {
      alert.innerText = `Error: ${data.message || 'unknown'}`
      alert.style.display = 'block'
    } else {
      location.replace(
        `https://lxpia.com/lxp/pages/login/?token=${data.token}`
      )
    }
  } catch (error) {
    alert.innerText = `Error: ${error.message || 'unknown'}`
    alert.style.display = 'block'
  }
})

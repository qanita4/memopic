document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const result = await response.text();
      alert(result);
      if (result === 'Login successful') {
        window.location.href = 'allpost.html';
      }
    } catch (err) {
      alert('Login gagal. Coba lagi.');
    }
  });
});

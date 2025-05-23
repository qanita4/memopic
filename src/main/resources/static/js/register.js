// WebContent/js/register.js

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email    = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const result = await response.text();

      // Menampilkan hasil response dari backend
      alert(result);

      // Contoh: Redirect ke login jika sukses
      if (result === 'Register successful') {
        window.location.href = 'login.html';
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi ke server!');
      console.error(err);
    }
  });
});

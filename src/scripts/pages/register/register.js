import StoriesApi from "../../data/api";

const Register = {
  async render() {
    return `
      <div class="content-container">
        <h1>Halaman Register</h1>
        <form id="registerForm">
            <div class="form-group">
                <label for="name">Nama</label>
                <input type="text" id="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" required>
            </div>
            <button type="submit">Daftar</button>
        </form>
        <p>Sudah punya akun? <a href="#/login">Login di sini</a></p>
      </div>
    `;
  },

  async afterRender() {
    const registerForm = document.querySelector("#registerForm");

    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.querySelector("#name").value;
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      try {
        await StoriesApi.register({ name, email, password });
        alert("Registrasi berhasil! Silakan login.");
        location.hash = "#/login"; // Pindah ke halaman login otomatis
      } catch (error) {
        alert(`Registrasi gagal: ${error.message}`);
      }
    });
  },
};

export default Register;

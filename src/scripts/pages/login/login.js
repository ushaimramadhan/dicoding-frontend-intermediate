import StoriesApi from "../../data/api";

const Login = {
  async render() {
    return `
      <div class="content-container">
        <h2>Halaman Login</h2>
        <form id="loginForm">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
        <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
      </div>
    `;
  },

  async afterRender() {
    const loginForm = document.querySelector("#loginForm");

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value;

      try {
        const result = await StoriesApi.login({ email, password });

        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result));

        alert("Login berhasil!");
        location.hash = "#/dashboard";
      } catch (error) {
        alert(`Login gagal: ${error.message}`);
      }
    });
  },
};

export default Login;

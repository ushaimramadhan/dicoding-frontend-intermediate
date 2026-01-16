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
    console.log('Halaman Login dirender');
  },
};

export default Login;
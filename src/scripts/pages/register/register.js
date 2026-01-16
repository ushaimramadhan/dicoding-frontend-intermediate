const Register = {
  async render() {
    return `
      <div class="content-container">
        <h2>Halaman Register</h2>
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
    console.log('Halaman Register dirender');
  },
};

export default Register;
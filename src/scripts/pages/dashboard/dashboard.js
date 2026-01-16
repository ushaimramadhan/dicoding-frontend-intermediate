const Dashboard = {
  async render() {
    return `
      <div class="content-container">
        <h2>Dashboard Cerita</h2>
        <div id="storiesList" class="stories-list">
            <p>Memuat cerita...</p>
        </div>
        <a href="#/add" class="fab" title="Tambah Cerita">+</a>
      </div>
    `;
  },

  async afterRender() {
    console.log('Halaman Dashboard dirender');
  },
};

export default Dashboard;
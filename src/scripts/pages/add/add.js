const Add = {
  async render() {
    return `
      <div class="content-container">
        <h2>Tambah Cerita Baru</h2>
        <form id="addStoryForm">
            <div class="form-group">
                <label for="description">Deskripsi</label>
                <textarea id="description" required></textarea>
            </div>
            <div class="form-group">
                <label for="photo">Upload Foto</label>
                <input type="file" id="photo" accept="image/*" required>
            </div>
            <button type="submit">Upload</button>
        </form>
      </div>
    `;
  },

  async afterRender() {
    console.log('Halaman Tambah Cerita dirender');
  },
};

export default Add;
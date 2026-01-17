import StoriesApi from "../../data/api";

const Add = {
  async render() {
    return `
      <div class="content-container">
        <h1>Tambah Cerita Baru</h1>
        <form id="addStoryForm">
            <div class="form-group">
                <label for="description">Deskripsi</label>
                <textarea id="description" class="form-control" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label for="photo">Upload Foto</label>
                <input type="file" id="photo" accept="image/*" required>
            </div>
            <div class="form-group">
               <img id="imagePreview" src="" alt="Preview" style="max-width: 100%; max-height: 300px; display: none; margin-top: 10px; border-radius: 8px;">
            </div>
            
            <button type="submit" id="buttonAdd">Upload Cerita</button>
        </form>
      </div>
    `;
  },

  async afterRender() {
    // 1. Cek Token (Proteksi)
    const token = localStorage.getItem("token");
    if (!token) {
      location.hash = "#/login";
      return;
    }

    const addStoryForm = document.querySelector("#addStoryForm");
    const inputPhoto = document.querySelector("#photo");
    const imagePreview = document.querySelector("#imagePreview");

    // Fitur Preview Gambar saat dipilih
    inputPhoto.addEventListener("change", () => {
      const file = inputPhoto.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
      } else {
        imagePreview.src = "";
        imagePreview.style.display = "none";
      }
    });

    // Handle Submit
    addStoryForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const description = document.querySelector("#description").value;
      const photo = document.querySelector("#photo").files[0];

      if (!photo) {
        alert("Silakan pilih foto terlebih dahulu.");
        return;
      }

      // Buat FormData
      const formData = new FormData();
      formData.append("description", description);
      formData.append("photo", photo);

      try {
        const button = document.querySelector("#buttonAdd");
        button.textContent = "Mengirim...";
        button.disabled = true;

        await StoriesApi.addNewStory(formData);

        alert("Cerita berhasil ditambahkan!");
        location.hash = "#/dashboard";
      } catch (error) {
        console.error(error);
        alert(`Gagal upload: ${error.message}`);
      } finally {
        const button = document.querySelector("#buttonAdd");
        button.textContent = "Upload Cerita";
        button.disabled = false;
      }
    });
  },
};

export default Add;

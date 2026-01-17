import StoriesApi from "../../data/api";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

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
            <div class="form-group">
                <label>Lokasi (Klik pada peta untuk memilih)</label>
                <div id="map" style="height: 300px; width: 100%; border-radius: 8px; margin-top: 10px; border: 1px solid #ccc;"></div>
                <input type="text" id="lat" readonly placeholder="Latitude" style="margin-top:5px; width: 48%;">
                <input type="text" id="lon" readonly placeholder="Longitude" style="margin-top:5px; width: 48%;">
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

    const map = L.map("map").setView([-6.2, 106.816666], 10); // Default Jakarta
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    let marker = null;

    // 2. Event Listener: Klik Peta
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;

      // Pindahkan atau buat marker
      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }

      // Simpan ke input field
      document.querySelector("#lat").value = lat;
      document.querySelector("#lon").value = lng;
    });

    // Logic Preview Gambar
    const inputPhoto = document.querySelector("#photo");
    const imagePreview = document.querySelector("#imagePreview");
    inputPhoto.addEventListener("change", () => {
      const file = inputPhoto.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.src = e.target.result;
          imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });

    // 3. Handle Submit
    const addStoryForm = document.querySelector("#addStoryForm");
    addStoryForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const description = document.querySelector("#description").value;
      const photo = document.querySelector("#photo").files[0];
      const lat = document.querySelector("#lat").value;
      const lon = document.querySelector("#lon").value;

      if (!photo) {
        alert("Silakan pilih foto.");
        return;
      }

      const formData = new FormData();
      formData.append("description", description);
      formData.append("photo", photo);

      // Jika user memilih lokasi, kirim datanya
      if (lat && lon) {
        formData.append("lat", lat);
        formData.append("lon", lon);
      }

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

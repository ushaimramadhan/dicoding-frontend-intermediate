import StoriesApi from "../../data/api";
import "leaflet/dist/leaflet.css"; // Import CSS Leaflet
import L from "leaflet"; // Import JS Leaflet

// Fix untuk icon marker default Leaflet yang kadang hilang di bundler
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Atur ulang icon default
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const Dashboard = {
  async render() {
    return `
      <div class="content-container">
        <h1>Dashboard Cerita</h1>
        
        <div id="map" style="height: 400px; width: 100%; margin-bottom: 2rem; border-radius: 8px;"></div>

        <div id="storiesList" class="stories-list"></div>
        
        <a href="#/add" class="fab" title="Tambah Cerita">+</a>
      </div>
    `;
  },

  async afterRender() {
    // 1. Cek Token (Proteksi Halaman)
    const token = localStorage.getItem("token");
    if (!token) {
      location.hash = "#/login";
      return;
    }

    // 2. Inisialisasi Peta
    const map = L.map("map").setView([-6.2, 106.816666], 10); // Default Jakarta

    // Tambahkan Tile Layer (Peta Dasar)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    try {
      // 3. Ambil Data dari API
      const stories = await StoriesApi.getAllStories();
      const storiesListElement = document.querySelector("#storiesList");

      storiesListElement.innerHTML = ""; // Kosongkan loader

      // 4. Render Data ke HTML & Map
      stories.forEach((story) => {
        // A. Render List (Card)
        storiesListElement.innerHTML += `
          <div class="story-card">
            <img src="${story.photoUrl}" alt="${story.name}" class="story-img">
            <div class="story-body">
              <h3>${story.name}</h3>
              <p>${story.description}</p>
              <small>${new Date(story.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        `;

        // B. Render Marker di Peta (Jika ada lat/lon)
        if (story.lat && story.lon) {
          L.marker([story.lat, story.lon])
            .addTo(map)
            .bindPopup(`<b>${story.name}</b><br>${story.description}`);
        }
      });
    } catch (error) {
      console.error(error);
      alert("Gagal memuat cerita. Silakan login ulang.");
      // Opsional: localStorage.removeItem('token'); location.hash = '#/login';
    }
  },
};

export default Dashboard;

import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove('open');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    if (!document.startViewTransition) {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    } else {
      document.startViewTransition(async () => {
        this.#content.innerHTML = await page.render();
        await page.afterRender();
      });
    }

    this._updateNav();
  }

  _updateNav() {
    const token = localStorage.getItem('token');
    const navList = document.querySelector('#nav-list');

    if (token) {
      navList.innerHTML = `
        <li><a href="#/dashboard">Dashboard</a></li>
        <li><a href="#/add">Tambah Cerita</a></li>
        <li><button id="logoutButton" style="background:none; border:none; color:inherit; cursor:pointer; font:inherit;">Logout</button></li>
      `;

      const logoutBtn = document.querySelector('#logoutButton');
      if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          location.hash = '#/login';
          location.reload();
        });
      }
    } else {
      navList.innerHTML = `
        <li><a href="#/login">Login</a></li>
        <li><a href="#/register">Register</a></li>
      `;
    }
  }
}

export default App;

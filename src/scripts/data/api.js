import CONFIG from '../config';

class StoriesApi {
  static async register({ name, email, password }) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async login({ email, password }) {
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson.loginResult;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllStories() {
    const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const responseJson = await response.json();

    if (responseJson.error) {
      throw new Error(responseJson.message);
    }

    return responseJson.listStory;
  }

  static async addNewStory(body) {
    const response = await fetch(`${CONFIG.BASE_URL}/stories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // Jangan tambahkan Content-Type di sini, biarkan browser yang mengurusnya
      },
      body: body, // body harus berupa FormData
    });

    const responseJson = await response.json();

    if (responseJson.error) {
      throw new Error(responseJson.message);
    }

    return responseJson;
  }
}

export default StoriesApi;
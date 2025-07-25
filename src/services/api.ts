/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = "https://malleshwara-constructions-1.onrender.com";

// API utility class
class ApiService {
  private baseURL: string;
  private token: string | null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem("authToken");
  }

  private getHeaders(isJSON = true): HeadersInit {
    const headers: HeadersInit = {};

    if (isJSON) headers["Content-Type"] = "application/json";
    if (this.token) headers["Authorization"] = `Bearer ${this.token}`;

    return headers;
  }

  private async handleResponse(response: Response) {
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
        window.location.href = "/login";
      }
      throw new Error(data.message || "An error occurred");
    }

    return data;
  }

  // ---------------- AUTH ----------------

  async login(email: string, password: string) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await this.handleResponse(response);

    if (data.success && data.data?.token) {
      this.token = data.data.token;
      localStorage.setItem("authToken", this.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  }

  logout() {
    this.token = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }

  async getCurrentUser() {
    const response = await fetch(`${this.baseURL}/auth/me`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // ---------------- QUOTES ----------------

  async createQuote(data: any) {
    const response = await fetch(`${this.baseURL}/quotes`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async getQuotes(params?: any) {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    const response = await fetch(`${this.baseURL}/quotes${query}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateQuoteStatus(id: string, data: any) {
    const response = await fetch(`${this.baseURL}/quotes/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async deleteQuote(id: string) {
    const response = await fetch(`${this.baseURL}/quotes/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async getQuoteStats() {
    const response = await fetch(`${this.baseURL}/quotes/stats`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // ---------------- TESTIMONIALS ----------------
  async createTestimonial(data: any) {
    const response = await fetch(`${this.baseURL}/api/testimonials`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
    console.log("Submitting payload:", FormData);
    await apiService.createTestimonial(FormData);

  }

  async getTestimonials(params?: any) {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    const response = await fetch(`${this.baseURL}/api/testimonials${query}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async getAllTestimonials(params?: any) {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    const response = await fetch(`${this.baseURL}/api/testimonials/admin${query}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateTestimonialStatus(id: string, data: any) {
    const response = await fetch(`${this.baseURL}/api/testimonials/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async deleteTestimonial(id: string) {
    const response = await fetch(`${this.baseURL}/api/testimonials/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async getTestimonialStats() {
    const response = await fetch(`${this.baseURL}/api/testimonials/stats`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // ---------------- GALLERY ----------------

  async createGalleryItem(formData: FormData) {
    const headers: HeadersInit = {};
    if (this.token) headers["Authorization"] = `Bearer ${this.token}`;

    const response = await fetch(`${this.baseURL}/gallery`, {
      method: "POST",
      headers,
      body: formData,
    });
    return this.handleResponse(response);
  }

  async getGalleryItems(params?: any) {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    const response = await fetch(`${this.baseURL}/gallery${query}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async getAllGalleryItems(params?: any) {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    const response = await fetch(`${this.baseURL}/gallery/admin${query}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateGalleryItem(id: string, data: any) {
    const response = await fetch(`${this.baseURL}/gallery/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse(response);
  }

  async deleteGalleryItem(id: string) {
    const response = await fetch(`${this.baseURL}/gallery/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async getGalleryStats() {
    const response = await fetch(`${this.baseURL}/gallery/stats`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
export default apiService;

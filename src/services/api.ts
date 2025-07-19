const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API utility functions
class ApiService {
  private baseURL: string;
  private token: string | null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse(response: Response) {
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
        window.location.href = '/login';
      }
      throw new Error(data.message || 'An error occurred');
    }
    
    return data;
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await this.handleResponse(response);
    
    if (data.success && data.data.token) {
      this.token = data.data.token;
      localStorage.setItem('authToken', this.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
    }
    
    return data;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  async getCurrentUser() {
    const response = await fetch(`${this.baseURL}/auth/me`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // Quote methods
  async createQuote(quoteData: any) {
    const response = await fetch(`${this.baseURL}/quotes`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(quoteData),
    });
    return this.handleResponse(response);
  }

  async getQuotes(params?: any) {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    const response = await fetch(`${this.baseURL}/quotes?${queryString}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateQuoteStatus(id: string, updateData: any) {
    const response = await fetch(`${this.baseURL}/quotes/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(updateData),
    });
    return this.handleResponse(response);
  }

  async deleteQuote(id: string) {
    const response = await fetch(`${this.baseURL}/quotes/${id}`, {
      method: 'DELETE',
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

  // Testimonial methods
  async createTestimonial(testimonialData: any) {
    const response = await fetch(`${this.baseURL}/testimonials`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(testimonialData),
    });
    return this.handleResponse(response);
  }

  async getTestimonials(params?: any) {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    const response = await fetch(`${this.baseURL}/testimonials?${queryString}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async getAllTestimonials(params?: any) {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    const response = await fetch(`${this.baseURL}/testimonials/admin?${queryString}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateTestimonialStatus(id: string, updateData: any) {
    const response = await fetch(`${this.baseURL}/testimonials/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(updateData),
    });
    return this.handleResponse(response);
  }

  async deleteTestimonial(id: string) {
    const response = await fetch(`${this.baseURL}/testimonials/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async getTestimonialStats() {
    const response = await fetch(`${this.baseURL}/testimonials/stats`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // Gallery methods
  async createGalleryItem(formData: FormData) {
    const headers: HeadersInit = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}/gallery`, {
      method: 'POST',
      headers,
      body: formData,
    });
    return this.handleResponse(response);
  }

  async getGalleryItems(params?: any) {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    const response = await fetch(`${this.baseURL}/gallery?${queryString}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async getAllGalleryItems(params?: any) {
    const queryString = params ? new URLSearchParams(params).toString() : '';
    const response = await fetch(`${this.baseURL}/gallery/admin?${queryString}`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async updateGalleryItem(id: string, updateData: any) {
    const response = await fetch(`${this.baseURL}/gallery/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(updateData),
    });
    return this.handleResponse(response);
  }

  async deleteGalleryItem(id: string) {
    const response = await fetch(`${this.baseURL}/gallery/${id}`, {
      method: 'DELETE',
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
import { APIRequestContext, expect } from '@playwright/test';

// Switched from reqres.in (now requires paid API key)
// to JSONPlaceholder — free, no auth, industry-standard for testing

export interface Post  { title: string; body: string; userId: number; }
export interface User  { name: string; email: string; }

export class ApiHelper {
  private readonly request: APIRequestContext;
  private readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL: string = 'https://jsonplaceholder.typicode.com') {
    this.request = request;
    this.baseURL  = baseURL;
  }

  // ── USERS ──────────────────────────────────────
  async getUsers() {
    const response = await this.request.get(`${this.baseURL}/users`);
    return { status: response.status(), body: await response.json() };
  }

  async getUserById(id: number) {
    const response = await this.request.get(`${this.baseURL}/users/${id}`);
    return { status: response.status(), body: await response.json() };
  }

  // ── POSTS ──────────────────────────────────────
  async getPosts() {
    const response = await this.request.get(`${this.baseURL}/posts`);
    return { status: response.status(), body: await response.json() };
  }

  async getPostById(id: number) {
    const response = await this.request.get(`${this.baseURL}/posts/${id}`);
    return { status: response.status(), body: await response.json() };
  }

  async createPost(post: Post) {
    const response = await this.request.post(`${this.baseURL}/posts`, { data: post });
    return { status: response.status(), body: await response.json() };
  }

  async updatePost(id: number, post: Post) {
    const response = await this.request.put(`${this.baseURL}/posts/${id}`, { data: post });
    return { status: response.status(), body: await response.json() };
  }

  async patchPost(id: number, updates: Partial<Post>) {
    const response = await this.request.patch(`${this.baseURL}/posts/${id}`, { data: updates });
    return { status: response.status(), body: await response.json() };
  }

  async deletePost(id: number) {
    const response = await this.request.delete(`${this.baseURL}/posts/${id}`);
    return { status: response.status() };
  }

  // ── ASSERTIONS ─────────────────────────────────
  assertStatus(actual: number, expected: number) {
    expect(actual, `Expected HTTP ${expected} but got ${actual}`).toBe(expected);
  }

  assertHasField(body: Record<string, unknown>, field: string) {
    expect(body).toHaveProperty(field);
  }
}

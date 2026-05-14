import { test, expect } from '@playwright/test';
import { ApiHelper }    from '../../src/api/ApiHelper';

test.describe('API Tests - JSONPlaceholder', () => {

  // ── GET ──────────────────────────────────────────────────

  test('GET /users - should return 10 users', async ({ request }) => {
    const api = new ApiHelper(request);
    const { status, body } = await api.getUsers();

    api.assertStatus(status, 200);
    expect(body).toHaveLength(10);
  });

  test('GET /users/:id - should return a single user', async ({ request }) => {
    const api = new ApiHelper(request);
    const { status, body } = await api.getUserById(1);

    api.assertStatus(status, 200);
    expect(body.id).toBe(1);
    api.assertHasField(body, 'email');
    api.assertHasField(body, 'name');
  });

  test('GET /users/:id - should return 404 for non-existent user', async ({ request }) => {
    const api = new ApiHelper(request);
    const { status } = await api.getUserById(9999);

    api.assertStatus(status, 404);
  });

  test('GET /posts - should return 100 posts', async ({ request }) => {
    const api = new ApiHelper(request);
    const { status, body } = await api.getPosts();

    api.assertStatus(status, 200);
    expect(body).toHaveLength(100);
  });

  test('GET /posts/:id - should return a single post', async ({ request }) => {
    const api = new ApiHelper(request);
    const { status, body } = await api.getPostById(1);

    api.assertStatus(status, 200);
    expect(body.id).toBe(1);
    api.assertHasField(body, 'title');
    api.assertHasField(body, 'body');
    api.assertHasField(body, 'userId');
  });

  // ── POST ─────────────────────────────────────────────────

  test('POST /posts - should create a new post', async ({ request }) => {
    const api = new ApiHelper(request);
    const newPost = { title: 'QA Automation Blog', body: 'Playwright is awesome', userId: 1 };

    const { status, body } = await api.createPost(newPost);

    api.assertStatus(status, 201);
    expect(body.title).toBe(newPost.title);
    expect(body.body).toBe(newPost.body);
    api.assertHasField(body, 'id'); // Server assigned an ID
  });

  // ── PUT / PATCH ──────────────────────────────────────────

  test('PUT /posts/:id - should fully update a post', async ({ request }) => {
    const api = new ApiHelper(request);
    const updated = { title: 'Updated Title', body: 'Updated body', userId: 1 };

    const { status, body } = await api.updatePost(1, updated);

    api.assertStatus(status, 200);
    expect(body.title).toBe(updated.title);
  });

  test('PATCH /posts/:id - should partially update a post', async ({ request }) => {
    const api = new ApiHelper(request);

    const { status, body } = await api.patchPost(1, { title: 'Patched Title' });

    api.assertStatus(status, 200);
    expect(body.title).toBe('Patched Title');
  });

  // ── DELETE ───────────────────────────────────────────────

  test('DELETE /posts/:id - should delete a post', async ({ request }) => {
    const api = new ApiHelper(request);
    const { status } = await api.deletePost(1);

    api.assertStatus(status, 200); // JSONPlaceholder returns 200 for DELETE
  });

  // ── SCHEMA VALIDATION ────────────────────────────────────

  test('GET /posts - should validate response schema', async ({ request }) => {
    const api = new ApiHelper(request);
    const { body } = await api.getPosts();

    // Validate every post object has the right shape
    for (const post of body) {
      expect(post).toMatchObject({
        id:     expect.any(Number),
        title:  expect.any(String),
        body:   expect.any(String),
        userId: expect.any(Number),
      });
    }
  });

  // ── FILTER / QUERY PARAMS ────────────────────────────────

  test('GET /posts?userId=1 - should filter posts by user', async ({ request }) => {
    const api = new ApiHelper(request);
    const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
      params: { userId: 1 }
    });
    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.length).toBeGreaterThan(0);
    // Every returned post should belong to userId 1
    body.forEach((post: { userId: number }) => {
      expect(post.userId).toBe(1);
    });
  });
});


---

## 🧪 Full Test List

### UI Tests — saucedemo.com

#### 🔐 Login (`tests/ui/login.spec.ts`)
| # | Test |
|---|------|
| 1 | Should login successfully with valid credentials |
| 2 | Should display the login page correctly |
| 3 | Should show error when username is missing |
| 4 | Should show error when password is missing |
| 5 | Should show error for locked out user |
| 6 | Should not expose password in the URL |

#### 🛍️ Inventory (`tests/ui/inventory.spec.ts`)
| # | Test |
|---|------|
| 7 | Should display the products page after login |
| 8 | Should display 6 products on the page |
| 9 | Should sort products alphabetically A to Z |
| 10 | Should sort products by price low to high |
| 11 | Should add one item to cart |
| 12 | Should add multiple items to cart |
| 13 | Should remove an item from cart |
| 14 | Should navigate to cart page |
| 15 | Should logout successfully |

#### 🛒 Cart (`tests/ui/cart.spec.ts`)
| # | Test |
|---|------|
| 16 | Should show added items in cart |
| 17 | Should be empty when no items added |
| 18 | Should allow removing items from the cart |
| 19 | Should navigate to checkout from cart |
| 20 | Full E2E: add, verify, remove, verify updated cart |

### API Tests — jsonplaceholder.typicode.com

#### 🌐 Users & Posts (`tests/api/users.spec.ts`)
| # | Test |
|---|------|
| 21 | GET /users — should return 10 users |
| 22 | GET /users/:id — should return a single user |
| 23 | GET /users/:id — should return 404 for non-existent user |
| 24 | GET /posts — should return 100 posts |
| 25 | GET /posts/:id — should return a single post |
| 26 | POST /posts — should create a new post |
| 27 | PUT /posts/:id — should fully update a post |
| 28 | PATCH /posts/:id — should partially update a post |
| 29 | DELETE /posts/:id — should delete a post |
| 30 | GET /posts — should validate response schema |
| 31 | GET /posts?userId=1 — should filter posts by user |

---

**Total: 31 tests | 3 browsers | ~2 min full run**

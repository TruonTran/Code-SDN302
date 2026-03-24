# API Documentation

Base URL: `http://localhost:3000`

## 1. Register User

*   **URL:** `/auth/register`
*   **Method:** `POST`
*   **Content-Type:** `application/json`

**Request Body:**

```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response (Success):**
`Register success`

---

## 2. Login

*   **URL:** `/auth/login`
*   **Method:** `POST`
*   **Content-Type:** `application/json`

**Request Body:**

```json
{
  "username": "testuser",
  "password": "password123"
}
```

**Response:**
*   **Success:** `Login success` (Sets a session cookie)
*   **Failure:** Redirects to `/login-fail` -> `Login failed`

---

## 3. Get Profile (Protected)

*   **URL:**  `/profile`
*   **Method:** `GET`
*   **Cookie:** Requires the `connect.sid` cookie from login.

**Response:**
*   **Authenticated:** `Hello testuser`
*   **Unauthenticated:** `Not authenticated` (Status 401)

---

## 4. Logout

*   **URL:** `/auth/logout`
*   **Method:** `GET`

**Response:**
`Logged out`

## Testing with CURL

**Register:**
```bash
curl -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d "{\"username\": \"alice\", \"password\": \"secret\"}"
```

**Login (save cookie):**
```bash
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d "{\"username\": \"alice\", \"password\": \"secret\"}" -c cookies.txt
```

**Get Profile (use cookie):**
```bash
curl -X GET http://localhost:3000/profile -b cookies.txt
```

**Logout:**
```bash
curl -X GET http://localhost:3000/auth/logout -b cookies.txt
```

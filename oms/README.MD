User API

This API allows you to perform CRUD operations on users.

Base URL: http://localhost:5000/users
(Adjust the port if your server uses a different one)

Endpoints
1. Create User

URL: /users/create

Method: POST

Headers:

Content-Type: application/json

Body (JSON):

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}

Success Response:

{
  "success": true,
  "user": {
    "_id": "643f7b5e3c1a4e1d2f7c1234",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456",
    "__v": 0
  }
}
2. Get All Users

URL: /users/

Method: GET

Success Response:

{
  "success": true,
  "users": [
    {
      "_id": "643f7b5e3c1a4e1d2f7c1234",
      "name": "John Doe",
      "email": "john@example.com",
      "password": "123456"
    }
  ]
}
3. Get User by ID

URL: /users/:id

Method: GET

URL Params:

id=[string] → MongoDB user _id

Success Response:

{
  "success": true,
  "user": {
    "_id": "643f7b5e3c1a4e1d2f7c1234",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
  }
}
4. Update User

URL: /users/:id

Method: PUT

URL Params:

id=[string] → MongoDB user _id

Headers:

Content-Type: application/json

Body (JSON):

{
  "name": "Jane Doe"
}

Success Response:

{
  "success": true,
  "user": {
    "_id": "643f7b5e3c1a4e1d2f7c1234",
    "name": "Jane Doe",
    "email": "john@example.com",
    "password": "123456"
  }
}
5. Delete User

URL: /users/:id

Method: DELETE

URL Params:

id=[string] → MongoDB user _id

Success Response:

{
  "success": true,
  "msg": "User deleted successfully"
}
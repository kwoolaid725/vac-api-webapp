## Schema Models

- Schema/Pydantic models define the structure of a request and response body, including the types of each field, and any constraints on those fields.
- This ensures that when a user wants to create a post, the request will only go through if it has a "title" and "content" field in the body 


## Router / JWT Authentication

- The router is the main entry point for requests to the API. It defines the path, the HTTP method, and the function that will be called at that endpoint.
- JWT authentication is used to verify that a user is logged in before they can access certain endpoints. This is done by checking the token in the request header, and then decoding it to get the user's ID. If the token is invalid, the user will not be able to access the endpoint.
- JWT Token keeps track of whether users are logged in or not.

Header= {  
    "alg": "HS256",  
    "typ": "JWT"  
}

Payload= {  
    "sub": "1234567890",  
    "name": "John Doe",  
    "iat": 1516239022  
}

Signature= {
    HMACSHA256(  
    base64UrlEncode(header) + "." +  
    base64UrlEncode(payload),  
    secret)
}
https://jwt.io/
https://www.azepug.az/posts/fastapi/ecommerce-fastapi-nuxtjs/ecommerce-admin-user-create-category-products.html
APIrouter
- APIRouter is a class that allows you to declare routes and handlers, and then generate a router from them. It is used to define the routes for the API, and then generate a router from them.

![img.png](../../Aiden-Projects/vac-api-webapp/img.png)

## Envirnoment Variables

- Environment variables are used to store sensitive information, such as database credentials, API keys, and other secrets. They are stored in a file called .env, which is not tracked by git.

on Mac:
in terminal: % export DATABASE_URL="postgresql://user:password@postgresserver/db"

## Alembic

Database Migration
- Alembic is a database migration tool that allows you to make changes to your database schema without having to manually write SQL statements. It is used to create tables, add columns, and modify existing tables.
https://alembic.sqlalchemy.org/en/latest/api/ddl.html
alembic revision -m 
alembic upgrade "revision number"
alembic current 
alembic heads
alembic downgrade -1 or "revision number"

## Cross-Origin Resource Sharing (CORS)

- Cross-Origin Resource Sharing (CORS) is a mechanism that allows resources on a web page to be requested from another domain. It is used to allow requests from the frontend to the backend, and vice versa.
- CORS allows you to make requests from a web browser on one domain to a server on a different domain.
- by default, our API will only allow web browsers running on the same domain as our server to make requests to it 
- https://fastapi.tiangolo.com/tutorial/cors/

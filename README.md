# Full Stack Video Streaming Platform
![image](https://github.com/Atif-27/Browse/assets/116288316/b8a6e2a0-a12b-45b7-b375-80ab17d15973)


This project is a comprehensive video streaming platform built with a variety of technologies including React, Vite, Express, Mongoose, JWT for authentication, and MongoDB aggregation pipeline for efficient data processing. It enables users to sign up, log in, upload videos, add comments, create playlists, view history, and like videos.

## Features

- User Authentication: JWT-based login and signup functionality.
- Video Upload: Users can upload videos to the platform.
- Comments: Users can add comments to videos.
- Playlists: Users can create playlists and add videos to them.
- History: Users can view their watch history.
- Likes: Users can like videos.

## Technologies Used

- **Frontend**:
  - React: JavaScript library for building user interfaces.
  - Vite: Fast, opinionated web dev build tool.
  - React Router: Declarative routing for React.
  - Axios: Promise-based HTTP client.
  - JWT Decode: JWT token decoding library.

- **Backend**:
  - Express: Web application framework for Node.js.
  - Mongoose: MongoDB object modeling tool.
  - JWT: JSON Web Tokens for user authentication.
  - MongoDB Aggregation Pipeline: For efficient data processing.

## Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/full-stack-video-streaming.git
   ```


2. Navigate to the project directory:
```
cd Browse
```

3. Install dependencies for both frontend and backend:
```
cd client
npm install
cd ../api
npm install
   ```


4. Set up environment variables:
   - Create a `.env` file in the `api` directory.
   - Define the following variables:
   - 
 ```
 MONGODB_URI=mongodb+srv://username:password@cluster0.yourmongodb.net
JWT_SECRET=your_jwt_secret_key
PORT=8000
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```



- Create a `.env` file in the `client` directory.
   - Define the following variables:
   ```
   BASE_URL=http://localhost:8000/api/v1
  ```


5. Start the development servers:
   ```
    cd client
    npm run dev
    cd ../api
    npm run dev
   ```
  

7. Access the application at `http://localhost:5173`.

## Contributing

Contributions are welcome! Feel free to submit pull requests.


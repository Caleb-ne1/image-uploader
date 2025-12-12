# Image Upload API with MinIO Storage

## Overview
This API provides image upload functionality using **Multer** for file processing and **MinIO** for object storage. It supports single image uploads with size and format validation and generates presigned URLs for accessing uploaded images.

## Table of Contents
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)
- [MinIO Integration](#minio-integration)
- [CORS Configuration](#cors-configuration)
- [Dependencies](#dependencies)

---

## API Endpoints

### `POST /api/upload`
Uploads a single image file to MinIO storage.

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `image` (file field)

**Success Response:**

```json
{
  "fileName": "timestamp-originalname.jpg",
  "url": "https://minio.example.com/presigned-url"
}
```

**Error Responses:**

- 400 - No file uploaded or invalid file type  
- 400 - File too large (max 2MB)  
- 500 - MinIO upload or URL generation error  

---

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# MinIO Configuration
MINIO_ENDPOINT=              # Replace with your MinIO IP/domain
MINIO_PORT=                  # Default MinIO port (9000)
MINIO_USE_SSL=               # true if using https, false for http
MINIO_ACCESS_KEY=            # MinIO Access Key
MINIO_SECRET_KEY=            # MinIO Secret Key
MINIO_BUCKET=                # The bucket you created

# Application Configuration
FRONTEND_URL=                # Your frontend URL (e.g., http://localhost:5173)
PORT=                        # Server port (default: 3000)
```

---

## Setup Instructions

### 1. Prerequisites
- Node.js (v14 or higher)  
- MinIO server running and accessible  
- Created MinIO bucket (will be auto-created if it doesn't exist)  

### 2. Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install express multer minio dotenv cors

# Create .env file with your configuration
cp .env.example .env  

# Start the server
node --watch index.js
```

### 3. Testing with cURL
```bash
curl -X POST \
  http://localhost:3000/api/upload \
  -H "Content-Type: multipart/form-data" \
  -F "image=@/path/to/your/image.jpg"
```

---

## MinIO Integration
- **Bucket Management**: Auto-creates bucket if it doesn't exist  
- **File Storage**: Uploads files as objects with unique names  
- **Access**: Generates presigned URLs valid for 1 hour  
- **Security**: Uses access key/secret for authentication  

---

## CORS Configuration
- Allows requests from the specified `FRONTEND_URL`  
- Supports credentials if needed  

---

## Dependencies
- **express**: Web server framework  
- **multer**: File upload middleware  
- **minio**: MinIO client library  
- **dotenv**: Environment variable management  
- **cors**: Cross-origin resource sharing  

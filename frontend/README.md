# Image Uploader - Frontend

A responsive React application for uploading and previewing images with drag-and-drop functionality.

## Features
- **Drag and Drop Interface**: Intuitive file upload area with visual feedback  
- **File Validation**: Supports JPG and PNG formats up to 2MB  
- **Real-time Preview**: View uploaded images immediately  
- **Download Option**: Direct download link for uploaded images  
- **Status Notifications**: Visual feedback for upload success, errors and loading states  
- **Responsive Design**: Works on desktop and mobile devices  

## Prerequisites
- Node.js (v14 or higher)  
- npm or yarn package manager  
- Backend API server  

## Installation
1. Clone the repository or copy the project files  
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_BACKEND_API_URL=http://localhost:3000/api/upload
```

## Environment Variables
- `VITE_BACKEND_API_URL`: The URL of your backend API endpoint for image uploads  

Example:

```env
VITE_BACKEND_API_URL=http://localhost:3000/api/upload
```

## Available Scripts
- `npm run dev` - Starts the development server with Vite  
- `npm run build` - Builds the application for production  
- `npm run preview` - Previews the production build locally  

## Backend Setup
This application requires a backend API that accepts:

- `POST` requests to the specified endpoint  
- `multipart/form-data` content type  
- An `image` field containing the file  

**Example backend response:**

```json
{
  "url": "https://example.com/uploads/filename.jpg"
}
```

## Dependencies

**Main Dependencies:**
- React: UI library  
- react-dropzone: Drag-and-drop file upload component  
- axios: HTTP client for API requests  
- lucide-react: Icon library for UI elements  

**Development Dependencies:**
- Vite: Build tool and development server  
- TypeScript (optional): Type safety  
- ESLint: Code linting  


## Usage
1. Start the development server:

```bash
npm run dev
```

2. Open your browser at `http://localhost:5173`  
3. Drag and drop an image file (JPG or PNG, max 2MB) into the upload area  
4. Or click the upload area to browse for files  
5. View the uploaded image in the preview section  
6. Download the image using the download button  

## File Restrictions
- Accepted Formats: JPG, JPEG, PNG  
- Maximum File Size: 2MB  
- Maximum Files: 1 at a time  




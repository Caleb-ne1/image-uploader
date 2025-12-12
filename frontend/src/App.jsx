import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Upload, Loader2, CheckCircle, XCircle, Download, Image as ImageIcon } from 'lucide-react';
import './App.css';

const App = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setLoading(true);
    setError('');
    setSuccess(false);
    const file = acceptedFiles[0];
    setUploadedFileName(file.name);
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_API_URL,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );

      setFileUrl(res.data.url);
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Upload failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const onDropRejected = (fileRejections) => {
    const messages = fileRejections.map(rej =>
      rej.errors.map(e => e.message).join(', ')
    ).join(', ');
    setError(messages || 'File rejected');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024 // 2MB
  });

  const handleReset = () => {
    setFileUrl('');
    setUploadedFileName('');
    setSuccess(false);
    setError('');
  };

  return (
    <div className="app-container">
      <div className="upload-card">
        {/* Header */}
        <div className="header">
          <div className="icon-bg">
            <ImageIcon className="icon" />
          </div>
          <h1 className="title">Image Uploader</h1>
        </div>

        {/* dropzone */}
        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? 'active' : ''} ${success ? 'success' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="dropzone-content">
            <div className="dropzone-icon">
              {loading ? (
                <Loader2 className="spinner" />
              ) : success ? (
                <CheckCircle className="success-icon" />
              ) : (
                <Upload className="upload-icon" />
              )}
            </div>
            <div className="dropzone-text">
              {isDragActive ? (
                <p className="active-text">Drop your image here</p>
              ) : (
                <>
                  <p className="file-name">{uploadedFileName || 'Drag & drop your image here'}</p>
                  <p className="browse-text">or <span>browse files</span></p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Status messages */}
        <div className="status-messages">
          {loading && (
            <div className="status loading">
              <Loader2 className="status-icon" />
              <span>Uploading your image...</span>
            </div>
          )}
          {error && (
            <div className="status error">
              <XCircle className="status-icon" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="status success">
              <CheckCircle className="status-icon" />
              <span>Upload successful!</span>
            </div>
          )}
        </div>

        {/* Preview Section */}
        {fileUrl && (
          <div className="preview-section">
            <div className="preview-header">
              <h3>Preview</h3>
              <button onClick={handleReset}>Upload another</button>
            </div>
            <div className="preview-card">
              <img src={fileUrl} alt="Uploaded preview" className="uploaded-image" />
              <div className="preview-footer">
                <div className="file-info">
                  <ImageIcon className="file-icon" />
                  <p className="file-name">{uploadedFileName}</p>
                </div>
                <a href={fileUrl} download className="download-btn">
                  <Download className="download-icon" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* supported formats */}
        {!fileUrl && (
          <div className="formats">
            <h4>Supported formats</h4>
            <div className="formats-list">
              {['JPG', 'PNG'].map((format) => (
                <span key={format} className="format">{format}</span>
              ))}
              <span className="format max-size">Max 2MB</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;



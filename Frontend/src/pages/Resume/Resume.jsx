import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../../context/AuthContext';
import { resumeService } from '../../services/services';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlineUpload, HiOutlineDocumentText, HiOutlineTrash, HiOutlineCheck } from 'react-icons/hi';
import resumeCard from '../../assets/illustrations/resume-card.svg';
import './Resume.css';

export default function Resume() {
  const { user, updateUser } = useAuth();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(!!user?.resumeFileName);
  const [resumeInfo, setResumeInfo] = useState({ fileName: user?.resumeFileName || '', preview: '' });

  const onDrop = useCallback((accepted, rejected) => {
    if (rejected?.length) return toast.error('Only PDF and DOCX files allowed (max 5MB)');
    if (accepted.length) { setFile(accepted[0]); setUploaded(false); }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxSize: 5 * 1024 * 1024,
    multiple: false
  });

  const handleUpload = async () => {
    if (!file) return toast.error('Select a file first');
    setUploading(true);
    const fd = new FormData();
    fd.append('resume', file);
    try {
      const { data } = await resumeService.upload(fd);
      toast.success('Resume uploaded!');
      setUploaded(true);
      setResumeInfo({ fileName: data.resumeFileName, preview: data.resumeText });
      updateUser({ resumeFileName: data.resumeFileName, resumeText: 'uploaded' });
      setFile(null);
    } catch (err) { toast.error(err.response?.data?.message || 'Upload failed'); }
    finally { setUploading(false); }
  };

  const fmtSize = (b) => b < 1024 ? b + ' B' : b < 1048576 ? (b / 1024).toFixed(1) + ' KB' : (b / 1048576).toFixed(1) + ' MB';

  return (
    <div className="page-wrap" style={{ maxWidth: 620 }}>
      <motion.div className="resume-hero card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="resume-hero__copy">
          <span className="resume-hero__kicker">Resume upload</span>
          <h1 className="page-title">Resume</h1>
          <p className="page-subtitle">Upload your resume to generate a more focused and realistic practice session.</p>
        </div>
        <div className="resume-hero__art">
          <img src={resumeCard} alt="Resume document illustration" />
        </div>
      </motion.div>

      <motion.div className="card resume-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'dropzone--active' : ''} ${file ? 'dropzone--file' : ''}`}>
          <input {...getInputProps()} />
          <AnimatePresence mode="wait">
            {file ? (
              <motion.div key="f" className="dropzone__file" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="dropzone__file-icon"><HiOutlineDocumentText /></div>
                <div className="dropzone__file-info">
                  <span className="dropzone__file-name">{file.name}</span>
                  <span className="dropzone__file-size">{fmtSize(file.size)}</span>
                </div>
                <button className="dropzone__file-rm" onClick={(e) => { e.stopPropagation(); setFile(null); }}><HiOutlineTrash /></button>
              </motion.div>
            ) : (
              <motion.div key="e" className="dropzone__empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <HiOutlineUpload className="dropzone__upload-icon" />
                <p className="dropzone__text">{isDragActive ? 'Drop here...' : 'Drag & drop your resume, or click to browse'}</p>
                <p className="dropzone__hint">PDF or DOCX · Max 5MB</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {file && (
          <div className="resume-card__actions">
            <button onClick={handleUpload} className="btn btn-primary" disabled={uploading}>
              {uploading ? 'Parsing...' : 'Upload & Parse'}
            </button>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {(uploaded || user?.resumeFileName) && (
          <motion.div className="card resume-status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.1 }}>
            <div className="resume-status__header">
              <HiOutlineCheck className="resume-status__check" />
              <div>
                <h3 className="resume-status__title">Resume active</h3>
                <p className="resume-status__file">{resumeInfo.fileName || user?.resumeFileName}</p>
              </div>
            </div>
            {resumeInfo.preview && (
              <div className="resume-status__preview">
                <h4 className="resume-status__plabel">Extracted text</h4>
                <p className="resume-status__ptext">{resumeInfo.preview}</p>
              </div>
            )}
            <p className="resume-status__note">Your resume is being used for personalized questions. Upload a new one anytime.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

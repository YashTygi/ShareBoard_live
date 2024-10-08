import { FC, useState } from 'react'
import './Auth.css'

interface VerifyAuthProps {
  onVerifyPassword: (password: string) => void;
  onCancel: () => void;
}

const VerifyAuth: FC<VerifyAuthProps> = ({ onVerifyPassword, onCancel }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerifyPassword(password);
  };

  return (
    <div className="dialog-backdrop">
      <dialog open>
        <form onSubmit={handleSubmit}>
          <h2 className="auth-title">Verify Password</h2>
          <input 
            className='auth-input' 
            placeholder="Password" 
            name="password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="auth-buttons">
            <button type="submit" className='auth-primary'>Verify</button>
            <button type="button" className='auth-secondary' onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </dialog>
    </div>
  )
}

export default VerifyAuth
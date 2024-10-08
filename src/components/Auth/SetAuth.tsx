import { FC, useState } from 'react'
import './Auth.css'

interface SetAuthProps {
  onSetPassword: (password: string) => void;
  onCancel: () => void;
}

const SetAuth: FC<SetAuthProps> = ({ onSetPassword, onCancel }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetPassword(password);
  };

  return (
    <div className="dialog-backdrop">
      <dialog open>
        <form onSubmit={handleSubmit}>
          <h2 className="auth-title">Set Password</h2>
          <input 
            className='auth-input' 
            placeholder="Password" 
            name="password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="auth-buttons">
            <button type="submit" className='auth-primary'>Set</button>
            <button type="button" className='auth-secondary' onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </dialog>
    </div>
  )
}

export default SetAuth
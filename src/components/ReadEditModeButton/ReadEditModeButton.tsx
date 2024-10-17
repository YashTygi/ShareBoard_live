import { FC, useState } from 'react';
import "./ReadEditModeButton.css";
import SetAuth from '../Auth/SetAuth';
import VerifyAuth from '../Auth/VerifyAuth';

interface ReadEditModeButtonProps {
  initialMode: boolean;
  slug: string;
  onModeChange: (newMode: boolean) => void;
  hasPassword: boolean;
}

const ReadEditModeButton: FC<ReadEditModeButtonProps> = ({ initialMode, slug, onModeChange, hasPassword: initialHasPassword }) => {
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [showSetAuth, setShowSetAuth] = useState(false);
  const [showVerifyAuth, setShowVerifyAuth] = useState(false);
  const [hasPassword, setHasPassword] = useState(initialHasPassword);

  const handleModeChange = async () => {
    if (currentMode) {
      // Switching from Read to Edit
      if (hasPassword) {
        setShowVerifyAuth(true);
      } else {
        switchMode(!currentMode);
      }
    } else {
      // Switching from Edit to Read
      if (!hasPassword) {
        setShowSetAuth(true);
      } else {
        switchMode(!currentMode);
      }
    }
  };

  const switchMode = async (newMode: boolean) => {
    try {
      const response = await fetch('/api/pages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pathName: slug, read: newMode ? 1 : 0 }),
      });

      if (response.ok) {
        setCurrentMode(newMode);
        onModeChange(newMode);
      } else {
        console.error('Failed to update mode');
      }
    } catch (error) {
      console.error('Error updating mode:', error);
    }
  };

  const handleSetPassword = async (password: string) => {
    try {
      const response = await fetch('/api/setPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pathName: slug, password }),
      });

      if (response.ok) {
        setHasPassword(true);
        setShowSetAuth(false);
        switchMode(true); // Switch to read mode after setting password
      } else {
        console.error('Failed to set password');
      }
    } catch (error) {
      console.error('Error setting password:', error);
    }
  };

  const handleVerifyPassword = async (password: string) => {
    try {
      const response = await fetch('/api/verifyPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pathName: slug, password }),
      });

      if (response.ok) {
        setShowVerifyAuth(false);
        switchMode(false); // Switch to edit mode after verifying password
      } else {
        console.error('Failed to verify password');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
    }
  };

  return (
    <>
      <button onClick={handleModeChange} className="read_edit_mode_button">
        {currentMode ? '📝 Switch to Edit' : '📖 Switch to Read'}
      </button>
      {showSetAuth && (
        <SetAuth onSetPassword={handleSetPassword} onCancel={() => setShowSetAuth(false)} />
      )}
      {showVerifyAuth && (
        <VerifyAuth onVerifyPassword={handleVerifyPassword} onCancel={() => setShowVerifyAuth(false)} />
      )}
    </>
  );
};

export default ReadEditModeButton;
// components/ManagerNavbar.tsx
import { Button } from '@mui/material';

const handleLogout = () => {
  window.location.href = "/login";
};

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
        <span className="hi-manager">Welcome</span>
      <li className="navbar-item">
          <Button className="logout-button" onClick={handleLogout} style={{ backgroundColor: '#FF292961', color: '#1b4027', fontSize: '12px', }}>
            Log out↩
          </Button>
        </li>
      <style jsx>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          border: 2px solid #1b4027;
          border-radius: 8px;
        }

        .logo-container {
          display: flex;
          align-items: center;
        }

        .logo {
          width: 50px;
          height: 50px;
          margin-right: 10px;
        }

        .hi-manager {
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

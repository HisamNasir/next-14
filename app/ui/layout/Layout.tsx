// components/Layout.tsx
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import LogoutBtn from './navbar/LogoutBtn';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App
          </Typography>
          <Button color="inherit">
            <Link href="/">Home</Link>
          </Button>
          <Button color="inherit">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <LogoutBtn/>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: '20px' }}>{children}</Container>
    </div>
  );
};

export default Layout;

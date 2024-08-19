import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';

const Header = () => {
  return (
    <Box 
    sx={{ 
      width: '100vw', 
      overflowX: 'hidden', 
      position: 'fixed',
      top: 0,
      left: 0, }}>
    <AppBar 
        position="static" 
        sx={{ 
          width: '100vw', 
          backgroundColor: '#008B8B', 
          margin: 0, 
          padding: 0 
        }}
      >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home" component={Link} href="/">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" textAlign={'center'} style={{ flexGrow: 1 }}>BrainDeck</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <IconButton color="inherit" aria-label="collections" component={Link} href="/flashcards">
              <CollectionsIcon />
            </IconButton>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
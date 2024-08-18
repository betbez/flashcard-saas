import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" component={Link} href="/">
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>Flashcard Saas</Typography>
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
  );
};

export default Header;
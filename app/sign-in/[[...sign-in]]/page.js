import { SignIn } from '@clerk/nextjs'
import {AppBar, Button, Box, Container, Link, Toolbar, Typography} from '@mui/material'


export default function SignUpPage() {
    return (
        <Container maxWidth = "100vw">
            
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                        }}    
                    >
                        Flashcard Saas
                    </Typography>
                    <Button 
                        sx={{
                            backgroundColor: '#008B8B'
                        }}> 
                        <Link href="/sign-in" passHref>
                            Login
                        </Link>              
                    </Button>
                    <Button 
                        sx={{
                            backgroundColor: '#008B8B'
                        }}>
                        <Link href="/sign-up" passHref>
                            Sign Up
                        </Link>              
                    </Button>
                </Toolbar>
            </AppBar>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h4"
                    gutterBottom 
                    sx={{ 
                        fontWeight: 'bold', 
                        color: '#333', 
                        textTransform: 'uppercase', 
                        letterSpacing: '1.5px',
                        mt: 4,
                        mb: 4,
                        textAlign: 'center'
                    }}
                >Sign In</Typography>
                <SignIn />
            </Box>
        </Container>
    )
}
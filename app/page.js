'use client'

import Image from 'next/image'
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AppBar, Box, Button, Container, Grid, Link, Paper, Toolbar, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Header from './components/Header' // Import the Header component

export default function Home() {
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }


  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      <Head>
        <title>BrainDeck</title>
        <meta name="description" content="Create flashcard from your text" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    
      <Header /> {/* Include the Header component */}
      
      <Box
        sx = {{
          textAlign: 'center',
          mt: 8,
          mb: 12,
          position: 'relative',
          zIndex: 1,
          color: 'black',
          backgroundImage: 'url(/images/ice.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: 12,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              color: '#333', 
              textTransform: 'uppercase', 
              letterSpacing: '1.5px',
              mb: 4, // Margin bottom for spacing
              textAlign: 'center' // Center align text
            }}
          > Welcome to BrainDeck </Typography>
          <Typography variant="h5"> 
            Effortlessly create flashcards from your text!
          </Typography>
          <Button 
            variant="contained" 
            sx={{
              backgroundColor: '#008B8B',
              color: '#98FF98',
              size: 'large',
              mt: 4
            }}>
            <Link href="/generate" passHref style={{ color: 'white', textDecoration: 'none' }}>
              Get Started
            </Link>
          </Button>
        </motion.div>
      </Box>

      <Container sx={{ width: '100%', maxWidth: '100%', px: 4, py: 2 }} disableGutters>
      <Box sx={{ my: 8 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: '#333', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px',
            mb: 4, 
            textAlign: 'center' 
          }}
        >
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Easy Text Input
                </Typography>
                <Typography>
                  Simply input your text and let our software do the rest. Creating flashcards has never been easier.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Smart Flashcards
                </Typography>
                <Typography>
                  Intelligently breaks down your text into concise flashcards, perfect for studying.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Accessible Anywhere
                </Typography>
                <Typography>
                  Access your flashcards from any device, at any time. Study on the go with ease and quickness.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      <Box sx = {{ my: 12, textAlign: 'center'}} >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: '#333', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px',
            mb: 4,
            textAlign: 'center'
          }}
        > 
          Pricing 
        </Typography>
        <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: '#f7f7f7',
                }}
              >
                <Typography variant="h5">Basic</Typography>
                <Typography variant="h6">$5 / month</Typography>
                <Typography>
                  Access to basic flashcard features and limited storage.
                </Typography>
                <Button variant="contained" color="primary" sx={{mt:2, backgroundColor: '#008B8B'}}>
                  Choose Basic
                </Button>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
          <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: '#f7f7f7',
                }}
              >
              <Typography variant="h5">Pro</Typography>
              <Typography variant="h6">$10 / month</Typography>
              <Typography>
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt:2, backgroundColor: '#008B8B'}} onClick={handleSubmit}>
                Choose Pro
              </Button>
            </Paper>
            </motion.div>
          </Grid>
        </Grid> 
      </Box>


      <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            color: '#333', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px',
            mb: 4,
            textAlign: 'center'
          }}
        > 
          Flashcards 
      </Typography>
      <Box sx={{ 
        textAlign: 'center', 
        my: 6,
        px: 3,
        backgroundColor: '#f7f7f7', 
        borderRadius: 2, 
        boxShadow: 3,
        py: 4 
       }}>
        
        <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: '#f7f7f7',
                }}
        > 
        <SignedIn>
          <Button variant="contained" color="primary" 
            sx={{ 
              mt: 2, 
              backgroundColor: '#008B8B',
              ':hover': {
                backgroundColor: '#006d6d', 
              },
              borderRadius: 20, 
              px: 4, 
              py: 1.5 }}>
            <Link href="/flashcards" passHref style={{ color: 'white', textDecoration: 'none' }}>
              View Flashcards
            </Link>
          </Button>
        </SignedIn>
        <SignedOut>
          <Typography variant="h6" color="error" sx={{ 
            mt: 2, 
            fontWeight: 'bold', 
            backgroundColor: '#ffe5e5',
            borderRadius: 2, 
            px: 2,
            py: 1.5
           }}>
            Please log in to view your flashcards.
          </Typography>
        </SignedOut>
        </Paper>
      </Box>
      
    </Container>
    </Box>
  )
}
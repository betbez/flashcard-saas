'use client'

import Image from 'next/image'
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AppBar, Box, Button, Container, Grid, Link, Toolbar, Typography } from '@mui/material'
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
    <Container maxWidth='100vw'>
      <Head>
        <title>Flashcard Saas</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <Header /> {/* Include the Header component */}

      <Box
        sx = {{
          textAlign: 'center',
          my: 4,
        }}
      >
        <Typography variant="h2"> Welcome to Flashcard SaaS </Typography>
        <Typography variant="h5"> 
          {' '}
          The easiest way to make flashcards from your text
        </Typography>
        <Button variant="contained" color="primary" sx={{mt: 2}}>
          <Link href="/generate" passHref style={{ color: 'white', textDecoration: 'none' }}>
            Get Started
          </Link>
        </Button>
      </Box>

      <Box sx = {{ my: 6, }} >
        <Typography variant="h4"> Features </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Easy Text Input</Typography>
            <Typography>
              {' '}
              Simply input your text and let our software do the rest. Creating flashcards has never been easier.
            </Typography>
          </Grid>
        </Grid> 
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Smart Flashcards</Typography>
            <Typography>
              {' '}
              Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
            </Typography>
          </Grid>
        </Grid> 
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Accessible Anywhere</Typography>
            <Typography>
              {' '}
              Access your flashcards from any device, at any time. Study on the go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx = {{ my: 6,textAlign: 'center'}} >
        <Typography variant="h4" gutterBottom> 
          Pricing 
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5">Basic</Typography>
              <Typography variant="h6">$5 / month</Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary">
                Choose Basic
              </Button>
            </Box>
          </Grid>
        </Grid> 
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
          <Box
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
              }}
            > 
              <Typography variant="h5">Pro</Typography>
              <Typography variant="h6">$10 / month</Typography>
              <Typography>
                {' '}
                Unlimited flashcards and storage, with priority support.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt:2}} onClick={handleSubmit}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid> 
        <Grid container  spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Accessible Anywhere</Typography>
            <Typography>
              {' '}
              Access your flashcards from any device, at any time. Study on the go with ease.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <SignedIn>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            <Link href="/flashcards" passHref style={{ color: 'white', textDecoration: 'none' }}>
              View Flashcards
            </Link>
          </Button>
        </SignedIn>
        <SignedOut>
          <Typography variant="h6" color="error" sx={{ mt: 2 }}>
            Please log in to view your flashcards.
          </Typography>
        </SignedOut>
      </Box>
    </Container>
  )
}
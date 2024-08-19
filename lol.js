'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AppBar, Box, Button, Container, Grid, Link, Toolbar, Typography, IconButton, Paper } from '@mui/material'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Header from './components/Header' // Import the Header component
import Footer from './components/Footer' // Footer component for a polished look

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <Container maxWidth="100vw" sx={{ overflow: 'hidden', position: 'relative' }}>
      <Head>
        <title>Flashcard SaaS | Learn Smarter</title>
        <meta name="description" content="Create flashcards from your text with Flashcard SaaS. The smartest way to study." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header /> {/* Include the Header component */}

      <Box
        sx={{
          textAlign: 'center',
          mt: 8,
          mb: 12,
          position: 'relative',
          zIndex: 1,
          color: 'white',
          backgroundImage: 'url(/images/hero-bg.jpg)', // Hero background image
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
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            The easiest way to make flashcards from your text
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
            <Link href="/generate" passHref style={{ color: 'white', textDecoration: 'none' }}>
              Get Started
            </Link>
          </Button>
        </motion.div>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
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
                  Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
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
                  Access your flashcards from any device, at any time. Study on the go with ease.
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 12, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
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
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Choose Basic
                </Button>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
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
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                  Choose Pro
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ textAlign: 'center', my: 12 }}>
        <Typography variant="h4" gutterBottom>
          Testimonials
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6">Jane Doe</Typography>
              <Typography>
                "Flashcard SaaS has transformed the way I study. The smart flashcards are a game-changer!"
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6">John Smith</Typography>
              <Typography>
                "The easiest and most effective tool I've ever used. Highly recommended!"
              </Typography>
            </Paper>
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

      <Footer /> {/* Footer component for additional polish */}
    </Container>
  )
}

'use client'

import { useUser } from '@clerk/nextjs'
import { db } from '@/firebase'
import { Box, Button, Card, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography } from '@mui/material'
import { writeBatch, doc, collection, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Header from '../components/Header' // Use relative import path

export default function Generate() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            })
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
    
            const data = await response.json()
            console.log('Generated flashcards:', data) // Add this line to verify the data
    
            setFlashcards(data)
        } catch (error) {
            console.error('Error generating flashcards:', error)
            alert('There was an error generating flashcards. Please try again.')
        }
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen = () => {
        if (!isSignedIn) {
            alert('You must be logged in to save the collection.')
            return
        }
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async() => {
        // Save name
        if(!name) {
            alert('Please enter a name.')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            
            if (collections.find((f) => f.name === name)) {
                alert('Flashcard collection with same name already exists')
                return 
            } else {
                collections.push({name})
                batch.set(userDocRef, {flashcards: collections}, {merge: true} )
            }
            
        } else {
            batch.set(userDocRef, {flashcards: [{name}]})
        }

        // Save flashcards
        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }

    // Components
    return <Container maxWidth="md">
    
        <Header /> {/* Include the Header component */}
        <Box 
            sx={{
                mt: 12,
                mb: 6,
                display: "flex",
                flexDirection: 'column',
                alignItem: 'center'
            }}>
            <Typography variant = "h4" 
                gutterBottom 
                sx={{ 
                    fontWeight: 'bold', 
                    color: '#333', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1.5px',
                    mb: 4,
                    textAlign: 'center'
                }}
            >    Generate Flashcards
            </Typography>
            <Paper sx={{ p: 4, width: '100%' }}>
                <TextField
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    label=" Enter text ..."
                    fullWidth
                    multiline
                    rows={4}
                    variant = "outlined"
                    sx={{
                        mb: 2,
                    }} 
                />
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#008B8B'
                    }}
                    onClick={handleSubmit}
                    fullWidth
                >
                    {' '}
                    Submit
                </Button>
            </Paper>
        </Box>

        {flashcards.length > 0 && (
            <Box sx={{mt: 4}}>
                <Typography variant="h5"> Flashcards Preview </Typography>
                <Grid container spacing={3}>
                    {flashcards.map((flashcard, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardActionArea
                                    onClick={() => {
                                        handleCardClick(index)
                                    }}
                                >
                                    <CardContent>
                                        <Box
                                            sx={{
                                               perspective: '1000px',
                                               '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    minHeight: '200px', // Set a minimum height
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                                    transform: flipped[index]
                                                        ? 'rotateY(180deg)'
                                                        : 'rotateY(0deg)',  
                                               }, 
                                               '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                    overflow: 'auto', // Ensure content does not overflow
                                               },
                                               '& > div > div:nth-of-type(1)': {
                                                    display: 'flex',
                                                    justifyContent: 'center', // Center content horizontally
                                                    alignItems: 'center', // Center content vertically
                                               },
                                               '& > div > div:nth-of-type(2)': {
                                                    transform: 'rotateY(180deg)',  
                                                    display: 'flex',
                                                    justifyContent: 'flex-start', // Align content to the top
                                                    alignItems: 'flex-start', // Align content to the top
                                               },
                                            }}    
                                        >
                                            <div>
                                                <div>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.back}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{mt: 4, display: 'flex', justifyContent: 'center'}}>
                    <Button variant="contained" color="secondary" onClick={handleOpen}>
                        Save
                    </Button>
                </Box>
            </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Save Flashcards</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter a name for your flashcard collection
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Collection Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={saveFlashcards}>Save</Button>
            </DialogActions>
        </Dialog>
    </Container>
}
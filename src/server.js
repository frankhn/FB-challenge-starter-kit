import app from './app'

const { PORT = 5000 } = process.env // set port number and default if not available

app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}/api`)
})
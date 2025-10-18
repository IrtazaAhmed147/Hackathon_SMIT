import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{textAlign: 'center', height: '100vh',display:'flex' }}>
        <div style={{margin: 'auto'}}>

        <h1 style={{fontSize: '50px'}}>404</h1>
        <h1 style={{fontSize: '30px', marginBottom: '10px'}}>Oops! The page you're looking for does not exist.</h1>
        <Button variant="contained">
            <Link to='/' style={{color:'white', textDecoration: 'none'}}>Go Back Home</Link>
        </Button>
        
        </div>
    </div>
  )
}

export default NotFound
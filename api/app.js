import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from './utils/connectDB.js'
import helmet from "helmet"
import { userRouter } from './routes/userRoute.js'
import { authRouter } from './routes/authRoute.js'
import { reportRouter } from './routes/reportRoute.js'
import { vitalRouter } from './routes/vitalRoute.js'
import { aiRouter } from './routes/aiRoute.js'
import familyMemberRouter from './routes/familyMemberRoute.js'
// import mongoSanitize from "express-mongo-sanitize"

const app = express()

dotenv.config()


// mongodb connection
connectDB()


// middleware
app.use(express.json())
app.use(helmet())
// app.use(mongoSanitize())

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))



// routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/report', reportRouter)
app.use('/api/vital', vitalRouter)
app.use("/api/ai", aiRouter);
app.use("/api/family", familyMemberRouter);



if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 6500;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;
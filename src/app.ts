import "reflect-metadata"
import express from "express"
import loginRouter from "./routes/login.routes"
import userRouter from "./routes/user.routes"
import categoryRouter from "./routes/category.routes"
import propertyRouter from "./routes/property.routes"
import schedulesRouter from "./routes/schedules.routes"

const app = express()
app.use(express.json())
app.use('/login', loginRouter)
app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/properties', propertyRouter)
app.use('/schedules', schedulesRouter)

export default app
import { DataSource } from "typeorm"
import path from "path"
import "dotenv/config"
import { User } from "./entities/user.entity"
import { Address } from "./entities/address.entity"
import { Category } from "./entities/category.entity"
import { Schedules } from "./entities/schedules.entity"
import { Property } from "./entities/property.entity"

const AppDataSource = new DataSource(
    process.env.NODE_ENV === "test" ?
        {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: ["src/entities/*.ts"]
        } :
        {
            type: "postgres",
            host: process.env.PGHOST,
            port: parseInt(process.env.PGPORT!),
            username: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
            logging: true,
            synchronize: false,
            entities: [path.join(__dirname, "./entities/**.{js,ts}")],
            migrations: [path.join(__dirname, "./migrations/**.{js,ts}")]
        }
)

export const userRepository = AppDataSource.getRepository(User)
export const addressRepository = AppDataSource.getRepository(Address)
export const categoryRepository = AppDataSource.getRepository(Category)
export const schedulesRepository = AppDataSource.getRepository(Schedules)
export const propertyRepository = AppDataSource.getRepository(Property)

export default AppDataSource
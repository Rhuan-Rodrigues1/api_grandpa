import { connect as mongooseConect, connection } from "mongoose";


const dbUrl = "mongodb://localhost:27017/grandpa"

export const connect = async(): Promise<void> => {
    await mongooseConect(dbUrl)
}

export const close = (): Promise<void> => connection.close()

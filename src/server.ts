import './utils/module-alias'
import express from "express";
import morgan from "morgan";
import cors from "cors";


export class SetupServer {
    private app = express()
    constructor(private port: Number) {
        this.port = port
    }

    public async init(): Promise<void> {
        this.setupExpress()
    }
    
    private setupExpress(): void {
        this.app.use(express.json())
        this.app.use(morgan('dev'))
        this.app.use(cors({
            origin: '*'
        }))
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log("Server running in: http://localhost:3000");
            
        })
    }
}
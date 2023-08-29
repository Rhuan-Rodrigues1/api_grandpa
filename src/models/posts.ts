import mongoose from "mongoose";
import { BaseModel } from ".";


export interface Posts extends BaseModel {
    usuario: object
    conteudo: string
    data_criada: Date
    hora_criada: Date
}

const schema = new mongoose.Schema(
    {
        usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        conteudo: {type: String, required: true },
        data_criada: {type: Date, default: Date.now},
        hora_criada: {type: Date, default: Date.now}
    },
    {
        toJSON: {
            transform: (_, ret): void => {
                ret.id = ret._id.toString()
                delete ret._id
                delete ret.__v
            }
        }
    }

)

export const Posts  = mongoose.model<Posts>('Posts', schema)
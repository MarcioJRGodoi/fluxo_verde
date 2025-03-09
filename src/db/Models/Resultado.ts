import { Tecnologias } from "../../interfaces/Perguntas"

export type Resultado = {
    id?: number
    resultados: Tecnologias[]
    created_at?: string
}
import type { Tecnologias } from "./Perguntas"

export type Resultados = {
    tecnologias: Tecnologias[];
}

export type Detalhes =  Record<Tecnologias, {
    descricaoCurta: string;
    descricaoDetalhada: string;
    comoImplementar: string[];
    oQuePrecisa: string[];
}>


export type DetalhesImagens = Record<Tecnologias, string[]>


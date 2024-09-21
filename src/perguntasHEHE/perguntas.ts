export interface Pergunta {
    pergunta: string;
    sim: string; // ID da próxima pergunta ou resultadoado
    nao: string;  // ID da próxima pergunta ou resultadoado
}

export interface resultado {
    resultado: string[]; // Lista de tecnologias recomendadas
}

export const perguntas: { [key: string]: Pergunta } = {
    "1": {
        pergunta: "Tem Disponibilidade Hídrica?",
        sim: "2",
        nao: "5",
    },
    "2": {
        pergunta: "Separa Águas Cinzas e Águas Negras?",
        sim: "3",
        nao: "6",
    },
    "3": {
        pergunta: "Tem Interesse em Aproveitar Biogás?",
        sim: "resultado_biogester",
        nao: "4",
    },
    "4": {
        pergunta: "Tem Interesse em Promover Paisagismo?",
        sim: "resultado_bananeira",
        nao: "resultado_wetland",
    },
    "5": {
        pergunta: "Tem Acesso ao Serviço do Caminhão Limpa Fossa?",
        sim: "resultado_fossaseca",
        nao: "resultado_compostagem",
    }
};

export const resultados: { [key: string]: resultado } = {
    resultado_biogester: { resultado: ["Biodigestor"] },
    resultado_bananeira: { resultado: ["Ciclo de Bananeiras"] },
    resultado_wetland: { resultado: ["Wetland"] },
    resultado_fossaseca: { resultado: ["Fossa Seca"] },
    resultado_compostagem: { resultado: ["Banheiro Seco Compostável"] }
};

import { Perguntas, type Respostas, type resultado, Tecnologias } from "../interfaces/Perguntas";

export interface Pergunta {
    pergunta: Perguntas;
    sim: keyof typeof Respostas | keyof typeof Perguntas; // ID da próxima pergunta ou resultado
    nao: keyof typeof Respostas | keyof typeof Perguntas;  // ID da próxima pergunta ou resultado
}

export const perguntas: Record<keyof typeof Perguntas, Pergunta> = {
    TemDisponibilidadeHídrica: {
        pergunta: Perguntas.TemDisponibilidadeHídrica,
        sim: "SeparaAGuasCinzasEAGuasNegras",
        nao: "TemInteresseEmAproveitarAguaEmFertirrigacaoCompostoeUrina",
    },
    SeparaAGuasCinzasEAGuasNegras: {
        pergunta: Perguntas.SeparaAGuasCinzasEAGuasNegras,
        sim: "TemInteresseEmPromoverPaisagismo",
        nao: "TemInteresseEmAproveitarBiogas",
    },
    TemInteresseEmPromoverPaisagismo: {
        pergunta: Perguntas.TemInteresseEmPromoverPaisagismo,
        sim: "resultado_Wetland_TanqueEvapotranspiracao",
        nao: "resultado_bananeira",
    },
    TemAcessoAoServicoDoCaminhaoLimpaFossa: {
        pergunta: Perguntas.TemAcessoAoServicoDoCaminhaoLimpaFossa,
        sim: "resultado_tanqueseptico_reatorAnaerobioCompartilhado_ReatorAnaerobioDeFluxoAscendenteCompacto",
        nao: "TemInteresseEmAproveitarComposto",
    },
    TemInteresseEmAproveitarBiogas: {
        pergunta: Perguntas.TemInteresseEmAproveitarBiogas,
        sim: "resultado_biodigestor",
        nao: "TemAcessoAoServicoDoCaminhaoLimpaFossa",
    },
    TemInteresseEmAproveitarComposto: {
        pergunta: Perguntas.TemInteresseEmAproveitarComposto,
        sim: "resultado_vermifiltro",
        nao: "resultado_biodigestor",
    },
    TemInteresseEmAproveitarAguaEmFertirrigacaoCompostoeUrina: {
        pergunta: Perguntas.TemInteresseEmAproveitarAguaEmFertirrigacaoCompostoeUrina,
        sim: "resultado_estocagem_urina_banheiro_compostavel_wetland",
        nao: "resultado_fossa_seca_Ciclo_babaneniras",
    },
};

export const resultados: Record<keyof typeof Respostas, resultado> = {
    resultado_Wetland_TanqueEvapotranspiracao: { resultado: [Tecnologias.Biodigestor, Tecnologias.BanheiroSecoCompostavel] },
    resultado_bananeira: { resultado: [Tecnologias.CicloDeBananeiras] },
    resultado_wetland: { resultado: [Tecnologias.Wetland] },
    resultado_fossaseca: { resultado: [Tecnologias.FossaSeca] },
    resultado_compostagem: { resultado: [Tecnologias.BanheiroSecoCompostavel] },
    resultado_biodigestor: { resultado: [Tecnologias.Biodigestor] },
    resultado_tanqueseptico_reatorAnaerobioCompartilhado_ReatorAnaerobioDeFluxoAscendenteCompacto: { resultado: [Tecnologias.TanqueSeptico, Tecnologias.ReatorAnaerobioCompartilhado, Tecnologias.ReatorAnaerobioDeFluxoAscendenteCompacto] },
    resultado_vermifiltro: { resultado: [Tecnologias.Vermifiltro] },
    resultado_fossaSepticaBiodigestora: { resultado: [Tecnologias.FossaSeptivaBiodigestora] },
    resultado_fossa_seca_Ciclo_babaneniras: { resultado: [Tecnologias.FossaSeca, Tecnologias.CicloDeBananeiras] },
    resultado_estocagem_urina_banheiro_compostavel_wetland: { resultado: [Tecnologias.EstocagemDeUrina, Tecnologias.BanheiroSecoCompostavel, Tecnologias.Wetland] },
};

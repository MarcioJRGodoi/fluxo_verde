import { Perguntas, type Respostas, Tecnologias } from "../interfaces/Perguntas";
import type { Resultados } from "../interfaces/tipos";

export interface Pergunta {
    pergunta: Perguntas;
    sim: keyof typeof Respostas | keyof typeof Perguntas; // ID da próxima pergunta ou tecnologias
    nao: keyof typeof Respostas | keyof typeof Perguntas;  // ID da próxima pergunta ou tecnologias
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

export const resultados: Record<keyof typeof Respostas, Resultados> = {
    resultado_Wetland_TanqueEvapotranspiracao: { tecnologias: [Tecnologias.Wetland, Tecnologias.TanqueEvapotranspiracao, Tecnologias.BiossistemaIntegrado] },
    resultado_bananeira: { tecnologias: [Tecnologias.CicloDeBananeiras] },
    resultado_wetland: { tecnologias: [Tecnologias.Wetland] },
    resultado_fossaseca: { tecnologias: [Tecnologias.FossaSeca] },
    resultado_compostagem: { tecnologias: [Tecnologias.BanheiroSecoCompostavel] },
    resultado_biodigestor: { tecnologias: [Tecnologias.Biodigestor] },
    resultado_tanqueseptico_reatorAnaerobioCompartilhado_ReatorAnaerobioDeFluxoAscendenteCompacto: { tecnologias: [Tecnologias.TanqueSeptico, Tecnologias.ReatorAnaerobioCompartilhado, Tecnologias.ReatorAnaerobioDeFluxoAscendenteCompacto] },
    resultado_vermifiltro: { tecnologias: [Tecnologias.Vermifiltro] },
    resultado_fossaSepticaBiodigestora: { tecnologias: [Tecnologias.FossaSeptivaBiodigestora] },
    resultado_fossa_seca_Ciclo_babaneniras: { tecnologias: [Tecnologias.FossaSeca, Tecnologias.CicloDeBananeiras] },
    resultado_estocagem_urina_banheiro_compostavel_wetland: { tecnologias: [Tecnologias.EstocagemDeUrina, Tecnologias.BanheiroSecoCompostavel, Tecnologias.Wetland] },
};

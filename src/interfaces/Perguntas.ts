// {"key": "Questionario-tfOxN5HCNYCfh8lJyNGF8", "name": "Questionario", "params": {"perguntaId": "1"}, "path": undefined}

export enum Tecnologias {
    Biodigestor = "Biodigestor",
    CicloDeBananeiras = "Ciclo de Bananeiras",
    Wetland = "Wetland",
    FossaSeca = "Fossa Seca",
    BanheiroSecoCompostavel = "Banheiro Seco Compostável",
    TanqueEvapotranspiracao = "Tanque de Evapotranspiração",
    BiossistemaIntegrado = "Biossistema Integrado",
    TanqueSeptico = "Tanque Séptico",
    ReatorAnaerobioCompartilhado = "Reator Anaeróbio Compartilhado",
    ReatorAnaerobioDeFluxoAscendenteCompacto = "Reator Anaeróbio de Fluxo Ascendente Compacto",
    Vermifiltro = "Vermifiltro",
    FossaSeptivaBiodigestora = "Fossa Séptica Biodigestora",
    EstocagemDeUrina = "Estocagem de Urina",
}

// Mapeamento de tecnologias para arrays de caminhos de imagem
export const tecnologiaImagens: Record<Tecnologias, string[]> = {
    [Tecnologias.Biodigestor]: [
        "/images/biodigestor_1.png",
        "/images/biodigestor_2.png",
        "/images/biodigestor_3.png"
    ],
    [Tecnologias.CicloDeBananeiras]: [
        "/images/ciclo_de_bananeiras_1.png",
        "/images/ciclo_de_bananeiras_2.png"
    ],
    [Tecnologias.Wetland]: [
        "/images/wetland_1.png",
        "/images/wetland_2.png"
    ],
    [Tecnologias.FossaSeca]: [
        "/images/fossa_seca_1.png",
        "/images/fossa_seca_2.png"
    ],
    [Tecnologias.BanheiroSecoCompostavel]: [
        "/images/banheiro_seco_compostavel_1.png",
        "/images/banheiro_seco_compostavel_2.png"
    ],
    [Tecnologias.TanqueEvapotranspiracao]: [
        "/images/tanque_evapotranspiracao_1.png"
    ],
    [Tecnologias.BiossistemaIntegrado]: [
        "/images/biossistema_integrado_1.png"
    ],
    [Tecnologias.TanqueSeptico]: [
        "/images/tanque_septico_1.png"
    ],
    [Tecnologias.ReatorAnaerobioCompartilhado]: [
        "/images/reator_anaerobio_compartilhado_1.png"
    ],
    [Tecnologias.ReatorAnaerobioDeFluxoAscendenteCompacto]: [
        "/images/reator_anaerobio_fluxo_ascendente_compacto_1.png"
    ],
    [Tecnologias.Vermifiltro]: [
        "/images/vermifiltro_1.png"
    ],
    [Tecnologias.FossaSeptivaBiodigestora]: [
        "/images/fossa_septica_biodigestora_1.png"
    ],
    [Tecnologias.EstocagemDeUrina]: [
        "/images/estocagem_de_urina_1.png"
    ],
};


export interface resultado {
    resultado: Tecnologias[]; // Lista de tecnologias recomendadas
}


export enum Perguntas {
    TemDisponibilidadeHídrica = "Tem Disponibilidade Hídrica?",
    SeparaAGuasCinzasEAGuasNegras = "Separa Águas Cinzas e Águas Negras?",
    TemInteresseEmPromoverPaisagismo = "Tem Interesse em Promover Paisagismo?",
    TemAcessoAoServicoDoCaminhaoLimpaFossa = "Tem Acesso ao Serviço do Caminhão Limpa Fossa?",
    TemInteresseEmAproveitarBiogas =  "Tem Interesse em Aproveitar Biogás?",
    TemInteresseEmAproveitarComposto = "Tem Interesse em Aproveitar Composto?",
    TemInteresseEmAproveitarAguaEmFertirrigacaoCompostoeUrina = "Tem Interesse em Aproveitar Água em Fertirrigação, Composto e Urina?",
}


export enum Respostas {
    resultado_Wetland_TanqueEvapotranspiracao = "Resultado: Wetland e Tanque de Evapotranspiração",
    resultado_bananeira = "Resultado: Ciclo de Bananeiras",
    resultado_wetland = "Resultado: Wetland",
    resultado_fossaseca = "Resultado: Fossa Seca",
    resultado_compostagem = "Resultado: Banheiro Seco Compostável",
    resultado_biodigestor = "Resultado: Biodigestor",
    resultado_tanqueseptico_reatorAnaerobioCompartilhado_ReatorAnaerobioDeFluxoAscendenteCompacto = "Resultado: Tanque Séptico, Reator Anaeróbio Compartilhado e Reator Anaeróbio de Fluxo Ascendente Compacto",
    resultado_vermifiltro = "Resultado: Vermifiltro",
    resultado_fossaSepticaBiodigestora = "Resultado: Fossa Séptica Biodigestora",
    resultado_fossa_seca_Ciclo_babaneniras = "Resultado: Fossa Seca e Ciclo de Bananeiras",
    resultado_estocagem_urina_banheiro_compostavel_wetland = "Resultado: Estocagem de Urina, Banheiro Seco Compostável e Wetland",


}


export interface Route {
    name: string;
    key: string;
    params: {
        perguntaId: keyof typeof Perguntas;
        resultadoId: keyof typeof Respostas;
    };
}
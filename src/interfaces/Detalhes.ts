import { Tecnologias } from "./Perguntas";

export const descricaoTecnologiasDetalhada: Record<Tecnologias, {
    descricaoCurta: string;
    descricaoDetalhada: string;
    comoImplementar: string[];
    oQuePrecisa: string[];
}> = {
    [Tecnologias.Biodigestor]: {
        descricaoCurta: "Transforma lixo orgânico em gás para cozinhar e fertilizante.",
        descricaoDetalhada: "O biodigestor é como uma 'máquina mágica' que transforma restos de comida e fezes em gás de cozinha e fertilizante natural. Ele usa bactérias para fazer isso de forma natural e sem cheiro forte.",
        comoImplementar: [
            "Escolha um lugar seguro e longe de poços ou rios para instalar o biodigestor.",
            "Conecte canos que levem os restos de comida e fezes para o biodigestor.",
            "Ligue o biodigestor ao fogão para usar o gás gerado.",
            "Instale uma saída para o fertilizante líquido produzido.",
            "Teste tudo para garantir que está funcionando direitinho."
        ],
        oQuePrecisa: [
            "Um tanque biodigestor (pode comprar pronto ou fazer com material resistente).",
            "Canos para levar os resíduos e para o gás sair.",
            "Fogão ou outro aparelho que use gás.",
            "Alguém para ajudar na instalação (pode ser um técnico ou um amigo com prática)."
        ]
    },
    [Tecnologias.CicloDeBananeiras]: {
        descricaoCurta: "Usa bananeiras para limpar água usada de forma natural.",
        descricaoDetalhada: "Esse sistema usa bananeiras e outras plantas para 'beber' a água suja, como a água da pia ou do chuveiro. As plantas limpam essa água enquanto crescem e produzem frutas ou folhas úteis.",
        comoImplementar: [
            "Escolha um espaço no quintal para plantar as bananeiras em forma de círculo.",
            "Instale canos ou valas que levem a água usada (como da pia) até o meio do círculo.",
            "Plante bananeiras e outras plantas úteis, como taioba ou gengibre.",
            "Cuide das plantas regando e retirando folhas secas de vez em quando."
        ],
        oQuePrecisa: [
            "Bananeiras e plantas que ajudam a filtrar a água.",
            "Um pedaço de terra no quintal ou terreno.",
            "Canos ou valas para levar a água usada.",
            "Ferramentas simples de jardinagem (pá, enxada, etc.)."
        ]
    },
    [Tecnologias.Wetland]: {
        descricaoCurta: "Usa plantas e pedras para limpar água suja naturalmente.",
        descricaoDetalhada: "O Wetland é como um jardim especial que limpa a água suja. A água passa por pedras, areia e raízes de plantas, que tiram as impurezas. É como um filtro vivo!",
        comoImplementar: [
            "Escolha um espaço no quintal para montar o filtro.",
            "Faça uma 'caixa' com camadas de areia, pedras e terra.",
            "Plante plantas que crescem bem na água, como taboas ou juncos.",
            "Conecte canos para levar a água usada para o filtro e de volta para onde será reutilizada."
        ],
        oQuePrecisa: [
            "Areia, pedras e terra para montar o filtro.",
            "Plantas que ajudam a filtrar a água.",
            "Um espaço no quintal ou tanque.",
            "Canos ou tubulações simples para levar a água."
        ]
    },
    [Tecnologias.FossaSeca]: {
        descricaoCurta: "Banheiro que funciona sem água, decompondo os resíduos de forma seca.",
        descricaoDetalhada: "A fossa seca é um banheiro que não usa água. Os resíduos são coletados em um tanque e misturados com serragem ou outros materiais para evitar mau cheiro. É uma solução prática e ecológica.",
        comoImplementar: [
            "Escolha um lugar protegido para montar o banheiro.",
            "Construa ou instale uma estrutura simples com assento e tanque.",
            "Adicione serragem ou cinzas no tanque após cada uso para ajudar na decomposição.",
            "Limpe e esvazie o tanque quando estiver cheio."
        ],
        oQuePrecisa: [
            "Uma estrutura para o banheiro (pode ser de madeira ou concreto).",
            "Tanque para armazenar os resíduos.",
            "Serragem, cinzas ou outro material seco.",
            "Ferramentas para limpeza e manutenção."
        ]
    },
    [Tecnologias.BanheiroSecoCompostavel]: {
        descricaoCurta: "Banheiro que transforma os resíduos em composto orgânico.",
        descricaoDetalhada: "Este banheiro não usa água. Os resíduos são tratados em um sistema fechado que os transforma em adubo natural. É uma solução que cuida do meio ambiente e reduz o desperdício.",
        comoImplementar: [
            "Instale um banheiro seco com compartimentos para os resíduos.",
            "Adicione serragem ou matéria orgânica para facilitar a compostagem.",
            "Deixe o composto 'descansar' por alguns meses antes de usar como adubo."
        ],
        oQuePrecisa: [
            "Um banheiro seco com sistema de compostagem.",
            "Serragem ou folhas secas.",
            "Espaço para armazenar o composto enquanto ele 'descansa'."
        ]
    },
    [Tecnologias.TanqueEvapotranspiracao]: {
        descricaoCurta: "Usa plantas para evaporar e purificar a água.",
        descricaoDetalhada: "Este sistema usa plantas e o calor do sol para evaporar a água e purificar os resíduos. É uma forma natural e eficaz de tratar águas residuais.",
        comoImplementar: [
            "Construa um tanque com camadas de areia, pedras e terra.",
            "Plante árvores ou arbustos que ajudem na evaporação.",
            "Conecte a saída de água residual ao tanque.",
            "Mantenha o tanque limpo e as plantas saudáveis."
        ],
        oQuePrecisa: [
            "Material para construir o tanque (cimento, areia, pedras).",
            "Plantas resistentes à água residual.",
            "Ferramentas de jardinagem para manutenção."
        ]
    },
    [Tecnologias.BiossistemaIntegrado]: {
        descricaoCurta: "Combina várias tecnologias para tratar resíduos e gerar energia.",
        descricaoDetalhada: "Este sistema junta várias ideias, como biodigestor e filtro de água, para tratar resíduos de forma completa. Ele pode gerar gás, fertilizante e água limpa ao mesmo tempo.",
        comoImplementar: [
            "Instale um biodigestor e conecte-o a outros sistemas, como Wetland.",
            "Planeje um layout que permita o uso combinado de tecnologias.",
            "Teste e monitore cada parte do sistema."
        ],
        oQuePrecisa: [
            "Um biodigestor, tanque e materiais de filtro.",
            "Canos e conexões.",
            "Espaço para integrar os sistemas."
        ]
    },
    [Tecnologias.TanqueSeptico]: {
        descricaoCurta: "Tanque que separa e trata resíduos líquidos e sólidos.",
        descricaoDetalhada: "O tanque séptico é uma estrutura onde a água com resíduos é depositada para que materiais sólidos e líquidos se separem. O sistema permite que os sólidos se decomponham e que a água seja filtrada no solo, reduzindo a poluição e a necessidade de tratamento adicional.",
        comoImplementar: [
            "Escolher um local adequado para instalar o tanque, preferencialmente longe de fontes de água potável.",
            "Cavar um buraco para enterrar o tanque e conectar os canos de esgoto à entrada e saída.",
            "Fazer a manutenção periódica, removendo resíduos sólidos acumulados no fundo do tanque.",
        ],
        oQuePrecisa: [
            "Tanque séptico (geralmente de concreto ou plástico).",
            "Canos para entrada e saída do esgoto.",
            "Espaço adequado para instalação."
        ]
    },
    [Tecnologias.ReatorAnaerobioCompartilhado]: {
        descricaoCurta: "Sistema anaeróbico de tratamento de resíduos para espaços compartilhados.",
        descricaoDetalhada: "Esse reator é usado em comunidades ou áreas onde várias pessoas compartilham o sistema. Ele funciona sem oxigênio (anaeróbico) e é eficaz para tratar resíduos domésticos, transformando-os em um líquido menos poluente antes de ser devolvido ao solo ou água.",
        comoImplementar: [
            "Escolher um local centralizado para instalar o reator que possa ser acessado por todos os moradores.",
            "Instalar o sistema de tubulação para levar os resíduos ao reator.",
            "Garantir que o reator tenha espaço suficiente para o processo de decomposição anaeróbica.",
            "Monitorar o sistema periodicamente para garantir que o tratamento esteja ocorrendo corretamente."
        ],
        oQuePrecisa: [
            "Reator anaeróbio de tamanho adequado.",
            "Sistema de tubulação para esgoto.",
            "Espaço para instalação do reator."
        ]
    },
    [Tecnologias.ReatorAnaerobioDeFluxoAscendenteCompacto]: {
        descricaoCurta: "Sistema compacto que trata resíduos de forma eficiente.",
        descricaoDetalhada: "Esse tipo de reator é pequeno e usa bactérias anaeróbicas (que vivem sem oxigênio) para decompor resíduos em espaços limitados. Ele é eficiente para locais que precisam de tratamento de resíduos, mas têm pouco espaço disponível.",
        comoImplementar: [
            "Instalar o reator de fluxo ascendente em um local com espaço suficiente para a entrada e saída de água.",
            "Conectar os canos de entrada e saída para direcionar os resíduos e a água tratada.",
            "Monitorar o sistema regularmente para garantir que as bactérias anaeróbicas estão funcionando corretamente."
        ],
        oQuePrecisa: [
            "Reator anaeróbio de fluxo ascendente compacto.",
            "Tubulação para esgoto.",
            "Espaço suficiente para a instalação."
        ]
    },
    [Tecnologias.Vermifiltro]: {
        descricaoCurta: "Sistema que usa minhocas para decompor resíduos.",
        descricaoDetalhada: "O vermifiltro utiliza minhocas e outros pequenos organismos para decompor resíduos orgânicos. A água residual passa por uma camada onde esses organismos vivem, e eles consomem os resíduos, limpando a água de forma natural.",
        comoImplementar: [
            "Instalar um filtro com camada de substrato onde as minhocas e outros organismos possam viver.",
            "Garantir que o vermifiltro esteja em um local com boa drenagem.",
            "Adicionar resíduos orgânicos para alimentar as minhocas e permitir que elas decomponham os materiais.",
            "Monitorar a qualidade da água tratada periodicamente."
        ],
        oQuePrecisa: [
            "Filtro com substrato adequado para as minhocas.",
            "Minhocas ou outros organismos decompositores.",
            "Resíduos orgânicos para alimentar as minhocas."
        ]
    },
    [Tecnologias.FossaSeptivaBiodigestora]: {
        descricaoCurta: "Fossa séptica com biodigestor para tratamento avançado de resíduos.",
        descricaoDetalhada: "A fossa séptica biodigestora combina a separação de resíduos sólidos e líquidos com a ação de um biodigestor. Assim, os resíduos são mais bem decompostos, e o sistema gera menos poluição e pode até produzir biogás.",
        comoImplementar: [
            "Escolher um local adequado e cavar um buraco para a instalação da fossa séptica biodigestora.",
            "Instalar a fossa séptica junto com o biodigestor, conectando-os ao sistema de esgoto.",
            "Monitorar o funcionamento do sistema e fazer a manutenção necessária, como esvaziar o biodigestor periodicamente."
        ],
        oQuePrecisa: [
            "Fossa séptica com biodigestor.",
            "Canos de esgoto.",
            "Espaço para a instalação."
        ]
    },
    [Tecnologias.EstocagemDeUrina]: {
        descricaoCurta: "Sistema que armazena urina para uso como fertilizante.",
        descricaoDetalhada: "Este sistema coleta e armazena a urina para que possa ser utilizada posteriormente como fertilizante. A urina contém nutrientes que podem ajudar no crescimento das plantas e reduzir a necessidade de fertilizantes químicos.",
        comoImplementar: [
            "Instalar um sistema de coleta de urina, como uma privada ou dispositivo específico.",
            "Armazenar a urina em reservatórios adequados, longe de fontes de água potável.",
            "Usar a urina como fertilizante para plantas, diluindo-a com água quando necessário."
        ],
        oQuePrecisa: [
            "Sistema de coleta de urina.",
            "Reservatórios para armazenar a urina.",
            "Plantas para utilizar o fertilizante."
        ]
    }
};



// Mapeamento de tecnologias para arrays de caminhos de imagem
export const tecnologiaImagens: Record<Tecnologias, string[]> = {
    [Tecnologias.Biodigestor]: [
        require("../images/BIODIGESTOR-2021-scaled.jpg"),
        require("../images/Biodigestor.png"),
    ],
    [Tecnologias.CicloDeBananeiras]: [
    ],
    [Tecnologias.Wetland]: [
    ],
    [Tecnologias.FossaSeca]: [
    ],
    [Tecnologias.BanheiroSecoCompostavel]: [
    ],
    [Tecnologias.TanqueEvapotranspiracao]: [
    ],
    [Tecnologias.BiossistemaIntegrado]: [
    ],
    [Tecnologias.TanqueSeptico]: [
    ],
    [Tecnologias.ReatorAnaerobioCompartilhado]: [
    ],
    [Tecnologias.ReatorAnaerobioDeFluxoAscendenteCompacto]: [
    ],
    [Tecnologias.Vermifiltro]: [
    ],
    [Tecnologias.FossaSeptivaBiodigestora]: [
    ],
    [Tecnologias.EstocagemDeUrina]: [

    ],
};

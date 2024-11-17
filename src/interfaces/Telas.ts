import type { Perguntas } from "./Perguntas";

export type Telas = {
    Home: undefined;
    Questionario: { perguntaId: keyof typeof Perguntas } | undefined;
    Resultado: { resultadoId: string } | undefined; 
    Duvidas: undefined;
    Detalhes: { tecnologiaId: string } | undefined;
    Imagens: { tecnologiaId: string } | undefined;
    Implementacao: { tecnologiaId: string } | undefined;
    PanoramaViewer: { tecnologiaId: string } | undefined;
    ThreeDViewer:  undefined;
  };
  
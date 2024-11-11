import type { Perguntas } from "./Perguntas";

export type Telas = {
    Home: undefined;
    Questionario: { perguntaId: keyof typeof Perguntas } | undefined;
    Resultado: { resultadoId: string } | undefined; 
  };
  
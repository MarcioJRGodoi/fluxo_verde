import { useSQLiteContext } from "expo-sqlite"
import type { Resultado } from "../Models/Resultado"



export const useResultadoDb = () => {

    const db = useSQLiteContext()

    console.log("DB", db)


    const insert = async ({ data }: { data: Resultado }) => {
        try {
            //insere os resultados como sendo uma um objeto, porem para o sqlite tem que ir como string
            const resultados = JSON.stringify(data)
            console.log("Resultado " ,resultados)
            const sql = await db.prepareAsync(`
                INSERT INTO resultados (resultados) values ($resultados)
                `)

            const res = await sql.executeAsync({
                $resultados: resultados
            })
                console.log("Res: ", res)
            const result = res.lastInsertRowId.toLocaleString()
            return { result }

        } catch (error) {
            console.log("Erro: ", error)
            throw error
        }
    }


    const select = async (): Promise<Resultado[]> => {
        try {
            const sql = `
                SELECT * FROM resultados
            `;
    
            // Executa a query e obtém os resultados
            const res: { id: number, resultados: string, created_at: string }[] = await db.getAllAsync(sql, []);
    
            // Verifica se há resultados
            if (!res || res.length === 0) {
                console.log("Nenhum resultado encontrado.");
                return []; // Retorna um array vazio se não houver dados
            }
    
            // Processa os resultados
            const result = res.map((r: { id: number, resultados: string, created_at: string }) => {
                try {
                    // Remove as aspas extras e faz o parse do campo "resultados"
                    const resultados = JSON.parse(r.resultados.replace(/^"|"$/g, ''));
                    return {
                        id: r.id,
                        resultados: resultados,
                        created_at: r.created_at
                    };
                } catch (error) {
                    console.error("Erro ao fazer parse do resultado:", error);
                    return {
                        id: r.id,
                        resultados: null, // Ou defina um valor padrão
                        created_at: r.created_at
                    };
                }
            });
    
            console.log("Resultado processado: ", result);
            return result;
        } catch (error) {
            console.log("Erro: ", error);
            throw error;
        }
    };

    return { insert, select }
}
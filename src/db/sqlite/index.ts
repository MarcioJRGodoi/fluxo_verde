import type {SQLiteDatabase} from "expo-sqlite";

// Abrir o banco de dados
const Db = async (data_base: SQLiteDatabase) => {
 data_base.execAsync(`
  CREATE TABLE IF NOT EXISTS resultados (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        resultados TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
  `)
};


export { Db };
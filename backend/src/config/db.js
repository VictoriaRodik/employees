import { createPool } from "mysql2/promise";
import { dbOptions } from "./dbOptions.js";

const pool = createPool(dbOptions);

export default pool;

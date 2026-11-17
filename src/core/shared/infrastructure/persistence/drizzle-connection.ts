import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { injectable } from "tsyringe";

@injectable()
export class DrizzelConnection {
  private readonly pool: Pool;
  private readonly connection: NodePgDatabase;

  constructor(connectionURL: string) {
    this.pool = new Pool({ connectionString: connectionURL });
    this.connection = drizzle(this.pool);
  }

  async close(): Promise<void> {
    this.pool.end();
  }
}

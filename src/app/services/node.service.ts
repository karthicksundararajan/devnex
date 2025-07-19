import { Injectable, signal } from '@angular/core';
import { DynamicNode, Edge } from 'ngx-vflow';
import { Observable, of, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatabaseSchema } from '../models/database-schema.interface';
import { DatabaseDiagram } from '../models/database-diagram';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) { }

  async getDatabaseDiagram(): Promise<DatabaseDiagram> {
    const dbSchema: DatabaseSchema = await lastValueFrom(this.loadDatabaseSchema());
    return this.convertToDbDiagram(dbSchema);
  }

  convertToDbDiagram(dbSchema: DatabaseSchema) {
    const nodes: DynamicNode[] = dbSchema.tables.map((table, index) => ({
      id: table.name,
      label: table.name,
      point: signal({ x: 0, y: 0 }),
      type: 'html-template',
      // text: signal(table.name),      
      data: signal(table)
    }));

    const edges: Edge[] = dbSchema.relationships.map((relationShip) => ({
      id: `${relationShip.fromTable} -> ${relationShip.toTable}`,
      source: relationShip.fromTable,
      target: relationShip.toTable,
      curve: 'smooth-step',
      markers: {
        end: {
          type: 'arrow-closed',
        },
      },
    }));

    return {
      nodes: nodes,
      edges: edges
    };
  }

  loadDatabaseSchema(): Observable<DatabaseSchema> {
    // return this.http.get<DatabaseSchema>('./db-model/sample-database-schema.json');
    return of<DatabaseSchema>({
      "version": "1.0",
      "tables": [
        {
          "name": "users",
          "comment": "Registered customer accounts",
          "columns": [
            {
              "name": "user_id",
              "type": "INTEGER",
              "nullable": false,
              "autoIncrement": true,
              "comment": "Unique user identifier"
            },
            {
              "name": "email",
              "type": "VARCHAR",
              "length": 255,
              "nullable": false,
              "comment": "User's email address"
            },
            {
              "name": "password_hash",
              "type": "VARCHAR",
              "length": 128,
              "nullable": false,
              "comment": "Encrypted password"
            },
            {
              "name": "created_at",
              "type": "TIMESTAMP",
              "nullable": false,
              "default": "CURRENT_TIMESTAMP"
            }
          ],
          "primaryKey": {
            "name": "pk_users",
            "columns": ["user_id"]
          },
          "uniqueConstraints": [
            {
              "name": "uc_users_email",
              "columns": ["email"]
            }
          ]
        },
        {
          "name": "products",
          "columns": [
            {
              "name": "product_id",
              "type": "INTEGER",
              "nullable": false,
              "autoIncrement": true
            },
            {
              "name": "name",
              "type": "VARCHAR",
              "length": 255,
              "nullable": false
            },
            {
              "name": "price",
              "type": "NUMERIC",
              "nullable": false
            },
            {
              "name": "in_stock",
              "type": "BOOLEAN",
              "nullable": false,
              "default": "true"
            }
          ],
          "primaryKey": {
            "name": "pk_products",
            "columns": ["product_id"]
          },
          "indexes": [
            {
              "name": "idx_products_name",
              "columns": ["name"],
              "type": "BTREE"
            }
          ]
        },
        {
          "name": "orders",
          "columns": [
            {
              "name": "order_id",
              "type": "INTEGER",
              "nullable": false,
              "autoIncrement": true
            },
            {
              "name": "user_id",
              "type": "INTEGER",
              "nullable": false
            },
            {
              "name": "order_date",
              "type": "TIMESTAMP",
              "nullable": false,
              "default": "CURRENT_TIMESTAMP"
            },
            {
              "name": "status",
              "type": "VARCHAR",
              "length": 20,
              "nullable": false,
              "default": "'PENDING'"
            }
          ],
          "primaryKey": {
            "name": "pk_orders",
            "columns": ["order_id"]
          }
        }
      ],
      "relationships": [
        {
          "name": "fk_orders_users",
          "type": "ONE_TO_MANY",
          "fromTable": "orders",
          "toTable": "users",
          "columns": [
            {
              "fromColumn": "user_id",
              "toColumn": "user_id"
            }
          ],
          "onDelete": "CASCADE",
          "onUpdate": "NO ACTION"
        },
        {
          "name": "order_items",
          "type": "MANY_TO_MANY",
          "fromTable": "orders",
          "toTable": "products",
          "columns": [
            {
              "fromColumn": "order_id",
              "toColumn": "product_id"
            }
          ],
          "onDelete": "CASCADE",
          "onUpdate": "NO ACTION",
          "junctionTable": "order_details",
          "junctionColumns": [
            {
              "fromColumn": "order_id",
              "toColumn": "order_id"
            },
            {
              "fromColumn": "product_id",
              "toColumn": "product_id"
            }
          ]
        }
      ]
    });
  }


}

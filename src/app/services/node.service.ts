import { Injectable, signal } from '@angular/core';
import { DynamicNode, Edge } from 'ngx-vflow';
import { Observable, of, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatabaseSchema, Relationship, Table } from '../models/database-schema.interface';
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
    const nodes: DynamicNode[] = dbSchema.tables.map((table, index) => this.getNodeEntity(table));
    const edgesNested = dbSchema.relationships.map((relationShip) => this.getEdgeEntity(relationShip));
    const edges: Edge[] = edgesNested.flat();
    return {
      nodes: nodes,
      edges: edges
    };
  }

  getNodeEntity(table: Table): DynamicNode {
    table.columns.forEach(column => {
      column.sourceLinkId = `source_${table.name}_${column.name}`;
      column.targetLinkId = `target_${table.name}_${column.name}`;
    });
    return {
      id: table.name,
      point: signal({ x: 0, y: 0 }),
      type: 'html-template',
      data: signal(table)
    };
  }

  getEdgeEntity(relationShip: Relationship): Edge[] {
    const relationShipColumn = relationShip.columns[0];
    if (relationShip.type === 'MANY_TO_MANY' && relationShip.junctionTable && relationShip.junctionColumns) {
      const leftEdge: Edge ={
        id: `${relationShip.fromTable}.${relationShipColumn.fromColumn} -> ${relationShip.junctionTable}.${relationShip.junctionColumns[0].toColumn}`,
        source: relationShip.fromTable,
        target: relationShip.junctionTable,
        sourceHandle: `source_${relationShip.fromTable}_${relationShipColumn.fromColumn}`,
        targetHandle: `target_${relationShip.junctionTable}_${relationShip.junctionColumns[0].toColumn}`,
        curve: 'smooth-step',
        markers: {
          end: {
            type: 'arrow-closed',
          },
        },
        data: signal(relationShip)
      };
      const rightEdge: Edge = {
        id: `${relationShip.junctionTable}.${relationShip.junctionColumns[1].fromColumn} -> ${relationShip.toTable}.${relationShipColumn.toColumn}`,
        source: relationShip.junctionTable,
        target: relationShip.toTable,
        sourceHandle: `source_${relationShip.junctionTable}_${relationShip.junctionColumns[1].fromColumn}`,
        targetHandle: `target_${relationShip.toTable}_${relationShipColumn.toColumn}`,
        curve: 'smooth-step',
        markers: {
          end: {
            type: 'arrow-closed',
          },
        },
        data: signal(relationShip)
      };
      return [leftEdge, rightEdge];
    }
    return [{
      id: `${relationShip.fromTable}.${relationShipColumn.fromColumn} -> ${relationShip.toTable}.${relationShipColumn.toColumn}`,
      source: relationShip.fromTable,
      target: relationShip.toTable,
      sourceHandle: `source_${relationShip.fromTable}_${relationShipColumn.fromColumn}`,
      targetHandle: `target_${relationShip.toTable}_${relationShipColumn.toColumn}`,
      curve: 'smooth-step',
      markers: {
        end: {
          type: 'arrow-closed',
        },
      },
      data: signal(relationShip)
    }];
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
        },
        {
          "name": "order_details",
          "columns": [
            {
              "name": "order_id",
              "type": "INTEGER",
              "nullable": false,
              "autoIncrement": true
            },
            {
              "name": "product_id",
              "type": "INTEGER",
              "nullable": false
            }
          ],
          "primaryKey": {
            "name": "pk_order_details",
            "columns": ["order_id", "product_id"]
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

export interface DatabaseSchema {
  version: string;
  tables: Table[];
  relationships: Relationship[];
}

export interface Table {
  name: string;
  comment?: string;
  columns: Column[];
  primaryKey?: PrimaryKey;
  uniqueConstraints?: UniqueConstraint[];
  indexes?: Index[];  
}

export interface Column {
  name: string;
  type: string;
  nullable: boolean;
  autoIncrement?: boolean;
  length?: number;
  default?: string;
  comment?: string;  
}

export interface PrimaryKey {
  name: string;
  columns: string[];
}

export interface UniqueConstraint {
  name: string;
  columns: string[];
}

export interface Index {
  name: string;
  columns: string[];
  type: string;
}

export interface Relationship {
  name: string;
  type: string;
  fromTable: string;
  toTable: string;
  columns: RelationshipColumn[];
  onDelete: string;
  onUpdate: string;
  junctionTable?: string;
  junctionColumns?: RelationshipColumn[];
}

export interface RelationshipColumn {
  fromColumn: string;
  toColumn: string;
}

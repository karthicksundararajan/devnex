import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { DynamicNode, Edge, Vflow, VflowComponent } from 'ngx-vflow';
import { NodeService } from '../../services/node.service';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3-force';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseDiagram } from '../../models/database-diagram';
import { DbModelGeneratorService } from '../../services/db-model-generator.service';


@Component({
  selector: 'app-db-visualizer',
  imports: [Vflow, CommonModule, ReactiveFormsModule],
  templateUrl: './db-visualizer.html',
  styleUrl: './db-visualizer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DbVisualizer {
  vflow = viewChild.required(VflowComponent);
  private formBuilder = inject(FormBuilder);
  private nodeService = inject(NodeService);
  private modelGeneratorService = inject(DbModelGeneratorService);

  private linkForce: any;
  private simulation: any;
  private simulationNodes: any;
  protected nodes: DynamicNode[] = [];
  protected edges: Edge[] = [];
  promtForm = this.formBuilder.group({
    prompt: ['', Validators.required]
  });

  constructor() {
    this.nodeService.getDatabaseDiagram().then((diagram) => {
      this.drawDbDiagram(diagram);
    });
  }

  onSubmit() {
    const promt = this.promtForm.value.prompt ?? '';
    console.log(promt);
    this.modelGeneratorService.generateDatabaseModel(promt)
      .subscribe(dbSchema => {
        console.log(dbSchema);
        const diagram = this.nodeService.convertToDbDiagram(dbSchema);
        this.drawDbDiagram(diagram);
      })
  }

  drawDbDiagram(databaseDiagram: DatabaseDiagram) {
    this.nodes = databaseDiagram.nodes;
    this.edges = databaseDiagram.edges;
    
    // this.initD3();
    this.layoutNodesInCircle(this.nodes);
    this.fitView();

  }

  layoutNodesInCircle(nodes: DynamicNode[], centerX = 500, centerY = 300, radius = 250): void {
    const total = nodes.length;

    nodes.forEach((node, index) => {
      const angle = (index / total) * 2 * Math.PI;

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      node.point.update(() => ({ x, y }));
    });
  }


  // d3-force internally reads/writes to x and y properties
  // so to link d3-force state with ngx-vflow state, we just
  // proxy these properties to point signal
  // private initD3() {
  //   const width = 1000; // You may make this dynamic with ElementRef
  //   const height = 600;

  //   // Proxy x/y to dynamic points
  //   this.simulationNodes = this.nodes.map((n) => ({
  //     id: n.id,
  //     get x() {
  //       return n.point().x;
  //     },
  //     set x(x: number) {
  //       n.point.update((state) => ({ ...state, x }));
  //     },
  //     get y() {
  //       return n.point().y;
  //     },
  //     set y(y: number) {
  //       n.point.update((state) => ({ ...state, y }));
  //     },
  //   }));

  //   this.linkForce = d3
  //     .forceLink(this.edges.map((e) => ({ source: e.source, target: e.target })))
  //     .id((d: any) => d.id)
  //     .distance(150)
  //     .strength(1);

  //   this.simulation = d3
  //     .forceSimulation(this.simulationNodes)
  //     .force('link', this.linkForce)
  //     .force('charge', d3.forceManyBody().strength(-400)) // Stronger repulsion
  //     .force('center', d3.forceCenter(width / 2, height / 2))
  //     .force('collision', d3.forceCollide().radius(80)) // prevent overlap
  //     .stop();

  //   // Run simulation manually to settle positions
  //   for (let i = 0; i < 300; ++i) {
  //     this.simulation.tick();
  //   }

  //   // Optional: fit the view after layout
  //   // setTimeout(() => {
  //   //   this.vflow().fitView({ padding: 5, duration: 500 });
  //   // }, 200);
  //   this.updateDistance(120);
  // }


  // protected onDistanceChange(event: Event) {
  //   const distance = +(event.target as HTMLInputElement).value;

  //   this.updateDistance(distance);
  // }

  // private updateDistance(distance: number) {
  //   this.linkForce.distance(distance * 3);
  //   this.simulation.alpha(0.5).restart();
  //   this.fitView();
  // }

  private fitView() {
    setTimeout(() => {
      this.vflow().fitView({ padding: 2, duration: 500 });
    }, 250);
  }
}

function randomHex() {
  const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

  let hex = '#';

  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * hexValues.length);
    hex += hexValues[index];
  }

  return hex;
}

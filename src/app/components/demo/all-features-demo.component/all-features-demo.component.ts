import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { Connection, Edge, Vflow, VflowComponent } from 'ngx-vflow';
import { FlowStoreService } from '../../../services/flow-store.service';

@Component({
  selector: 'app-all-features-demo.component',
  imports: [Vflow],
  providers:[FlowStoreService],
  templateUrl: './all-features-demo.component.html',
  styleUrl: './all-features-demo.component.scss'
})
export class AllFeaturesDemoComponent implements AfterViewInit {
  protected store = inject(FlowStoreService);

  protected vflow = viewChild.required(VflowComponent);

  ngAfterViewInit(): void {
    this.vflow().viewportTo({ x: 0, y: 322, zoom: 0.5 });
  }

  createEdge(connection: Connection) {
    const id = `${connection.source}${connection.sourceHandle ?? ''}-${connection.target}${connection.targetHandle ?? ''}`;

    this.store.edges.update((edges) => {
      return [
        ...edges,
        {
          id,
          edgeLabels: {
            center: {
              type: 'html-template',
              data: {
                type: 'delete',
              },
            },
          },
          ...connection,
        },
      ];
    });
  }

  deleteEdge(edgeToDelete: Edge) {
    this.store.edges.update((edges) => {
      return edges.filter((edge) => edge !== edgeToDelete);
    });
  }
}
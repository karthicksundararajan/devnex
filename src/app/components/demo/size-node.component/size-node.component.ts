import { Component, computed, inject } from '@angular/core';
import { CustomDynamicNodeComponent, Vflow } from 'ngx-vflow';
import { FlowStoreService } from '../../../services/flow-store.service';

@Component({
  selector: 'app-size-node.component',
  imports: [Vflow],
  templateUrl: './size-node.component.html',
  styleUrl: './size-node.component.scss'
})
export class SizeNodeComponent extends CustomDynamicNodeComponent {
  public store = inject(FlowStoreService);

  public connectedNodeWidth = computed(() => {
    const edge =
      this.store.edges().find((edge) => edge.target === this.node().id && edge.targetHandle === 'width') ?? null;
    const sourceNode = edge ? this.store.nodes().find((node) => node.id === edge?.source) : null;

    return Math.floor(sourceNode?.width?.() ?? 0);
  });

  public connectedNodeHeight = computed(() => {
    const edge =
      this.store.edges().find((edge) => edge.target === this.node().id && edge.targetHandle === 'height') ?? null;
    const sourceNode = edge ? this.store.nodes().find((node) => node.id === edge?.source) : null;

    return Math.floor(sourceNode?.height?.() ?? 0);
  });
}

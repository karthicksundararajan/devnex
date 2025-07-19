import { Component } from '@angular/core';
import { CustomDynamicNodeComponent, Vflow } from 'ngx-vflow';

@Component({
  selector: 'app-resizable-node.component',
  imports: [Vflow],
  templateUrl: './resizable-node.component.html',
  styleUrl: './resizable-node.component.scss'
})
export class ResizableNodeComponent extends CustomDynamicNodeComponent {}


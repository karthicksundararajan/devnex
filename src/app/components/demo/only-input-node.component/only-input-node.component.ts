import { Component } from '@angular/core';
import { CustomDynamicNodeComponent, Vflow } from 'ngx-vflow';

@Component({
  selector: 'app-only-input-node.component',
  imports: [Vflow],
  templateUrl: './only-input-node.component.html',
  styleUrl: './only-input-node.component.scss'
})
export class OnlyInputNodeComponent extends CustomDynamicNodeComponent {

}

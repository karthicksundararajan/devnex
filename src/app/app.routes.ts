import { Routes } from '@angular/router';
import { AllFeaturesDemoComponent } from './components/demo/all-features-demo.component/all-features-demo.component';
import { DbVisualizer } from './components/db-visualizer/db-visualizer';
import { D3Example } from './components/demo/d3-example/d3-example';

export const routes: Routes = [
    {
        path: '',
        component: DbVisualizer,
    },
    {
        path: 'demo',
        component: AllFeaturesDemoComponent,
    },
        {
        path: 'd3',
        component: D3Example,
    }
];

import { Component } from '@angular/core';
// import { multi } from './data';
import * as shape from 'd3-shape';
import { FloatSiteBandwidthInfoComponent } from '../float-site-bandwidth-info/float-site-bandwidth-info.component';
import { CustomEvents } from '../../../events/customevents';

@Component({
  selector: 'app-site-bandwidth-chart',
  templateUrl: './site-bandwidth-chart.html'
})
export class SiteBandwidthChartComponent {
  multi: any[];

  view: any[] = [530, 250];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Time';
  showYAxisLabel = true;
  yAxisLabel = 'Utilization (%)';



  // line, area
  autoScale = true;

  curves = {
    Basis: shape.curveBasis,
    'Basis Closed': shape.curveBasisClosed,
    Bundle: shape.curveBundle.beta(1),
    Cardinal: shape.curveCardinal,
    'Cardinal Closed': shape.curveCardinalClosed,
    'Catmull Rom': shape.curveCatmullRom,
    'Catmull Rom Closed': shape.curveCatmullRomClosed,
    Linear: shape.curveLinear,
    'Linear Closed': shape.curveLinearClosed,
    'Monotone X': shape.curveMonotoneX,
    'Monotone Y': shape.curveMonotoneY,
    Natural: shape.curveNatural,
    Step: shape.curveStep,
    'Step After': shape.curveStepAfter,
    'Step Before': shape.curveStepBefore,
    default: shape.curveLinear
  };

  // line interpolation
  curveType = 'Natural';
  curve: any = this.curves[this.curveType];
  interpolationTypes = [
    'Basis', 'Bundle', 'Cardinal', 'Catmull Rom', 'Linear', 'Monotone X',
    'Monotone Y', 'Natural', 'Step', 'Step After', 'Step Before'
  ];
  colorScheme: object = {};
  constructor(private _customEvents: CustomEvents, private _bandwidth: FloatSiteBandwidthInfoComponent) {
    this.multi = [];
    this.colorScheme = _bandwidth.colorScheme;
    this._customEvents.sendsiteBandwidthJSONEvt.subscribe((value) => {
      if (value.resp.multi) {
        this.multi = this.shuffle(value.resp.multi);
      }
    });
  }
  shuffle(data) { // TODO: need to remove one api integration
    let m = data.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = data[m];
      data[m] = data[i];
      data[i] = t;
    }

    return data;
  }
}


import { Component, Pipe, PipeTransform, Inject, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { HealthStatus, TelemetryService } from 'diagnostic-data';
import { IDropdownOption, ISelectableOption } from 'office-ui-fabric-react';
import { Check, checkResultLevel, CheckStepView, StepViewContainer } from '../step-view-lib';



@Component({
  selector: 'check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss', '../../../../../styles/icons.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckComponent implements OnInit {
  @Input() bold = false;
  @Input() check:Check;
  expanded = false;
  detailsPanelOpened = false;

  constructor(private _telemetryService: TelemetryService) {

  }

  ngOnInit(): void {
  }

  toggleSubChecks(): void {
    this.expanded = !this.expanded;
  }

  toggleDetails(): void{
    this.detailsPanelOpened = true;
  }

  detailsPanelDismissedHandler(): void{
    this.detailsPanelOpened = false;
  }
}

@Pipe({
  name: 'convertLevelToHealthStatus'
})
export class ConvertLevelToHealthStatusPipe implements PipeTransform {
  transform(level: checkResultLevel, args?: any): any {
    switch (level) {
      case checkResultLevel.pass:
        return HealthStatus.Success;
      case checkResultLevel.fail:
        return HealthStatus.Critical;
      case checkResultLevel.warning:
        return HealthStatus.Warning;
      case checkResultLevel.info:
        return HealthStatus.Info;
      case checkResultLevel.error:
        return HealthStatus.Info;
    }
    return HealthStatus.None;
  }
}
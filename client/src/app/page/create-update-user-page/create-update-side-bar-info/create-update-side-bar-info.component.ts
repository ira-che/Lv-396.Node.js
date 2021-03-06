import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDepartment } from '../../../common/models/department';
import { DepartmentService } from '../../../common/services/department.service';
import { OptionPair } from '../../../common/models/option-pair';
import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/models/user';
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-create-update-side-bar-info',
  templateUrl: './create-update-side-bar-info.component.html',
  styleUrls: ['./create-update-side-bar-info.component.scss']
})
export class CreateUpdateSideBarInfoComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  newUser = new User();
  departmentsOptionPair: OptionPair[] = [];
  departments: IDepartment[] = [];
  positions: OptionPair[] = [];
  teamLeads: OptionPair[] = [];
  hrs: OptionPair[] = [];
  managers: OptionPair[] = [];
  errorMsg;
  ifChosenDevelopmentDepartment = false;
  ifChosenHrDepartment = false;

  constructor(readonly departmentService: DepartmentService,
              readonly userService: UserService) {
  }

  ngOnInit(): void {

    this.departmentService.getAllDepartments()
      .takeUntil(this.destroy$)
      .subscribe(data => {
        this.departmentsOptionPair = data.map(o => new OptionPair(o._id, o.name));
        this.departments = data;
      });

    this.userService.getAllTeamLeads()
      .takeUntil(this.destroy$)
      .subscribe((data: any) => {
          this.teamLeads = data.map(elem => new OptionPair(elem._id, `${elem.firstName} ${elem.lastName}`));
        },
        error => this.errorMsg = error
      );

    this.userService.getAllHr()
      .takeUntil(this.destroy$)
      .subscribe(data => {
        this.hrs = data.map(elem => new OptionPair(elem._id, `${elem.firstName} ${elem.lastName}`));
      });

    this.userService.getAllManagers()
      .takeUntil(this.destroy$)
      .subscribe(data => {
        this.managers = data.map(elem => new OptionPair(elem._id, `${elem.firstName} ${elem.lastName}`));
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectDepartment(id: any): void {
    this.newUser.department = id;
    id === '5cab28b4e5773a19a4462fd1' ? this.ifChosenDevelopmentDepartment = true
                                      : this.ifChosenDevelopmentDepartment = false;
    id === '5cb9c437b5cfd134acc5783e' ? this.ifChosenHrDepartment = true :
                                        this.ifChosenHrDepartment = false;
    this.positions = this.departments
      .filter(elem => elem._id === id)[0].position
      .map(e => new OptionPair(e, e));
  }
}

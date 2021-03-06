import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../common/services/user.service';
import { User } from '../../common/models/user';
import { DatesItem } from '../common/dates-item';
import { FilterOptions } from '../common/filter-options';
import { Filter } from '../common/filter';
import { FiltersService } from '../common/filters.service';
import { FILTER_CSS_CLASS_PREFIX } from '../common/config';


@Component({
  selector: 'app-upcoming-dates',
  templateUrl: './upcoming-dates.component.html',
  styleUrls: ['./upcoming-dates.component.scss']
})
export class UpcomingDatesComponent implements OnInit {
  user = new User();
  filter: Filter[];
  dateList: DatesItem[];
  modalTypeVal: string;
  filterGrids: string;

  constructor(
    private readonly userService: UserService,
    private readonly filtersService: FiltersService,
    @Inject(FILTER_CSS_CLASS_PREFIX) public filterCssClassPrefix: string
  ) {}

  ngOnInit(): void {
    this.modalTypeVal = 'CREATE';
    this.loadUser();
    this.getFilters();
  }

  loadUser(): void {
    this.userService.getUser()
      .subscribe(user => { this.user = user; });
    this.userService.getUsersOfHr()
      .subscribe(users => {
        this.dateList = [];
        users.map((user) => {
          user.dates.map((date) => {
            const dateObj = {
              firstName: user.firstName,
              lastName: user.lastName,
              topic: date.topic,
              date: date.date
            };
            this.dateList = [...this.dateList, dateObj ];
          });
        });
      });
  }

  getFilters(): void {
    this.filtersService.getFilters()
      .subscribe(
        filters => this.filter = filters.filter((item: Filter) => item.name === 'date'),
        () => {},
        () => {
          this.filterGrids = this.filter.length ? this.filterCssClassPrefix + this.filter.length.toString() : '';
        }
      );
  }

  selectFilterOption = (data: any) => {
    if (this.filter.length) {
      this.filter = this.filter.map(
        (item: Filter) => item.id === data.filterId ? {
          id: item.id,
          name: item.name,
          isCalendar: item.isCalendar,
          defaultValue: data.optionId,
          options: this.setOptions(item.isCalendar, item.options, data.optionId)
        } : item
      );
    }
  };

  private readonly setOptions = (isCalendar: boolean, options: FilterOptions[], data: any) => {
    if (isCalendar) {
      return this.updateOptions(options, data);
    }

    return options;
  };

  private readonly updateOptions = (options: any, dateValue: any): [] => {
    if (dateValue === -1) {
      return options;
    }

    return options.map(opt =>
      opt.name === 'date' ? { name: opt.name, value: dateValue } : opt);
  };
}

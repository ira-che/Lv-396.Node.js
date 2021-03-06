import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterUsersByPipe } from '../filter-users-by.pipe';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../../common/models/user';
import { UserService } from '../../../common/services/user.service';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListComponent, FilterUsersByPipe ],
      imports: [ RouterModule, RouterTestingModule, HttpClientModule ],
      providers: [ UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

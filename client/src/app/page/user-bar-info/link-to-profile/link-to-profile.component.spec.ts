import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkToProfileComponent } from './link-to-profile.component';

describe('LinkToProfileComponent', () => {
  let component: LinkToProfileComponent;
  let fixture: ComponentFixture<LinkToProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkToProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkToProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

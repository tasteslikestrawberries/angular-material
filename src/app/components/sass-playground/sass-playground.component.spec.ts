import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SassPlaygroundComponent } from './sass-playground.component';

describe('SassPlaygroundComponent', () => {
  let component: SassPlaygroundComponent;
  let fixture: ComponentFixture<SassPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SassPlaygroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SassPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

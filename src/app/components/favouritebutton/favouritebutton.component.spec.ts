import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritebuttonComponent } from './favouritebutton.component';

describe('FavouritebuttonComponent', () => {
  let component: FavouritebuttonComponent;
  let fixture: ComponentFixture<FavouritebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritebuttonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteCardComponent } from './favourite-card.component';

describe('FavouriteCardComponent', () => {
  let component: FavouriteCardComponent;
  let fixture: ComponentFixture<FavouriteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

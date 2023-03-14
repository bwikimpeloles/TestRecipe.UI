import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardUserComponent } from './recipe-card-user.component';

describe('RecipeCardUserComponent', () => {
  let component: RecipeCardUserComponent;
  let fixture: ComponentFixture<RecipeCardUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeCardUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeCardUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

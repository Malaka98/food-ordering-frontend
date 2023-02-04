import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodsPageComponent } from './foods-page.component';

describe('FoodsPageComponent', () => {
  let component: FoodsPageComponent;
  let fixture: ComponentFixture<FoodsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

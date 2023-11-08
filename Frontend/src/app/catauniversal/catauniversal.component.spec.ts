import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatauniversalComponent } from './catauniversal.component';

describe('CatauniversalComponent', () => {
  let component: CatauniversalComponent;
  let fixture: ComponentFixture<CatauniversalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatauniversalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatauniversalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

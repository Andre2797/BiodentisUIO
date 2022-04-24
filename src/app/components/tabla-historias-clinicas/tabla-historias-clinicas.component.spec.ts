import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHistoriasClinicasComponent } from './tabla-historias-clinicas.component';

describe('TablaHistoriasClinicasComponent', () => {
  let component: TablaHistoriasClinicasComponent;
  let fixture: ComponentFixture<TablaHistoriasClinicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaHistoriasClinicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaHistoriasClinicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




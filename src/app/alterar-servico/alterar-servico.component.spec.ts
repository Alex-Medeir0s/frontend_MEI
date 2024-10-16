import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarServicoComponent } from './alterar-servico.component';

describe('AlterarServicoComponent', () => {
  let component: AlterarServicoComponent;
  let fixture: ComponentFixture<AlterarServicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterarServicoComponent]
    });
    fixture = TestBed.createComponent(AlterarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

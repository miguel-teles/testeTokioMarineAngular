import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciasTableComponent } from './transferencias-table.component';

describe('TransferenciasTableComponent', () => {
  let component: TransferenciasTableComponent;
  let fixture: ComponentFixture<TransferenciasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferenciasTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVariableManualDialogBoxComponent } from './create-variable-manual-dialog-box.component';

describe('CreateVariableManualDialogBoxComponent', () => {
  let component: CreateVariableManualDialogBoxComponent;
  let fixture: ComponentFixture<CreateVariableManualDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVariableManualDialogBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateVariableManualDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

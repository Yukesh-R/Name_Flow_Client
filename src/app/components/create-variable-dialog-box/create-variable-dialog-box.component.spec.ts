import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVariableDialogBoxComponent } from './create-variable-dialog-box.component';

describe('CreateVariableDialogBoxComponent', () => {
  let component: CreateVariableDialogBoxComponent;
  let fixture: ComponentFixture<CreateVariableDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVariableDialogBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateVariableDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

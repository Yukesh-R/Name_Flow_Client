import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVariableDialogBoxComponent } from './update-variable-dialog-box.component';

describe('UpdateVariableDialogBoxComponent', () => {
  let component: UpdateVariableDialogBoxComponent;
  let fixture: ComponentFixture<UpdateVariableDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVariableDialogBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateVariableDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

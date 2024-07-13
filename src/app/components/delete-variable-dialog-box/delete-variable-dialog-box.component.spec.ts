import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVariableDialogBoxComponent } from './delete-variable-dialog-box.component';

describe('DeleteVariableDialogBoxComponent', () => {
  let component: DeleteVariableDialogBoxComponent;
  let fixture: ComponentFixture<DeleteVariableDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteVariableDialogBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteVariableDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

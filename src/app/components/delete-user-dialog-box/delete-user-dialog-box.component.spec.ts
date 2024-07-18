import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserDialogBoxComponent } from './delete-user-dialog-box.component';

describe('DeleteUserDialogBoxComponent', () => {
  let component: DeleteUserDialogBoxComponent;
  let fixture: ComponentFixture<DeleteUserDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUserDialogBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteUserDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserDialogBoxComponent } from './update-user-dialog-box.component';

describe('UpdateUserDialogBoxComponent', () => {
  let component: UpdateUserDialogBoxComponent;
  let fixture: ComponentFixture<UpdateUserDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserDialogBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateUserDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

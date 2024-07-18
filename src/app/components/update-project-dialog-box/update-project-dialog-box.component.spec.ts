import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectDialogBoxComponent } from './update-project-dialog-box.component';

describe('UpdateProjectDialogBoxComponent', () => {
  let component: UpdateProjectDialogBoxComponent;
  let fixture: ComponentFixture<UpdateProjectDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProjectDialogBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProjectDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

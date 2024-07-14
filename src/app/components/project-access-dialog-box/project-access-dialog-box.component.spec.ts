import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAccessDialogBoxComponent } from './project-access-dialog-box.component';

describe('ProjectAccessDialogBoxComponent', () => {
  let component: ProjectAccessDialogBoxComponent;
  let fixture: ComponentFixture<ProjectAccessDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectAccessDialogBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectAccessDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

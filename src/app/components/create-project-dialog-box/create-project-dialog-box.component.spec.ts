import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectDialogBoxComponent } from './create-project-dialog-box.component';

describe('CreateProjectDialogBoxComponent', () => {
  let component: CreateProjectDialogBoxComponent;
  let fixture: ComponentFixture<CreateProjectDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjectDialogBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateProjectDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

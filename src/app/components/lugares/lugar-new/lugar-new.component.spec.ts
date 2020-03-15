import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LugarNewComponent } from './lugar-new.component';

describe('LugarNewComponent', () => {
  let component: LugarNewComponent;
  let fixture: ComponentFixture<LugarNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LugarNewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LugarNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

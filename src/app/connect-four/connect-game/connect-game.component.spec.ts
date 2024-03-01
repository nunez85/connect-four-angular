import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectGameComponent } from './connect-game.component';

describe('ConnectGameComponent', () => {
  let component: ConnectGameComponent;
  let fixture: ComponentFixture<ConnectGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

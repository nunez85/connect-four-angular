import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectGridComponent } from './connect-grid.component';

describe('ConnectGridComponent', () => {
  let component: ConnectGridComponent;
  let fixture: ComponentFixture<ConnectGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnectGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

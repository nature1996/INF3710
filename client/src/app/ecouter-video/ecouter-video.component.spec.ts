import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcouterVideoComponent } from './ecouter-video.component';

describe('EcouterVideoComponent', () => {
  let component: EcouterVideoComponent;
  let fixture: ComponentFixture<EcouterVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcouterVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcouterVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

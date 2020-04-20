import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AcheterFilmComponent } from "./acheter-film.component";

describe("AcheterFilmComponent", () => {
  let component: AcheterFilmComponent;
  let fixture: ComponentFixture<AcheterFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AcheterFilmComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheterFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

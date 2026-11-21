import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DuckJumpscare } from './duck-jumpscare';

describe('DuckJumpscare', () => {
  let component: DuckJumpscare;
  let fixture: ComponentFixture<DuckJumpscare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuckJumpscare],
    }).compileComponents();

    fixture = TestBed.createComponent(DuckJumpscare);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

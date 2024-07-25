import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSearchComponent } from './artist-search.component';

describe('ArtistSearchComponent', () => {
  let component: ArtistSearchComponent;
  let fixture: ComponentFixture<ArtistSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

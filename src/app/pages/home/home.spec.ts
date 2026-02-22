import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router'; // Gunakan provider router terbaru
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 1. Karena HomeComponent itu Standalone, masukkan ke 'imports'
      imports: [HomeComponent],
      // 2. Karena di home.ts ada RouterModule, tambahkan provider router di sini
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Memicu perubahan deteksi awal
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
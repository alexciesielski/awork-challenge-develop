import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UserHttpMockService } from './user-api/user-http-mock.service';
import { UserHttpService } from './user-api/user-http.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: UserHttpService,
          useClass: UserHttpMockService,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { UsersRequest, UsersResponse } from './types';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with null response', () => {
    const status = service.getUsersStatus();
    expect(status()).toEqual({ response: null });
  });

  it('should handle errors during fetch', () => {
    service.setPage(1);

    const req = httpTestingController.expectOne('https://reqres.in/api/users?page=1&per_page=10');
    expect(req.request.method).toEqual('GET');
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });

    const status = service.getUsersStatus();
    expect(status().response).toBeNull();
  });

  it('should set perPage and fetch users with correct perPage', () => {
    service.setPerPage(5);

    const req = httpTestingController.expectOne('https://reqres.in/api/users?page=1&per_page=5');
    expect(req.request.method).toEqual('GET');
    req.flush({
      page: 1,
      per_page: 5,
      total: 5,
      total_pages: 1,
      data: [
        { id: 1, email: 'user1@example.com', first_name: 'User', last_name: '1' },
        { id: 2, email: 'user2@example.com', first_name: 'User', last_name: '2' },
      ],
    });
  });

  it('should not fetch users if page is invalid', () => {
    service.setPage(-1);

    httpTestingController.expectNone('https://reqres.in/api/users?page=-1&per_page=10');
  });

  it('should not fetch users if perPage is invalid', () => {
    service.setPerPage(-1);

    httpTestingController.expectNone('https://reqres.in/api/users?page=1&per_page=-1');
  });
});

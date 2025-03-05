import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { UsersService } from '../../shared/state/users/users.service';
import { User } from '../../shared/state/users/types';
import { InputStyleDirective } from '../../shared/diretivas/InputStyle/input-style.directive';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { Signal, signal } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockUsersService: jasmine.SpyObj<UsersService>;

  const mockUsers: User[] = [
    { id: 1, firstName: 'User 1', lastName: 'Doe', email: 'user1@example.com' },
    { id: 2, firstName: 'User 2', lastName: 'Smith', email: 'user2@example.com' },
  ];

  const mockResponse = {
    total: 2,
    perPage: 10,
    page: 1,
    data: mockUsers,
  };

  const mockSignal: Signal<any> = signal({ response: mockResponse })

  beforeEach(async () => {
    mockUsersService = jasmine.createSpyObj('UsersService', ['getUsersStatus', 'setPage', 'setPerPage']);
    mockUsersService.getUsersStatus.and.returnValue(mockSignal);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent, InputStyleDirective, PaginationComponent, FooterComponent, SidebarComponent],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct data from users service', () => {
    expect(component.totalItems).toBe(mockResponse.total);
    expect(component.itemsPerPage).toBe(mockResponse.perPage);
    expect(component.currentPage).toBe(mockResponse.page);
    expect(component.users).toEqual(mockUsers);
  });

  it('should call setPage on usersService when onPageChange is called', () => {
    component.onPageChange(2);
    expect(mockUsersService.setPage).toHaveBeenCalledWith(2);
  });

  it('should call setPerPage on usersService when onPerPageChange is called', () => {
    const mockEvent = { target: { value: '20' } } as unknown as Event;
    component.onPerPageChange(mockEvent);
    expect(mockUsersService.setPerPage).toHaveBeenCalledWith(20);
  });

  it('should call setPage on usersService when ngOnInit is called', () => {
    component.ngOnInit();
    expect(mockUsersService.setPage).toHaveBeenCalledWith(1);
  })
});

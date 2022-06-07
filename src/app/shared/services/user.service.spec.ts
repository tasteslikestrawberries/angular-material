import { HttpClient } from '@angular/common/http';
import { defer } from 'rxjs';
import { IUser } from '../models/IUser';
import { UserService } from './user.service';

//helper functions
function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

function asyncError<T>(data: T) {
  return defer(() => Promise.reject(data));
}

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let service: UserService;

beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  service = new UserService(httpClientSpy);
});

it('should return expected users (HttpClient called once)', (done: DoneFn) => {
  const expectedUsers: IUser[] =
    [{ id: '1', name: 'A', email: 'some@email.com', date: 'someDate', phone: '12345' }, 
    { id: '1', name: 'A', email: 'some@email.com', date: 'someDate', phone: '12345' }];

  httpClientSpy.get.and.returnValue(asyncData(expectedUsers));

  service.getUsers().subscribe({
    next: users => {
      expect(users)
        .withContext('expected users')
        .toEqual(expectedUsers);
      done();
    },
    error: done.fail
  });
  expect(httpClientSpy.get.calls.count())
    .withContext('one call')
    .toBe(1);
});

/*it('should return an error when the server returns a 404', (done: DoneFn) => {
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404, statusText: 'Not Found'
  });

  httpClientSpy.get.and.returnValue(asyncError(errorResponse));

  service.getUsers().subscribe({
    next: users => done.fail('expected an error, not users'),
    error: error => {
      expect(error.message).toContain('test 404 error');
      done();
    }
  });
});*/
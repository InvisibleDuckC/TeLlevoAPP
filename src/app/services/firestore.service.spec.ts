import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { FirestoreService } from './firestore.service';
import { of } from 'rxjs';

describe('FirestoreService', () => {
  let service: FirestoreService;

  // Mock completo de Firestore
  const mockFirestore = {
    collection: jasmine.createSpy('collection').and.callFake(() => ({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([{ id: '1', name: 'Test User' }])),
      add: jasmine.createSpy('add').and.returnValue(Promise.resolve({ id: 'mockId' })),
      doc: jasmine.createSpy('doc').and.callFake(() => ({
        valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of({ id: '1', name: 'Test User' })),
        set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
        update: jasmine.createSpy('update').and.returnValue(Promise.resolve()),
        delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve()),
      })),
    })),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirestoreService,
        { provide: Firestore, useValue: mockFirestore }, // Proporciona el mock completo
      ],
    });
    service = TestBed.inject(FirestoreService);

    // Aseguramos que `ngOnInit` se ejecute correctamente
    service['collectionRef'] = mockFirestore.collection('users');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});

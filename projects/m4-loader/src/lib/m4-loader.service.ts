import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class M4LoaderService {
  public isLoading = new BehaviorSubject(false);
  constructor() { }
}

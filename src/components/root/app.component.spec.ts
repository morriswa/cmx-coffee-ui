// @ts-nocheck

import {ComponentFixture, TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {LoginService} from "src/services/login.service";
import createSpyObj = jasmine.createSpyObj;

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loginSpy: any;

  beforeEach(()=>{

    const loginServiceInitialValues = createSpyObj('LoginService', {
      'init': Promise.resolve(true)
    }, {})

    TestBed.configureTestingModule({
      providers: [
        {provide: LoginService, useValue: loginServiceInitialValues}
      ]
    })

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    loginSpy = TestBed.inject(LoginService);
  });

  it('should create application and required context', () => {
    expect(component).toBeDefined();

    component.ngOnInit();

    expect(loginSpy.init).toHaveBeenCalled()
    expect(component.routerEventSubscription).toBeDefined()
  });
})

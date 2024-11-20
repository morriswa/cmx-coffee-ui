// @ts-nocheck

import {LoginService} from "./login.service";
import {AuthService} from "@auth0/auth0-angular";
import {ApiClient} from "./api-client.service";
import {provideRouter, Router} from "@angular/router";
import {TestBed} from "@angular/core/testing";
import {BehaviorSubject,} from "rxjs";
import {AppRoutes} from "../config/routes.config";


describe('LoginService', () => {
  let service: LoginService;
  let auth0Mock: any
  let apiMock: any
  let router: any

  beforeEach(()=>{

    const cr = jasmine.createSpyObj('AuthService', {}, {
      isAuthenticated$: new BehaviorSubject(true),
      idTokenClaims$: new BehaviorSubject({exp: new Date().getTime() + 10000}),
      user$: new BehaviorSubject({})
    });

    const api = jasmine.createSpyObj('ApiClient', {
      permissions: Promise.resolve([])
    });

    TestBed.configureTestingModule({
      providers: [
        provideRouter(AppRoutes),
        {provide: AuthService, useValue: cr},
        {provide: ApiClient, useValue: api},
        LoginService,
      ]
    });

    auth0Mock = TestBed.inject(AuthService);
    apiMock = TestBed.inject(ApiClient);
    router = TestBed.inject(Router);
    service = TestBed.inject(LoginService);
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  })

  it('should be authenticated if auth0 says so', async () => {
    await service.init()
    expect(service.isAuthenticated).toBeTrue();
  })

  it('should not be authenticated is auth0 says so', async () => {
    auth0Mock.isAuthenticated$.next(false);
    await service.init()
    expect(service.isAuthenticated).toBeFalse();
  })

  it('should throw an error if accessed before init', async () => {
    try {
      service.isAuthenticated
      fail('never should get here')
    } catch (e) {
      expect((e as Error).message).toEqual('Login Service has NOT been properly initialized...')
    }
  })
})

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendorApplicationPageComponent } from './vendor-application-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiClient } from 'src/services/api-client.service';
import { FancyButtonComponent } from 'src/components/fancy-button/fancy-button.component';
import { AddressFormComponent, MockAddressFormComponent } from 'src/components/address-form/address-form.component';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('VendorApplicationPageComponent', () => {
  let component: VendorApplicationPageComponent;
  let fixture: ComponentFixture<VendorApplicationPageComponent>
  let mockApiClient: jasmine.SpyObj<ApiClient>;

  beforeEach(() => {
    mockApiClient = jasmine.createSpyObj('ApiClient', ['applyForVendorship']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, VendorApplicationPageComponent, FancyButtonComponent],
      providers: [{ provide: ApiClient, useValue: mockApiClient }],
    }).overrideComponent(VendorApplicationPageComponent, {
      remove: { imports: [AddressFormComponent],},
      add: { imports: [MockAddressFormComponent]},
    }).compileComponents();

    fixture = TestBed.createComponent(VendorApplicationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () =>{
    expect(component).toBeTruthy();
  })

  it('should initialize form controls with empty values', () => {
    expect(component.businessNameForm.value).toBe('');
    expect(component.businessEmailForm.value).toBe('');
    expect(component.businessPhoneForm.value).toBe('');
  });

  it('should validate form controls as required', () => {
    component.businessNameForm.setValue('');
    component.businessEmailForm.setValue('');
    component.businessPhoneForm.setValue('');

    expect(component.businessNameForm.invalid).toBeTrue();
    expect(component.businessEmailForm.invalid).toBeTrue();
    expect(component.businessPhoneForm.invalid).toBeTrue();
  });

  // test case for when all inputs have VALID input (submit button should be valid)
  it('should enable the submit button when the form is valid', () => {
    component.businessNameForm.setValue('makenna');
    component.businessEmailForm.setValue('makenna@gmail.com');
    component.businessPhoneForm.setValue('9136081981');
    // this is the mock address form component , right now it returns true as if the test has passed with good input
    console.log(component.addressForm)
    expect(component.addressForm).toBeDefined();
    expect(component.addressForm?.valid).toBeTrue();

    expect(component.valid).toBeTrue(); // submit button expected to be valid
  });

  // test case for when all inputs are null (submit button should be invalid)
  // address form is valid because that will be tested in different unit tests
  it('should disable the submit button when the form is invalid', () => {
    component.businessNameForm.setValue('');
    component.businessEmailForm.setValue('');
    component.businessPhoneForm.setValue('');
    // mock address input -> returns valid input
    console.log(component.addressForm)
    expect(component.addressForm).toBeDefined();
    expect(component.addressForm?.valid).toBeTrue();

    expect(component.valid).toBeFalse(); // submit button expected to be invalid
  });

  // test case for when BUSINESS NAME input is null (submit button should be invalid)
  it('should disable the submit button when the business name is invalid', () => {
    component.businessNameForm.setValue('');
    component.businessEmailForm.setValue('makenna@gmail.com');
    component.businessPhoneForm.setValue('9136081981');
    // mock address input -> returns valid input
    console.log(component.addressForm)
    expect(component.addressForm).toBeDefined();
    expect(component.addressForm?.valid).toBeTrue();

    expect(component.valid).toBeFalse();
  });

  // test case for when all EMAIL input is null (submit button should be invalid)
  it('should disable the submit button when the email is invalid', () => {
    component.businessNameForm.setValue('makenna');
    component.businessEmailForm.setValue('');
    component.businessPhoneForm.setValue('9136081981');
    // mock address input -> returns valid input
    console.log(component.addressForm)
    expect(component.addressForm).toBeDefined();
    expect(component.addressForm?.valid).toBeTrue();

    expect(component.valid).toBeFalse();
  });

  // test case for when all PHONE input is null (submit button should be invalid)
  it('should disable the submit button when the phone number is invalid', () => {
    component.businessNameForm.setValue('makenna');
    component.businessEmailForm.setValue('makenna@gmail.com');
    component.businessPhoneForm.setValue('');
    // mock address input -> returns valid input
    console.log(component.addressForm)
    expect(component.addressForm).toBeDefined();
    expect(component.addressForm?.valid).toBeTrue();

    expect(component.valid).toBeFalse();
  });

  // edge cases //

  // test case for when business is over 256 characters (submit button should be invalid)
  it('should disable the submit button when business is over 256 characters', () => {

    const lens = 'i'.repeat(257)
    expect(lens.length).toEqual(257)

    component.businessNameForm.setValue(lens);
    component.businessEmailForm.setValue('makenna@gmail.com');
    component.businessPhoneForm.setValue('9136081981');
    // mock address input -> returns valid input
    console.log(component.addressForm)
    expect(component.addressForm).toBeDefined();
    expect(component.addressForm?.valid).toBeTrue();

    expect(component.valid).toBeFalse();
  });

  // test case for when email is over 256 characters (submit button should be invalid)
  it('should disable the submit button when business is over 256 characters', () => {

    const lens = 'i'.repeat(257)
    expect(lens.length).toEqual(257)

    component.businessNameForm.setValue('makenna');
    component.businessEmailForm.setValue(lens)
    component.businessPhoneForm.setValue('9136081981');
    // mock address input -> returns valid input
    console.log(component.addressForm)
    expect(component.addressForm).toBeDefined();
    expect(component.addressForm?.valid).toBeTrue();

    expect(component.valid).toBeFalse();
  });

  // test case for when phone is over 12 characters (submit button should be invalid)
  it('should disable the submit button when phone is over 12 characters', () => {
    component.businessNameForm.setValue('makenna');
    component.businessEmailForm.setValue('makenna@gmail.com');
    component.businessPhoneForm.setValue('9136081981111');
    // mock address input -> returns valid input
    console.log(component.addressForm)
    expect(component.addressForm).toBeDefined();
    expect(component.addressForm?.valid).toBeTrue();

    expect(component.valid).toBeFalse();
  });
});

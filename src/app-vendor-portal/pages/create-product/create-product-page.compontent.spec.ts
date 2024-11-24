import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { CreateProductPageComponent } from './create-product-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TaggedInputComponent } from 'src/components/tagged-input/tagged-input.component';
import { RadioButtonGroupComponent } from 'src/components/radio-button-group/radio-button-group.component';
import { FancyButtonComponent } from 'src/components/fancy-button/fancy-button.component';
import { NumberStepperComponent } from 'src/components/number-stepper/number-stepper.component';
import { DecimalPipe, NgIf } from '@angular/common';
import { VendorService } from '../../services/vendor.service';

describe('CreateProductPageComponent', () => {
  let fixture: ComponentFixture<CreateProductPageComponent>;
  let component: CreateProductPageComponent;
  let vendorServiceSpy: jasmine.SpyObj<VendorService>;


  beforeEach(fakeAsync(() => {
    // Create spies for VendorService
    vendorServiceSpy = jasmine.createSpyObj('VendorService', ['getVendors', 'createProduct']);

    TestBed.configureTestingModule({
      imports: [
        TaggedInputComponent,
        RadioButtonGroupComponent,
        FancyButtonComponent,
        NumberStepperComponent,
        ReactiveFormsModule,
        DecimalPipe,
        NgIf
      ],
      providers: [
        { provide: VendorService, useValue: vendorServiceSpy }, // Use spy for VendorService
        // { provide: Router, useValue: routerSpy } Use spy for Router
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductPageComponent);
    component = fixture.componentInstance;
  }));

  //The first test, the component should render.
  it('The component should render', () => {
    expect(component).toBeTruthy();
  });

  //If the initialPrice form doens't have a valid number
  it('User should be unable to submit form if InitalPrice value is not a valid number', () => {
    component.productNameForm.setValue('name');
    component.descriptionForm.setValue('description');
    component.initialPriceForm.setValue(1000);
    expect(component.formValid).toBeFalse();
  })
  //If the productNameForm form doens't have a valid name.
  it('User should be unable to submit form if productName value is not a valid name', () => {
    component.productNameForm.setValue(null);
    component.descriptionForm.setValue('description');
    component.initialPriceForm.setValue(1)
    expect(component.formValid).toBeFalse();
  })

  it('User must select a decafForm value with value of "y" or "n" to submit', () => {
    if(component.decafForm.value !='y' || component.decafForm.value !='n'){
      expect(component.formValid).toBeFalse()
    }
  })

  it('User must select a flavoredForm value with value of "y" or "n" to submit', () => {
    if(component.flavoredForm.value !='y' || component.flavoredForm.value != 'n'){
        expect(component.formValid).toBeFalse();
    }
  })

  it('User must select a singleOriginForm value with value of "y" or "n" to submit', () => {
    if(component.singleOriginForm.value != "y" || component.singleOriginForm.value != "n"){
      expect(component.formValid).toBeFalse
    }
  })

  it('User should not be able to enter negative values or values over 999.99', () => {
    if(component.initialPriceForm.value != null){
      if(component.initialPriceForm.value < 0 || component.initialPriceForm.value > 999.99){
        expect(component.formValid).toBeFalse
      }
    }
  })

  it('User should not be able to choose a value of < 0 or > 10 on Coffee Strength', () => {
    if(component.tasteStrengthForm.value < 0 || component.tasteStrengthForm.value > 10){
      expect(component.formValid).toBeFalse()
    }
  })


});

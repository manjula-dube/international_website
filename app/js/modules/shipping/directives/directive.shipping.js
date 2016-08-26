angular.module('shipping.directives')
.directive('cvAddressBox', [ function() {
  return {
    restrict: 'A',
    template: '<div class="col-xs-12 col-sm-6 col-md-4" ng-click="oncardclicked({id: address.entity_id})"> <div class="col-xs-12 addressCard" ng-class="{\'addressCardActive\': address.entity_id==shippingid || address.entity_id==billingid}"> <div class="col-xs-12 nopadding customer-address"> <div class="col-xs-12 nopadding"> <h5> <b>{{address.firstname}}&nbsp;{{address.lastname}}</b> <span></span> <span class="pull-right delete-shipping"> <a href="javascript:void(0)" ng-click="oneditclicked({address: address})"> <i class="sprite sprite-grey-edit"></i> </a> </span> </h5> <span>{{address.street}},</span> <span>{{address.city}},</span> <p>{{address.region}}-{{address.postcode}}</p><p>{{address.country}}</p><p class="margin0">{{address.telephone}}</p></div></div></div><div class="checkbox col-xs-12 nopadding hidden-lg margin-top0" ng-class="{\'hide\': address.entity_id !==shippingid}"> <label><input type="checkbox" id="MGuest" ng-model="shippingbillingflag" ng-change="onshippingbillingflagchange()"> <span for="Guest"></span> This is also my Billing Address </label> </div></div>',
    scope: {
      address: '=',
      oncardclicked: '&',
      oneditclicked: '&',
      shippingid: '=',
      billingid: '=',
      shippingbillingflag: '=',
      onshippingbillingflagchange: '&'
    }
  };
}]);
angular.module('shipping.directives')
.directive('cvAddressForm', [ function() {
  return {
    restrict: 'A',
    template: '<form role="form" name="formname" ng-submit="onsubmitclicked()" novalidate> <div class="form-group nopadding col-sm-8 col-xs-12"> <label> Country: <span role="country">{{address.country_obj.country_name}}</span> <a href="javascript:void(0)" ng-click="changecountry=true"> <span ng-hide="changecountry">Change</span> </a> </label> <div class="select-style" ng-show="changecountry"> <select ng-model="address.country_obj" name="state" ng-options="item as item.country_name for item in countries track by item.country_code" required> <option value>Select Country</option> </select> <i class="sprite sprite-down-arrow select-sprite-shipping"></i> </div></div><div class="form-group nopadding col-sm-8 col-xs-12" ng-class="{\'error\' : (formname.firstname.$invalid && !formname.firstname.$pristine && formname.firstname.$touched ) || (formname.$submitted && formname.firstname.$error.required)}"> <label for="name">First Name</label> <input cv-trim id="shippingFname" name="firstname" type="text" class="form-control" placeholder="Enter First Name" ng-model="address.firstname" ng-minlength="2" required> <div ng-show="formname.$submitted && formname.firstname.$pristine"> <span ng-show="formname.firstname.$error.required" class="error">Please Enter your First Name.</span> </div><span ng-message="formname.firstname.$error.minlength && !formname.firstname.$pristine" ng-show="formname.firstname.$invalid && formname.firstname.$touched" class="error">First name should be more than two characters</span> </div><div class="form-group nopadding col-sm-8 col-xs-12" ng-class="{\'error\' : (formname.lastname.$invalid && !formname.lastname.$pristine && formname.lastname.$touched) || (formname.$submitted && formname.lastname.$error.required)}"> <label for="name">Last Name</label> <input cv-trim id="shippingLname" name="lastname" type="text" class="form-control" placeholder="Enter Last Name" ng-model="address.lastname" ng-minlength="2" required> <div ng-show="formname.$submitted && formname.lastname.$pristine"> <span ng-show="formname.lastname.$error.required" class="error">Please Enter your Last Name.</span> </div><span ng-message="formname.lastname.$error.minlength && !formname.lastname.$pristine" ng-show="formname.lastname.$invalid && formname.lastname.$touched" class="error">Last name should be more than two characters</span> </div><div class="form-group nopadding col-xs-12" ng-class="{\'error\' : (formname.address.$invalid && !formname.address.$pristine && formname.address.$touched) || (formname.$submitted && formname.address.$error.required)}"> <label for="Address">Address</label> <textarea cv-trim id="shippingAddress" name="address" ng-model="address.street" class="form-control" ng-minlength="10" placeholder="Enter Address" required></textarea> <div ng-show="formname.$submitted && formname.address.$pristine"> <span ng-show="formname.address.$error.required" class="error">Please enter your address for successful delivery.</span> </div><span ng-message="formname.address.$error.minlength && !formname.address.$pristine" ng-show="formname.address.$invalid && formname.address.$touched" class="error">Address should be more than ten characters.</span> </div><div class="col-xs-12 col-sm-4 nopadding"> <div class="form-group" ng-class="{\'error\' : (formname.postcode.$invalid && !formname.postcode.$pristine && formname.postcode.$touched) || (formname.$submitted && formname.postcode.$error.required)}"> <label for="Pincode">Pincode</label> <input cv-trim id="shippingPincode1" name="postcode" type="number" class="form-control" placeholder="Pincode" ng-maxlength="{{address.country_obj.max_pincode_length}}" ng-minlength="{{address.country_obj.min_pincode_length}}" ng-model="address.postcode" ng-blur="changePincode()" required ng-if="address.country_obj.is_alpha==\'n\'"/> <input cv-trim id="shippingPincode2" name="postcode" type="text" class="form-control" placeholder="Pincode" ng-maxlength="{{address.country_obj.max_pincode_length}}" ng-minlength="{{address.country_obj.min_pincode_length}}" ng-model="address.postcode" ng-blur="changePincode()" required ng-if="address.country_obj.is_alpha==\'y\'"/> <div ng-show="formname.postcode.$error.minlength && !formname.postcode.$pristine" class="error"> <span ng-message="formname.postcode.$invalid" ng-show="formname.postcode.$touched">Pincode should be of minimum{{address.country_obj.min_pincode_length}}digits.</span> </div><div ng-show="formname.postcode.$error.maxlength && !formname.postcode.$pristine" class="error"> <span ng-message="formname.postcode.$invalid" ng-show="formname.postcode.$touched">Pincode should be of maximum{{address.country_obj.max_pincode_length}}digits.</span> </div><div ng-show="formname.$submitted "> <span ng-show="formname.postcode.$error.required" class="error">Please enter your pincode.</span> </div></div></div><div class="col-xs-12 col-sm-1 m-padding hidden-lg"> <div ng-show="citystateWait" cv-loader class="small-loader m-loAd"></div> </div><div class="col-xs-12 col-sm-6 m-padding"> <div class="form-group" ng-class="{\'error\' : (formname.city.$invalid && !formname.city.$pristine && formname.city.$touched) || (formname.$submitted && formname.city.$error.required)}"> <label for="City">City</label> <input type="text" cv-trim ng-model="address.city" name="city" required class="form-control" placeholder="City"> <span class="error" ng-show="formname.$submitted && formname.city.$error.required">Please enter your city</span> </div></div><div class="col-xs-12 col-sm-2 m-padding hidden-xs mt35"> <div ng-show="citystateWait" cv-loader class="small-loader"></div> </div><div class="form-group nopadding col-xs-12" ng-class="{\'error\' : (formname.state.$invalid && !formname.state.$pristine && formname.state.$touched) || (formname.$submitted && formname.state.$error.required)}"> <label for="State">State</label> <input type="text" cv-trim ng-model="address.state" name="state" required class="form-control" placeholder="State"> <span ng-show="formname.state.$error.minlength" class="error">Username is too short.</span> <span class="error" ng-show="formname.$submitted && formname.state.$error.required">Please enter your state</span> </div><div class="form-group col-sm-8 col-xs-12 nopadding" ng-class="{\'error\' : (formname.phonenumber.$invalid && !formname.phonenumber.$pristine && formname.phonenumber.$touched) || (formname.$submitted && formname.phonenumber.$error.required)}"> <label for="Number">Phone Number</label> <div class=""> <div class=""></div><input type="number" cv-trim name="phonenumber" class="form-control" id="shippingPhoneNumber" placeholder="Phone Number" ng-model="address.telephone" ng-minlength="10" ng-maxlength="20" ng-required="true"> </div><div ng-show="formname.phonenumber.$error.minlength && !formname.phonenumber.$pristine" class="error"> <span ng-message="formname.phonenumber.$invalid" ng-show="formname.phonenumber.$touched">Phone number should atleast be of 10 digits.</span> </div><div ng-show="formname.phonenumber.$error.maxlength && !formname.phonenumber.$pristine" class="error"> <span ng-message="formname.phonenumber.$invalid" ng-show="formname.phonenumber.$touched">Phone number should atmost be of 20 digits .</span> </div><div ng-show="formname.$submitted "> <span ng-show="formname.phonenumber.$error.required" class="error">Please enter your phone number for successful delivery.</span> </div></div><div class="form-group nopadding col-xs-12"> <button type="submit" class="btn btn-newStyle btn-newStyleActive Width60" ng-if="showaddsubmit"> <span ng-show="!loaderflag">SAVE & CONTINUE</span> <div ng-show="loaderflag" cv-loader class="small-loader"></div> </button> </div><div class="form-group col-xs-12 nopadding" ng-if="showeditsubmit" id="saveAndContinueBtn"> <button type="submit" class="btn btn-default outline-btn" ng-disabled="formname.$invalid && formname.$touched">SAVE</button> <button type="button" class="btn btn-default outline-btn" ng-click="oncancelclicked()">CANCEL</button> </div></form>',
    scope: {
      address: '=',
      countries: '=',
      onsubmitclicked: '&',
      oncancelclicked: '&',
      showeditsubmit: '=',
      showaddsubmit: '=',
      formname: '=',
      loaderflag: '='
    },
    controller: 'ctrl.cvAddressForm'
  };
}]);
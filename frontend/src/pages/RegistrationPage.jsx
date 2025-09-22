import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, CreditCard, Star, AlertTriangle, Shield, Bike } from 'lucide-react';

const RegistrationPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState('pre-form'); // 'pre-form', 'form', 'maintenance'
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    confirmEmail: '',
    birthday: { day: '', month: '', year: '' },
    occupation: '',
    mobile: '',
    landline: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    postCode: '',
    phonePlatform: '',
    phoneModel: '',
    hasGPS: '',
    hasFacebook: '',
    hasPhoneMount: '',
    canChargePhone: '',
    
    // Emergency Contacts
    emergency1: { firstName: '', lastName: '', email: '', mobile: '', landline: '', relationship: '' },
    emergency2: { firstName: '', lastName: '', email: '', mobile: '', landline: '', relationship: '' },
    shirtSize: '',
    
    // Medical Information
    medicalCondition: '',
    medicalDescription: '',
    medications: '',
    regularMedication: '',
    medicationDetails: '',
    medicationAllergies: '',
    medicationAllergyDetails: '',
    foodAllergies: '',
    foodAllergyDetails: '',
    dietaryRequirements: '',
    medicareNumber: '',
    medicarePosition: '',
    
    // Experience
    previousTraining: '',
    recentTraining: '',
    trainingDetails: '',
    offRoadExperience: '',
    experienceLevel: '',
    confidenceIssues: '',
    
    // Training Date
    trainingState: '',
    trainingDate: '',
    phase: '',
    completedPhase1: '',
    completedPhase2: '',
    
    // Accommodation
    accommodationPreference: '',
    groupMembers: '',
    
    // Non-riding Partner
    hasPartner: '',
    partnerName: '',
    partnerMealPackage: '',
    
    // Bike Details
    bikeChoice: '',
    bikeMake: '',
    bikeModel: '',
    bikeYear: '',
    bikeHire: '',
    hireBike: '',
    addOns: [],
    
    // License Details
    licenseValid: '',
    licenseNumber: '',
    licenseExpiry: { day: '', month: '', year: '' },
    licenseState: '',
    
    // Tyre Orders
    requiresTyres: '',
    frontTyre: { width: '', height: '', rim: '' },
    rearTyre: { width: '', height: '', rim: '' },
    preferredBrand: '',
    secondBrand: '',
    wheelType: '',
    tyreManagement: '',
    
    // Payment
    paymentOption: '',
    giftVoucher: '',
    termsAgreed: '',
    termsText: ''
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const startRegistration = () => {
    setCurrentStep('form');
    setShowForm(true);
    // Scroll to top when starting registration
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Personal Details Validation
    if (!formData.firstName.trim()) newErrors.firstName = 'This field is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'This field is required.';
    if (!formData.gender) newErrors.gender = 'This field is required.';
    if (!formData.email.trim()) newErrors.email = 'This field is required.';
    if (!formData.confirmEmail.trim()) newErrors.confirmEmail = 'This field is required.';
    if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'Emails do not match.';
    if (!formData.mobile.trim()) newErrors.mobile = 'This field is required.';
    if (!formData.birthday.day) newErrors['birthday.day'] = 'This field is required.';
    if (!formData.birthday.month) newErrors['birthday.month'] = 'This field is required.';
    if (!formData.birthday.year) newErrors['birthday.year'] = 'This field is required.';
    if (!formData.occupation.trim()) newErrors.occupation = 'This field is required.';
    if (!formData.address.trim()) newErrors.address = 'This field is required.';
    if (!formData.city.trim()) newErrors.city = 'This field is required.';
    if (!formData.state) newErrors.state = 'This field is required.';
    if (!formData.postCode.trim()) newErrors.postCode = 'This field is required.';
    if (!formData.phonePlatform) newErrors.phonePlatform = 'This field is required.';
    if (!formData.phoneModel.trim()) newErrors.phoneModel = 'This field is required.';
    if (!formData.hasGPS) newErrors.hasGPS = 'This field is required.';
    if (!formData.hasFacebook) newErrors.hasFacebook = 'This field is required.';
    if (!formData.hasPhoneMount) newErrors.hasPhoneMount = 'This field is required.';
    if (!formData.canChargePhone) newErrors.canChargePhone = 'This field is required.';
    
    // Emergency Contacts Validation
    if (!formData.emergency1.firstName.trim()) newErrors['emergency1.firstName'] = 'This field is required.';
    if (!formData.emergency1.lastName.trim()) newErrors['emergency1.lastName'] = 'This field is required.';
    if (!formData.emergency1.email.trim()) newErrors['emergency1.email'] = 'This field is required.';
    if (!formData.emergency1.mobile.trim()) newErrors['emergency1.mobile'] = 'This field is required.';
    if (!formData.emergency1.relationship.trim()) newErrors['emergency1.relationship'] = 'This field is required.';
    if (!formData.emergency2.firstName.trim()) newErrors['emergency2.firstName'] = 'This field is required.';
    if (!formData.emergency2.lastName.trim()) newErrors['emergency2.lastName'] = 'This field is required.';
    if (!formData.emergency2.email.trim()) newErrors['emergency2.email'] = 'This field is required.';
    if (!formData.emergency2.mobile.trim()) newErrors['emergency2.mobile'] = 'This field is required.';
    if (!formData.emergency2.relationship.trim()) newErrors['emergency2.relationship'] = 'This field is required.';
    if (!formData.shirtSize) newErrors.shirtSize = 'This field is required.';
    
    // Medical Information Validation
    if (!formData.regularMedication) newErrors.regularMedication = 'This field is required.';
    if (!formData.medicationAllergies) newErrors.medicationAllergies = 'This field is required.';
    if (!formData.foodAllergies) newErrors.foodAllergies = 'This field is required.';
    if (!formData.dietaryRequirements.trim()) newErrors.dietaryRequirements = 'This field is required.';
    
    // Conditional validation for medication allergy details
    if (formData.medicationAllergies === 'yes' && !formData.medicationAllergyDetails.trim()) {
      newErrors.medicationAllergyDetails = 'This field is required.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setErrors({});
    
    if (!validateForm()) {
      // Find the first field with an error and scroll to it
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const fieldElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (fieldElement) {
          fieldElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
          // Focus the field after scrolling
          setTimeout(() => {
            fieldElement.focus();
          }, 500);
        }
      }
      return;
    }
    
    // If validation passes, go to maintenance page
    setCurrentStep('maintenance');
    // Scroll to top after successful submission
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderField = (name, label, type = 'text', options = {}, required = false) => {
    const hasError = errors[name];
    const value = name.includes('.') ? formData[name.split('.')[0]][name.split('.')[1]] : formData[name];
    
    return (
      <div className={hasError ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={handleInputChange}
            required={required}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
              hasError ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          >
            <option value="">{options.placeholder || 'Select...'}</option>
            {options.options?.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            name={name}
            value={value}
            onChange={handleInputChange}
            rows={options.rows || 3}
            required={required}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
              hasError ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder={options.placeholder}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            required={required}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
              hasError ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder={options.placeholder}
          />
        )}
        {hasError && (
          <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  const renderRadioGroup = (name, label, options, required = false) => {
    const hasError = errors[name];
    
    return (
      <div className={hasError ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex space-x-4">
          {options.map(option => (
            <label key={option.value} className="flex items-center">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={formData[name] === option.value}
                onChange={handleInputChange}
                required={required}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
        {hasError && (
          <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {errors[name]}
          </p>
        )}
      </div>
    );
  };

  const renderMaintenancePage = () => (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-full mb-6">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Registration Under Maintenance
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your interest in the Masterclass Development Program
        </p>
        <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
      </div>

      {/* Maintenance Notice */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-orange-800 mb-3 text-xl">System Maintenance</h3>
            <p className="text-orange-700 mb-4">
              We are currently performing maintenance on our registration system. Your form has been received and saved successfully.
            </p>
            <p className="text-orange-700 mb-4">
              Our team will review your registration details and contact you within 24-48 hours to complete the registration process.
            </p>
            <p className="text-orange-700">
              Thank you for your patience and understanding.
            </p>
          </div>
        </div>
      </div>

      {/* Registration Summary */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-8">
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Registration Summary
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Personal Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Mobile:</strong> {formData.mobile}</p>
                <p><strong>Location:</strong> {formData.city}, {formData.state}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Emergency Contacts</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Primary Contact:</strong> {formData.emergency1.firstName} {formData.emergency1.lastName}</p>
                <p><strong>Relationship:</strong> {formData.emergency1.relationship}</p>
                <p><strong>Secondary Contact:</strong> {formData.emergency2.firstName} {formData.emergency2.lastName}</p>
                <p><strong>Shirt Size:</strong> {formData.shirtSize}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-blue-800 mb-3">Need Immediate Assistance?</h3>
        <p className="text-blue-700 mb-4">
          If you have any urgent questions about your registration, please don't hesitate to contact us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="tel:0240724511" 
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call: 02 4072 4511
          </a>
          <a 
            href="mailto:info@mototrekkin.com.au" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email Support
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center">
        <button
          onClick={() => {
            setCurrentStep('pre-form');
            setShowForm(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors mr-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Registration
        </button>
        
        <Link
          to="/off-road-training-detail"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Bike className="w-4 h-4 mr-2" />
          View Training Details
        </Link>
      </div>
    </div>
  );

  const renderPreFormInfo = () => (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
          <Bike className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          MDP Registration Form
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Masterclass Development Program
        </p>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      {/* Important Notice */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-800 mb-2">Form Maintenance Notice</h3>
            <p className="text-red-700 text-sm">
              This is a demonstration version. For actual registration, please visit the official Moto Trekkin website or call 02 4072 4511.
            </p>
          </div>
        </div>
      </div>

      {/* Main Information */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-8 text-center">
            Important Information
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-yellow-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                Program Registration Page
              </h3>
              <p className="text-gray-700 text-sm mb-2">
                <strong>This is the Masterclass Adventure Rider Development Program registration page.</strong>
              </p>
              <p className="text-gray-700 text-sm mb-2">
                <strong>This is not the page to request course information.</strong>
              </p>
              <p className="text-gray-700 text-sm">
                To request information about this event <span className="text-blue-600 underline cursor-pointer">click here</span>
              </p>
            </div>

            <div className="border-l-4 border-blue-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">Before Making Payment</h3>
              <p className="text-gray-700 text-sm mb-2">
                Please be aware that any deposit or other amount transmitted during or after the online registration is a <strong>non-refundable payment</strong>. If you're unable to make it to the course you have booked, let us know as early as possible. We will permit a change of date without a forfeit of your payment.
              </p>
              <p className="text-gray-700 text-sm mb-2">
                Full details of our cancellation policy are included within the event terms and conditions, which will be presented to you as part of the registration process. Please read the event terms and conditions when presented to you during registration. There is also an option to have the Terms and Conditions emailed to you.
              </p>
            </div>

            <div className="border-l-4 border-green-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">Prepare Before You Begin</h3>
              <p className="text-gray-700 text-sm mb-3">
                As part of the event registration process, you will need the following information. We recommend you have this information available before clicking next below and commencing your registration.
              </p>
              <ul className="text-gray-700 text-sm space-y-1 list-disc list-inside mb-3">
                <li>Personal health and next of kin details</li>
                <li>Health fund name and membership number, Medicare number and position on your card</li>
                <li>Details of ambulance cover if separate to health fund</li>
                <li>The expiry date of your licence and motorcycle registration</li>
                <li>Your Motorcycle tyre sizes (don't guess - must be accurate)</li>
                <li>Fuel capacity and range of your motorcycle</li>
                <li>A Visa or MasterCard to complete your payment</li>
              </ul>
              <p className="text-gray-700 text-sm font-medium">
                The minimum deposit is $499 plus bank merchant fees
              </p>
            </div>

            <div className="border-l-4 border-orange-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">Don't Leave Blank Spaces Anywhere on the Registration Forms</h3>
              <p className="text-gray-700 text-sm mb-2">
                The information fields on the following pages need to be completed correctly, otherwise, you will receive processing errors, or the payment gateway will not appear. If this happens to you, go back and check you haven't missed a field or inadvertently entered any information in the incorrect format.
              </p>
              <p className="text-gray-700 text-sm">
                If you have technical difficulties, our phone number is at the bottom of each information page. You can call us anytime – even after hours if you're having any technical issues.
              </p>
            </div>

            <div className="border-l-4 border-red-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">Declined Payments</h3>
              <p className="text-gray-700 text-sm">
                Please ensure you have the available funds on your card before you commence. The webpage could present errors if your payment is declined which may result in your having to re-enter all your information.
              </p>
            </div>

            <div className="border-l-4 border-purple-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">Why We Require This Information</h3>
              <p className="text-gray-700 text-sm mb-2">
                To meet our duty of care, insurance requirements and to ensure your safety during this event, we are obligated to obtain specific personal health and other information from you.
              </p>
              <p className="text-gray-700 text-sm mb-2">
                If you have an accident or suffer a health episode of any kind while attending the event, our first aid trained staff need to be aware of any medications, allergies or health conditions you have. It could be critical to your care if needed.
              </p>
              <p className="text-gray-700 text-sm mb-2">
                All the information you provide to us is kept in the strictest confidence and is only accessed by senior management with a valid reason or by medical staff.
              </p>
              <p className="text-gray-700 text-sm">
                If you do not provide this information you will not be able to complete your registration for this event.
              </p>
            </div>

            <div className="border-l-4 border-gray-400 pl-6 py-4">
              <h3 className="font-semibold text-gray-900 mb-2">Your Safety</h3>
              <p className="text-gray-700 text-sm">
                We need to be sure you have the required riding experience, appropriate riding and safety equipment, the physical capacity and endurance, along with the mental toughness required to enjoy this program. Please answer all of the questions honestly with zero ego involved.
              </p>
            </div>
          </div>

          {/* Start Registration Button */}
          <div className="text-center mt-10 pt-8 border-t border-gray-200">
            <button
              onClick={startRegistration}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center"
            >
              <Star className="w-5 h-5 mr-2" />
              Start Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAllFormSections = () => (
    <div className="space-y-12">
      {renderPersonalDetails()}
      {renderEmergencyContacts()}
      {renderMedicalInfo()}
    </div>
  );

  const renderPersonalDetails = () => (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <User className="w-5 h-5 mr-2 text-blue-600" />
        Personal Details
      </h2>
      
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={errors.firstName ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               First Name <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>
          
          <div className={errors.lastName ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Last Name <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
          
          <div className={errors.gender ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Gender <span className="text-red-600 italic">(Required)</span>
             </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Choose Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.gender}
              </p>
            )}
          </div>
          
          <div className={errors.email ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Email <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>
          
          <div className={errors.confirmEmail ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Re-Enter Email <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="email"
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.confirmEmail ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Re-enter your email"
            />
            {errors.confirmEmail && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.confirmEmail}
              </p>
            )}
          </div>
          
          <div className={errors.mobile ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Mobile Number <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.mobile ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="+61 4XX XXX XXX"
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.mobile}
              </p>
            )}
          </div>
        </div>

        {/* Birthday */}
        <div className={(errors['birthday.day'] || errors['birthday.month'] || errors['birthday.year']) ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Birthday <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Day</label>
              <select
                name="birthday.day"
                value={formData.birthday.day}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['birthday.day'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              {errors['birthday.day'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['birthday.day']}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Month</label>
              <select
                name="birthday.month"
                value={formData.birthday.month}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['birthday.month'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              {errors['birthday.month'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['birthday.month']}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Year</label>
              <select
                name="birthday.year"
                value={formData.birthday.year}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['birthday.year'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Year</option>
                {Array.from({ length: 80 }, (_, i) => {
                  const year = new Date().getFullYear() - 18 - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
              {errors['birthday.year'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['birthday.year']}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={errors.occupation ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Occupation <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.occupation ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Your occupation"
            />
            {errors.occupation && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.occupation}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Landline
            </label>
            <input
              type="tel"
              name="landline"
              value={formData.landline}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              placeholder="Landline number (optional)"
            />
          </div>
          
          <div className={`lg:col-span-2 ${errors.address ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}`}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Street Address <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Street address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.address}
              </p>
            )}
          </div>
          
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Street Address Line 2
            </label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              placeholder="Apartment, suite, unit, etc. (optional)"
            />
          </div>
          
          <div className={errors.city ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               City <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="City"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.city}
              </p>
            )}
          </div>
          
          <div className={errors.state ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               State <span className="text-red-600 italic">(Required)</span>
             </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select State</option>
              <option value="ACT">ACT</option>
              <option value="NSW">NSW</option>
              <option value="VIC">VIC</option>
              <option value="QLD">QLD</option>
              <option value="NT">NT</option>
              <option value="WA">WA</option>
              <option value="TAS">TAS</option>
              <option value="SA">SA</option>
            </select>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.state}
              </p>
            )}
          </div>
          
          <div className={errors.postCode ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Post Code <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="postCode"
              value={formData.postCode}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.postCode ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Post code"
            />
            {errors.postCode && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.postCode}
              </p>
            )}
          </div>
        </div>

        {/* Phone Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={errors.phonePlatform ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Phone Platform <span className="text-red-600 italic">(Required)</span>
             </label>
            <select
              name="phonePlatform"
              value={formData.phonePlatform}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.phonePlatform ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select Platform</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
              <option value="other">Other</option>
            </select>
            {errors.phonePlatform && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.phonePlatform}
              </p>
            )}
          </div>
          
          <div className={errors.phoneModel ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Phone Model <span className="text-red-600 italic">(Required)</span>
             </label>
            <input
              type="text"
              name="phoneModel"
              value={formData.phoneModel}
              onChange={handleInputChange}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.phoneModel ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Phone model"
            />
            {errors.phoneModel && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.phoneModel}
              </p>
            )}
          </div>
        </div>

        {/* Phone Capabilities */}
        <div className="space-y-4">
          {renderRadioGroup('hasGPS', 'Does your phone have built-in GPS?', [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ], true)}
          
          {renderRadioGroup('hasFacebook', 'We communicate extensively using Facebook. Do you have a Facebook account?', [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ], true)}
          
          {renderRadioGroup('hasPhoneMount', 'Do you have a phone mount on your motorcycle that allows you to see your phone while riding?', [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ], true)}
          
          {renderRadioGroup('canChargePhone', 'Do you have the capacity to charge your phone while riding?', [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' }
          ], true)}
        </div>
      </div>
    </div>
  );

  const renderEmergencyContacts = () => (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Phone className="w-5 h-5 mr-2 text-blue-600" />
        Emergency Contact Details
      </h2>
      
      <div className="space-y-8">
        {/* Emergency Contact 1 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Next of Kin / Emergency Contact 1</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={errors['emergency1.firstName'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
               <label className="block text-sm font-semibold text-gray-700 mb-2">
                 NOK1 First Name <span className="text-red-600 italic">(Required)</span>
               </label>
              <input
                type="text"
                name="emergency1.firstName"
                value={formData.emergency1.firstName}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency1.firstName'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors['emergency1.firstName'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency1.firstName']}
                </p>
              )}
            </div>
            <div className={errors['emergency1.lastName'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK1 Last Name <span className="text-red-600 italic">(Required)</span>
              </label>
              <input
                type="text"
                name="emergency1.lastName"
                value={formData.emergency1.lastName}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency1.lastName'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors['emergency1.lastName'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency1.lastName']}
                </p>
              )}
            </div>
            <div className={errors['emergency1.email'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK1 Email <span className="text-red-600 italic">(Required)</span>
              </label>
              <input
                type="email"
                name="emergency1.email"
                value={formData.emergency1.email}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency1.email'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors['emergency1.email'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency1.email']}
                </p>
              )}
            </div>
            <div className={errors['emergency1.mobile'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK1 Mobile Number <span className="text-red-600 italic">(Required)</span>
              </label>
              <input
                type="tel"
                name="emergency1.mobile"
                value={formData.emergency1.mobile}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency1.mobile'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors['emergency1.mobile'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency1.mobile']}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK1 Landline
              </label>
              <input
                type="tel"
                name="emergency1.landline"
                value={formData.emergency1.landline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className={errors['emergency1.relationship'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK1 Relationship <span className="text-red-600 italic">(Required)</span>
              </label>
              <input
                type="text"
                name="emergency1.relationship"
                value={formData.emergency1.relationship}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency1.relationship'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="e.g., Spouse, Parent, Sibling"
              />
              {errors['emergency1.relationship'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency1.relationship']}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Contact 2 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Next of Kin / Emergency Contact 2</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={errors['emergency2.firstName'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
               <label className="block text-sm font-semibold text-gray-700 mb-2">
                 NOK2 First Name <span className="text-red-600 italic">(Required)</span>
               </label>
              <input
                type="text"
                name="emergency2.firstName"
                value={formData.emergency2.firstName}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency2.firstName'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors['emergency2.firstName'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency2.firstName']}
                </p>
              )}
            </div>
            <div className={errors['emergency2.lastName'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK2 Last Name <span className="text-red-600 italic">(Required)</span>
              </label>
              <input
                type="text"
                name="emergency2.lastName"
                value={formData.emergency2.lastName}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency2.lastName'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors['emergency2.lastName'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency2.lastName']}
                </p>
              )}
            </div>
            <div className={errors['emergency2.email'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK2 Email <span className="text-red-600 italic">(Required)</span>
              </label>
              <input
                type="email"
                name="emergency2.email"
                value={formData.emergency2.email}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency2.email'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors['emergency2.email'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency2.email']}
                </p>
              )}
            </div>
            <div className={errors['emergency2.mobile'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK2 Mobile Number <span className="text-red-600 italic">(Required)</span>
              </label>
              <input
                type="tel"
                name="emergency2.mobile"
                value={formData.emergency2.mobile}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency2.mobile'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors['emergency2.mobile'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency2.mobile']}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK2 Landline
              </label>
              <input
                type="tel"
                name="emergency2.landline"
                value={formData.emergency2.landline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className={errors['emergency2.relationship'] ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                NOK2 Relationship <span className="text-red-600 italic">(Required)</span>
              </label>
              <input
                type="text"
                name="emergency2.relationship"
                value={formData.emergency2.relationship}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  errors['emergency2.relationship'] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="e.g., Spouse, Parent, Sibling"
              />
              {errors['emergency2.relationship'] && (
                <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {errors['emergency2.relationship']}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Shirt Size */}
        <div className={errors.shirtSize ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred shirt size <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4">
            {['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map(size => (
              <label key={size} className="flex items-center">
                <input
                  type="radio"
                  name="shirtSize"
                  value={size}
                  checked={formData.shirtSize === size}
                  onChange={handleInputChange}
                  required
                  className="mr-2"
                />
                {size}
              </label>
            ))}
          </div>
          {errors.shirtSize && (
            <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {errors.shirtSize}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderMedicalInfo = () => (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-blue-600" />
        Medical Information
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Do you suffer a medical condition we need to know about?
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="medicalCondition"
                value="yes"
                checked={formData.medicalCondition === 'yes'}
                onChange={handleInputChange}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="medicalCondition"
                value="no"
                checked={formData.medicalCondition === 'no'}
                onChange={handleInputChange}
                className="mr-2"
              />
              No
            </label>
          </div>
          {formData.medicalCondition === 'yes' && (
            <div className="mt-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Please describe your condition. All information is treated as highly confidential and is only viewed by our medical team in the event of an emergency involving you.
              </label>
              <textarea
                name="medicalDescription"
                value={formData.medicalDescription}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                placeholder="Describe your medical condition..."
              />
            </div>
          )}
        </div>
        
         {formData.medicalCondition === 'yes' && (
           <div>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Please describe any medications you take the dosages and frequency.
             </label>
             <textarea
               name="medications"
               value={formData.medications}
               onChange={handleInputChange}
               rows={3}
               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
               placeholder="List your medications, dosages, and frequency..."
             />
           </div>
         )}
        
        {renderRadioGroup('regularMedication', 'Do you take any regular medication?', [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ], true)}
        {formData.regularMedication === 'yes' && (
            <div className="mt-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Please tell us which medication you take regularly.
              </label>
              <textarea
                name="medicationDetails"
                value={formData.medicationDetails}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                placeholder="List your regular medications..."
              />
            </div>
          )}
        
        {renderRadioGroup('medicationAllergies', 'Do you have any allergies to medication?', [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ], true)}
        {formData.medicationAllergies === 'yes' && (
          <div className={`mt-3 ${errors.medicationAllergyDetails ? 'ring-2 ring-red-200 rounded-lg p-2 bg-red-50/30' : ''}`}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Please tell us any allergies you have to medication. <span className="text-red-600 italic">(Required)</span>
            </label>
            <textarea
              name="medicationAllergyDetails"
              value={formData.medicationAllergyDetails}
              onChange={handleInputChange}
              rows={2}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                errors.medicationAllergyDetails ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="List your medication allergies..."
            />
            {errors.medicationAllergyDetails && (
              <p className="text-red-500 text-sm mt-1 flex items-center animate-pulse">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {errors.medicationAllergyDetails}
              </p>
            )}
          </div>
        )}
        
        {renderRadioGroup('foodAllergies', 'Do you have any food or other allergies?', [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' }
        ], true)}
        {formData.foodAllergies === 'yes' && (
          <div className="mt-3">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Please provide us with a list of your allergies below.
            </label>
            <textarea
              name="foodAllergyDetails"
              value={formData.foodAllergyDetails}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
              placeholder="List your food and other allergies..."
            />
          </div>
        )}
        
        {renderField('dietaryRequirements', 'What are your dietary requirements?', 'text', { 
          placeholder: 'e.g., None, Vegetarian, Vegan, Gluten-free, etc.' 
        }, true)}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Medicare Number
            </label>
            <input
              type="text"
              name="medicareNumber"
              value={formData.medicareNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
            />
          </div>
           <div>
             <label className="block text-sm font-semibold text-gray-700 mb-2">
               Medicare Card Position
             </label>
             <select
               name="medicarePosition"
               value={formData.medicarePosition}
               onChange={handleInputChange}
               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
             >
               <option value="">Select Position</option>
               {Array.from({ length: 9 }, (_, i) => (
                 <option key={i + 1} value={i + 1}>{i + 1}</option>
               ))}
             </select>
           </div>
        </div>
      </div>
    </div>
  );





  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            to="/off-road-training-detail"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Training Details
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {currentStep === 'pre-form' && renderPreFormInfo()}
        {currentStep === 'form' && (
          /* Registration Form - All Sections on One Page */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Registration Form</h2>
              <p className="text-gray-600 mt-1">Please fill in all required fields</p>
            </div>
            <form onSubmit={handleSubmit} className="p-8" noValidate>
              {renderAllFormSections()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentStep('pre-form');
                          setShowForm(false);
                          // Scroll to top when going back to previous page
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </button>
                
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Next
                  <Star className="w-4 h-4 ml-2" />
                </button>
              </div>
            </form>
          </div>
        )}
        {currentStep === 'maintenance' && renderMaintenancePage()}

        {/* Contact Information - Only show on pre-form and form steps */}
        {(currentStep === 'pre-form' || currentStep === 'form') && (
          <div className="mt-16">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-600 rounded-full translate-y-12 -translate-x-12"></div>
            </div>
            
            <div className="relative p-12 text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              
              {/* Heading */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h3>
              
              {/* Description */}
              <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                Our team is here to assist you with any questions about registration or the training program.
              </p>
              
              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <a 
                  href="tel:0240724511" 
                  className="group flex items-center justify-center px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                    <div className="text-left">
                      <div className="text-sm font-medium">Call Us</div>
                      <div className="text-xs opacity-90">02 4072 4511</div>
                    </div>
                  </div>
                </a>
                
                <a 
                  href="mailto:info@mototrekkin.com.au" 
                  className="group flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                    <div className="text-left">
                      <div className="text-sm font-medium">Email Us</div>
                      <div className="text-xs opacity-90">Get Support</div>
                    </div>
                  </div>
                </a>
              </div>
              
              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-blue-200">
                <p className="text-sm text-gray-500">
                  Available Monday to Friday, 8AM - 5PM
                </p>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;

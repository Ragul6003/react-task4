
import { useState } from 'react';
import './App.css';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  dob: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
      ...(name === 'password' || name === 'confirmPassword'
        ? { password: '', confirmPassword: '' }
        : {}),
    }));

    setSuccess('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!/^[a-zA-Z ]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = 'Use letters only';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!/^[a-zA-Z ]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = 'Use letters only';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must contain at least 8 characters';
    } else if (
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      newErrors.password =
        'Include uppercase, lowercase, and a number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else if (new Date(formData.dob) >= new Date()) {
      newErrors.dob = 'Date of birth must be in the past';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit PIN code';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setSuccess('');

    if (Object.keys(validationErrors).length === 0) {
      setSuccess('Registration completed successfully!');
      console.log('Registration Data:', formData);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setErrors({});
    setSuccess('');
  };

  return (
    <div className="page">
      <div className="form-card">
        <div className="form-header">
          <div className="logo">RF</div>
          <h1>Registration Form</h1>
          <p>Please fill in your details to register</p>
        </div>

        {success && (
          <div className="success-message" role="status">
            ✓ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <h2>Personal Information</h2>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                autoComplete="given-name"
              />
              {errors.firstName && <small>{errors.firstName}</small>}
            </div>

            <div className="field">
              <label htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                autoComplete="family-name"
              />
              {errors.lastName && <small>{errors.lastName}</small>}
            </div>

            <div className="field">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                autoComplete="email"
              />
              {errors.email && <small>{errors.email}</small>}
            </div>

            <div className="field">
              <label htmlFor="mobile">Mobile Number *</label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                autoComplete="tel"
              />
              {errors.mobile && <small>{errors.mobile}</small>}
            </div>

            <div className="field">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
              />
              {errors.password && <small>{errors.password}</small>}
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <small>{errors.confirmPassword}</small>
              )}
            </div>

            <div className="field">
              <label htmlFor="dob">Date of Birth *</label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.dob && <small>{errors.dob}</small>}
            </div>

            <div className="field">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
              {errors.gender && <small>{errors.gender}</small>}
            </div>
          </div>

          <h2 className="address-heading">Address Information</h2>

          <div className="form-grid">
            <div className="field full-width">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your full address"
                rows={3}
              />
              {errors.address && <small>{errors.address}</small>}
            </div>

            <div className="field">
              <label htmlFor="city">City *</label>
              <input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
              {errors.city && <small>{errors.city}</small>}
            </div>

            <div className="field">
              <label htmlFor="state">State *</label>
              <input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
              />
              {errors.state && <small>{errors.state}</small>}
            </div>

            <div className="field">
              <label htmlFor="pincode">PIN Code *</label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                inputMode="numeric"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6-digit PIN code"
                maxLength={6}
              />
              {errors.pincode && <small>{errors.pincode}</small>}
            </div>
          </div>

          <p className="required-note">* All fields are required.</p>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Registration
            </button>
            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              Reset Form
            </button>
          </div>
        </form>

        <p className="footer">Registration Form | Built with React useState</p>
      </div>
    </div>
  );
}

export default App;

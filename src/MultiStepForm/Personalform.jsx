import React, { useState } from 'react';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      {step === 1 && (
        <form>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          <br />

          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          <br />

          <button onClick={handleNextStep}>Next</button>
        </form>
      )}

      {step === 2 && (
        <form>
          <label>Email Address:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          <br />

          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          <br />

          <button onClick={handlePrevStep}>Back</button>
          <button onClick={handleNextStep}>Next</button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <label>Address:</label>
          <textarea name="address" value={formData.address} onChange={handleChange} />
          <br />

          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
          <br />

          <label>State:</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
          <br />

          <label>Zip Code:</label>
          <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
          <br />

          <button onClick={handlePrevStep}>Back</button>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default MultiStepForm;
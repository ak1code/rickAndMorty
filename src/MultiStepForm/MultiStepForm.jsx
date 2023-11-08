
// export  const MultiStepForm = () => {
//     const [step, setStep] = useState(1);
//     const [formData, setFormData] = useState({ name: '', email: '', address: '', phoneNumber: '' });
  
//     const handleNext = () => {
//       setStep(step + 1);
//     };
  
//     const handlePrev = () => {
//       setStep(step - 1);
//     };
  
//     const handleSubmit = () => {
//       // Submit the form data
//     };
  
//     const renderStepContent = () => {
//       switch (step) {
//         case 1:
//           return <PersonalInfoStep formData={formData} setFormData={setFormData} handleSubmit={handleNext} />;
//         case 2:
//           return <ContactInfoStep formData={formData} setFormData={setFormData} handleSubmit={handleNext} />;
//         case 3:
//           return <SummaryStep formData={formData} handleSubmit={handleSubmit} />;
//         default:
//           return null;
//       }
//     };
  
//     return (
//       <div>
//         <h2>Multi-Step Form</h2>
//         {renderStepContent()}
//         <div>
//           {step > 1 && <button onClick={handlePrev}>Previous</button>}
//           {step < 3 && <button onClick={handleNext}>Next</button>}
//         </div>
//       </div>
//     );
//   };
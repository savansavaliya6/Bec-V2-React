import React, { useState } from "react"

const Index = ({ steps }) => {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }
  //const handleStepClick = (newStep) => {
  //  // Ensure that the new step is within the valid range of steps
  //  if (newStep >= 1 && newStep <= steps.length) {
  //    setStep(newStep)
  //  }
  //}

  return (
    <div className="wrapper">
      <div className="step-wrapper">
        <div className="step-inner">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`step ${
                step === s.id ? "active" : step > s.id ? "completed" : ""
              }`}
              //onClick={() => handleStepClick(s.id)}
            >
              {s.name}
            </div>
          ))}
        </div>
      </div>
      <div>
        {steps.map((s, i) => {
          const StepComponent = s.component
          if (step === s.id) {
            return (
              <StepComponent
                key={i}
                {...s.props}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export default Index

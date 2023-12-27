import React, { useEffect } from "react"
import { useField } from "formik"
import classNames from "classnames"
import Select from "react-select"
import PhoneInput from "react-phone-input-2"
import Flatpickr from "react-flatpickr"
import CreatableSelect from "react-select/creatable"
import moment from "moment/moment"
import "flatpickr/dist/themes/material_blue.css"
import "react-phone-input-2/lib/style.css"
import "react-datepicker/dist/react-datepicker.css"

export const TextInputField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props)

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        {...field}
        {...props}
        autoComplete="off"
        className={classNames("form-control", {
          "is-invalid": meta.error || (meta.touched && meta.error),
        })}
      />
      {meta.error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const DatePickerField = ({
  label,
  options,
  minDate,
  maxDate,
  ...props
}) => {
  const [field, meta, helpers] = useField(props)

  const selectedDate = field.value ? moment(field.value, "YYYY-MM-DD") : null

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Flatpickr
        {...field}
        {...props}
        value={selectedDate ? selectedDate.toDate() : null}
        options={{
          ...options,
          dateFormat: "Y-m-d",
        }}
        onChange={(dates) => {
          const newDate = moment(dates[0])
          helpers.setValue(
            newDate.isValid() ? newDate.format("YYYY-MM-DD") : null
          )
        }}
        className={classNames("form-control", {
          "is-invalid": meta.error || (meta.touched && meta.error),
        })}
      />
      {meta.error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const TimePickerField = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props)

  const selectedTime = field.value ? moment(field.value, "HH:mm") : null

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Flatpickr
        {...field}
        {...props}
        value={selectedTime ? selectedTime.toDate() : null}
        options={{
          ...options,
          enableTime: true,
          noCalendar: true,
          dateFormat: "H:i",
        }}
        onChange={(dates) => {
          const newTime = moment(dates[0])
          helpers.setValue(newTime.isValid() ? newTime.format("HH:mm") : null)
        }}
        className={classNames("form-control", {
          "is-invalid": meta.error || (meta.touched && meta.error),
        })}
      />
      {meta.error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const DropdownField = ({ label, defaultValue, options, ...props }) => {
  const [field, meta, helpers] = useField(props)

  const selectedOption = options.find((option) => option.value === field.value)

  useEffect(() => {
    if (defaultValue) {
      helpers.setValue(defaultValue)
    }
  }, [defaultValue, helpers])

  const handleChange = (selectedOption) => {
    helpers.setValue(selectedOption.value)
  }

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Select
        {...field}
        {...props}
        classNamePrefix="react-select"
        options={options}
        value={selectedOption}
        onChange={handleChange}
        className={classNames("select-control", {
          "is-invalid": meta.error || (meta.touched && meta.error),
        })}
      />
      {meta.error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const CreatableDropdownField = ({
  label,
  defaultValue,
  options,
  ...props
}) => {
  const [field, meta, helpers] = useField(props)

  const selectedOption = options.find((option) => option.value === field.value)

  useEffect(() => {
    if (defaultValue) {
      if (options.some((option) => option.value === defaultValue)) {
        helpers.setValue(defaultValue)
      } else {
        options.push({ value: defaultValue, label: defaultValue })
        helpers.setValue(defaultValue)
      }
    }
  }, [defaultValue, helpers])

  const handleChange = (selectedOption) => {
    helpers.setValue(selectedOption ? selectedOption.value : null)
  }

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <CreatableSelect
        {...field}
        {...props}
        classNamePrefix="react-select"
        options={options}
        value={selectedOption}
        onChange={handleChange}
        className={classNames("select-control", {
          "is-invalid": meta.error || (meta.touched && meta.error),
        })}
        isClearable
        formatCreateLabel={(inputValue) => `Create option: ${inputValue}`}
      />
      {meta.error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const MultiSelectField = ({
  label,
  defaultValue,
  options,
  ...props
}) => {
  const [field, meta, helpers] = useField(props)

  useEffect(() => {
    if (defaultValue?.length) {
      const defaultValues = defaultValue.map((option) => option)
      helpers.setValue(defaultValues)
    }
  }, [defaultValue?.length, helpers])

  const selectedOptions = options.filter((option) =>
    field?.value?.includes(option.value)
  )

  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value)
    helpers.setValue(selectedValues)
  }

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Select
        {...field}
        {...props}
        classNamePrefix="react-select"
        options={options}
        value={selectedOptions}
        isMulti
        onChange={handleChange}
        className={classNames("select-control", {
          "is-invalid": meta.error || (meta.touched && meta.error),
        })}
      />
      {meta.error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const RadioInput = ({ label, option, disabled, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label>{label}</label>
      <div className="radio-wrapper mt-2">
        {option.map((item) => (
          <label key={item.name} className="form-check form-check-inline">
            <input
              {...field}
              id={item.name}
              name={field.name}
              checked={field.value == item.value}
              type="radio"
              value={item.value}
              disabled={disabled ? true : false}
              className="form-check-input"
            />
            <span className="form-check-label text-muted">{item.name}</span>
          </label>
        ))}
      </div>
      {meta.error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback d-block">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const CheckboxFieldGroup = ({ label, options, ...props }) => {
  const [field, meta] = useField(props.name)

  const handleChange = (value) => {
    const currentValue = field.value || []
    const updatedValue = currentValue.includes(value)
      ? currentValue.filter((item) => item !== value)
      : [...currentValue, value]
    field.onChange({
      target: {
        name: field.name,
        value: updatedValue,
      },
    })
  }

  return (
    <div>
      <div>{label}</div>
      {options.map((option) => (
        <label key={option.value} className="me-5 mt-2">
          <input
            className="me-1"
            type="checkbox"
            {...field}
            {...props}
            checked={field?.value?.includes(option.value)}
            onChange={() => handleChange(option.value)}
            value={option.value}
          />
          {option.label}
        </label>
      ))}
      {meta.error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback d-block">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const CheckboxFieldGroupForGuest = ({ label, options, ...props }) => {
  const [field, meta] = useField(props.name)

  const handleChange = (value) => {
    const currentValue = field.value || []
    const updatedValue = currentValue.includes(value)
      ? currentValue.filter((item) => item !== value)
      : [...currentValue, value]
    field.onChange({
      target: {
        name: field.name,
        value: updatedValue,
      },
    })
  }

  return (
    <div>
      <div>{label}</div>
      {options.map((option) => (
        <label
          key={option.value}
          style={{ width: "10rem" }}
          className="me-5 mt-2"
        >
          <input
            className="me-1"
            type="checkbox"
            {...field}
            {...props}
            checked={field?.value?.includes(option.value)}
            onChange={() => handleChange(option.value)}
            value={option.value}
          />
          {option.label}
        </label>
      ))}
      {/* {meta.error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback d-block">{meta.error}</div>
      ) : null} */}
    </div>
  )
}

export const PhoneInputField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props)

  const handleChange = (value) => {
    helpers.setValue(value)
  }

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <PhoneInput
        {...field}
        {...props}
        country={"za"}
        onChange={handleChange}
        inputClass={classNames("form-control phone-input", {
          "is-invalid": meta.error || (meta.touched && meta.error),
        })}
      />
      {meta.error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback d-block">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const TextareaField = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        {...field}
        {...props}
        className={classNames("form-control", {
          "is-invalid": meta.error || (meta.touched && meta.error),
        })}
      />
      {meta.error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const FilePickerField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props)

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files)

    field.onChange({
      target: {
        name: field.name,
        value: selectedFiles,
      },
    })
  }

  return (
    <div className="d-flex flex-column">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        type="file"
        onChange={handleFileChange}
        onBlur={field.onBlur}
        multiple
        {...props}
        className={`form-control-file ${meta.error ? "is-invalid" : ""}`}
      />
      {meta.error && <div className="invalid-feedback">{meta.error}</div>}
    </div>
  )
}

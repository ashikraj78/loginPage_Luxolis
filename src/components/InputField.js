function InputField({
  register,
  type,
  name,
  placeholder,
  iconSrc,
  errorMessage,
  onChange,
}) {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        {...register(name, { required: true })}
        className="inputBox"
        placeholder={placeholder}
        id={`${name}-input`}
        onChange={onChange}
        autoComplete={type === "text" ? "on" : "off"}
      />
      <img src={iconSrc} alt="icon" className="input-icon" />
      {errorMessage && (
        <span className="block errorMessage">{errorMessage}</span>
      )}
    </div>
  );
}

export default InputField;

const InputField = ({
  label,
  id,
  type = "text",
  errors,
  register,
  required,
  message,
  className,
  min,
  value,
  placeholder,
  watchValue, 
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor={id}
        className={`${className || ""} font-semibold text-sm text-slate-800`}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        defaultValue={value}
        className={`${className || ""} px-3 py-2 border bg-transparent text-slate-800 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200
          ${errors[id]?.message ? "border-red-500" : "border-slate-400"}`}
        {...register(id, {
          required: { value: required, message },
          minLength: min
            ? { value: min, message: `Minimum ${min} characters required` }
            : undefined,
          pattern:
            type === "email"
              ? {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                }
              : type === "url"
              ? {
                  value:
                    /^(https?:\/\/)?(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                  message: "Please enter a valid URL",
                }
              : undefined,
          validate:
            id === "confirmPassword"
              ? (value) =>
                  value === watchValue || "Passwords do not match"
              : undefined,
        })}
      />

      {errors[id]?.message && (
        <p className="text-sm font-semibold text-red-600 mt-1">
          {errors[id]?.message}
        </p>
      )}
    </div>
  );
};

export default InputField;

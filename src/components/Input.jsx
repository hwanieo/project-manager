import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  return (
    <p className="flex flex-col gap-1 my-4">
      <label htmlFor="title">{label}</label>
      {!textarea ? (
        <input ref={ref} className={classes} {...props} />
      ) : (
        <textarea ref={ref} className={classes} {...props} />
      )}
    </p>
  );
});

export default Input;

// ...props를 펼쳐서 Input 컴포넌트를 사용하는 곳에서도 구성할 수 있음

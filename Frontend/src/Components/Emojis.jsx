import React from 'react';
import { Field } from 'formik';

const Emojis = ({ name, onChange }) => {
  const emojis = [
    { icon: "😡", label: "Angry", value: 1 },
    { icon: "😕", label: "Unhappy", value: 2 },
    { icon: "😐", label: "Neutral", value: 3 },
    { icon: "🙂", label: "Happy", value: 4 },
    { icon: "😁", label: "Very Happy", value: 5 },
  ];

  return (
    <Field name={name}>
      {({ field }) => (
        <div className="flex gap-4 justify-center items-center my-4">
          {emojis.map((emoji) => {
            const isSelected = field.value === emoji.value;
            return (
              <label
                key={emoji.value}
                className={`text-4xl cursor-pointer transition-transform duration-200 
                ${isSelected ? "scale-125  opacity-100" : "opacity-60 hover:opacity-100"}`}
              >
                <input
                  type="radio"
                  {...field}
                  value={emoji.value}
                  checked={isSelected}
                  onChange={(e) => {
                    field.onChange(e);
                    onChange && onChange(emoji.value);
                  }}
                  className="hidden"
                />
                <span title={emoji.label}>{emoji.icon}</span>
              </label>
            );
          })}
        </div>
      )}
    </Field>
  );
};

export default Emojis;

 

import { useState, useEffect, useRef } from "react";

const PLACEHOLDER = "Your Inquiry";

// Optional value/onChange let a parent form read the chosen service.
const ContactDropdown = ({ value, onChange }: { value?: string; onChange?: (value: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internal, setInternal] = useState(PLACEHOLDER);
  const selected = value !== undefined ? value || PLACEHOLDER : internal;
  const setSelected = (label: string) => {
    setInternal(label);
    onChange?.(label === PLACEHOLDER ? "" : label);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "Quantity Surveying", label: "Quantity Surveying" },
    { value: "Commercial Management", label: "Commercial Management" },
    { value: "Claims & Dispute Support", label: "Claims & Dispute Support" },
    { value: "Project Management / PMC", label: "Project Management / PMC" },
    { value: "Development Advisory", label: "Development Advisory" },
    { value: "Digital Cost Management", label: "Digital Cost Management" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="col-md-6">
      <div className="form-group custom-form-design" ref={dropdownRef}>
        <div
          className={`nice-select wide ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="current">{selected}</span>
          <ul className="list">
            <li
              className={`option ${selected === PLACEHOLDER ? "selected focus" : ""}`}
              onClick={() => setSelected(PLACEHOLDER)}
            >
              {PLACEHOLDER}
            </li>
            {options.map((option, index) => (
              <li
                key={index}
                className={`option ${selected === option.label ? "selected focus" : ""}`}
                onClick={() => setSelected(option.label)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactDropdown;

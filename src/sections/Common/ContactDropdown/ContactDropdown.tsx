 

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../../i18n/LanguageContext";

const PLACEHOLDER = "Your Inquiry";

// Optional value/onChange let a parent form read the chosen service.
const ContactDropdown = ({ value, onChange }: { value?: string; onChange?: (value: string) => void }) => {
  const { tr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [internal, setInternal] = useState(PLACEHOLDER);
  const selected = value !== undefined ? value || PLACEHOLDER : internal;
  const setSelected = (label: string) => {
    setInternal(label);
    onChange?.(label === PLACEHOLDER ? "" : label);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  // label is the English text (also what gets saved with the inquiry); ar is shown on the Arabic site.
  const options = [
    { label: "Quantity Surveying", ar: "مسح الكميات" },
    { label: "Commercial Management", ar: "الإدارة التجارية" },
    { label: "Claims & Dispute Support", ar: "دعم المطالبات والنزاعات" },
    { label: "Project Management / PMC", ar: "إدارة المشاريع / استشارات إدارة المشاريع" },
    { label: "Development Advisory", ar: "استشارات التطوير" },
    { label: "Digital Cost Management", ar: "إدارة التكاليف الرقمية" },
  ];
  const shown = (label: string) => (label === PLACEHOLDER ? tr(PLACEHOLDER, "استفسارك") : tr(label, options.find((o) => o.label === label)?.ar));

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
          <span className="current">{shown(selected)}</span>
          <ul className="list">
            <li
              className={`option ${selected === PLACEHOLDER ? "selected focus" : ""}`}
              onClick={() => setSelected(PLACEHOLDER)}
            >
              {shown(PLACEHOLDER)}
            </li>
            {options.map((option, index) => (
              <li
                key={index}
                className={`option ${selected === option.label ? "selected focus" : ""}`}
                onClick={() => setSelected(option.label)}
              >
                {shown(option.label)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactDropdown;

import React, { useRef, useState } from "react";
import { FIELDS } from "../constants/fields";


const Form = ({ onAdd, onClose }) => {
  const initialState = {};
  FIELDS.forEach(f => (initialState[f.key] = ""));
  const [formData, setFormData] = useState(initialState);

  // Refs for all inputs
  const inputRefs = useRef([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 🚫 block submit

      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus(); // 👉 move to next field
      }
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2>Add Dialysis Record</h2>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {FIELDS.map((field, index) => (
            <div key={field.key} style={styles.field}>
              <label style={styles.label}>{field.label}</label>
              <input
                ref={el => (inputRefs.current[index] = el)}
                type={field.type || "text"}
                style={styles.input}
                value={formData[field.key]}
                onChange={(e) =>
                  setFormData({ ...formData, [field.key]: e.target.value })
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            </div>
          ))}

          {/* Actions */}
          <div style={styles.actions}>
            <button type="button" onClick={onClose} style={styles.cancel}>
              Cancel
            </button>
            {/* Explicit button type */}
            <button type="button" onClick={handleSubmit} style={styles.save}>
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ===== Styles (unchanged) ===== */

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "#fff",
    width: "95%",
    maxWidth: 1200,
    maxHeight: "90vh",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  header: {
    padding: "16px 24px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff"
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    fontSize: 18,
    cursor: "pointer"
  },
  form: {
    padding: 24,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    overflowY: "auto"
  },
  field: { display: "flex", flexDirection: "column" },
  label: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 6
  },
  input: {
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    fontSize: 13
  },
  actions: {
    gridColumn: "1 / -1",
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    paddingTop: 20,
    borderTop: "1px solid #e5e7eb"
  },
  cancel: {
    padding: "10px 18px",
    borderRadius: 6,
    background: "#f3f4f6",
    border: "1px solid #d1d5db",
    cursor: "pointer"
  },
  save: {
    padding: "10px 18px",
    borderRadius: 6,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600
  }
};

export default Form;

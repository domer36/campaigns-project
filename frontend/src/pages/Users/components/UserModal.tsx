import React, { useEffect, useState } from "react";
import "./UserModal.scss";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const defaultForm = {
  username: "",
  email: "",
  password: "",
  role: "ADMIN",
};

const UserModal = ({ open, onClose, onSubmit, initialData }: Props) => {
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm(defaultForm);
  }, [initialData, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.username || !form.email || (!initialData && !form.password)) {
      setError("Completa todos los campos obligatorios.");
      return;
    }
    setError("");
    onSubmit(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{initialData ? "Editar usuario" : "Nuevo usuario"}</h3>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Usuario"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo"
        />
        {!initialData && (
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
            type="password"
          />
        )}
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="ADMIN">Admin</option>
          <option value="SUPERADMIN">Super Admin</option>
        </select>

        {error && <p className="error-message">{error}</p>}

        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSubmit}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;

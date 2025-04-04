import React, { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
}

const CampaignModal = ({ open, onClose, onSubmit, initialData }: Props) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    budget: "",
    reach_estimate: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{initialData ? "Editar campaña" : "Nueva campaña"}</h3>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Título"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
        />
        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
        />
        <input
          name="budget"
          value={form.budget}
          onChange={handleChange}
          placeholder="Presupuesto"
        />
        <input
          name="reach_estimate"
          value={form.reach_estimate}
          onChange={handleChange}
          placeholder="Alcance estimado"
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="ACTIVE">Activa</option>
          <option value="PAUSED">Pausada</option>
          <option value="FINISHED">Finalizada</option>
        </select>

        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSubmit}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default CampaignModal;

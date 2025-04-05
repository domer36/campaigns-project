import { useEffect, useState } from "react";
import { API_URLS } from "../../core/api";
import { useAuth } from "../../core/auth/AuthContext";
import { toast } from "react-hot-toast";
import CampaignCard from "./components/CampaignCard";
import CampaignModal from "./components/CampaignModal";
import "./CampaignsPage.scss";

const CampaignsPage = () => {
  const { token, user } = useAuth();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(API_URLS.CAMPAIGNS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setCampaigns(json);
    } catch (err: any) {
      toast.error("Error al cargar campañas");
    } finally {
    }
  };

  const handleCreate = async (data: any) => {
    try {
      const res = await fetch(API_URLS.CAMPAIGNS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("No se pudo crear");
      toast.success("Campaña creada");
      fetchCampaigns();
    } catch (err: any) {
      toast.error("Error al crear campaña");
    } finally {
    }
  };

  const handleEdit = async (data: any) => {
    try {
      const res = await fetch(`${API_URLS.CAMPAIGNS}${selected.id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, created_by: selected.created_by }),
      });
      if (!res.ok) throw new Error("No se pudo actualizar");
      toast.success("Campaña actualizada");
      fetchCampaigns();
    } catch {
      toast.error("Error al actualizar");
    } finally {
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_URLS.CAMPAIGNS}${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("No se pudo eliminar");
      toast.success("Campaña eliminada");
      fetchCampaigns();
    } catch {
      toast.error("Error al eliminar");
    } finally {
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="campaigns-container">
      <h2>Campañas</h2>
      <button
        onClick={() => {
          setSelected(null);
          setOpen(true);
        }}
      >
        Nueva campaña
      </button>

      <div className="campaigns-grid">
        {campaigns.map((c) => (
          <CampaignCard
            key={c.id}
            title={c.title}
            status={c.status}
            budget={c.budget}
            canDelete={user?.role === "SUPERADMIN"}
            onClick={() => {
              setSelected(c);
              setOpen(true);
            }}
            onDelete={() => handleDelete(c.id)}
          />
        ))}
      </div>

      <CampaignModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={selected ? handleEdit : handleCreate}
        initialData={selected}
      />
    </div>
  );
};

export default CampaignsPage;

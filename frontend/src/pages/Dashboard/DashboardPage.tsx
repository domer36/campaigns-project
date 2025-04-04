import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../../core/api";
import { useAuth } from "../../core/auth/AuthContext";
import { toast } from "react-hot-toast";
import DashboardCard from "./components/DashboardCard";
import "./DashboardPage.scss";

interface DashboardData {
  total_campaigns: number;
  total_budget: number;
  campaigns: {
    ACTIVE: { total: number; budget: number };
    PAUSED: { total: number; budget: number };
    FINISHED: { total: number; budget: number };
  };
}

const DashboardPage = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(API_URLS.DASHBOARD, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al cargar métricas");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        toast.error(err.message);
      } finally {
      }
    };

    fetchDashboard();
  }, [token]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="dashboard-actions">
        {user?.role === "SUPERADMIN" && (
          <button onClick={() => navigate("/users")}>Usuarios</button>
        )}
        <button onClick={() => navigate("/campaigns")}>Campañas</button>
      </div>
      <div className="card-grid">
        <DashboardCard
          label="Total de campañas"
          value={data?.total_campaigns ?? 0}
        />
        <DashboardCard
          label="Presupuesto total"
          value={`$${data?.total_budget ?? 0}`}
        />

        <DashboardCard
          label="Campañas activas"
          value={data?.campaigns.ACTIVE.total ?? 0}
        />
        <DashboardCard
          label="Pausadas"
          value={data?.campaigns.PAUSED.total ?? 0}
        />
        <DashboardCard
          label="Finalizadas"
          value={data?.campaigns.FINISHED.total ?? 0}
        />
      </div>
    </div>
  );
};

export default DashboardPage;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URLS } from "../../core/api";
import { toast } from "react-hot-toast";

const CampaignDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`${API_URLS.LANDING(Number(id))}`);
        if (!res.ok) throw new Error("Campaña no encontrada");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        toast.error(err.message);
      }
    };

    fetchDetail();
  }, [id]);

  return (
    <div className="landing-page">
      <div className="landing-header">
        <h2>{data?.title}</h2>
        <button onClick={() => navigate("/login")}>Iniciar sesión</button>
      </div>

      <div className="landing-detail">
        <p>{data?.description}</p>
        <p>
          <strong>Alcance estimado:</strong> {data?.reach_estimate}
        </p>
      </div>
    </div>
  );
};

export default CampaignDetailPage;

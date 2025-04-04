import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URLS } from "../../core/api";
import LandingCard from "./components/LandingCard";
import "./LandingPage.scss";

const LandingPage = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLanding = async () => {
      const res = await fetch(API_URLS.LANDING());
      const json = await res.json();
      setCampaigns(json);
    };
    fetchLanding();
  }, []);

  return (
    <div className="landing-page">
      <div className="landing-header">
        <h2>Campañas publicitarias</h2>
        <button onClick={() => navigate("/login")}>Iniciar sesión</button>
      </div>

      <div className="landing-grid">
        {campaigns.map((c) => (
          <LandingCard
            key={c.id}
            title={c.title}
            description={c.description}
            onClick={() => navigate(`/landing/${c.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;

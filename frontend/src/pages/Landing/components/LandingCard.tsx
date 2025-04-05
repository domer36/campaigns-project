import "./LandingCard.scss";

interface Props {
  title: string;
  description: string;
  onClick: () => void;
}

const LandingCard = ({ title, description, onClick }: Props) => {
  return (
    <div className="landing-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default LandingCard;

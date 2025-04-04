interface Props {
  title: string;
  status: string;
  budget: string;
  onClick: () => void;
  onDelete?: () => void;
  canDelete: boolean;
}

const CampaignCard = ({
  title,
  status,
  budget,
  onClick,
  onDelete,
  canDelete,
}: Props) => {
  return (
    <div className="campaign-card" onClick={onClick}>
      <h3>{title}</h3>
      <p>Status: {status}</p>
      <p>Presupuesto: ${budget}</p>
      {canDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        >
          Eliminar
        </button>
      )}
    </div>
  );
};

export default CampaignCard;

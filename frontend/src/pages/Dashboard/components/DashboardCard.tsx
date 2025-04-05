interface Props {
  label: string;
  value: number | string;
}

const DashboardCard = ({ label, value }: Props) => {
  return (
    <div className="dashboard-card">
      <h4>{label}</h4>
      <p>{value}</p>
    </div>
  );
};

export default DashboardCard;

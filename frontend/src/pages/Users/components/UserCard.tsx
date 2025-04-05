import "./UserCard.scss";

interface Props {
  username: string;
  email: string;
  role: string;
}

const formatRole = (role: string) => {
  switch (role) {
    case "SUPERADMIN":
      return "Super Admin";
    case "ADMIN":
      return "Admin";
    default:
      return role;
  }
};

const UserCard = ({ username, email, role }: Props) => {
  const getInitial = (name: string) => name?.charAt(0).toUpperCase();
  return (
    <div className="user-card">
      <div className="avatar">{getInitial(username)}</div>
      <h3>{username}</h3>
      <p>{email}</p>
      <span>{formatRole(role)}</span>
    </div>
  );
};

export default UserCard;

import { useEffect, useState } from "react";
import { API_URLS } from "../../core/api";
import { useAuth } from "../../core/auth/AuthContext";
import { toast } from "react-hot-toast";
import UserCard from "./components/UserCard";
import "./UsersPage.scss";
import UserModal from "./components/UserModal";

const UsersPage = () => {
  const [selected, setSelected] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const { token } = useAuth();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URLS.USERS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("No autorizado o error al cargar usuarios");
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
    }
  };

  const handleCreateUser = async (data: any) => {
    try {
      const res = await fetch(API_URLS.REGISTER, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al crear usuario");
      toast.success("Usuario creado");
      fetchUsers();
    } catch {
      toast.error("No se pudo crear");
    } finally {
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-page">
      <h2>Usuarios</h2>

      <button
        onClick={() => {
          setSelected(null);
          setOpen(true);
        }}
      >
        Nuevo usuario
      </button>

      <div className="users-grid">
        {users.map((u) => (
          <UserCard
            key={u.id}
            username={u.username}
            email={u.email}
            role={u.role}
          />
        ))}
      </div>
      <UserModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreateUser}
        initialData={selected}
      />
    </div>
  );
};

export default UsersPage;

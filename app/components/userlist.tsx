interface User {
  id: string;
  name: string;
  email: string;
}

const UserList = ({ users, onDelete }: { users: User[]; onDelete: (id: string) => void }) => {
    return (
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{user.name}</h3>
              <p>{user.email}</p>
               
            </div>
            <button
              onClick={() => onDelete(user.id)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>

            <button
              onClick={() => onDelete(user.id)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  export default UserList;
  
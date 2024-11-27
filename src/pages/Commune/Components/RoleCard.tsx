export default function RoleCard({ name }: { name: string }) {
  return (
    <div className="w-full p-2">
      <p className="text-xs font-semibold">{name}</p>
    </div>
  );
}

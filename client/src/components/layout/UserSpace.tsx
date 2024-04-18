export default function UserSpace({
  userId,
  ownerId,
  children,
}: {
  userId: string;
  ownerId: string;
  children: JSX.Element;
}) {
  if (userId === ownerId) return children;
  return null;
}

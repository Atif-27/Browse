export default function ViewerSpace({
  userId,
  ownerId,
  children,
}: {
  userId: string;
  ownerId: string;
  children: JSX.Element;
}) {
  console.log(userId, ownerId);

  if (userId !== ownerId) return children;
  return null;
}

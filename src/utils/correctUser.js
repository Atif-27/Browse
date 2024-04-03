export default function correctUser(user, owner) {
  return user._id.toString() === owner.toString();
}

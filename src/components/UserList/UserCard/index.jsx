function UserCard(props) {
  const {
    user: { id, firstname, lastname },
    toggleUserSelection,
  } = props;

  const handleClick = () => {
    console.log(props);
    console.log(1);
    toggleUserSelection(id);
  };

  return (
    <article onClick={handleClick}>
      <p>ID: {id}</p>
      <h1>
        User Name: {firstname} {lastname}
      </h1>
    </article>
  );
}

export default UserCard;
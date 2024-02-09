function Card({ name, src, id, onCLick }) {
  return (
    <div className="card" data-id={id} onClick={onCLick}>
      <img src={src} alt="card image" className="card-img" data-id={id} />
      <h3 className="card-name" data-id={id}>
        {name}
      </h3>
    </div>
  );
}

export default Card;

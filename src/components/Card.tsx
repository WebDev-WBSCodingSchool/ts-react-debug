const Card = ({ children, title }) => (
  <section className="card">
    {title && <h2 className="card-title">{title}</h2>}
    {children}
  </section>
);

export default Card;

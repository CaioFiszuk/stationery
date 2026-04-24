function Footer() {
    const year = new Date();

  return (
    <footer className="footer">
        <p className="footer__paragraph">&copy; {year.getUTCFullYear()} - Stationery - Todos direitos reservados</p>

        <p className="footer__paragraph">Created By - Caio Fiszuk</p>
    </footer>
  )
}

export default Footer;

function Footer() {
    return ( 
        <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} CineDB. Todos los derechos
            reservados.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Desarrollado con ❤️ por [Tu Nombre]
          </p>
        </div>
      </footer>
     );
}

export default Footer;
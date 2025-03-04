const Footer = () => {
    return (
      <footer className="bg-black text-white text-center py-6 mt-0">
        <div className="container mx-auto">
          <p className="text-sm">
            © {new Date().getFullYear()} Movie Recommendation System. All Rights Reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            <a href="#" className="hover:text-red-500">Privacy Policy</a>
            <a href="#" className="hover:text-red-500">Terms of Service</a>
            <a href="#" className="hover:text-red-500">Contact</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
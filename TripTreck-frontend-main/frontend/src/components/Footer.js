const Footer = () => {
  return (
    <footer className="bg-gray-100 p-6 text-center text-gray-700 mt-10">
      <p>© {new Date().getFullYear()} TripTreck. All rights reserved.</p>
      <div className="mt-2">
        <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a> |
        <a href="/privacy" className="text-blue-600 hover:underline ml-2">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer;


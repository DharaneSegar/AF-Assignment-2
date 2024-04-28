import React from "react";

function Footer() {
  return (
    <div>
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="text-muted">Copyright &copy; NASA OPEN API 2024</div>
            <div className="space-x-2">
              <a className="hover:text-blue-500" href="#">Privacy Policy</a>
              <span className="text-gray-400">&middot;</span>
              <a className="hover:text-blue-500" href="#">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

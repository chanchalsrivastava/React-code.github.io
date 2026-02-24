import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import '../App.css';

export default function Navbar() {
  const cartItems = useSelector((state) => state.handlercart || []);
  const navigate = useNavigate();
  const [userDropdown, setUserDropdown] = useState(false);
  const [cartDropdown, setCartDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // <-- React toggle state

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setUserDropdown(false);
    navigate("/"); 
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search:", searchQuery);
    setSearchOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4" to="/home">
            <img
              src="/assets/logo.png"       
              alt="LA COLLECTION"  
              style={{ height: "50px", objectFit: "contain", width: "100px" }} 
            />
          </NavLink>

          {/* Mobile menu toggle */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menu Links */}
          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item"><NavLink className="nav-link" to="/home">HOME</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/about">ABOUT</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/product">PRODUCT</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/contact">CONTACT</NavLink></li>
            </ul>

            <div className="navbar-icons d-flex align-items-center">
              <div className="icon me-3" onClick={() => setSearchOpen(true)}>
                <i className="fa fa-search"></i>
              </div>

              <div className="icon me-3 position-relative">
                <i className="fa fa-heart"></i>
                <span className="badge">2</span>
              </div>

              <div
                className="icon me-3 position-relative"
                onMouseEnter={() => setCartDropdown(true)}
                onMouseLeave={() => setCartDropdown(false)}
              >
                <i className="fa fa-shopping-cart"></i>
                <span className="badge">{cartItems.length}</span>
                {cartDropdown && (
                  <div className="cart-dropdown shadow-sm">
                    {cartItems.length === 0 ? (
                      <p className="p-2">Cart is empty</p>
                    ) : (
                      cartItems.slice(0, 3).map((item, idx) => (
                        <div className="cart-item d-flex align-items-center p-2" key={idx}>
                          <img src={item.image} alt={item.title} className="cart-item-img" />
                          <div className="cart-item-info ms-2">
                            <p className="mb-0">{item.title}</p>
                            <small>Qty: {item.qty}</small>
                          </div>
                        </div>
                      ))
                    )}
                    {cartItems.length > 3 && (
                      <p className="text-center p-2">And {cartItems.length - 3} more...</p>
                    )}
                    <NavLink to="/cart" className="btn btn-primary w-100 btn-sm mt-2">View Cart</NavLink>
                  </div>
                )}
              </div>

              <div className="icon position-relative" onClick={() => setUserDropdown(!userDropdown)}>
                <i className="fa fa-user-circle"></i>
                {userDropdown && (
                  <div className="user-dropdown shadow-sm">
                    <p className="dropdown-item mb-0" onClick={handleLogout}>Logout</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {searchOpen && (
        <div className="search-overlay">
          <button className="close-search" onClick={() => setSearchOpen(false)}>×</button>
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit">Search</button>
          </form>
        </div>
      )}
    </>
  );
}
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ 
  userRole = null, 
  isAuthenticated = false, 
  walletConnected = false, 
  walletBalance = 0,
  onWalletConnect = () => {},
  onLogout = () => {}
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Discover',
      path: '/campaign-discovery-dashboard',
      icon: 'Search',
      roles: ['all']
    },
    {
      label: 'Create Campaign',
      path: '/patient-campaign-creation',
      icon: 'Plus',
      roles: ['patient', 'authenticated']
    },
    {
      label: 'Verify',
      path: '/hospital-verification-dashboard',
      icon: 'Shield',
      roles: ['hospital']
    },
    {
      label: 'Profile',
      path: '/user-profile-wallet-management',
      icon: 'User',
      roles: ['authenticated']
    }
  ];

  const isItemVisible = (item) => {
    if (item?.roles?.includes('all')) return true;
    if (!isAuthenticated && item?.roles?.includes('authenticated')) return false;
    if (isAuthenticated && item?.roles?.includes('authenticated')) return true;
    return item?.roles?.includes(userRole);
  };

  const visibleItems = navigationItems?.filter(isItemVisible);

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event?.target?.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const WalletIndicator = () => (
    <div className="flex items-center space-x-2">
      {walletConnected ? (
        <div className="flex items-center space-x-2 bg-success/10 text-success px-3 py-1.5 rounded-medical text-sm font-medium">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="font-mono">{walletBalance?.toFixed(2)} ADA</span>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={onWalletConnect}
          iconName="Wallet"
          iconPosition="left"
          className="text-sm"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );

  const Logo = () => (
    <Link to="/" className="flex items-center space-x-2 group">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-medical flex items-center justify-center">
        <Icon name="Heart" size={20} color="white" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
          MedChain
        </span>
        <span className="text-xs text-muted-foreground -mt-1">
          Trusted Medical Funding
        </span>
      </div>
    </Link>
  );

  return (
    <header className="sticky top-0 z-navigation bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {visibleItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-medical text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-medical-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <WalletIndicator />
            
            {isAuthenticated ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-medical hover:bg-muted transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-trust rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="var(--color-primary)" />
                  </div>
                  <Icon name="ChevronDown" size={16} className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-medical shadow-medical-lg z-dropdown">
                    <div className="py-1">
                      <Link
                        to="/user-profile-wallet-management"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-popover-foreground hover:bg-muted"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Icon name="Settings" size={16} />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          onLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/user-registration-login">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <WalletIndicator />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-medical hover:bg-muted transition-colors duration-200"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="py-4 space-y-2">
              {visibleItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-medical text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-border pt-4 mt-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/user-profile-wallet-management"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-medical"
                    >
                      <Icon name="Settings" size={18} />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-medical"
                    >
                      <Icon name="LogOut" size={18} />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/user-registration-login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-primary hover:bg-muted rounded-medical font-medium"
                  >
                    <Icon name="LogIn" size={18} />
                    <span>Sign In</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
/* eslint-disable linebreak-style */
import AuthService from '../../../services/auth.service';

class CustomHeader extends HTMLElement {
  connectedCallback() {
    const isAuthenticated = AuthService.isAuthenticated();
    const user = isAuthenticated ? JSON.parse(localStorage.getItem('user')) : null;

    this.innerHTML = `
      <!-- Header -->
      <header id="mainHeader" class="bg-primary-800 fixed w-full top-0 z-50 shadow-md">
        <div class="container mx-auto px-4">
          <nav class="flex items-center justify-between h-16">
            <!-- Logo and Home -->
            <div class="flex items-center space-x-8">
              <a href="#/" class="text-xl font-bold text-white">Upcyclers</a>
              <a href="#/" class="text-white hover:text-primary-200 transition-colors hidden md:block">Beranda</a>
            </div>

            <!-- Primary Navigation - desktop only -->
            <div class="hidden md:flex items-center space-x-8">
              ${isAuthenticated ? `
                <a href="#/jual-beli" class="text-white hover:text-primary-200 transition-colors"> <i class="fas fa-store mr-1"></i>Beli</a>
                <a href="#/buy-offers" class="text-white hover:text-primary-200 transition-colors">
                  <i class="fas fa-list-alt mr-1"></i>Jual
                </a>
                <a href="#/find-collector" class="text-white hover:text-primary-200 transition-colors">
                  <i class="fas fa-map-marker-alt mr-1"></i>Cari Penawaran
                </a>
              ` : ''}
            </div>

            <!-- Right Side -->
            <div class="flex items-center space-x-4">
              <a href="#/about" class="text-white hover:text-primary-200 transition-colors hidden md:block">Tentang</a>
              
              ${isAuthenticated ? `
                <!-- User Profile -->
                <div class="relative">
                  <button id="userMenuBtn" class="flex items-center space-x-2 text-white">
                    <img src="${user.profileImage || 'https://via.placeholder.com/32'}" 
                         alt="Profile" 
                         class="w-8 h-8 rounded-full object-cover border-2 border-white">
                    </button>
                    <div id="userMenuDropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <a href="#/profile" class="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                      <i class="fas fa-user mr-2"></i>Profile
                    </a>
                    <button id="logoutButton" class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                      <i class="fas fa-sign-out-alt mr-2"></i>Logout
                    </button>
                  </div>
                </div>
              ` : `
                <button onclick="window.location.hash = '#/auth'"
                        class="bg-white text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50">
                  Login
                </button>
              `}
            </div>
          </nav>
        </div>
      </header>

      <!-- Mobile Bottom Navigation -->
      <div class="fixed bottom-0 left-0 right-0 bg-primary-800 shadow-lg md:hidden z-50">
        <div class="flex justify-around items-center h-16">
          <a href="#/" class="flex flex-col items-center text-white hover:text-primary-200">
            <i class="fas fa-home text-xl"></i>
            <span class="text-xs mt-1">Beranda</span>
          </a>
          
          <a href="#/jual-beli" class="flex flex-col items-center text-white hover:text-primary-200">
            <i class="fas fa-store text-xl"></i>
            <span class="text-xs mt-1">Beli</span>
          </a>
          
          <a href="#/buy-offers" class="flex flex-col items-center text-white hover:text-primary-200">
            <i class="fas fa-list-alt text-xl"></i>
            <span class="text-xs mt-1">Jual</span>
          </a>

          ${isAuthenticated ? `
            <a href="#/find-collector" class="flex flex-col items-center text-white hover:text-primary-200">
              <i class="fas fa-map-marker-alt text-xl"></i>
              <span class="text-xs mt-1">Cari</span>
            </a>
          ` : `
            <a href="#/auth" class="flex flex-col items-center text-white hover:text-primary-200">
              <i class="fas fa-sign-in-alt text-xl"></i>
              <span class="text-xs mt-1">Login</span>
            </a>
          `}
        </div>
      </div>
    `;

    this._initializeMenus();
  }

  _initializeMenus() {
    // User menu dropdown
    const userMenuBtn = this.querySelector('#userMenuBtn');
    const userMenuDropdown = this.querySelector('#userMenuDropdown');

    if (userMenuBtn && userMenuDropdown) {
      userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenuDropdown.classList.toggle('hidden');
      });

      // Close menu when clicking outside
      document.addEventListener('click', () => {
        userMenuDropdown.classList.add('hidden');
      });
    }

    // Logout handler
    const logoutButton = this.querySelector('#logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        AuthService.logout();
        window.location.reload();
      });
    }
  }
}

customElements.define('header-element', CustomHeader);
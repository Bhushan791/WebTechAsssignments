
        function toggleCart() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.getElementById('cartOverlay');
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        }

        // Close cart when clicking outside
        document.addEventListener('click', function(event) {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.getElementById('cartOverlay');
            const cartButton = event.target.closest('[onclick="toggleCart()"]');
            
            if (!sidebar.contains(event.target) && !cartButton && sidebar.classList.contains('active')) {
                toggleCart();
            }
        });

        // Simple countdown timer
        function updateCountdown() {
            const countdownElements = document.querySelectorAll('.countdown-box');
            // This is a simple implementation - you can make it dynamic
        }
        
        setInterval(updateCountdown, 1000);

// ========================================
// Search Results Page JavaScript
// ========================================

// Filter Modal Functions
function openFilterModal() {
    const filterModal = document.getElementById('filterModal');
    filterModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFilterModal() {
    const filterModal = document.getElementById('filterModal');
    filterModal.classList.remove('active');
    document.body.style.overflow = '';
}

function clearAllFilters() {
    // Reset all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset sliders
    document.getElementById('distanceSlider').value = 5;
    document.getElementById('distanceValue').textContent = '5';
    document.getElementById('feesSlider').value = 1000;
    document.getElementById('feesValue').textContent = '1000';

    showToast('All filters cleared');
}

function applyFilters() {
    // Collect filter values
    const filters = {
        distance: document.getElementById('distanceSlider').value,
        fees: document.getElementById('feesSlider').value,
        languages: [],
        hospitalTypes: [],
        aarogyasri: false
    };

    // Get language filters
    document.querySelectorAll('input[value="telugu"], input[value="english"], input[value="hindi"]').forEach(checkbox => {
        if (checkbox.checked) {
            filters.languages.push(checkbox.value);
        }
    });

    // Get hospital type filters
    document.querySelectorAll('input[value="government"], input[value="private"], input[value="corporate"]').forEach(checkbox => {
        if (checkbox.checked) {
            filters.hospitalTypes.push(checkbox.value);
        }
    });

    // Get Aarogyasri filter
    const aarogyasriCheckbox = document.querySelector('input[value="aarogyasri"]');
    filters.aarogyasri = aarogyasriCheckbox?.checked || false;

    console.log('Applied filters:', filters);

    // Close modal
    closeFilterModal();

    // Show loading state
    showToast('Applying filters...');

    // Simulate filter application
    setTimeout(() => {
        showToast('Filters applied successfully');
        // In real app: fetchFilteredResults(filters);
    }, 500);
}

// Navigation Function
function navigateToProfile(doctorId) {
    console.log('Navigate to profile:', doctorId);
    showToast('Loading doctor profile...');

    // In real app: window.location.href = `/doctor/${doctorId}`;
    setTimeout(() => {
        alert(`This would navigate to doctor profile: ${doctorId}\n\nIn the real app, this would show the full doctor profile with booking options.`);
    }, 500);
}

// Helper function for toast notifications
function showToast(message, duration = 3000) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    toast.style.position = 'fixed';
    toast.style.bottom = '80px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#323232';
    toast.style.color = '#FFFFFF';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '24px';
    toast.style.fontSize = '14px';
    toast.style.fontFamily = 'Roboto, sans-serif';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    toast.style.zIndex = '10000';
    toast.style.maxWidth = '80%';
    toast.style.textAlign = 'center';
    toast.style.animation = 'toast-slide-up 0.3s ease-out';

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toast-slide-down 0.3s ease-out';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Filter button
    const filterButton = document.getElementById('filterButton');
    if (filterButton) {
        filterButton.addEventListener('click', openFilterModal);
    }

    // Clear filters button
    const clearFiltersButton = document.getElementById('clearFilters');
    if (clearFiltersButton) {
        clearFiltersButton.addEventListener('click', function() {
            // Remove active class from filter chips
            document.querySelectorAll('.filter-chip.active').forEach(chip => {
                if (!chip.classList.contains('clear-filters')) {
                    chip.classList.remove('active');
                }
            });
            showToast('Filters cleared');
        });
    }

    // Filter chips
    document.querySelectorAll('.filter-chip:not(.clear-filters)').forEach(chip => {
        chip.addEventListener('click', function() {
            if (!this.classList.contains('clear-filters')) {
                this.classList.toggle('active');
                const filter = this.getAttribute('data-filter');
                console.log('Toggle filter:', filter);
            }
        });
    });

    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            console.log('Sort by:', sortBy);
            showToast(`Sorting by ${sortBy}...`);
            // In real app: fetchSortedResults(sortBy);
        });
    }

    // View toggle
    const viewToggle = document.getElementById('viewToggle');
    if (viewToggle) {
        let isMapView = false;
        viewToggle.addEventListener('click', function() {
            isMapView = !isMapView;
            const icon = this.querySelector('.icon');
            icon.textContent = isMapView ? '📋' : '📍';
            console.log('Toggle view:', isMapView ? 'map' : 'list');
            showToast(isMapView ? 'Map view' : 'List view');
            // In real app: toggleView(isMapView);
        });
    }

    // Load more button
    const loadMoreButton = document.getElementById('loadMoreButton');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            this.disabled = true;
            this.textContent = 'Loading...';
            console.log('Load more doctors');

            // Simulate loading
            setTimeout(() => {
                this.disabled = false;
                const buttonTextEn = this.querySelector('.button-text-en');
                const buttonTextTe = this.querySelector('.button-text-te');
                if (buttonTextEn) buttonTextEn.textContent = 'Load More';
                if (buttonTextTe) buttonTextTe.textContent = 'మరిన్ని చూడండి';
                showToast('Loaded 10 more doctors');
                // In real app: fetchMoreDoctors();
            }, 1000);
        });
    }

    // Distance slider
    const distanceSlider = document.getElementById('distanceSlider');
    const distanceValue = document.getElementById('distanceValue');
    if (distanceSlider && distanceValue) {
        distanceSlider.addEventListener('input', function() {
            distanceValue.textContent = this.value;
        });
    }

    // Fees slider
    const feesSlider = document.getElementById('feesSlider');
    const feesValue = document.getElementById('feesValue');
    if (feesSlider && feesValue) {
        feesSlider.addEventListener('input', function() {
            feesValue.textContent = this.value;
        });
    }

    // Close modal on overlay click
    const filterModal = document.getElementById('filterModal');
    if (filterModal) {
        filterModal.addEventListener('click', function(e) {
            if (e.target === filterModal) {
                closeFilterModal();
            }
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeFilterModal();
        }
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes toast-slide-up {
            from {
                transform: translateX(-50%) translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }

        @keyframes toast-slide-down {
            from {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            to {
                transform: translateX(-50%) translateY(20px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Search results page initialized');
});

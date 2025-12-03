document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const services = document.querySelectorAll('.service-listing');
    const submenuGroups = document.querySelectorAll('.submenu-group');

    function filterContent(mainCat, subCat) {
        services.forEach(listing => {
            const listMainCat = listing.dataset.mainCat;
            const listSubCat = listing.dataset.subCat;
            
            // Check if both the main category AND the subcategory match
            if (listMainCat === mainCat && (listSubCat === subCat || listSubCat === 'none')) {
                listing.classList.add('active');
            } else {
                listing.classList.remove('active');
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const type = this.dataset.category;
            const filterValue = this.dataset.filter;

            // 1. Handle Button Active States (Visual feedback)
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // 2. Handle Submenu Visibility (Only when clicking 'Pengujian' or similar)
            if (type === 'main') {
                submenuGroups.forEach(group => group.classList.remove('visible'));
                const targetSubmenu = document.querySelector(`.submenu-group[data-parent="${filterValue}"]`);
                if (targetSubmenu) {
                    targetSubmenu.classList.add('visible');
                    
                    // If a submenu is shown, default to clicking the first sub-item
                    const firstSubBtn = targetSubmenu.querySelector('.filter-btn');
                    if (firstSubBtn) {
                        firstSubBtn.click();
                        return; 
                    }
                }
            }
            
            // 3. Determine the final Main and Sub-category to filter the content
            let currentMain = filterValue;
            let currentSub = 'none';

            if (type === 'sub') {
                // If sub-button is clicked, get its parent's main category
                currentMain = this.closest('.submenu-group').dataset.parent;
                currentSub = filterValue;
            }
            
            // 4. Run the final filter
            filterContent(currentMain, currentSub);
        });
    });

    // --- Initial Load: Trigger the default active button on page load ---
    document.querySelector('.filter-btn[data-filter="p-kimia"]')?.click();
});
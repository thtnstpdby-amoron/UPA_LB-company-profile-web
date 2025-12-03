document.addEventListener('DOMContentLoaded', () => {

    const mainSelection = document.querySelector('.layanan'); 
    const SidebarandContent = document.querySelector('.bungkus-layanan'); 
    const initialButtons = document.querySelectorAll('.lawuh'); 
    
    const filterButtons = document.querySelectorAll('.filter-btn'); 
    const submenuGroups = document.querySelectorAll('.submenu-group');
    const serviceItems = document.querySelectorAll('.service-listing');

    function filterContent(selectedMainFilter, selectedSubFilter) {
        
        serviceItems.forEach(item => {
            const itemMainCat = item.dataset.mainCat;
            const itemSubCat = item.dataset.subCat;
            
            item.style.display = 'none';

            let shouldShow = false;


            if (itemSubCat === 'none' && selectedMainFilter === itemMainCat && selectedSubFilter === 'none') {
                shouldShow = true;
            } 
            
            else if (itemMainCat === selectedMainFilter && itemSubCat === selectedSubFilter && selectedSubFilter !== 'none') {
                shouldShow = true;
            }

            if (shouldShow) {
                item.style.display = 'block';
            }
        });
    }

    initialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const selectedFilter = this.dataset.filter;

            mainSelection.style.display = 'none';
            SidebarandContent.style.display = 'flex'; 

            const targetBtn = document.querySelector(`.filter-btn[data-filter="${selectedFilter}"]`);
            if (targetBtn) {
                targetBtn.click();
            }
        });
    });


    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const filterValue = this.dataset.filter;
            const categoryType = this.dataset.category;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (categoryType === 'main') {
                submenuGroups.forEach(group => group.style.display = 'none');
                
                const targetSubmenu = document.querySelector(`.submenu-group[data-parent="${filterValue}"]`);

                if (targetSubmenu) {

                    targetSubmenu.style.display = 'block'; 
                    
                    const firstSubBtn = targetSubmenu.querySelector('.filter-btn[data-category="sub"]');
                    if (firstSubBtn) {
                        firstSubBtn.click();
                        return; 
                    }
                } 
                
                filterContent(filterValue, 'none');

            } else if (categoryType === 'sub') {
                const mainParentFilter = this.closest('.submenu-group').dataset.parent;
                const subFilter = filterValue; 
                
                filterContent(mainParentFilter, subFilter);
            }
        });
    });


    SidebarandContent.style.display = 'none';

    mainSelection.style.display = 'flex';
});
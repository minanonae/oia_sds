document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Inject the Sidebar Component
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    
    if (sidebarPlaceholder) {
        fetch('sidebar.html')
            .then(response => response.text())
            .then(data => {
                sidebarPlaceholder.innerHTML = data;
                highlightCurrentPage(); 
            })
            .catch(error => console.error('Error loading sidebar:', error));
    }

    // 2. Global Click Listener (Event Delegation)
    document.addEventListener('click', function(e) {
        
        // --- Accordion Logic for Submenus ---
        const toggleBtn = e.target.closest('.submenu-toggle');
        
        if (toggleBtn) {
            const wrapper = toggleBtn.parentElement;
            
            // Toggle the clicked menu
            wrapper.classList.toggle('open');
            
            // Close other open submenus
            document.querySelectorAll('.nav-item-wrapper').forEach(item => {
                if (item !== wrapper) {
                    item.classList.remove('open');
                }
            });
        }

        // --- Logout Logic ---
        const logoutBtn = e.target.closest('.logout-mini');
        
        if (logoutBtn) {
            e.preventDefault(); // Prevent any default button behavior
            
            // Note for Full Stack Dev: 
            // If you are using JWT or Session storage, clear them here before redirecting.
            // Example: localStorage.removeItem('authToken');
            
            window.location.href = 'index.html'; // Redirect to login page
        }
    });
});

// 3. Dynamic Active State Highlighting
function highlightCurrentPage() {
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "") currentPage = "dashboard.html"; 

    const navLinks = document.querySelectorAll('.sidebar-nav a');

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            
            const parentWrapper = link.closest('.nav-item-wrapper');
            if (parentWrapper) {
                parentWrapper.classList.add('open');
                const toggle = parentWrapper.querySelector('.submenu-toggle');
                if(toggle) toggle.classList.add('active'); 
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Inject the Sidebar Component
    const sidebarPlaceholder = document.getElementById('sidebar-placeholder');
    
    if (sidebarPlaceholder) {
        fetch('sidebar.html')
            .then(response => response.text())
            .then(data => {
                sidebarPlaceholder.innerHTML = data;
                highlightCurrentPage(); 
            })
            .catch(error => console.error('Error loading sidebar:', error));
    }

    // 2. Generate Random Recent Activity (If the container exists on the page)
    generateRandomActivity();

    // 3. Global Click Listener (Event Delegation)
    document.addEventListener('click', function(e) {
        
        // --- Accordion Logic for Submenus ---
        const toggleBtn = e.target.closest('.submenu-toggle');
        if (toggleBtn) {
            const wrapper = toggleBtn.parentElement;
            wrapper.classList.toggle('open');
            document.querySelectorAll('.nav-item-wrapper').forEach(item => {
                if (item !== wrapper) item.classList.remove('open');
            });
        }

        // --- Logout Logic ---
        const logoutBtn = e.target.closest('.logout-mini');
        if (logoutBtn) {
            e.preventDefault(); 
            window.location.href = 'index.html'; 
        }
    });
});

// --- Helper Functions ---

function highlightCurrentPage() {
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "") currentPage = "dashboard.html"; 

    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            const parentWrapper = link.closest('.nav-item-wrapper');
            if (parentWrapper) {
                parentWrapper.classList.add('open');
                const toggle = parentWrapper.querySelector('.submenu-toggle');
                if(toggle) toggle.classList.add('active'); 
            }
        }
    });
}

function generateRandomActivity() {
    const activityList = document.getElementById('recent-activity-list');
    if (!activityList) return; // Exit if not on the dashboard page

    // Allowed pages (History Log excluded)
    const pages = [
        'Output SDS', 'GHS Label Print', 'Metal Master', 
        'Component Master', 'Hazardousness Master', 'RM Component Master', 
        'Metal Component', 'Paint Type Master', 'ERP Import', 
        'User Management List', 'User Group Maintenance List', 'Factory Setting'
    ];

    // Actions with corresponding icons and colors
    const actions = [
        { type: 'Added', desc: 'New record created in', icon: 'fa-plus', color: 'bg-light-green text-green' },
        { type: 'Inserted', desc: 'Data imported into', icon: 'fa-arrow-right-to-bracket', color: 'bg-light-blue text-blue' },
        { type: 'Deleted', desc: 'Record removed from', icon: 'fa-trash', color: 'bg-light-orange text-orange' }
    ];

    // Sequential fake times to make it look realistic
    const times = ['Just now', '12 mins ago', '45 mins ago', '2 hours ago'];

    let htmlContent = '';

    // Generate 4 random activity items
    for (let i = 0; i < 4; i++) {
        const randomPage = pages[Math.floor(Math.random() * pages.length)];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        const timeAgo = times[i]; 

        htmlContent += `
            <li class="activity-item">
                <div class="activity-icon ${randomAction.color}">
                    <i class="fa-solid ${randomAction.icon}"></i>
                </div>
                <div class="activity-content">
                    <h4>Admin ${randomAction.type}</h4>
                    <p>${randomAction.desc} '${randomPage}'.<br><span class="time">${timeAgo}</span></p>
                </div>
            </li>
        `;
    }

    // Inject into the DOM
    activityList.innerHTML = htmlContent;
}

// 3. Global Click Listener (Event Delegation)
    document.addEventListener('click', function(e) {
        
        // --- Accordion Logic for Submenus ---
        const toggleBtn = e.target.closest('.submenu-toggle');
        
        if (toggleBtn) {
            e.preventDefault(); // <--- Prevents the page from jumping or reloading
            
            const wrapper = toggleBtn.closest('.nav-item-wrapper'); // <--- Safer targeting
            
            // Toggle the clicked menu
            wrapper.classList.toggle('open');
            
            // Close other open submenus automatically
            document.querySelectorAll('.nav-item-wrapper').forEach(item => {
                if (item !== wrapper) {
                    item.classList.remove('open');
                }
            });
        }

        // --- Logout Logic ---
        const logoutBtn = e.target.closest('.logout-mini');
        if (logoutBtn) {
            e.preventDefault(); 
            window.location.href = 'index.html'; 
        }

        // --- Back Button Logic ---
        const backBtn = e.target.closest('.btn-back');
        if (backBtn) {
            e.preventDefault();
            // Redirects to the Output SDS page
            window.location.href = 'output-sds.html'; 
        }

        // --- Req Overview Redirect ---
        const reqOverviewBtn = e.target.closest('.btn-req-overview');
        if (reqOverviewBtn) {
            e.preventDefault();
            window.location.href = 'sdsreg.html'; 
        }

        // --- Output SDS Modal Open Logic ---
        // Targets any blue button inside the action cell (which is our print button)
        const printBtn = e.target.closest('.action-cell .text-blue');
        if (printBtn) {
            e.preventDefault();
            const modal = document.getElementById('outputModal');
            if (modal) modal.classList.add('active'); // Shows the modal
        }

        // --- Output SDS Modal Close Logic ---
        // Closes if clicking the "X", the yellow "CLOSE" button, or outside the modal
        const closeIcon = e.target.closest('.btn-close-icon');
        const closeBtn = e.target.closest('.btn-warning-fill');
        const clickOutside = e.target.classList.contains('modal-overlay'); // Clicks on the dark background

        if (closeIcon || closeBtn || clickOutside) {
            e.preventDefault();
            const modal = document.getElementById('outputModal');
            if (modal) modal.classList.remove('active'); // Hides the modal
        }
    });

    // --- 4. Redirects to Wizard Page ---
    document.addEventListener('click', function(e) {
        // Target any primary blue "New" button OR the text-yellow edit icons
        const newBtn = e.target.closest('.btn-primary'); 
        const editIcon = e.target.closest('.text-yellow'); 
        
        // Target specifically the "New" button IDs from the master pages
        const isMasterNew = e.target.closest('#btnNewMetalMaster') || e.target.closest('#btnNewComponentMaster');
        
        // Target specifically the edit icons inside the master tables (to stop redirect)
        const isMasterTableEdit = e.target.closest('.metal-master-table .btn-edit-square') || 
                                 e.target.closest('.data-table-component .btn-edit-square');

        // ✅ NEW FIX: If the clicked button is a "New" or "Edit" button for a master page, 
        // STOP this function so the Modal logic can take over instead!
        if (isMasterNew || isMasterTableEdit) {
            return; 
        }

        // Otherwise, if it's a generic "New" button or Edit icon (for SDS), redirect
        if ((newBtn && newBtn.textContent.includes('New')) || editIcon) {
            e.preventDefault();
            window.location.href = 'sdscreate.html';
        }
    });

    // --- 5. Wizard Form Logic (Only runs on sdscreate.html) ---
    const wizardCard = document.querySelector('.wizard-card');
    if (wizardCard) {
        let currentStep = 1;
        const totalSteps = 5;

        const btnNext = document.getElementById('btn-wizard-next');
        const btnBack = document.getElementById('btn-wizard-back');
        const btnSave = document.getElementById('btn-wizard-save');
        
        const steps = document.querySelectorAll('.wizard-stepper-container .step');
        const lines = document.querySelectorAll('.wizard-stepper-container .step-line');
        const contents = document.querySelectorAll('.wizard-step-content');

        function updateWizardUI() {
            // Update Top Stepper UI
            steps.forEach((step, index) => {
                let stepNum = index + 1;
                step.classList.remove('active', 'completed');
                if (stepNum < currentStep) step.classList.add('completed');
                if (stepNum === currentStep) step.classList.add('active');
            });

            lines.forEach((line, index) => {
                if (index < currentStep - 1) line.classList.add('completed');
                else line.classList.remove('completed');
            });

            // Show relevant Form Content
            contents.forEach(content => content.style.display = 'none');
            document.getElementById(`step-${currentStep}-content`).style.display = 'block';

            // Toggle Footer Buttons
            btnBack.style.display = currentStep > 1 ? 'block' : 'none';
            
            if (currentStep === totalSteps) {
                btnNext.style.display = 'none';
                btnSave.style.display = 'block';
            } else {
                btnNext.style.display = 'block';
                btnSave.style.display = 'none';
            }
        }

        if(btnNext) {
            btnNext.addEventListener('click', () => {
                if (currentStep < totalSteps) { currentStep++; updateWizardUI(); }
            });
        }

        if(btnBack) {
            btnBack.addEventListener('click', () => {
                if (currentStep > 1) { currentStep--; updateWizardUI(); }
            });
        }

        // Initialize first view
        updateWizardUI();
    }

    // --- 6. Save & Generate Modal Trigger ---
    const btnSaveGenerate = document.getElementById('btn-wizard-save');
    const saveGenerateModal = document.getElementById('saveGenerateModal');

    if (btnSaveGenerate) {
        btnSaveGenerate.addEventListener('click', function() {
            // Ensure we are on Step 5
            saveGenerateModal.classList.add('active');
        });
    }

    // Modal Close Logic (Top X, Bottom Close button, or clicking background)
    const closePreviewTop = document.getElementById('closePreviewTop');
    const closePreviewBottom = document.getElementById('closePreviewBottom');

    [closePreviewTop, closePreviewBottom, saveGenerateModal].forEach(element => {
        if (element) {
            element.addEventListener('click', function(e) {
                if (e.target === element || e.target.closest('.btn-close-preview') || e.target.id === 'closePreviewBottom') {
                    saveGenerateModal.classList.remove('active');
                }
            });
        }
    });

    // --- GHS Label Specific Logic ---
document.addEventListener('click', function(e) {
    // Handle Purple Eye Icon click
    const viewBtn = e.target.closest('.btn-icon-purple');
    if (viewBtn) {
        e.preventDefault();
        console.log("Viewing GHS Label details...");
        // Add your logic to open a label preview or detail page here
    }
});

// --- Metal Master Modal Logic ---
    const btnNewMetalMaster = document.getElementById('btnNewMetalMaster');
    const metalMasterModal = document.getElementById('metalMasterModal');

    if (btnNewMetalMaster && metalMasterModal) {
        // Open Modal
        btnNewMetalMaster.addEventListener('click', function(e) {
            e.preventDefault();
            metalMasterModal.classList.add('active');
        });

        // Close Modal Logic
        const closeMetalTop = document.getElementById('closeMetalModalTop');
        const closeMetalBottom = document.getElementById('closeMetalModalBottom');

        [closeMetalTop, closeMetalBottom, metalMasterModal].forEach(element => {
            if (element) {
                element.addEventListener('click', function(e) {
                    // Close if clicking the specific buttons OR the dark background overlay
                    if (e.target === element || e.target.closest('.btn-close-icon') || e.target.id === 'closeMetalModalBottom') {
                        metalMasterModal.classList.remove('active');
                    }
                });
            }
        });
    }

    // --- (Update 2 of 2) Component Master Modal Logic ---
    const componentModal = document.getElementById('componentMasterModal');

    document.addEventListener('click', function(e) {
        
        // 1. Target specifically the Component Master "New" button OR the Edit pencil inside the Component table
        const isComponentNew = e.target.closest('#btnNewComponentMaster');
        const isComponentEdit = e.target.closest('.data-table-component .btn-edit-square');
        
        // 2. Open Logic (must use return; to stop the generic redirect logic)
        if (isComponentNew || isComponentEdit) {
            e.preventDefault(); 
            e.stopPropagation(); // Prevents other click events from firing
            if (componentModal) {
                componentModal.classList.add('active');
            }
            return; 
        }

        // 3. Close Logic (targeted specifically for this modal's buttons)
        const closeCompTop = e.target.closest('#closeComponentModalTop');
        const closeCompBottom = e.target.closest('#closeComponentModalBottom');
        
        if (closeCompTop || closeCompBottom || e.target === componentModal) {
            e.preventDefault();
            if (componentModal) {
                componentModal.classList.remove('active');
            }
        }
    });
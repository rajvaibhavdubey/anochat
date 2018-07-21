   var sidebarHideBtn = document.getElementById("sidebar_collapse");
    if (window.localStorage.getItem("anochat_sidebar_hidden") === "true") {
            document.body.classList.add("sidebarhidden");
        }
  
  sidebarHideBtn.addEventListener("click", function() {
            var className = "sidebarhidden";

            if (document.body.classList.contains(className)) {
                document.body.classList.remove(className);
                window.localStorage.setItem("anochat_sidebar_hidden", "false");
               
            } else {
                document.body.classList.add(className);
                window.localStorage.setItem("anochat_sidebar_hidden", "true");
                
            }
        });

    
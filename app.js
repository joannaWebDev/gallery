const URL = "https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/photos.json";
const app = document.querySelector("#app");
const interval = 1000;
const columnQuantity = 4;
const getPhotos = URL => {
  fetch(URL)
    .then(response => onSuccessResponse(response))
    .catch(error => onErrorResponse(error));
};
const createImg = photo => {
  const img = document.createElement("img");
  img.setAttribute("src", photo.url);
  return img;
};
const createColumn = () => {
  const divColumn = document.createElement("div");
  divColumn.classList = "column";
  return divColumn;
};
const createRow = () => {
  const divRow = document.createElement("div");
  divRow.classList = "row";
  return divRow;
};
const onSuccessResponse = response =>
  response.json().then(photos => {
    let row;
    for (const photoIndex in photos) {
      setTimeout(() => {
        const column = createColumn();
        const img = createImg(photos[photoIndex]);
        if (photoIndex % columnQuantity === 0) row = createRow();
        row.appendChild(column);
        column.appendChild(img);
        app.appendChild(row);
      }, interval * photoIndex);
    }
  });
const onErrorResponse = error => console.error("Aqui esta el error", error);
getPhotos(URL);



//toggle
const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".item");

/* Toggle mobile menu */
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");        
        // adds the menu (hamburger) icon
        toggle.querySelector("a").innerHTML ="<i class='fas fa-bars'></i>";
    } else {
        menu.classList.add("active");         
        // adds the close (x) icon
        toggle.querySelector("a").innerHTML ="<i class='fas fa-times'></i>";
    }
}
/*First, we select the menu and the toggle button using the querySelector() method so that we can access them with JavaScript. 
Then, we add the custom toggleMenu() function that will be called when the toggle is clicked. 
Lastly, we add the event listener that will be listening to the click event using the addEventListener() method.*/


//Dropdown Functionality 
/*Now, when the user clicks the toggle button, the menu is activated and deactivated, however, the submenu is still hidden. We will add this functionality*/

/* Activate Submenu */
function toggleItem() {
  if (this.classList.contains("submenu-active")) {
    this.classList.remove("submenu-active");
  } else if (menu.querySelector(".submenu-active")) {
    menu.querySelector(".submenu-active").classList.remove("submenu-active");
    this.classList.add("submenu-active");
  } else {
    this.classList.add("submenu-active");
  }
}
/*First, we select all menu items with the querySelectorAll() method that returns a node list (rather than a single element like querySelector()). 
In the custom toggleItem() function, we add and remove .submenu-active to/from the clicked element. Note that in the else if block, we remove the class from every other menu items that were previously opened. This way, it won’t happen that two submenus are open at the same time, as they can cover each other on desktop.
Finally, we loop through the items classList using a for...of loop. Within the if block, we add two event listeners to menu items that have a submenu: one for the click event for regular users who access the menu by clicking or tapping, and one for the keypress event for keyboard users.*/ 

/* Close Submenu From Anywhere */
function closeSubmenu(e) {
  let isClickInside = menu.contains(e.target);

  if (!isClickInside && menu.querySelector(".submenu-active")) {
    menu.querySelector(".submenu-active").classList.remove("submenu-active");
  }
}

/* Event Listeners */
toggle.addEventListener("click", toggleMenu, false);
for (let item of items) {
  if (item.querySelector(".submenu")) {
    item.addEventListener("click", toggleItem, false);
  }
  item.addEventListener("keypress", toggleItem, false);
}
document.addEventListener("click", closeSubmenu, false);

/*The custom closeSubmenu() function checks if the user clicked inside the menu with the help of the target property. If not and there’s an active submenu on the screen, the .submenu-active class will be removed, so the submenu closes itself. We add the event listener to the document object, as we want to listen for clicks on the whole page.*/
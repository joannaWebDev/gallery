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
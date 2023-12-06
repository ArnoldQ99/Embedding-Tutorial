// var viz = new tableau.Viz(placeholderDiv, url, options);

let viz;

// 1. Create a variable to store placeholder Div

const placeholderDiv = document.getElementById("VizContainer");

// 2. Create a variable to store the URL

const url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia?:language=en-US&:display_count=n&:origin=viz_share_link";

// 3. Create a variable to store the dashboard options

const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};

function initViz() {
  console.log("Viz is ready to load");
  viz = new tableau.Viz(placeholderDiv, url, options);
}

// Listen for the content to be loaded, when finished, load the viz.

document.addEventListener("DOMContentLoaded", initViz);

// Buttons
// Where are my buttons?

const exportpdfbutton = document.getElementById("ExportPDF");

//Listen for button clicked

exportpdfbutton.addEventListener("click", exportpdfFunction);

// What happens when I buttons are clicked

function exportpdfFunction() {
  viz.showExportPDFDialog();
}

function exportppFunction() {
  viz.showExportPowerPointDialog();
}

function ShareDBFunction() {
  viz.showShareDialog();
}

const exportppbutton = document.getElementById("ExportPowerpoint");
exportppbutton.addEventListener("click", exportppFunction);

const ShareDBbutton = document.getElementById("ShareDB");
ShareDBbutton.addEventListener("click", ShareDBFunction);

const filterbutton = document.getElementById("FilterButton");
filterbutton.addEventListener("click", getrangevalues);

function getrangevalues() {
  //Filter Range Buttons
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);

  //Need to get the active sheet and then list of worksheets
  const workbook = viz.getWorkbook();
  console.log(workbook);

  const activesheet = workbook.getActiveSheet();
  console.log(activesheet);

  const sheets = activesheet.getWorksheets();
  console.log(sheets);

  const SheetToFilter = sheets[0];
  console.log(SheetToFilter);
  SheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  }).then(alert("Viz Filtered!"));
}

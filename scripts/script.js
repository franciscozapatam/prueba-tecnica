const fs = require("fs").promises;
const fsWatch = require("fs");
const path = require("path");
const createTemplate = require("./template-factory");

const jsonFolderPath = "./json";
const templateFolderPath = "./src/templates";

async function processJSONFile(filePath) {
  try {
    const jsonData = JSON.parse(await fs.readFile(filePath, "utf8"));
    const htmlContent = createTemplate(jsonData);
    const templateName = `${jsonData.name}.html`;
    const templateDir = path.join(templateFolderPath, jsonData.name);
    const templatePath = path.join(templateDir, templateName);
    await fs.mkdir(templateDir, { recursive: true });
    await fs.writeFile(templatePath, htmlContent);
    console.log(`Archivo HTML parcial ${templateName} creado correctamente.`);
  } catch (error) {
    console.error(`Error al procesar el archivo JSON ${filePath}:`, error);
  }
}

async function watchJSONFolder() {
  try {
    const files = await fs.readdir(jsonFolderPath);
    for (const file of files) {
      await processJSONFile(path.join(jsonFolderPath, file));
    }
    fsWatch.watch(jsonFolderPath, async (eventType, filename) => {
      if (eventType === "rename" && filename) {
        try {
          await fs.stat(path.join(jsonFolderPath, filename));
          await processJSONFile(path.join(jsonFolderPath, filename));
        } catch {
          console.log(`El archivo ${filename} ha sido eliminado.`);
          const folderName = path.join(
            templateFolderPath,
            filename.split(".")[0] + "-template"
          );
          await fs.rm(
            path.join(templateFolderPath, filename.split(".")[0] + "-template"),
            { recursive: true }
          );
          console.log(`La plantilla ${folderName}.html ha sido eliminada`);
        }
      }
    });
  } catch (error) {
    console.error("Error al leer la carpeta json:", error);
  }
}

watchJSONFolder();

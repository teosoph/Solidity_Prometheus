const fs = require("fs");
const path = require("path");

const mainFile = "Task_2.sol"; // The main contract file
const outputFilePath = path.join(__dirname, "Combined_Task_2.sol"); // Path for the combined output file

// Function to read and merge files
async function mergeFiles(filePath, baseDir = __dirname, alreadyImported = new Set()) {
    let content = await fs.promises.readFile(path.join(baseDir, filePath), "utf8");

    // Find all imports
    content = await Promise.all(
        content.split("\n").map(async (line) => {
            const match = line.match(/^\s*import\s+['"](.+)['"];/);
            if (match && !alreadyImported.has(match[1])) {
                alreadyImported.add(match[1]); // Mark file as already processed
                // Read and merge the imported file
                const importedContent = await mergeFiles(
                    match[1],
                    path.dirname(path.join(baseDir, filePath)),
                    alreadyImported
                );
                return importedContent + "\n";
            }
            return line;
        })
    );

    return content.join("\n");
}

// Start the merging process
mergeFiles(mainFile)
    .then((content) => {
        // Write the result to the output file
        fs.promises
            .writeFile(outputFilePath, content)
            .then(() => console.log(`The combined file has been saved as: ${outputFilePath}`))
            .catch((err) => console.error("Error writing file:", err));
    })
    .catch((err) => console.error("Error merging files:", err));

const fs = require("fs");
const path = require("path");

const mainFile = "DataTypesPractice.sol";
const outputFilePath = path.join(__dirname, "../contracts_comb/Combined_DataTypesPractice.sol");

// Function to read and merge files
async function mergeFiles(filePath, baseDir = __dirname, alreadyImported = new Set()) {
    let content = await fs.promises.readFile(path.join(baseDir, filePath), "utf8");

    // Find all imports
    content = await Promise.all(
        content.split("\n").map(async (line) => {
            const match = line.match(/^\s*import\s+['"](.+)['"];/);
            if (match && !alreadyImported.has(match[1])) {
                alreadyImported.add(match[1]);

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
    .then(async (content) => {
        // Ensure the directory exists before writing the file
        await fs.promises.mkdir(path.dirname(outputFilePath), { recursive: true });

        fs.promises
            .writeFile(outputFilePath, content)
            .then(() => console.log(`The combined file has been saved as: ${outputFilePath}`))
            .catch((err) => console.error("Error writing file:", err));
    })
    .catch((err) => console.error("Error merging files:", err));

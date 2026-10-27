import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, "..")

const CATALOG_PATH = path.join(ROOT, "registry", "catalog.json")
const PUBLIC_R_DIR = path.join(ROOT, "public", "r")
const STYLES_NEW_YORK_DIR = path.join(PUBLIC_R_DIR, "styles", "new-york")
const STYLES_DEFAULT_DIR = path.join(PUBLIC_R_DIR, "styles", "default")
const ROOT_REGISTRY_PATH = path.join(ROOT, "registry.json")

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

export function buildRegistry() {
  console.log("🔨 Building Lumen Registry...")

  if (!fs.existsSync(CATALOG_PATH)) {
    throw new Error(`Catalog file not found at ${CATALOG_PATH}`)
  }

  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf-8"))
  ensureDir(PUBLIC_R_DIR)
  ensureDir(STYLES_NEW_YORK_DIR)
  ensureDir(STYLES_DEFAULT_DIR)

  const items = catalog.items || []
  const builtItems = []

  for (const item of items) {
    const populatedFiles = []

    for (const file of item.files) {
      const fullPath = path.join(ROOT, file.path)
      if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found for ${item.name}: ${fullPath}`)
      }
      const content = fs.readFileSync(fullPath, "utf-8")
      populatedFiles.push({
        path: file.target ?? path.basename(file.path),
        content,
        type: file.type ?? item.type,
        target: file.target ?? ""
      })
    }

    const registryItem = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
      dependencies: item.dependencies ?? [],
      devDependencies: item.devDependencies ?? [],
      registryDependencies: item.registryDependencies ?? [],
      files: populatedFiles,
      tailwind: item.tailwind ?? {},
      cssVars: item.cssVars ?? {}
    }

    builtItems.push(registryItem)

    // Write public/r/[name].json
    const itemJsonPath = path.join(PUBLIC_R_DIR, `${item.name}.json`)
    fs.writeFileSync(itemJsonPath, JSON.stringify(registryItem, null, 2))

    // Write aliases for shadcn style compatibility
    fs.writeFileSync(
      path.join(STYLES_NEW_YORK_DIR, `${item.name}.json`),
      JSON.stringify(registryItem, null, 2)
    )
    fs.writeFileSync(
      path.join(STYLES_DEFAULT_DIR, `${item.name}.json`),
      JSON.stringify(registryItem, null, 2)
    )

    console.log(`  ✓ Built ${item.type}: ${item.name}`)
  }

  // Build public/r/index.json
  const indexJson = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: catalog.name ?? "lumen",
    homepage: catalog.homepage ?? "https://github.com/strophix-software/lumen-registry",
    items: builtItems.map(({ files, ...meta }) => ({
      ...meta,
      files: files.map((f) => ({ path: f.path, type: f.type, target: f.target }))
    }))
  }

  fs.writeFileSync(path.join(PUBLIC_R_DIR, "index.json"), JSON.stringify(indexJson, null, 2))

  // Build root registry.json
  const rootRegistry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: catalog.name ?? "lumen",
    homepage: catalog.homepage ?? "https://github.com/strophix-software/lumen-registry",
    items: builtItems
  }

  fs.writeFileSync(ROOT_REGISTRY_PATH, JSON.stringify(rootRegistry, null, 2))

  console.log(`\n🎉 Successfully built ${builtItems.length} registry items to public/r and registry.json`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildRegistry()
}

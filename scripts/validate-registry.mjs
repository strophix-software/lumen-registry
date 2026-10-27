import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, "..")

const CATALOG_PATH = path.join(ROOT, "registry", "catalog.json")
const ROOT_REGISTRY_PATH = path.join(ROOT, "registry.json")
const PUBLIC_R_DIR = path.join(ROOT, "public", "r")

export function validateRegistry() {
  console.log("🔍 Validating Lumen Registry...")

  if (!fs.existsSync(CATALOG_PATH)) {
    throw new Error(`Catalog not found: ${CATALOG_PATH}`)
  }

  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, "utf-8"))
  const items = catalog.items || []
  const itemNames = new Set(items.map((i) => i.name))

  let errors = 0
  let primitives = 0
  let blocks = 0
  let layouts = 0
  let hooks = 0
  let libs = 0

  for (const item of items) {
    if (!item.name) {
      console.error(`❌ Item missing name: ${JSON.stringify(item)}`)
      errors++
    }

    if (!item.type) {
      console.error(`❌ Item ${item.name} missing type`)
      errors++
    }

    if (item.type === "registry:ui") primitives++
    else if (item.type === "registry:block") {
      blocks++
      if (item.name.endsWith("-layout") || item.name.endsWith("-shell")) layouts++
    } else if (item.type === "registry:hook") hooks++
    else if (item.type === "registry:lib") libs++

    // Check files exist
    if (!item.files || item.files.length === 0) {
      console.error(`❌ Item ${item.name} has no files declared`)
      errors++
    } else {
      for (const file of item.files) {
        const fullPath = path.join(ROOT, file.path)
        if (!fs.existsSync(fullPath)) {
          console.error(`❌ File declared for ${item.name} not found: ${file.path}`)
          errors++
        }
      }
    }

    // Check registryDependencies exist in catalog
    if (item.registryDependencies) {
      for (const dep of item.registryDependencies) {
        if (!itemNames.has(dep)) {
          console.error(`❌ Item ${item.name} references non-existent registry dependency: ${dep}`)
          errors++
        }
      }
    }

    // Check built public/r JSON exists if registry was built
    const publicItemPath = path.join(PUBLIC_R_DIR, `${item.name}.json`)
    if (fs.existsSync(publicItemPath)) {
      try {
        const built = JSON.parse(fs.readFileSync(publicItemPath, "utf-8"))
        if (!built.files || built.files.length === 0) {
          console.error(`❌ Built JSON for ${item.name} has empty files`)
          errors++
        }
      } catch (err) {
        console.error(`❌ Built JSON for ${item.name} is invalid JSON: ${err.message}`)
        errors++
      }
    }
  }

  if (fs.existsSync(ROOT_REGISTRY_PATH)) {
    try {
      const rootReg = JSON.parse(fs.readFileSync(ROOT_REGISTRY_PATH, "utf-8"))
      if (!Array.isArray(rootReg.items) || rootReg.items.length !== items.length) {
        console.error(
          `❌ root registry.json item count mismatch: got ${rootReg.items?.length}, expected ${items.length}`
        )
        errors++
      }
    } catch (err) {
      console.error(`❌ root registry.json invalid: ${err.message}`)
      errors++
    }
  }

  console.log("\n================ Registry Summary ================")
  console.log(`📦 Total Items:     ${items.length}`)
  console.log(`🧩 UI Primitives:   ${primitives}`)
  console.log(`🧱 Universal Blocks: ${blocks}`)
  console.log(`📐 Layout Blocks:    ${layouts}`)
  console.log(`🪝 Hooks:            ${hooks}`)
  console.log(`📚 Lib Utilities:    ${libs}`)
  console.log("==================================================")

  if (errors > 0) {
    console.error(`\n❌ Validation failed with ${errors} error(s).`)
    process.exit(1)
  }

  console.log("\n✅ Registry validation passed with 0 errors!")
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  validateRegistry()
}

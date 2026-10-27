# @strophix/lumen-registry

Official component and block registry for **Lumen** (Tailwind CSS v4 + React 19 + Radix UI).

Designed to power `lumen g ui <name>` with high-quality, universally applicable UI primitives and composite blocks, avoiding hyperspecialized components in favor of composable, reusable foundations for any web application.

---

## 🚀 Quick Usage

### In a Lumen Project
```bash
# Add UI Primitives
lumen g ui button
lumen g ui dialog
lumen g ui table
lumen g ui badge

# Add Layouts
lumen g ui app-shell
lumen g ui marketing-layout
lumen g ui stacked-layout
lumen g ui auth-split
lumen g ui auth-card

# Add Universal Blocks
lumen g ui stats-grid
lumen g ui data-table-toolbar
lumen g ui empty-state
lumen g ui command-menu
lumen g ui confirm-dialog
lumen g ui filter-bar
lumen g ui page-header
lumen g ui user-profile-menu
lumen g ui activity-feed
```

### Registry Endpoints (Shadcn Compatible)
- Registry Index: `https://raw.githubusercontent.com/strophix-software/lumen-registry/main/public/r/index.json`
- Item Schema: `https://raw.githubusercontent.com/strophix-software/lumen-registry/main/public/r/[name].json`
- Direct GitHub Pages: `https://strophix-software.github.io/lumen-registry/r/[name].json`

---

## 📦 Catalog

### 🧩 UI Primitives (`registry:ui`)
| Primitive | Description | Dependencies |
| :--- | :--- | :--- |
| `button` | Accessible button with standard variants & sizes | `@radix-ui/react-slot`, `cva` |
| `input` | Modern input styled for Tailwind v4 | &mdash; |
| `label` | Accessible form control label | `@radix-ui/react-label`, `cva` |
| `card` | Flexible card with header, title, description, content, footer | &mdash; |
| `badge` | Status pills with success, warning, destructive variants | `cva` |
| `dialog` | Accessible modal dialog with backdrop & trigger | `@radix-ui/react-dialog`, `lucide-react` |
| `dropdown-menu` | Dropdown menu with submenus, checkboxes, radios | `@radix-ui/react-dropdown-menu`, `lucide-react` |
| `avatar` | User avatar with fallback initials | `@radix-ui/react-avatar` |
| `tabs` | Accessible layered tab panels | `@radix-ui/react-tabs` |
| `table` | Responsive modern data table | &mdash; |
| `separator` | Horizontal or vertical rule separator | `@radix-ui/react-separator` |
| `tooltip` | Hover and focus tooltip popup | `@radix-ui/react-tooltip` |
| `select` | Dropdown select picker | `@radix-ui/react-select`, `lucide-react` |
| `switch` | Toggle switch | `@radix-ui/react-switch` |
| `checkbox` | Checkbox with indicator | `@radix-ui/react-checkbox`, `lucide-react` |
| `textarea` | Textarea with focus rings | &mdash; |
| `popover` | Floating popover anchor & content | `@radix-ui/react-popover` |
| `skeleton` | Pulse loading skeleton placeholder | &mdash; |
| `sheet` | Slide-over drawer sheet | `@radix-ui/react-dialog`, `cva`, `lucide-react` |
| `alert` | Feedback banner with variants | `cva` |
| `scroll-area` | Cross-browser custom scroll container | `@radix-ui/react-scroll-area` |
| `breadcrumb` | Breadcrumb navigation hierarchy | `@radix-ui/react-slot`, `lucide-react` |

### 📐 Layout Blocks (`registry:block`)
| Layout | Description |
| :--- | :--- |
| `app-shell` | Full dashboard shell layout with collapsible sidebar, navigation groups, active states, top header, breadcrumbs, search trigger, notifications, and mobile sheet drawer. |
| `marketing-layout` | Universal marketing layout with sticky blurred header, brand logo, desktop and mobile responsive nav, announcement banner, and comprehensive multi-column footer. |
| `stacked-layout` | Enterprise console layout with top org/workspace switcher, primary tabs, search shortcut, notifications, subheader secondary tabs and actions. |
| `auth-split` | Split authentication screen with branded showcase/testimonial panel on left and form slot with terms on right. |
| `auth-card` | Centered clean authentication card layout with brand logo, social login buttons, separator, and footer link. |

### 🧱 Universal Application Blocks (`registry:block`)
| Block | Description |
| :--- | :--- |
| `stats-grid` | Responsive KPI metrics overview grid with trend badges (increase/decrease/neutral), icons, and descriptions. |
| `data-table-toolbar` | Universal data table control bar with search input, faceted filter popovers with count badges, column visibility toggle dropdown, and action buttons. |
| `empty-state` | Universal empty state placeholder with centered icon container, title, description, primary CTA button, and secondary link. |
| `command-menu` | Universal ⌘K search palette with keyboard navigation, grouped commands, shortcut badges, and modal dialog. |
| `confirm-dialog` | Universal confirmation modal for destructive or critical actions with optional type-to-confirm input and loading spinner. |
| `filter-bar` | Universal active filter chips toolbar with badges, individual remove buttons, total count, and clear-all action. |
| `page-header` | Universal page header with breadcrumbs trail, page title, status badge, description, and action button group. |
| `user-profile-menu` | Universal user avatar dropdown menu with profile details, settings, nested theme selector (light/dark/system), and logout. |
| `activity-feed` | Universal chronological activity timeline with actor avatars, event icons, action descriptions, timestamps, and detail panels. |

### 🪝 Hooks & Lib
| Item | Type | Description |
| :--- | :--- | :--- |
| `utils` | `registry:lib` | `cn()` utility combining `clsx` and `tailwind-merge` |
| `use-mobile` | `registry:hook` | Detect viewport width `< 768px` |
| `use-debounce` | `registry:hook` | Debounce fast state changes (search/inputs) |

---

## 🛠️ Development

```bash
# Build static registry files to public/r and registry.json
npm run build

# Validate all registry items, schemas, and dependencies
npm run validate
```

## 📜 License
MIT

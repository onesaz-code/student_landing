# @onesaz/ui — Component Reference

> **Import path:** `import { ComponentName } from '@onesaz/ui'`

All components are built with React `forwardRef`, ship full TypeScript types, and use Tailwind CSS with semantic CSS variables (`--accent`, `--muted`, `--border`, `--foreground`, `--background`, etc.).

---

## Table of Contents

1. [Accordion](#accordion)
2. [Alert](#alert)
3. [AlertDialog](#alertdialog)
4. [Avatar](#avatar)
5. [Backdrop](#backdrop)
6. [Badge](#badge)
7. [BottomNavigation](#bottomnavigation)
8. [Box](#box)
9. [Breadcrumbs](#breadcrumbs)
10. [Button](#button)
11. [Card](#card)
12. [Charts](#charts)
13. [Checkbox](#checkbox)
14. [Chip](#chip)
15. [Combobox](#combobox)
16. [DataList](#datalist)
17. [Dialog](#dialog)
18. [Drawer / Sheet](#drawer--sheet)
19. [DropdownMenu](#dropdownmenu)
20. [Form](#form)
21. [Grid](#grid)
22. [Input](#input)
23. [InputAdornment](#inputadornment)
24. [Label](#label)
25. [List](#list)
26. [Pagination](#pagination)
27. [Popover](#popover)
28. [Progress](#progress)
29. [Radio](#radio)
30. [RangeSlider](#rangeslider)
31. [Select](#select)
32. [Separator](#separator)
33. [Sidebar](#sidebar)
34. [Skeleton](#skeleton)
35. [Slider](#slider)
36. [Snackbar](#snackbar)
37. [Spinner](#spinner)
38. [Stack](#stack)
39. [Switch](#switch)
40. [Table](#table)
41. [Tabs](#tabs)
42. [TextField](#textfield)
43. [Textarea](#textarea)
44. [Tooltip](#tooltip)
45. [TopBar](#topbar)
46. [Typography](#typography)

---

## Accordion

Animated accordion built on Radix UI. Supports single and multiple open items.

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@onesaz/ui'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

**Exports:** `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`

The `AccordionTrigger` includes an animated chevron that rotates when the item is open. Inherits all Radix UI Accordion props (`type`, `defaultValue`, `value`, `onValueChange`, `collapsible`, etc.).

---

## Alert

Dismissible alert banners with icon, color variants, and optional close button.

```tsx
import { Alert, AlertTitle, AlertDescription } from '@onesaz/ui'

// Basic alert
<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes were saved.</AlertDescription>
</Alert>

// With close button
<Alert variant="error" onClose={() => setOpen(false)}>
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>

// Hide default icon
<Alert variant="warning" icon={null}>
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>No icon here.</AlertDescription>
</Alert>
```

**Exports:** `Alert`, `AlertTitle`, `AlertDescription`

### Alert Props


| Prop      | Type                                          | Default     | Description                                       |
| --------- | --------------------------------------------- | ----------- | ------------------------------------------------- |
| `variant` | `'default' | 'success' | 'warning' | 'error'` | `'default'` | Color/style variant                               |
| `onClose` | `() => void`                                  | —           | If provided, shows a close button                 |
| `icon`    | `React.ReactNode | null`                      | —           | Custom icon; pass `null` to hide the default icon |


---

## AlertDialog

Modal dialog for destructive confirmation actions. Built on Radix UI.

```tsx
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogFooter,
  AlertDialogTitle, AlertDialogDescription,
  AlertDialogAction, AlertDialogCancel
} from '@onesaz/ui'

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent variant="destructive" showIcon>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

**Exports:** `AlertDialog`, `AlertDialogTrigger`, `AlertDialogPortal`, `AlertDialogOverlay`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`

### AlertDialogContent Props


| Prop       | Type                                                         | Default     | Description            |
| ---------- | ------------------------------------------------------------ | ----------- | ---------------------- |
| `variant`  | `'default' | 'destructive' | 'success' | 'warning' | 'info'` | `'default'` | Visual variant         |
| `showIcon` | `boolean`                                                    | `false`     | Show a contextual icon |


---

## Avatar

User avatar with image, fallback text, sizes, shapes, and group stacking.

```tsx
import { Avatar, AvatarGroup } from '@onesaz/ui'

// Single avatar
<Avatar src="/photo.jpg" alt="Jane Doe" size="md" />

// Fallback text when no image
<Avatar fallback="JD" size="lg" />

// Square shape
<Avatar src="/photo.jpg" alt="Jane" shape="square" size="sm" />

// Bordered
<Avatar src="/photo.jpg" alt="Jane" bordered />

// Group with overflow count
<AvatarGroup max={3} size="sm">
  <Avatar src="/a.jpg" alt="A" />
  <Avatar src="/b.jpg" alt="B" />
  <Avatar src="/c.jpg" alt="C" />
  <Avatar src="/d.jpg" alt="D" />
</AvatarGroup>
```

**Exports:** `Avatar`, `AvatarGroup`

### Avatar Props


| Prop              | Type                                       | Default    | Description                              |
| ----------------- | ------------------------------------------ | ---------- | ---------------------------------------- |
| `src`             | `string`                                   | —          | Image source URL                         |
| `alt`             | `string`                                   | —          | Alt text for the image                   |
| `size`            | `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` | `'md'`     | Avatar size                              |
| `fallback`        | `string`                                   | —          | Initials/text shown when image is absent |
| `shape`           | `'circle' | 'square'`                      | `'circle'` | Shape of the avatar                      |
| `bordered`        | `boolean`                                  | `false`    | Adds a ring border                       |
| `fallbackElement` | `React.ReactNode`                          | —          | Custom element for fallback              |


### AvatarGroup Props


| Prop   | Type             | Default | Description                                   |
| ------ | ---------------- | ------- | --------------------------------------------- |
| `max`  | `number`         | —       | Maximum avatars before showing overflow count |
| `size` | `Avatar['size']` | `'md'`  | Size applied to all child avatars             |


---

## Backdrop

Full-screen overlay backdrop. Renders into a portal by default.

```tsx
import { Backdrop } from '@onesaz/ui'

<Backdrop open={loading} />
<Backdrop open={open} invisible transitionDuration={300} />
```

**Exports:** `Backdrop`

### Backdrop Props


| Prop                 | Type      | Default | Description                        |
| -------------------- | --------- | ------- | ---------------------------------- |
| `open`               | `boolean` | —       | Whether the backdrop is visible    |
| `invisible`          | `boolean` | `false` | Transparent backdrop (no dimming)  |
| `transitionDuration` | `number`  | `225`   | Fade transition duration in ms     |
| `keepMounted`        | `boolean` | `false` | Keep DOM node after close          |
| `disablePortal`      | `boolean` | `false` | Render inline instead of in portal |
| `disableScrollLock`  | `boolean` | `false` | Do not lock body scroll when open  |


---

## Badge

Small status badge with color and variant options.

```tsx
import { Badge } from '@onesaz/ui'

<Badge>Default</Badge>
<Badge color="success" variant="contained">Active</Badge>
<Badge color="error" variant="outlined">Error</Badge>
<Badge color="warning" variant="text">Pending</Badge>
```

**Exports:** `Badge`

### Badge Props


| Prop      | Type                                                          | Default       | Description  |
| --------- | ------------------------------------------------------------- | ------------- | ------------ |
| `color`   | `'default' | 'success' | 'warning' | 'error' | 'destructive'` | `'default'`   | Color scheme |
| `variant` | `'contained' | 'outlined' | 'text'`                           | `'contained'` | Visual style |


---

## BottomNavigation

Mobile-style bottom navigation bar.

```tsx
import { BottomNavigation, BottomNavigationAction } from '@onesaz/ui'
import { HomeIcon, SearchIcon, UserIcon } from 'lucide-react'

const [value, setValue] = React.useState('home')

<BottomNavigation value={value} onChange={(val) => setValue(val)} showLabels>
  <BottomNavigationAction label="Home" icon={<HomeIcon />} value="home" />
  <BottomNavigationAction label="Search" icon={<SearchIcon />} value="search" />
  <BottomNavigationAction label="Profile" icon={<UserIcon />} value="profile" />
</BottomNavigation>
```

**Exports:** `BottomNavigation`, `BottomNavigationAction`

### BottomNavigation Props


| Prop         | Type                      | Default | Description                             |
| ------------ | ------------------------- | ------- | --------------------------------------- |
| `value`      | `string`                  | —       | Currently active item value             |
| `onChange`   | `(value: string) => void` | —       | Callback when item is selected          |
| `showLabels` | `boolean`                 | `false` | Always show labels (not just on active) |


### BottomNavigationAction Props


| Prop        | Type              | Default | Description                  |
| ----------- | ----------------- | ------- | ---------------------------- |
| `label`     | `string`          | —       | Label text                   |
| `icon`      | `React.ReactNode` | —       | Icon element                 |
| `value`     | `string`          | —       | Value used for selection     |
| `showLabel` | `boolean`         | —       | Override parent `showLabels` |


---

## Box

Low-level layout primitive with inline style props mapped to Tailwind classes.

```tsx
import { Box } from '@onesaz/ui'

<Box display="flex" alignItems="center" gap={4} p={6} rounded="lg" bg="muted">
  <Box as="span" color="primary">Icon</Box>
  <Box flexDirection="column">Content</Box>
</Box>
```

**Exports:** `Box`

### Box Props


| Prop             | Type                                                              | Description                                    |
| ---------------- | ----------------------------------------------------------------- | ---------------------------------------------- |
| `as`             | `React.ElementType`                                               | Render as a different element (default: `div`) |
| `display`        | `'block' | 'flex' | 'inline' | 'inline-flex' | 'grid' | 'hidden'` | Display property                               |
| `flexDirection`  | `'row' | 'col' | 'row-reverse' | 'col-reverse'`                   | Flex direction                                 |
| `alignItems`     | `'start' | 'center' | 'end' | 'stretch' | 'baseline'`             | Align items                                    |
| `justifyContent` | `'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'`    | Justify content                                |
| `flexWrap`       | `'nowrap' | 'wrap' | 'wrap-reverse'`                              | Flex wrap                                      |
| `gap`            | `0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16`                    | Gap between children                           |
| `p`              | `0–16`                                                            | Padding (all sides)                            |
| `px`             | `0–16`                                                            | Padding horizontal                             |
| `py`             | `0–16`                                                            | Padding vertical                               |
| `m`              | `0–16`                                                            | Margin (all sides)                             |
| `mx`             | `0–16`                                                            | Margin horizontal                              |
| `my`             | `0–16`                                                            | Margin vertical                                |
| `rounded`        | `'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'`                     | Border radius                                  |
| `shadow`         | `'none' | 'sm' | 'md' | 'lg' | 'xl'`                              | Box shadow                                     |
| `bg`             | `string`                                                          | Background color (Tailwind utility suffix)     |
| `color`          | `string`                                                          | Text color (Tailwind utility suffix)           |
| `border`         | `boolean`                                                         | Show border                                    |
| `borderColor`    | `string`                                                          | Border color                                   |
| `w`              | `string`                                                          | Width                                          |
| `h`              | `string`                                                          | Height                                         |
| `position`       | `'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'`         | Position                                       |
| `overflow`       | `'auto' | 'hidden' | 'visible' | 'scroll'`                        | Overflow                                       |


---

## Breadcrumbs

Breadcrumb navigation with collapse support.

```tsx
import {
  Breadcrumbs, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis
} from '@onesaz/ui'

<Breadcrumbs maxItems={4} itemsBeforeCollapse={1} itemsAfterCollapse={2}>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem href="/products/category">Category</BreadcrumbItem>
  <BreadcrumbItem current>Current Page</BreadcrumbItem>
</Breadcrumbs>
```

**Exports:** `Breadcrumbs`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`, `BreadcrumbPage`

### Breadcrumbs Props


| Prop                  | Type              | Default | Description                       |
| --------------------- | ----------------- | ------- | --------------------------------- |
| `separator`           | `React.ReactNode` | `/`     | Custom separator element          |
| `maxItems`            | `number`          | —       | Max breadcrumbs before collapsing |
| `itemsBeforeCollapse` | `number`          | `1`     | Items to show before ellipsis     |
| `itemsAfterCollapse`  | `number`          | `2`     | Items to show after ellipsis      |


### BreadcrumbItem Props


| Prop      | Type         | Description                        |
| --------- | ------------ | ---------------------------------- |
| `current` | `boolean`    | Marks as the current (active) page |
| `href`    | `string`     | Link href                          |
| `onClick` | `() => void` | Click handler                      |


---

## Button

Versatile button with variants, colors, sizes, loading state, icons, and group support.

```tsx
import { Button, IconButton, ButtonGroup } from '@onesaz/ui'
import { PlusIcon, TrashIcon } from 'lucide-react'

// Basic variants
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>

// Color override
<Button color="success">Save</Button>
<Button variant="outline" color="error">Delete</Button>
<Button variant="secondary" color="warning">Warning</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><PlusIcon /></Button>

// Icons
<Button startIcon={<PlusIcon />}>Add Item</Button>
<Button endIcon={<TrashIcon />}>Remove</Button>

// Loading
<Button loading>Saving...</Button>

// Full width
<Button fullWidth>Submit</Button>

// Icon button (circular, accessible)
<IconButton aria-label="Add item" size="md">
  <PlusIcon />
</IconButton>
<IconButton aria-label="Delete" size="sm" rounded color="error">
  <TrashIcon />
</IconButton>

// Button group
<ButtonGroup variant="outline" orientation="horizontal">
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>
```

**Exports:** `Button`, `IconButton`, `ButtonGroup`

### Button Props


| Prop        | Type                                                                     | Default     | Description                     |
| ----------- | ------------------------------------------------------------------------ | ----------- | ------------------------------- |
| `variant`   | `'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'` | `'default'` | Visual variant                  |
| `size`      | `'default' | 'sm' | 'lg' | 'icon'`                                       | `'default'` | Button size                     |
| `color`     | `'default' | 'success' | 'warning' | 'error' | 'destructive'`            | `'default'` | Color override                  |
| `fullWidth` | `boolean`                                                                | `false`     | Take full container width       |
| `loading`   | `boolean`                                                                | `false`     | Show spinner and disable button |
| `startIcon` | `React.ReactNode`                                                        | —           | Icon before label               |
| `endIcon`   | `React.ReactNode`                                                        | —           | Icon after label                |
| `disabled`  | `boolean`                                                                | —           | Disable the button              |


### IconButton Props


| Prop         | Type                        | Default      | Description         |
| ------------ | --------------------------- | ------------ | ------------------- |
| `size`       | `'xs' | 'sm' | 'md' | 'lg'` | `'md'`       | Icon button size    |
| `rounded`    | `boolean`                   | `false`      | Circular shape      |
| `aria-label` | `string`                    | **required** | Accessibility label |
| `variant`    | same as Button              | `'ghost'`    | Visual variant      |
| `color`      | same as Button              | `'default'`  | Color override      |
| `loading`    | `boolean`                   | `false`      | Show spinner        |


### ButtonGroup Props


| Prop          | Type                        | Default        | Description                  |
| ------------- | --------------------------- | -------------- | ---------------------------- |
| `variant`     | Button variant              | —              | Applied to all child buttons |
| `size`        | Button size                 | —              | Applied to all child buttons |
| `color`       | Button color                | —              | Applied to all child buttons |
| `orientation` | `'horizontal' | 'vertical'` | `'horizontal'` | Layout direction             |
| `disabled`    | `boolean`                   | —              | Disable all child buttons    |
| `fullWidth`   | `boolean`                   | `false`        | Stretch to fill container    |


---

## Card

Content container with optional header, footer, title, and description.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@onesaz/ui'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content area</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Exports:** `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`

All sub-components are standard `div` elements with `className` and `ref` support. No additional props beyond standard HTML div attributes.

---

## Charts

Data visualization components built on Recharts. All charts use theme-aware colors.

```tsx
import {
  BarChart, LineChart, PieChart, AreaChart,
  ScatterChart, RadarChart, DonutChart,
  ProgressCard, ProgressDonut, MultiProgressDonut
} from '@onesaz/ui'
```

### BarChart

```tsx
// Simple bar chart
<BarChart
  data={[{ name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }]}
  dataKey="value"
  height={300}
  showGrid
  showTooltip
  showLegend
/>

// Grouped bar chart
<BarChart
  data={data}
  dataKeys={['revenue', 'profit']}
  colors={['#6366f1', '#22c55e']}
  height={300}
/>
```

#### BarChart Props


| Prop          | Type              | Default  | Description                    |
| ------------- | ----------------- | -------- | ------------------------------ |
| `data`        | `object[]`        | —        | Chart data array               |
| `dataKey`     | `string`          | —        | Single bar data key            |
| `dataKeys`    | `string[]`        | —        | Multiple bars (grouped)        |
| `fill`        | `string`          | —        | Bar fill color                 |
| `name`        | `string`          | —        | Series name for legend/tooltip |
| `width`       | `number | string` | `'100%'` | Chart width                    |
| `height`      | `number`          | `300`    | Chart height                   |
| `margin`      | `object`          | —        | Chart margins                  |
| `showGrid`    | `boolean`         | `false`  | Show grid lines                |
| `showTooltip` | `boolean`         | `true`   | Show tooltip on hover          |
| `showLegend`  | `boolean`         | `false`  | Show legend                    |
| `xAxis`       | `object`          | —        | X-axis configuration           |
| `yAxis`       | `object`          | —        | Y-axis configuration           |
| `barProps`    | `object`          | —        | Additional props passed to Bar |
| `labelList`   | `boolean`         | `false`  | Show value labels on bars      |
| `colors`      | `string[]`        | —        | Colors for multi-bar chart     |
| `tooltip`     | `React.ReactNode` | —        | Custom tooltip component       |
| `className`   | `string`          | —        | Additional CSS classes         |


### LineChart

```tsx
<LineChart
  data={[{ month: 'Jan', sales: 400 }, { month: 'Feb', sales: 300 }]}
  dataKey="sales"
  xDataKey="month"
  height={300}
  showGrid
  showTooltip
  smooth
/>
```

#### LineChart Props

Similar to BarChart with additional:


| Prop       | Type       | Default  | Description              |
| ---------- | ---------- | -------- | ------------------------ |
| `dataKey`  | `string`   | —        | Single line data key     |
| `dataKeys` | `string[]` | —        | Multiple lines           |
| `xDataKey` | `string`   | `'name'` | X-axis data key          |
| `smooth`   | `boolean`  | `false`  | Curved/smooth line       |
| `dot`      | `boolean`  | `false`  | Show dots on data points |


### AreaChart

```tsx
<AreaChart
  data={data}
  dataKey="value"
  height={300}
  showGrid
  gradient
/>
```

#### AreaChart Props

Same as LineChart with additional:


| Prop       | Type      | Default | Description                   |
| ---------- | --------- | ------- | ----------------------------- |
| `gradient` | `boolean` | `true`  | Fill area with gradient       |
| `stackId`  | `string`  | —       | Stack areas with same stackId |


### PieChart

```tsx
<PieChart
  data={[
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
  ]}
  height={300}
  showTooltip
  showLegend
/>
```

#### PieChart Props


| Prop          | Type                                     | Default  | Description               |
| ------------- | ---------------------------------------- | -------- | ------------------------- |
| `data`        | `Array<{ name: string; value: number }>` | —        | Pie segments              |
| `width`       | `number | string`                        | `'100%'` | Chart width               |
| `height`      | `number`                                 | `300`    | Chart height              |
| `innerRadius` | `number`                                 | `0`      | Inner radius (>0 = donut) |
| `outerRadius` | `number`                                 | `80`     | Outer radius              |
| `showTooltip` | `boolean`                                | `true`   | Show tooltip              |
| `showLegend`  | `boolean`                                | `false`  | Show legend               |
| `colors`      | `string[]`                               | —        | Custom segment colors     |


### DonutChart

```tsx
<DonutChart
  data={[{ name: 'Used', value: 70 }, { name: 'Free', value: 30 }]}
  height={300}
  showTooltip
  showLegend
  advancedStyling={{ enableGradients: true, enableShadows: true }}
/>
```

DonutChart is a PieChart with `innerRadius > 0` and supports:


| Prop              | Type                                                     | Description             |
| ----------------- | -------------------------------------------------------- | ----------------------- |
| `advancedStyling` | `{ enableGradients?: boolean; enableShadows?: boolean }` | Gradient/shadow effects |


### ScatterChart / RadarChart

```tsx
<ScatterChart data={data} height={300} />
<RadarChart data={data} dataKeys={['score']} height={300} />
```

### ProgressCard

Compact card showing a question number and percentage with a mini donut chart.

```tsx
<ProgressCard
  questionNum={5}
  percentage={72}
  onClick={(num) => console.log(num)}
  donutSize={60}
  strokeWidth={4}
  enableGradients
  enableShadows
  backgroundColor="#E0E4E8"
  getColor={(pct) => pct <= 50 ? ['#22c55e', '#16a34a'] : ['#ef4444', '#dc2626']}
  typography={{ questionFontSize: 'text-lg', questionColor: 'text-foreground', percentageFontSize: 'text-sm' }}
/>
```

#### ProgressCard Props


| Prop              | Type                                                      | Default     | Description                      |
| ----------------- | --------------------------------------------------------- | ----------- | -------------------------------- |
| `questionNum`     | `number`                                                  | —           | Question/item number displayed   |
| `percentage`      | `number`                                                  | —           | Percentage value (0–100)         |
| `onClick`         | `(num: number) => void`                                   | —           | Click handler                    |
| `donutSize`       | `number`                                                  | —           | Size of the donut SVG            |
| `strokeWidth`     | `number`                                                  | —           | Stroke width of the donut arc    |
| `backgroundColor` | `string`                                                  | `'#E0E4E8'` | Background circle color          |
| `getColor`        | `(pct: number) => [string, string]`                       | —           | Returns `[startColor, endColor]` |
| `enableShadows`   | `boolean`                                                 | —           | Enable shadow filter             |
| `enableGradients` | `boolean`                                                 | —           | Enable gradient fill             |
| `typography`      | `{ questionFontSize, questionColor, percentageFontSize }` | —           | Typography overrides             |


### ProgressDonut

Single donut chart with multiple colored segments (one per data item).

```tsx
<ProgressDonut
  data={[
    { value: 75, label: 'Math' },
    { value: 45, label: 'Science' },
  ]}
  width={300}
  height={300}
  innerRadius={60}
  outerRadius={80}
  showTooltip
  showLegend
  getColor={(value) => value <= 30 ? '#22c55e' : value <= 50 ? '#3b82f6' : '#ef4444'}
/>
```

#### ProgressDonut Props


| Prop          | Type                                       | Default | Description              |
| ------------- | ------------------------------------------ | ------- | ------------------------ |
| `data`        | `Array<{ value: number; label?: string }>` | `[]`    | Data segments            |
| `width`       | `number | string`                          | `300`   | Chart width              |
| `height`      | `number | string`                          | `300`   | Chart height             |
| `innerRadius` | `number`                                   | `60`    | Inner radius             |
| `outerRadius` | `number`                                   | `80`    | Outer radius             |
| `showTooltip` | `boolean`                                  | `true`  | Show tooltip             |
| `showLegend`  | `boolean`                                  | `false` | Show legend              |
| `getColor`    | `(value: number) => string`                | —       | Custom color per segment |


### MultiProgressDonut

Array of individual donut charts, one per data item, laid out in a flex row.

```tsx
<MultiProgressDonut
  data={[
    { value: 30, label: 'Q1' },
    { value: 55, label: 'Q2' },
    { value: 80, label: 'Q3' },
  ]}
  size={80}
  showPercentage
  enableGradients
  enableShadows
/>
```

#### MultiProgressDonut Props


| Prop                    | Type                                       | Default     | Description                      |
| ----------------------- | ------------------------------------------ | ----------- | -------------------------------- |
| `data`                  | `Array<{ value: number; label?: string }>` | `[]`        | Items to render                  |
| `size`                  | `number`                                   | `80`        | Size of each donut SVG           |
| `outerRadius`           | `number`                                   | `35`        | Outer radius of each donut       |
| `strokeWidth`           | `number`                                   | `8`         | Progress arc stroke width        |
| `backgroundColor`       | `string`                                   | `'#E0E4E8'` | Background circle color          |
| `backgroundStrokeWidth` | `number`                                   | `8`         | Background circle stroke width   |
| `showPercentage`        | `boolean`                                  | `true`      | Show percentage text in center   |
| `getColor`              | `(value: number) => [string, string]`      | —           | Returns `[startColor, endColor]` |
| `enableShadows`         | `boolean`                                  | `true`      | Enable shadow filters            |
| `enableGradients`       | `boolean`                                  | `true`      | Enable gradient fills            |


---

## Checkbox

Native HTML checkbox with indeterminate state support.

```tsx
import { Checkbox } from '@onesaz/ui'

<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
<Checkbox indeterminate />
<Checkbox disabled />
```

**Exports:** `Checkbox`

### Checkbox Props

Extends all `React.InputHTMLAttributes<HTMLInputElement>` with:


| Prop            | Type      | Default | Description                          |
| --------------- | --------- | ------- | ------------------------------------ |
| `indeterminate` | `boolean` | `false` | Shows the indeterminate (dash) state |


---

## Chip

Compact element representing an entity, attribute, or action.

```tsx
import { Chip } from '@onesaz/ui'
import { StarIcon } from 'lucide-react'

// Basic
<Chip label="Active" />
<Chip label="Success" color="success" />
<Chip label="Error" color="error" variant="outlined" />

// With icon
<Chip label="Featured" icon={<StarIcon />} color="warning" />

// With avatar
<Chip label="Jane Doe" avatar={<img src="/avatar.jpg" alt="Jane" />} />

// Deletable
<Chip label="Removable" onDelete={() => console.log('deleted')} />

// Clickable
<Chip label="Clickable" clickable onClick={() => alert('clicked')} />

// Sizes
<Chip label="Small" size="small" />
<Chip label="Medium" size="medium" />

// Disabled
<Chip label="Disabled" disabled />

// As link
<Chip label="Link Chip" href="/path" />
```

**Exports:** `Chip`

### Chip Props


| Prop         | Type                                                          | Default     | Description                                                  |
| ------------ | ------------------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `label`      | `string`                                                      | —           | Text label (also accepts `children`)                         |
| `variant`    | `'filled' | 'outlined'`                                       | `'filled'`  | Visual style                                                 |
| `color`      | `'default' | 'success' | 'warning' | 'error' | 'destructive'` | `'default'` | Color scheme                                                 |
| `size`       | `'small' | 'medium'`                                          | `'medium'`  | Size                                                         |
| `icon`       | `React.ReactNode`                                             | —           | Icon before label (not shown if `avatar` present)            |
| `avatar`     | `React.ReactNode`                                             | —           | Avatar element before label                                  |
| `onDelete`   | `(event: React.SyntheticEvent) => void`                       | —           | Shows delete button; called on click or Delete/Backspace key |
| `deleteIcon` | `React.ReactNode`                                             | —           | Custom delete icon                                           |
| `clickable`  | `boolean`                                                     | `false`     | Adds button role and cursor                                  |
| `disabled`   | `boolean`                                                     | `false`     | Disables all interactions                                    |
| `href`       | `string`                                                      | —           | Renders as `<a>` link                                        |
| `component`  | `React.ElementType`                                           | —           | Override root element                                        |


---

## Combobox

Searchable select with single and multi-select modes. Supports virtualization for large option lists.

```tsx
import { Combobox } from '@onesaz/ui'

// Single select
<Combobox
  options={[
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Select fruit..."
  clearable
/>

// Multi select
<Combobox
  multiple
  options={options}
  value={selectedValues}
  onChange={setSelectedValues}
  placeholder="Select items..."
  selectAll
  selectAllLabel="Select All"
  maxDisplayItems={3}
/>

// Custom keys
<Combobox
  options={users}
  labelKey="name"
  valueKey="id"
  value={userId}
  onChange={setUserId}
/>

// With adornments
<Combobox
  options={options}
  startAdornment={<SearchIcon />}
  onStartAdornmentClick={() => {}}
  value={value}
  onChange={setValue}
/>

// Virtualized (for large lists)
<Combobox
  options={largeList}
  value={value}
  onChange={setValue}
  virtual
  virtualItemHeight={36}
/>
```

**Exports:** `Combobox`, `ComboboxOption`, `ComboboxSingleProps`, `ComboboxMultipleProps`, `ComboboxProps`

### Shared Combobox Props


| Prop                    | Type                      | Default   | Description                                          |
| ----------------------- | ------------------------- | --------- | ---------------------------------------------------- |
| `options`               | `ComboboxOption[]`        | —         | Array of `{ label, value }` objects (or custom keys) |
| `placeholder`           | `string`                  | —         | Trigger placeholder text                             |
| `searchPlaceholder`     | `string`                  | —         | Search input placeholder                             |
| `emptyMessage`          | `string`                  | —         | Text shown when no options match                     |
| `disabled`              | `boolean`                 | `false`   | Disable the combobox                                 |
| `clearable`             | `boolean`                 | `false`   | Show clear button                                    |
| `openOnFocus`           | `boolean`                 | `false`   | Open dropdown on focus                               |
| `inputValue`            | `string`                  | —         | Controlled search input value                        |
| `onInputChange`         | `(value: string) => void` | —         | Search input change handler                          |
| `labelKey`              | `string`                  | `'label'` | Key for option label                                 |
| `valueKey`              | `string`                  | `'value'` | Key for option value                                 |
| `startAdornment`        | `React.ReactNode`         | —         | Element at start of trigger                          |
| `onStartAdornmentClick` | `() => void`              | —         | Click handler for start adornment                    |
| `endAdornment`          | `React.ReactNode`         | —         | Element at end of trigger                            |
| `onEndAdornmentClick`   | `() => void`              | —         | Click handler for end adornment                      |
| `virtual`               | `boolean`                 | `false`   | Enable virtual scrolling                             |
| `virtualItemHeight`     | `number`                  | `36`      | Height of each virtual item in px                    |


### Single Mode Props (`multiple?: false`)


| Prop           | Type                             | Description                |
| -------------- | -------------------------------- | -------------------------- |
| `value`        | `string | null`                  | Selected value             |
| `defaultValue` | `string`                         | Uncontrolled default value |
| `onChange`     | `(value: string | null) => void` | Change handler             |


### Multiple Mode Props (`multiple: true`)


| Prop              | Type                        | Default        | Description                            |
| ----------------- | --------------------------- | -------------- | -------------------------------------- |
| `value`           | `string[]`                  | —              | Selected values array                  |
| `defaultValue`    | `string[]`                  | —              | Uncontrolled default                   |
| `onChange`        | `(value: string[]) => void` | —              | Change handler                         |
| `selectAll`       | `boolean`                   | `false`        | Show "Select All" option               |
| `selectAllLabel`  | `string`                    | `'Select All'` | Label for "Select All" option          |
| `maxDisplayItems` | `number`                    | —              | Max chips shown in trigger before "+N" |


---

## DataList

Structured key-value data display, horizontal or vertical.

```tsx


```

**Exports:** `DataList`, `DataListItem`, `DataListLabel`, `DataListValue`

### DataList Props


| Prop          | Type                        | Default      | Description             |
| ------------- | --------------------------- | ------------ | ----------------------- |
| `orientation` | `'horizontal' | 'vertical'` | `'vertical'` | Layout orientation      |
| `size`        | `'1' | '2' | '3'`           | `'2'`        | Spacing/font size scale |


### DataListItem Props


| Prop    | Type                                                  | Default | Description        |
| ------- | ----------------------------------------------------- | ------- | ------------------ |
| `align` | `'start' | 'center' | 'end' | 'baseline' | 'stretch'` | —       | Vertical alignment |


### DataListLabel Props


| Prop           | Type                                                                         | Default     | Description        |
| -------------- | ---------------------------------------------------------------------------- | ----------- | ------------------ |
| `width`        | `string | number`                                                            | —           | Fixed width        |
| `minWidth`     | `string | number`                                                            | —           | Minimum width      |
| `maxWidth`     | `string | number`                                                            | —           | Maximum width      |
| `color`        | `'default' | 'muted' | 'primary' | 'success' | 'warning' | 'error' | 'info'` | `'default'` | Label color        |
| `highContrast` | `boolean`                                                                    | `false`     | High contrast text |


---

## Dialog

Modal dialog built on Radix UI.

```tsx
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogFooter,
  DialogTitle, DialogDescription, DialogClose
} from '@onesaz/ui'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent size="md">
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description text.</DialogDescription>
    </DialogHeader>
    <p>Dialog body content goes here.</p>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Exports:** `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogClose`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`

### DialogContent Props


| Prop              | Type                                         | Default | Description                     |
| ----------------- | -------------------------------------------- | ------- | ------------------------------- |
| `size`            | `'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'` | `'lg'`  | Dialog width                    |
| `hideCloseButton` | `boolean`                                    | `false` | Hide the default X close button |


---

## Drawer / Sheet

Slide-out panel from any edge. Also exported as `Sheet` (same API, different name).

```tsx
import {
  Drawer, DrawerTrigger, DrawerContent,
  DrawerHeader, DrawerTitle, DrawerDescription,
  DrawerBody, DrawerFooter, DrawerClose
} from '@onesaz/ui'

<Drawer>
  <DrawerTrigger asChild>
    <Button>Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
      <DrawerDescription>Manage your preferences.</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>
      <p>Drawer content</p>
    </DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Close</Button>
      </DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

**Drawer Exports:** `Drawer`, `DrawerTrigger`, `DrawerClose`, `DrawerPortal`, `DrawerOverlay`, `DrawerContent`, `DrawerHeader`, `DrawerTitle`, `DrawerDescription`, `DrawerBody`, `DrawerFooter`

**Sheet Exports (aliases):** `Sheet`, `SheetTrigger`, `SheetClose`, `SheetPortal`, `SheetOverlay`, `SheetContent`, `SheetHeader`, `SheetTitle`, `SheetDescription`, `SheetBody`, `SheetFooter`

### DrawerContent Props


| Prop        | Type                                  | Default   | Description                       |
| ----------- | ------------------------------------- | --------- | --------------------------------- |
| `side`      | `'left' | 'right' | 'top' | 'bottom'` | `'right'` | Edge from which the drawer slides |
| `showClose` | `boolean`                             | `true`    | Show the X close button           |


---

## DropdownMenu

Context menu / dropdown built on Radix UI.

```tsx
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
  DropdownMenuShortcut, DropdownMenuGroup
} from '@onesaz/ui'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      Profile
      <DropdownMenuShortcut>Cmd+P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
      Show toolbar
    </DropdownMenuCheckboxItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Sub item</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
      <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

**Exports:** `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuRadioGroup`

### Components with custom extra props


| Component                | Extra Prop | Type      | Description                                     |
| ------------------------ | ---------- | --------- | ----------------------------------------------- |
| `DropdownMenuItem`       | `inset`    | `boolean` | Adds left padding for text alignment with icons |
| `DropdownMenuSubTrigger` | `inset`    | `boolean` | Same as above                                   |
| `DropdownMenuLabel`      | `inset`    | `boolean` | Same as above                                   |


---

## Form

Form control primitives for building accessible forms.

```tsx
import { FormControl, FormLabel, FormHelperText, FormGroup, useFormControl } from '@onesaz/ui'

// Vertical layout (default)
<FormControl error={hasError} required fullWidth>
  <FormLabel>Email</FormLabel>
  <Input type="email" />
  <FormHelperText>{hasError ? 'Invalid email' : 'Enter your email'}</FormHelperText>
</FormControl>

// Horizontal layout
<FormControl orientation="horizontal" margin="normal">
  <FormLabel>Active</FormLabel>
  <Switch />
</FormControl>

// Grouping checkboxes
<FormGroup row>
  <FormControl>
    <Checkbox /> <FormLabel>Option A</FormLabel>
  </FormControl>
  <FormControl>
    <Checkbox /> <FormLabel>Option B</FormLabel>
  </FormControl>
</FormGroup>
```

**Exports:** `FormControl`, `FormLabel`, `FormHelperText`, `FormGroup`, `useFormControl`

### FormControl Props


| Prop          | Type                          | Default      | Description                             |
| ------------- | ----------------------------- | ------------ | --------------------------------------- |
| `error`       | `boolean`                     | —            | Error state (propagated via context)    |
| `disabled`    | `boolean`                     | —            | Disabled state (propagated via context) |
| `required`    | `boolean`                     | —            | Required state (propagated via context) |
| `fullWidth`   | `boolean`                     | `false`      | Full width layout                       |
| `margin`      | `'none' | 'dense' | 'normal'` | `'none'`     | Vertical margin                         |
| `orientation` | `'vertical' | 'horizontal'`   | `'vertical'` | Layout direction                        |


### FormLabel Props


| Prop       | Type      | Description                                   |
| ---------- | --------- | --------------------------------------------- |
| `error`    | `boolean` | Error state (auto-inherited from FormControl) |
| `disabled` | `boolean` | Disabled state (auto-inherited)               |
| `required` | `boolean` | Required indicator (auto-inherited)           |


### FormHelperText Props


| Prop       | Type      | Description                                   |
| ---------- | --------- | --------------------------------------------- |
| `error`    | `boolean` | Error state (auto-inherited from FormControl) |
| `disabled` | `boolean` | Disabled state (auto-inherited)               |


### FormGroup Props


| Prop  | Type      | Default | Description             |
| ----- | --------- | ------- | ----------------------- |
| `row` | `boolean` | `false` | Horizontal (row) layout |


---

## Grid

CSS Grid layout utility.

```tsx
import { Grid } from '@onesaz/ui'

// Container
<Grid container spacing={4} columns={12}>
  <Grid item xs={12} md={6} lg={4}>
    <Card>...</Card>
  </Grid>
  <Grid item xs={12} md={6} lg={4}>
    <Card>...</Card>
  </Grid>
</Grid>
```

**Exports:** `Grid`

### Grid Props


| Prop             | Type                         | Default | Description               |
| ---------------- | ---------------------------- | ------- | ------------------------- |
| `container`      | `boolean`                    | `false` | Marks as grid container   |
| `item`           | `boolean`                    | `false` | Marks as grid item        |
| `xs`             | `1–12`                       | —       | Columns on xs breakpoint  |
| `sm`             | `1–12`                       | —       | Columns on sm breakpoint  |
| `md`             | `1–12`                       | —       | Columns on md breakpoint  |
| `lg`             | `1–12`                       | —       | Columns on lg breakpoint  |
| `xl`             | `1–12`                       | —       | Columns on xl breakpoint  |
| `xxl`            | `1–12`                       | —       | Columns on 2xl breakpoint |
| `spacing`        | `number`                     | —       | Gap between items         |
| `rowSpacing`     | `number`                     | —       | Row gap                   |
| `columnSpacing`  | `number`                     | —       | Column gap                |
| `columns`        | `1 | 2 | 3 | 4 | 5 | 6 | 12` | `12`    | Total grid columns        |
| `alignItems`     | `string`                     | —       | Align items               |
| `justifyItems`   | `string`                     | —       | Justify items             |
| `justifyContent` | `string`                     | —       | Justify content           |


---

## Input

Styled text input with adornment support.

```tsx
import { Input } from '@onesaz/ui'
import { SearchIcon } from 'lucide-react'

<Input placeholder="Search..." />
<Input inputSize="sm" placeholder="Small input" />
<Input inputSize="lg" placeholder="Large input" />
<Input error placeholder="Error state" />
<Input
  startAdornment={<SearchIcon className="h-4 w-4 text-muted-foreground" />}
  placeholder="Search..."
/>
<Input
  endAdornment={<span className="text-sm text-muted-foreground">USD</span>}
  placeholder="Amount"
/>
```

**Exports:** `Input`

### Input Props

Extends all `React.InputHTMLAttributes<HTMLInputElement>` with:


| Prop                 | Type                 | Default | Description                      |
| -------------------- | -------------------- | ------- | -------------------------------- |
| `inputSize`          | `'sm' | 'md' | 'lg'` | `'md'`  | Input height/padding size        |
| `error`              | `boolean`            | `false` | Error state styling              |
| `startAdornment`     | `React.ReactNode`    | —       | Element at the start             |
| `endAdornment`       | `React.ReactNode`    | —       | Element at the end               |
| `containerClassName` | `string`             | —       | Class applied to the wrapper div |


> Note: Use `inputSize` (not `size`) to control the input dimensions. The native `size` HTML attribute still works for character width.

---

## InputAdornment

Decorative element for use inside an Input.

```tsx
import { InputAdornment, Input } from '@onesaz/ui'

<Input
  startAdornment={
    <InputAdornment position="start">$</InputAdornment>
  }
  endAdornment={
    <InputAdornment position="end" disablePointerEvents>
      USD
    </InputAdornment>
  }
/>
```

**Exports:** `InputAdornment`

### InputAdornment Props


| Prop                   | Type              | Default | Description                       |
| ---------------------- | ----------------- | ------- | --------------------------------- |
| `position`             | `'start' | 'end'` | —       | Position in input                 |
| `disablePointerEvents` | `boolean`         | `false` | Disable mouse events on adornment |


---

## Label

Accessible form label.

```tsx
import { Label } from '@onesaz/ui'

<Label htmlFor="email">Email address</Label>
<input id="email" type="email" />
```

**Exports:** `Label`

Standard HTML `<label>` element with styling. Accepts all `React.LabelHTMLAttributes<HTMLLabelElement>`.

---

## List

Flexible list component with support for dense mode, dividers, selection, and leading/trailing content.

```tsx
import { List, ListItem, ListItemButton } from '@onesaz/ui'
import { FolderIcon, ChevronRightIcon } from 'lucide-react'

// Basic list
<List>
  <ListItem>Simple item</ListItem>
  <ListItem>Another item</ListItem>
</List>

// With icons and actions
<List dividers dense>
  <ListItem
    leading={<FolderIcon className="h-5 w-5" />}
    trailing={<ChevronRightIcon className="h-4 w-4" />}
    clickable
    onClick={() => navigate('/folder')}
  >
    Documents
  </ListItem>
</List>

// Interactive list items
<List>
  <ListItemButton selected onClick={handleClick} autoFocus>
    Selected Item
  </ListItemButton>
  <ListItemButton onClick={handleClick}>
    Normal Item
  </ListItemButton>
</List>
```

**Exports:** `List`, `ListItem`, `ListItemButton`

### List Props


| Prop             | Type      | Default | Description                     |
| ---------------- | --------- | ------- | ------------------------------- |
| `dividers`       | `boolean` | `false` | Show dividers between items     |
| `dense`          | `boolean` | `false` | Reduced padding                 |
| `clickable`      | `boolean` | `false` | Apply hover styles to all items |
| `disablePadding` | `boolean` | `false` | Remove list padding             |


### ListItem Props


| Prop              | Type                 | Default    | Description                            |
| ----------------- | -------------------- | ---------- | -------------------------------------- |
| `selected`        | `boolean`            | `false`    | Highlight as selected                  |
| `disabled`        | `boolean`            | `false`    | Disable interactions                   |
| `clickable`       | `boolean`            | `false`    | Apply hover/cursor styles              |
| `leading`         | `React.ReactNode`    | —          | Content at the start (icon, avatar)    |
| `trailing`        | `React.ReactNode`    | —          | Content at the end (icon, badge)       |
| `secondaryAction` | `React.ReactNode`    | —          | Absolute-positioned action at end      |
| `inset`           | `boolean`            | `false`    | Indent to align with icon items        |
| `disableGutters`  | `boolean`            | `false`    | Remove horizontal padding              |
| `alignItems`      | `'start' | 'center'` | `'center'` | Vertical alignment of leading/trailing |


### ListItemButton Props


| Prop             | Type                 | Default    | Description               |
| ---------------- | -------------------- | ---------- | ------------------------- |
| `selected`       | `boolean`            | `false`    | Highlight as selected     |
| `dense`          | `boolean`            | `false`    | Reduced padding           |
| `disableGutters` | `boolean`            | `false`    | Remove horizontal padding |
| `divider`        | `boolean`            | `false`    | Add bottom border         |
| `alignItems`     | `'start' | 'center'` | `'center'` | Vertical alignment        |
| `autoFocus`      | `boolean`            | `false`    | Auto-focus on mount       |


---

## Pagination

Pagination controls with compound component pattern.

```tsx
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis
} from '@onesaz/ui'

// Named exports
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>

// Compound namespace
<Pagination>
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.Previous href="#" />
    </Pagination.Item>
  </Pagination.Content>
</Pagination>
```

**Exports:** `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`

`PaginationLink` accepts an `isActive` prop to apply active styling.

---

## Popover

Floating content panel built on Radix UI.

```tsx
import { Popover, PopoverTrigger, PopoverContent } from '@onesaz/ui'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Popover content here.</p>
  </PopoverContent>
</Popover>
```

**Exports:** `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`

`PopoverContent` accepts standard Radix popover content props (`side`, `align`, `sideOffset`, etc.).

---

## Progress

Linear and circular progress indicators.

```tsx
import { LinearProgress, CircularProgress, Progress } from '@onesaz/ui'

// Linear (Progress is an alias for LinearProgress)
<LinearProgress value={65} />
<Progress value={65} variant="success" size="lg" showValue />
<LinearProgress value={50} animated />
<LinearProgress value={30} formatValue={(v) => `${v} of 100`} showValue />

// Circular
<CircularProgress value={75} />
<CircularProgress value={60} variant="error" size="xl" showValue />
<CircularProgress value={40} size={120} thickness={6} />
<CircularProgress value={80}>
  <span className="text-sm font-bold">80%</span>
</CircularProgress>
```

**Exports:** `LinearProgress`, `CircularProgress`, `Progress`

### LinearProgress Props


| Prop          | Type                                                   | Default     | Description             |
| ------------- | ------------------------------------------------------ | ----------- | ----------------------- |
| `value`       | `number`                                               | `0`         | Progress value (0–100)  |
| `variant`     | `'default' | 'success' | 'warning' | 'error' | 'info'` | `'default'` | Color variant           |
| `size`        | `'sm' | 'md' | 'lg'`                                   | `'md'`      | Bar height              |
| `showValue`   | `boolean`                                              | `false`     | Show percentage label   |
| `formatValue` | `(value: number) => string`                            | —           | Custom value formatter  |
| `animated`    | `boolean`                                              | `false`     | Animated shimmer effect |


### CircularProgress Props


| Prop          | Type                                                   | Default     | Description                                 |
| ------------- | ------------------------------------------------------ | ----------- | ------------------------------------------- |
| `value`       | `number`                                               | `0`         | Progress value (0–100)                      |
| `variant`     | `'default' | 'success' | 'warning' | 'error' | 'info'` | `'default'` | Color variant                               |
| `size`        | `'sm' | 'md' | 'lg' | 'xl' | number`                   | `'md'`      | Circle size (or pixel number)               |
| `thickness`   | `number`                                               | —           | Stroke width                                |
| `showValue`   | `boolean`                                              | `false`     | Show percentage in center                   |
| `formatValue` | `(value: number) => string`                            | —           | Custom value formatter                      |
| `children`    | `React.ReactNode`                                      | —           | Custom center content (overrides showValue) |


---

## Radio

Radio group built on Radix UI.

```tsx
import { RadioGroup, RadioGroupItem, Radio } from '@onesaz/ui'

// Primitive usage
<RadioGroup value={value} onValueChange={setValue} orientation="vertical">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option1" id="opt1" />
    <label htmlFor="opt1">Option 1</label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="option2" id="opt2" />
    <label htmlFor="opt2">Option 2</label>
  </div>
</RadioGroup>

// Convenience Radio component
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="a" label="Choice A" description="Description for A" />
  <Radio value="b" label="Choice B" description="Description for B" />
</RadioGroup>

// Horizontal layout
<RadioGroup orientation="horizontal" size="lg">
  <Radio value="yes" label="Yes" />
  <Radio value="no" label="No" />
</RadioGroup>
```

**Exports:** `RadioGroup`, `RadioGroupItem`, `Radio`

### RadioGroup Props

Extends Radix UI `RadioGroup.Root` props with:


| Prop          | Type                        | Default      | Description          |
| ------------- | --------------------------- | ------------ | -------------------- |
| `orientation` | `'horizontal' | 'vertical'` | `'vertical'` | Layout direction     |
| `size`        | `'sm' | 'md' | 'lg'`        | `'md'`       | Radio indicator size |


### RadioGroupItem Props

Extends Radix UI `RadioGroup.Item` props with:


| Prop   | Type                 | Description                 |
| ------ | -------------------- | --------------------------- |
| `size` | `'sm' | 'md' | 'lg'` | Size override for this item |


### Radio Props


| Prop          | Type     | Description                         |
| ------------- | -------- | ----------------------------------- |
| `value`       | `string` | Radio value                         |
| `label`       | `string` | Label text                          |
| `description` | `string` | Helper description below label      |
| `id`          | `string` | HTML id (auto-generated if omitted) |


---

## RangeSlider

Dual-handle range slider.

```tsx
import { RangeSlider } from '@onesaz/ui'

<RangeSlider
  value={[20, 80]}
  onChange={(range) => setRange(range)}
  showValues
  valuePosition="top"
  minLabel="Min"
  maxLabel="Max"
  valueFormatter={(v) => `$${v}`}
/>
```

**Exports:** `RangeSlider`

### RangeSlider Props


| Prop             | Type                                | Default | Description                |
| ---------------- | ----------------------------------- | ------- | -------------------------- |
| `value`          | `[number, number]`                  | —       | Controlled range value     |
| `defaultValue`   | `[number, number]`                  | —       | Uncontrolled default       |
| `onChange`       | `(value: [number, number]) => void` | —       | Change handler             |
| `showValues`     | `boolean`                           | `false` | Show value labels          |
| `valuePosition`  | `'top' | 'bottom'`                  | `'top'` | Position of value labels   |
| `valueFormatter` | `(v: number) => string`             | —       | Format the displayed value |
| `minLabel`       | `string`                            | —       | Label at the minimum end   |
| `maxLabel`       | `string`                            | —       | Label at the maximum end   |


---

## Select

Accessible select built on Radix UI with compound component pattern and a native fallback.

```tsx
import {
  Select, SelectTrigger, SelectValue, SelectContent,
  SelectItem, SelectGroup, SelectLabel, SelectSeparator
} from '@onesaz/ui'

// Named exports
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectItem value="other">Other</SelectItem>
  </SelectContent>
</Select>

// Compound namespace
<Select>
  <Select.Trigger>
    <Select.Value placeholder="Choose..." />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="a">Option A</Select.Item>
  </Select.Content>
</Select>
```

**Radix Select Exports:** `Select` (also exposes `.Trigger`, `.Value`, `.Content`, `.Item`, `.Group`, `.Label`, `.Separator`, `.ScrollUpButton`, `.ScrollDownButton` on the namespace), `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`

### Native Select (for simple use cases)

```tsx
import { NativeSelect, NativeSelectOption } from '@onesaz/ui'

<NativeSelect value={value} onChange={(e) => setValue(e.target.value)}>
  <NativeSelectOption value="">Choose...</NativeSelectOption>
  <NativeSelectOption value="a">Option A</NativeSelectOption>
  <NativeSelectOption value="b">Option B</NativeSelectOption>
</NativeSelect>
```

**Exports:** `NativeSelect`, `NativeSelectOption`

---

## Separator

Visual divider line.

```tsx
import { Separator } from '@onesaz/ui'

<Separator />
<Separator orientation="vertical" />
```

**Exports:** `Separator`


| Prop          | Type                        | Default        | Description         |
| ------------- | --------------------------- | -------------- | ------------------- |
| `orientation` | `'horizontal' | 'vertical'` | `'horizontal'` | Separator direction |


---

## Sidebar

Collapsible sidebar navigation with context-aware sub-components.

```tsx
import {
  Sidebar, SidebarHeader, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarItem, SidebarSubMenu
} from '@onesaz/ui'
import { HomeIcon, SettingsIcon, FolderIcon } from 'lucide-react'

<Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} width={256} collapsedWidth={64}>
  <SidebarHeader>
    {!collapsed && <span className="font-bold">My App</span>}
  </SidebarHeader>

  <SidebarContent>
    <SidebarGroup label="Navigation">
      <SidebarItem icon={<HomeIcon />} active href="/">
        Home
      </SidebarItem>
      <SidebarSubMenu icon={<FolderIcon />} label="Projects" defaultOpen>
        <SidebarItem href="/projects/a">Project A</SidebarItem>
        <SidebarItem href="/projects/b">Project B</SidebarItem>
      </SidebarSubMenu>
    </SidebarGroup>
  </SidebarContent>

  <SidebarFooter>
    <SidebarItem icon={<SettingsIcon />} href="/settings">
      Settings
    </SidebarItem>
  </SidebarFooter>
</Sidebar>
```

**Exports:** `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarItem`, `SidebarSubMenu`

### Sidebar Props


| Prop                | Type                           | Default | Description                 |
| ------------------- | ------------------------------ | ------- | --------------------------- |
| `collapsed`         | `boolean`                      | —       | Controlled collapsed state  |
| `onCollapsedChange` | `(collapsed: boolean) => void` | —       | Callback when state changes |
| `defaultCollapsed`  | `boolean`                      | `false` | Uncontrolled default state  |
| `width`             | `number | string`              | `256`   | Expanded width in px        |
| `collapsedWidth`    | `number | string`              | `64`    | Collapsed width in px       |
| `bordered`          | `boolean`                      | `true`  | Show right border           |


### SidebarGroup Props


| Prop    | Type     | Description                           |
| ------- | -------- | ------------------------------------- |
| `label` | `string` | Section label (hidden when collapsed) |


### SidebarItem Props


| Prop       | Type              | Default | Description                                    |
| ---------- | ----------------- | ------- | ---------------------------------------------- |
| `icon`     | `React.ReactNode` | —       | Icon element                                   |
| `active`   | `boolean`         | `false` | Active/selected state                          |
| `disabled` | `boolean`         | `false` | Disabled state                                 |
| `badge`    | `React.ReactNode` | —       | Badge or count element (hidden when collapsed) |
| `href`     | `string`          | —       | Renders as `<a>` link                          |
| `onClick`  | `() => void`      | —       | Click handler                                  |


### SidebarSubMenu Props


| Prop          | Type              | Default      | Description           |
| ------------- | ----------------- | ------------ | --------------------- |
| `icon`        | `React.ReactNode` | —            | Icon element          |
| `label`       | `string`          | **required** | Submenu trigger label |
| `defaultOpen` | `boolean`         | `false`      | Initially expanded    |


---

## Skeleton

Loading placeholder shapes.

```tsx
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTableRow } from '@onesaz/ui'

// Basic shapes
<Skeleton variant="text" width={200} />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width="100%" height={200} />
<Skeleton variant="rounded" width="100%" height={100} animation="wave" />

// Preset skeletons
<SkeletonText lines={3} />
<SkeletonAvatar size="md" />
<SkeletonCard />
<SkeletonTableRow columns={5} />
```

**Exports:** `Skeleton`, `SkeletonText`, `SkeletonAvatar`, `SkeletonCard`, `SkeletonTableRow`

### Skeleton Props


| Prop        | Type                                              | Default   | Description       |
| ----------- | ------------------------------------------------- | --------- | ----------------- |
| `variant`   | `'text' | 'circular' | 'rectangular' | 'rounded'` | `'text'`  | Shape variant     |
| `width`     | `number | string`                                 | —         | Width             |
| `height`    | `number | string`                                 | —         | Height            |
| `animation` | `'pulse' | 'wave' | 'none'`                       | `'pulse'` | Loading animation |


---

## Slider

Single-handle range slider built on Radix UI.

```tsx
import { Slider } from '@onesaz/ui'

<Slider
  value={50}
  onChange={(value) => setValue(value)}
  showValue
  valuePosition="top"
  valueFormatter={(v) => `${v}%`}
/>
```

**Exports:** `Slider`

### Slider Props


| Prop             | Type                                  | Default | Description                |
| ---------------- | ------------------------------------- | ------- | -------------------------- |
| `value`          | `number`                              | —       | Controlled value           |
| `defaultValue`   | `number`                              | —       | Uncontrolled default       |
| `onChange`       | `(value: number) => void`             | —       | Change handler             |
| `showValue`      | `boolean`                             | `false` | Show value label           |
| `valuePosition`  | `'top' | 'bottom' | 'left' | 'right'` | `'top'` | Position of value label    |
| `valueFormatter` | `(v: number) => string`               | —       | Format the displayed value |


---

## Snackbar

Temporary notification messages with auto-dismiss and positioning.

```tsx
import { Snackbar, SnackbarContent } from '@onesaz/ui'

// Simple
<Snackbar
  open={open}
  message="Changes saved successfully"
  autoHideDuration={4000}
  onClose={(reason) => setOpen(false)}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
/>

// With action button
<Snackbar
  open={open}
  onClose={() => setOpen(false)}
  autoHideDuration={6000}
>
  <SnackbarContent
    message="Item deleted"
    action={<Button size="sm" variant="ghost" onClick={handleUndo}>Undo</Button>}
  />
</Snackbar>

// Disable auto-hide
<Snackbar open={open} message="Persistent message" autoHideDuration={null} />
```

**Exports:** `Snackbar`, `SnackbarContent`

### Snackbar Props


| Prop                        | Type                                                                      | Default                                      | Description                               |
| --------------------------- | ------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------- |
| `open`                      | `boolean`                                                                 | **required**                                 | Whether the snackbar is visible           |
| `message`                   | `string`                                                                  | —                                            | Message text (shorthand)                  |
| `action`                    | `React.ReactNode`                                                         | —                                            | Action element (shorthand)                |
| `autoHideDuration`          | `number | null`                                                           | `6000`                                       | Ms before auto-close; `null` to disable   |
| `onClose`                   | `(reason: 'timeout' | 'clickaway' | 'escapeKeyDown') => void`             | —                                            | Close callback                            |
| `anchorOrigin`              | `{ vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' }` | `{ vertical: 'bottom', horizontal: 'left' }` | Screen position                           |
| `transitionDuration`        | `number`                                                                  | —                                            | Fade transition duration ms               |
| `disableWindowBlurListener` | `boolean`                                                                 | `false`                                      | Don't reset timer on window blur          |
| `disablePortal`             | `boolean`                                                                 | `false`                                      | Render inline (not in portal)             |
| `children`                  | `React.ReactNode`                                                         | —                                            | Custom content (overrides message/action) |


### SnackbarContent Props


| Prop      | Type              | Description           |
| --------- | ----------------- | --------------------- |
| `message` | `string`          | Message text          |
| `action`  | `React.ReactNode` | Action button/element |


---

## Spinner

Loading spinner indicator.

```tsx
import { Spinner } from '@onesaz/ui'

<Spinner />
<Spinner size="sm" />
<Spinner size="lg" />
```

**Exports:** `Spinner`


| Prop   | Type                      | Default     | Description  |
| ------ | ------------------------- | ----------- | ------------ |
| `size` | `'sm' | 'default' | 'lg'` | `'default'` | Spinner size |


---

## Stack

Flex layout helper with direction, spacing, and divider support.

```tsx
import { Stack, HStack, VStack } from '@onesaz/ui'

// Default: column direction
<Stack spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

// Horizontal stack (HStack = Stack with direction="row")
<HStack spacing={2} align="center">
  <Avatar src="/avatar.jpg" />
  <span>Username</span>
</HStack>

// Vertical stack (VStack = Stack with direction="column")
<VStack spacing={3} justify="center">
  <Button>Primary</Button>
  <Button variant="outline">Secondary</Button>
</VStack>

// With dividers
<Stack spacing={2} divider={<Separator />} direction="column">
  <div>Section 1</div>
  <div>Section 2</div>
</Stack>
```

**Exports:** `Stack`, `HStack`, `VStack`

### Stack Props


| Prop        | Type                                                  | Default    | Description                      |
| ----------- | ----------------------------------------------------- | ---------- | -------------------------------- |
| `direction` | `'row' | 'column' | 'row-reverse' | 'column-reverse'` | `'column'` | Flex direction                   |
| `spacing`   | `0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16`        | —          | Gap between children             |
| `align`     | `string`                                              | —          | `align-items` value              |
| `justify`   | `string`                                              | —          | `justify-content` value          |
| `wrap`      | `string`                                              | —          | `flex-wrap` value                |
| `divider`   | `React.ReactNode`                                     | —          | Divider element between children |
| `as`        | `React.ElementType`                                   | `'div'`    | Render as different element      |


> `HStack` = `Stack` with `direction="row"`. `VStack` = `Stack` with `direction="column"`. The base `Stack` default direction is `'column'`.

---

## Switch

Toggle switch control.

```tsx
import { Switch } from '@onesaz/ui'

<Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
<Switch defaultChecked />
<Switch disabled />
```

**Exports:** `Switch`

Extends `React.InputHTMLAttributes<HTMLInputElement>`. Key props: `checked`, `defaultChecked`, `onChange`, `disabled`.

---

## Table

Semantic HTML table with styling.

```tsx
import {
  Table, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell, TableCaption
} from '@onesaz/ui'

<Table>
  <TableCaption>Monthly sales report</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Month</TableHead>
      <TableHead>Revenue</TableHead>
      <TableHead>Growth</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>January</TableCell>
      <TableCell>$12,000</TableCell>
      <TableCell>+5%</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>February</TableCell>
      <TableCell>$14,500</TableCell>
      <TableCell>+21%</TableCell>
    </TableRow>
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell>$26,500</TableCell>
    </TableRow>
  </TableFooter>
</Table>
```

**Exports:** `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`

All are semantic HTML elements with `className` and `ref` support. No additional custom props.

---

## Tabs

Tab panels with three visual variants: pill (default), underline, and vertical.

### Pill Tabs (default)

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@onesaz/ui'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3" disabled>Disabled</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content for Tab 1</TabsContent>
  <TabsContent value="tab2">Content for Tab 2</TabsContent>
</Tabs>
```

### Underline Tabs (GitHub-style)

```tsx
import {
  Tabs, UnderlineTabsList, UnderlineTabsTrigger, UnderlineTabsContent
} from '@onesaz/ui'

<Tabs defaultValue="overview">
  <UnderlineTabsList>
    <UnderlineTabsTrigger value="overview">Overview</UnderlineTabsTrigger>
    <UnderlineTabsTrigger value="issues" count={12}>Issues</UnderlineTabsTrigger>
    <UnderlineTabsTrigger value="prs" count={3}>Pull Requests</UnderlineTabsTrigger>
  </UnderlineTabsList>
  <UnderlineTabsContent value="overview">Overview content</UnderlineTabsContent>
  <UnderlineTabsContent value="issues">Issues list</UnderlineTabsContent>
</Tabs>
```

`UnderlineTabsTrigger` accepts a `count?: number` prop to show a count badge.

### Vertical Tabs (settings sidebar style)

```tsx
import {
  VerticalTabs, VerticalTabsList, VerticalTabsTrigger,
  VerticalTabsContent, VerticalTabsGroupLabel
} from '@onesaz/ui'
import { UserIcon, LockIcon } from 'lucide-react'

<VerticalTabs defaultValue="profile">
  <VerticalTabsList>
    <VerticalTabsGroupLabel>Account</VerticalTabsGroupLabel>
    <VerticalTabsTrigger value="profile" icon={<UserIcon />}>Profile</VerticalTabsTrigger>
    <VerticalTabsTrigger value="security" icon={<LockIcon />}>Security</VerticalTabsTrigger>
  </VerticalTabsList>
  <VerticalTabsContent value="profile">Profile settings</VerticalTabsContent>
  <VerticalTabsContent value="security">Security settings</VerticalTabsContent>
</VerticalTabs>
```

`VerticalTabsTrigger` accepts an `icon?: React.ReactNode` prop. `VerticalTabsGroupLabel` is a non-interactive section header.

**Exports:** `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `UnderlineTabsList`, `UnderlineTabsTrigger`, `UnderlineTabsContent`, `VerticalTabs`, `VerticalTabsList`, `VerticalTabsTrigger`, `VerticalTabsContent`, `VerticalTabsGroupLabel`

---

## TextField

Full-featured form input combining label, input, and helper text.

```tsx
import { TextField } from '@onesaz/ui'
import { SearchIcon } from 'lucide-react'

<TextField label="Email" type="email" placeholder="you@example.com" />
<TextField label="Username" required helperText="Must be 3–20 characters" />
<TextField
  label="Password"
  type="password"
  errorMessage="Password is required"
/>
<TextField label="Search" startAdornment={<SearchIcon className="h-4 w-4" />} />
<TextField label="Amount" endAdornment="USD" size="lg" fullWidth />
```

**Exports:** `TextField`

### TextField Props


| Prop              | Type                                          | Default | Description                                           |
| ----------------- | --------------------------------------------- | ------- | ----------------------------------------------------- |
| `label`           | `string`                                      | —       | Field label                                           |
| `helperText`      | `string`                                      | —       | Helper text below input                               |
| `errorMessage`    | `string`                                      | —       | Error message (replaces helperText, sets error state) |
| `required`        | `boolean`                                     | `false` | Required indicator                                    |
| `size`            | `'sm' | 'md' | 'lg' | 'small' | 'medium'`     | `'md'`  | Input size                                            |
| `fullWidth`       | `boolean`                                     | `false` | Take full container width                             |
| `startAdornment`  | `React.ReactNode`                             | —       | Element at input start                                |
| `endAdornment`    | `React.ReactNode`                             | —       | Element at input end                                  |
| `inputProps`      | `React.InputHTMLAttributes<HTMLInputElement>` | —       | Props forwarded to `<input>`                          |
| `InputProps`      | `object`                                      | —       | MUI-compatible input props                            |
| `InputLabelProps` | `object`                                      | —       | Props for the label element                           |
| `inputRef`        | `React.Ref<HTMLInputElement>`                 | —       | Ref for the input element                             |


---

## Textarea

Multi-line text input.

```tsx
import { Textarea } from '@onesaz/ui'

<Textarea placeholder="Write your message..." rows={4} />
<Textarea disabled value="Read-only content" />
```

**Exports:** `Textarea`

Extends all `React.TextareaHTMLAttributes<HTMLTextAreaElement>`. No additional custom props.

---

## Tooltip

Floating label on hover/focus. Built on Radix UI.

```tsx
import { Tooltip, TooltipProvider } from '@onesaz/ui'

// Wrap app with provider (once at root)
<TooltipProvider>
  <App />
</TooltipProvider>

// Simple tooltip
<Tooltip content="Save your changes">
  <Button>Save</Button>
</Tooltip>

// With options
<Tooltip
  content="Delete permanently"
  side="bottom"
  align="center"
  delayDuration={500}
  showArrow
>
  <Button variant="destructive">Delete</Button>
</Tooltip>

// Controlled
<Tooltip content="Hello" open={open} onOpenChange={setOpen}>
  <Button>Hover me</Button>
</Tooltip>

// Disabled
<Tooltip content="Won't show" disabled>
  <Button>No tooltip</Button>
</Tooltip>

// Primitive usage
import {
  TooltipRoot, TooltipTrigger, TooltipContent, TooltipPortal, TooltipArrow
} from '@onesaz/ui'

<TooltipRoot>
  <TooltipTrigger asChild>
    <Button>Custom</Button>
  </TooltipTrigger>
  <TooltipPortal>
    <TooltipContent side="top" showArrow>
      Custom tooltip
    </TooltipContent>
  </TooltipPortal>
</TooltipRoot>
```

**Exports:** `Tooltip`, `TooltipProvider`, `TooltipRoot`, `TooltipTrigger`, `TooltipContent`, `TooltipPortal`, `TooltipArrow`

### Tooltip Convenience Wrapper Props


| Prop            | Type                                  | Default    | Description                    |
| --------------- | ------------------------------------- | ---------- | ------------------------------ |
| `content`       | `React.ReactNode`                     | —          | Tooltip text/content           |
| `side`          | `'top' | 'right' | 'bottom' | 'left'` | `'top'`    | Preferred side                 |
| `align`         | `'start' | 'center' | 'end'`          | `'center'` | Alignment                      |
| `delayDuration` | `number`                              | `200`      | Open delay in ms               |
| `open`          | `boolean`                             | —          | Controlled open state          |
| `onOpenChange`  | `(open: boolean) => void`             | —          | Open state change callback     |
| `disabled`      | `boolean`                             | `false`    | Disable the tooltip            |
| `showArrow`     | `boolean`                             | `false`    | Show arrow pointing to trigger |
| `className`     | `string`                              | —          | Class for tooltip content      |


### TooltipContent Extra Props


| Prop        | Type      | Default | Description |
| ----------- | --------- | ------- | ----------- |
| `showArrow` | `boolean` | `false` | Show arrow  |


---

## TopBar

Horizontal application header bar.

```tsx
import {
  TopBar, TopBarBrand, TopBarNav, TopBarNavItem,
  TopBarSection, TopBarDivider
} from '@onesaz/ui'

<TopBar sticky bordered size="md">
  <TopBarSection align="left">
    <TopBarBrand logo={<Logo />} name="My App" href="/" />
    <TopBarDivider />
    <TopBarNav>
      <TopBarNavItem href="/dashboard" active>Dashboard</TopBarNavItem>
      <TopBarNavItem href="/reports">Reports</TopBarNavItem>
    </TopBarNav>
  </TopBarSection>
  <TopBarSection align="right">
    <IconButton aria-label="Notifications">
      <BellIcon />
    </IconButton>
    <Avatar fallback="JD" size="sm" />
  </TopBarSection>
</TopBar>
```

**Exports:** `TopBar`, `TopBarBrand`, `TopBarNav`, `TopBarNavItem`, `TopBarSection`, `TopBarDivider`

### TopBar Props


| Prop       | Type                 | Default | Description                             |
| ---------- | -------------------- | ------- | --------------------------------------- |
| `bordered` | `boolean`            | `true`  | Bottom border                           |
| `sticky`   | `boolean`            | `false` | Sticky positioned at top                |
| `size`     | `'sm' | 'md' | 'lg'` | `'md'`  | Height variant (`h-12`, `h-14`, `h-16`) |


### TopBarBrand Props


| Prop   | Type              | Description                  |
| ------ | ----------------- | ---------------------------- |
| `logo` | `React.ReactNode` | Logo element                 |
| `name` | `string`          | Brand name text              |
| `href` | `string`          | Link href wrapping the brand |


### TopBarSection Props


| Prop    | Type                          | Default  | Description                                         |
| ------- | ----------------------------- | -------- | --------------------------------------------------- |
| `align` | `'left' | 'center' | 'right'` | `'left'` | Section alignment (`mr-auto`, `mx-auto`, `ml-auto`) |


### TopBarNavItem Props


| Prop     | Type      | Description         |
| -------- | --------- | ------------------- |
| `active` | `boolean` | Highlight as active |


---

## Typography

Text rendering with semantic variants, colors, weights, alignment, and gradient support.

```tsx
import { Typography, H1, H2, H3, H4, H5, H6, Text, Caption } from '@onesaz/ui'

// Using Typography component
<Typography variant="h1">Page Title</Typography>
<Typography variant="body1" color="secondary">Body text</Typography>
<Typography variant="caption" color="muted">Caption text</Typography>
<Typography variant="overline">Section Label</Typography>

// Colors
<Typography variant="h3" color="success">All good!</Typography>
<Typography variant="body2" color="error">Something failed</Typography>
<Typography variant="body1" color="warning">Be careful</Typography>

// Font weight
<Typography variant="body1" fontWeight="bold">Bold text</Typography>
<Typography variant="body1" fontWeight="light">Light text</Typography>

// Alignment
<Typography variant="body1" align="center">Centered</Typography>

// Text gradient
<Typography variant="h2" textGradient gradientColor="primary">
  Gradient Heading
</Typography>

// Convenience shorthands
<H1>Heading 1</H1>
<H2>Heading 2</H2>
<H3>Heading 3</H3>
<H4>Heading 4</H4>
<H5>Heading 5</H5>
<H6>Heading 6</H6>
<Text>Body paragraph text</Text>
<Caption>Small caption text</Caption>

// Render as different element
<Typography variant="h1" as="p">Looks like h1, renders as p</Typography>

// No wrap
<Typography noWrap className="max-w-xs">
  This text will be truncated with ellipsis
</Typography>
```

**Exports:** `Typography`, `H1`, `H2`, `H3`, `H4`, `H5`, `H6`, `Text`, `Caption`

### Typography Props


| Prop            | Type                                                                                                                           | Default     | Description                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------ |
| `variant`       | `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'inherit'` | `'body1'`   | Typography scale                           |
| `color`         | `'inherit' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted' | 'white' | 'dark'`                  | `'inherit'` | Text color                                 |
| `fontWeight`    | `'light' | 'regular' | 'medium' | 'semibold' | 'bold'`                                                                         | —           | Font weight override                       |
| `textTransform` | `'none' | 'uppercase' | 'lowercase' | 'capitalize'`                                                                            | —           | Text transform                             |
| `align`         | `'left' | 'center' | 'right' | 'justify'`                                                                                      | —           | Text alignment                             |
| `verticalAlign` | `'top' | 'middle' | 'bottom' | 'baseline'`                                                                                     | —           | Vertical alignment                         |
| `textGradient`  | `boolean`                                                                                                                      | `false`     | Enable gradient text effect                |
| `gradientColor` | `'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark'`                                                  | `'primary'` | Gradient color when `textGradient` is true |
| `opacity`       | `number`                                                                                                                       | —           | CSS opacity (0–1)                          |
| `as`            | `React.ElementType`                                                                                                            | —           | Override rendered HTML element             |
| `gutterBottom`  | `boolean`                                                                                                                      | `false`     | Add `mb-2` bottom margin                   |
| `noWrap`        | `boolean`                                                                                                                      | `false`     | Truncate with ellipsis                     |
| `paragraph`     | `boolean`                                                                                                                      | `false`     | Add `mb-4` bottom margin                   |


### Variant Element Mapping


| Variant                          | Default Element |
| -------------------------------- | --------------- |
| `h1`–`h6`                        | `<h1>`–`<h6>`   |
| `subtitle1`, `subtitle2`         | `<h6>`          |
| `body1`, `body2`                 | `<p>`           |
| `caption`, `overline`, `inherit` | `<span>`        |


### Convenience Components


| Component | Equivalent                                                      |
| --------- | --------------------------------------------------------------- |
| `H1`–`H6` | `<Typography variant="h1">` through `<Typography variant="h6">` |
| `Text`    | `<Typography variant="body1">`                                  |
| `Caption` | `<Typography variant="caption">`                                |



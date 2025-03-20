# Unified Topbar Component

This is a unified Topbar component designed to accommodate the various use cases across different pages of the application.

## Core Components

### Topbar

The main container component that provides a consistent structure for all topbars.

```tsx
<Topbar
  leftContent={<YourLeftContent />}
  rightContent={<YourRightContent />}
  showBorder={true}
  className="additional-classes"
/>
```

### LastUpdateInfo

A reusable component for displaying the last update information with a green indicator dot.

```tsx
<LastUpdateInfo lastUpdate="12.05.2023" label="Последнее обновление" />
```

### BackButton

A component for navigation back to a previous page.

```tsx
<BackButton href="/dashboard" label="Подробности курса" />
```

### AuthorInfo

A component to display author information with an avatar.

```tsx
<AuthorInfo
  author="Author Name"
  avatarUrl="/path/to/avatar.png"
  label="Автор курса"
/>
```

### TabNavigation

A component for tab-based navigation.

```tsx
const tabs = [
  { label: 'Tab 1', active: true, onClick: () => {} },
  { label: 'Tab 2', active: false, onClick: () => {} },
];

<TabNavigation items={tabs} />;
```

### PricingSection

A component for the sections in the pricing page topbar.

```tsx
<PricingSection isRightBordered className="your-additional-classes">
  <div>Your content here</div>
</PricingSection>
```

### PricingTopbar

A specialized topbar for the pricing page with a 3-column layout.

```tsx
<PricingTopbar />
```

## Page-Specific Topbars

All page-specific topbars are now in the shared Topbar folder to maintain consistency:

1. **CoursePage** - Uses `BackButton` and `AuthorInfo`
2. **Dashboard** - Uses `TabNavigation` and `LastUpdateInfo`
3. **MentorPage** - Uses custom left content and `LastUpdateInfo`
4. **PricingPage** - Uses `PricingTopbar` with its special grid layout

Each page imports the components it needs from the shared Topbar folder.

## Examples

### Course Page Topbar

```tsx
<Topbar
  leftContent={<BackButton href="/dashboard" label="Подробности курса" />}
  rightContent={
    <AuthorInfo author={courseAuthor} avatarUrl={courseAuthorAvatar} />
  }
/>
```

### Dashboard Topbar

```tsx
<Topbar
  leftContent={<TabNavigation items={items} />}
  rightContent={<LastUpdateInfo lastUpdate={lastestUpdate} />}
  showBorder={false}
/>
```

### Mentor Page Topbar

```tsx
<Topbar
  leftContent={<div className="flex flex-row text-xl">Кураторы BlockFirst</div>}
  rightContent={<LastUpdateInfo lastUpdate={lastestUpdate} />}
/>
```

### PricingPage Topbar (Multi-column Layout)

For more complex layouts like the 3-column grid in the PricingPage, we use a specialized component:

```tsx
<PricingTopbar />
```

This approach allows for maintaining the unified topbar structure while supporting more complex layouts.

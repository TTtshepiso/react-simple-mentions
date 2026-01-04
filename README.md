https://github.com/TTtshepiso/react-simple-mentions/releases

# React Simple Mentions: Lightweight, customizable mentions UI for React

[![Releases](https://img.shields.io/badge/Releases-Latest-blue?logo=github&logoColor=white)](https://github.com/TTtshepiso/react-simple-mentions/releases)

![Overview](https://placehold.co/1200x420?text=React+Simple+Mentions+-+Overview)

A lightweight and customizable React component for handling mentions in text inputs. This project focuses on a simple API, fast rendering, and a clean, accessible user experience. It is built for chat, comment boxes, messaging apps, and any UI that needs a "mention" feature inside inputs and textareas. The component respects React patterns, supports TypeScript, and is designed to be easy to style and extend.

Table of contents
- Why choose this library
- Features at a glance
- Quick start
- Installation and setup
- Core concepts
- Usage patterns
- API and props
- Theming and customization
- Keyboard and accessibility
- Performance and testing
- Accessibility notes
- Data flow and integration
- Examples
- Advanced patterns
- TypeScript usage
- Testing strategies
- Contributing
- Roadmap
- FAQ
- Release assets and how to get them
- License

Overview and motivations
👋 This library aims to keep the complexity low while offering the essential tools you need to build a polished mentions experience. If you want a compact, fast, and predictable component to enable “@mentions” in a chat or input field, this is a solid option. It is designed to slot into existing forms and editing experiences without forcing a new UI paradigm. The component works well in controlled and uncontrolled modes, and it plays nicely with controlled inputs, form libraries, and custom validation.

What problems this library solves
- You want an intuitive way to insert and manage user mentions inside text inputs and text areas.
- You need a dependable, accessible UI for selecting mentions from a list.
- You want to customize how mentions look and behave without rewriting core logic.
- You need a lightweight bundle that won’t bloat your app.

This repository is centered on readability, reliability, and a smooth developer experience. It is crafted to feel natural in React workflows and to be approachable by teams that value maintainability and clarity. The component is designed to work well with TypeScript, so you can enjoy strong typing and better editor support.

Key themes and topics
- chat
- input
- jsx
- mentions
- mentions-input
- react
- react-mentions
- react-simple-mentions
- textarea
- typescript

The release note link you’ll often need
- Release assets and guidance live here: https://github.com/TTtshepiso/react-simple-mentions/releases
- If you’re looking for the latest build artifacts or installation guidance, visit the releases page. For quick access, you can open the same link in your browser to review available assets and download the correct version for your platform. If the link changes or the page is updated, check the Releases section in the repository for the latest resources.

Why this approach for mentions
- Lightweight core: A small footprint with a clean API that you can extend.
- Customizable rendering: Change how mentions look, feel, and behave without forking code.
- Extensible data: Works well with your existing user models and data loading strategies.
- Accessibility first: ARIA roles and keyboard navigation support for a smooth experience.
- TypeScript friendly: Clear types to reduce friction in modern React apps.

Screenshots and visuals
- The UI emphasizes smooth, responsive behavior as you type.
- Mentions appear inline with a subtle highlight when selected.
- Suggestions dropdown is keyboard navigable and scroll-aware.
- Theming hooks allow you to align the component with your design system.

Emojis and images to set the vibe
- ✨ Fast, reliable, and friendly to work with.
- 💬 Perfect for chat inputs and social features.
- 🧠 Accessible by default with sensible fallbacks.
- 🎨 Customizable, so you can match your brand.

Getting started: Quick tour
This quick tour shows how to add mentions support to a text input in a React app. It demonstrates a common pattern that you’ll see in many real projects.

- Step 1: Install the package
- Step 2: Import the component
- Step 3: Create a basic mentions input
- Step 4: Bind data and handle changes
- Step 5: Style and extend

Step 1: Install
- npm install react-simple-mentions
- yarn add react-simple-mentions

Step 2: Import
- In JavaScript/TypeScript files:
  - import MentionsInput from 'react-simple-mentions';

Step 3: Basic usage
- Basic outside-the-box example for a simple mentions input component:

Code example (TypeScript-friendly)
- Note: This is a simplified example to illustrate the core usage. Adapt data shapes to your app.

```tsx
import React, { useState } from 'react';
import MentionsInput, { Mention } from 'react-simple-mentions';

type User = {
  id: string;
  display: string;
  avatar?: string;
};

const users: User[] = [
  { id: 'u1', display: 'Alice' },
  { id: 'u2', display: 'Bob' },
  { id: 'u3', display: 'Charlie' },
];

export function AppMentions() {
  const [value, setValue] = useState<string>('');

  return (
    <MentionsInput
      value={value}
      onChange={setValue}
      placeholder="Type something and mention people with @"
      aria-label="Message with mentions"
    >
      <Mention trigger="@" data={users} displayProp="display" />
    </MentionsInput>
  );
}
```

Step 4: Data handling
- The onChange handler receives the new content whenever the user updates the text.
- You can parse and extract mentions from the text to include in your data model, comments, or notifications.
- For large lists of users, you can implement lazy loading, search, or virtualization to keep the dropdown responsive.

Step 5: Styling
- The component uses CSS-in-JS-friendly approaches or standard CSS to let you theme the input and the dropdown.
- You can pass className to the main input and to the dropdown to customize visuals.
- Theming hooks or CSS variables can help you create a consistent design system.

Installation and setup
- Quick steps to integrate in a new or existing React project:
  - Add the package to your project with npm or yarn.
  - Import the component into the page or section where you want mentions.
  - Provide your data source for suggestions and bind to state for the text value.
  - Add styling to match your app’s look and feel.
- If you are using a module bundler, ensure it supports JSX and TypeScript if you choose to write in TS.

Installation options
- npm, yarn, or pnpm are common package managers.
- If you use TypeScript, you’ll gain type safety through the included types.

Usage patterns and examples
- Basic text input with mentions
- Rich text variants where mentions are embedded in content
- Multiline inputs with line breaks and mentions
- Custom suggestion rendering
- Grouped suggestions and sections
- Inline vs. block rendering of mentions

API: Props and components
This section covers the core API you’ll use in most apps. The goal is to have a predictable set of props that are easy to reason about.

MentionsInput props
- value: string
  - The current content of the input. Controlled mode is common, but you can also operate in uncontrolled mode with internal state.
- onChange: (value: string) => void
  - Callback fired when the content changes. Useful to sync with form state or perform validation.
- placeholder: string
  - Placeholder text shown when the input is empty.
- trigger: string
  - Character that starts a mention (commonly "@"). Supports one or more triggers if you expose that capability.
- data: Array<User>
  - Array of items to be shown in the dropdown. The shape is customizable; you can define a display property for UI and an id for internal references.
- displayProp: string
  - Property name to display in the dropdown for each item. If omitted, a sensible default is used.
- renderMention?: (user: User) => React.ReactNode
  - Optional function to customize how a mention appears in the text. This is powerful for custom visuals, avatars, or badges.
- ariaLabel?: string
  - Accessibility label for screen readers.
- className?: string
  - Additional class for styling the input container.
- style?: React.CSSProperties
  - Inline style for quick customization.

Mention component props
- trigger: string
  - The character that starts a mention (e.g., "@").
- data: Array<User>
  - Data source for suggestions when the user opens the dropdown.
- displayProp: string
  - The property used for the item’s display text in the list.
- onSelection?: (item: User) => void
  - Callback when a user is selected from the dropdown.
- renderItem?: (item: User) => React.ReactNode
  - Custom item renderer for the dropdown.

Advanced props and patterns
- data fetching
  - You can pass a function to data that fetches suggestions from an API. Implement debouncing to avoid excessive requests.
- virtualization
  - For large data sets, consider virtualization to keep the dropdown performant.
- multi-trigger mentions
  - Support for multiple triggers like "@" and "#" to cover different mention types (user mentions, topic mentions, etc.).
- custom rendering
  - Use renderMention and renderItem to tailor the UI to your design system.

Theming and customization
- CSS variables
  - Define theme variables for input background, borders, caret color, and mention highlight. Example:
    - --mention-bg
    - --mention-highlight
    - --dropdown-bg
- Style overrides
  - Pass a className to the main container and the dropdown to override CSS or to hook into your CSS framework (Tailwind, Bootstrap, etc.).
- Custom mention appearance
  - Use renderMention to add avatars, badges, or status indicators to each mention in the text.
- Responsive behavior
  - Ensure the dropdown and input resize gracefully on smaller screens. Consider layout constraints and touch targets.

Keyboard and accessibility
- Focus management
  - The input should support focus, blur, and programmatic focus when the dropdown opens.
- Keyboard navigation
  - Up/Down arrow keys navigate suggestions.
  - Enter or Tab confirms a selection.
  - Escape closes the dropdown.
- ARIA
  - The input has aria-label and aria-describedby attributes when needed.
  - The dropdown is announced with appropriate roles and live regions for screen readers.

Performance considerations
- Rendering strategy
  - The component uses efficient rendering to minimize reflows as you type.
- Debouncing input
  - Debounce fetches for remote data to reduce network traffic.
- Memory footprint
  - The internal state is kept minimal. You can rely on React to clean up unused listeners.

Testing and reliability
- Unit tests
  - Write unit tests to cover basic rendering, dropdown behavior, and selection logic.
- Accessibility tests
  - Include tests for keyboard navigation and screen reader support.
- End-to-end tests
  - Validate user flows like typing, triggering a mention, selecting a suggestion, and validating the final text content.

Accessibility notes
- The component is designed to be accessible by default. It uses semantic roles and keyboard interactions that align with common accessibility patterns.
- When you customize, ensure that any added visuals maintain accessible contrast and that interactive elements remain keyboard reachable.
- If you add custom rendering for mentions, ensure that each rendered mention has an appropriate accessible name and role.

Data flow and integration with your app
- Controlled vs. uncontrolled
  - In a controlled approach, the parent component maintains the value and passes onChange to update it.
  - In an uncontrolled approach, the component can manage its own state and expose a ref for the current value if needed.
- Saving mentions
  - When you submit a form containing a mentions input, parse the content to extract mention tokens. You can maintain a separate list of mentions with IDs for backend integration.
- Data synchronization
  - If your data source changes (for example, a user list updates after a fetch), ensure the data prop updates so the dropdown reflects the latest information.

Examples and real-world scenarios
- Chat input
  - A messaging app where users can mention teammates with @. The dropdown shows teammates with avatars and online status. The input uses a multiline variant so messages can span several lines.
- Comment section
  - A blog or forum where users can mention authors or topic tags. The trigger could be "@" for people and "#" for topics.
- Collaboration tool
  - A project board or document editor where mentions create links to user profiles or tasks.

Running through an end-to-end example
- Initialization
  - You initialize the mentions input with a list of users from your API. Each user has an id and a display name.
- Typing
  - As the user types "@", the dropdown opens, listing available users. The user uses arrow keys to navigate and Enter to select.
- Insertion
  - Selecting a user inserts a nicely formatted token into the text. It remains visible as the user continues typing.
- Submission
  - On submit, you parse the content to extract mentions and save both the text and mention IDs to your server.

TypeScript usage and typings
- The library is designed to be TypeScript-friendly. You can define your own User type and supply it to the data prop.
- Example:
  - type User = { id: string; display: string; avatar?: string; }

- Props typing
  - The component accepts generic props where necessary. If you expose a renderMention function, you can customize how an individual mention is displayed.

- Data shape considerations
  - If your app uses a nested user object, you can map your data to the expected shape with a small adapter function.
  - If your app needs nested groups (e.g., teams), you can extend the data prop to include a group field and group the dropdown items accordingly.

Examples gallery and live demos
- Live demos are a great way to explore the component’s capabilities. You can host demos on platforms like CodeSandbox, StackBlitz, or a dedicated demo page within your site.
- Include several examples:
  - Basic text input with @ mentions
  - Multiple triggers with different styling
  - Mention with avatars in the dropdown
  - Rich content in the rendered mentions
  - A long list of users with virtualization

Advanced patterns and customization
- Custom suggestion filtering
  - Implement a search function that takes the user’s query and returns a filtered list. Debounce the input to minimize unnecessary work.
- Grouped suggestions
  - Group users by department or role. The dropdown displays group headers.
- Emoji support
  - If you want to include emoji in your suggestions, you can render them in the display or as part of the custom item renderer.
- Theming hooks
  - Use theme provider wrappers to switch between light and dark modes without altering component logic.

TypeScript: practical type examples
- Demonstration of a strongly typed usage pattern with a typed data source.

```ts
type User = {
  id: string;
  display: string;
  avatarUrl?: string;
  role?: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  users: User[];
};

function MentionsExample({ value, onChange, users }: Props) {
  return (
    <MentionsInput value={value} onChange={onChange} placeholder="Mention someone with @">
      <Mention trigger="@" data={users} displayProp="display" renderMention={(u) => (
        <span className="mention" key={u.id}>
          {u.display}
        </span>
      )} />
    </MentionsInput>
  );
}
```

- A more complex example showing a two-trigger setup (@ for users, # for topics):

```tsx
type User = { id: string; display: string };
type Topic = { id: string; label: string };

const users: User[] = [
  { id: 'u1', display: 'Alice' },
  { id: 'u2', display: 'Bob' },
];

const topics: Topic[] = [
  { id: 't1', label: 'Design' },
  { id: 't2', label: 'Engineering' },
];

export function DualMentions() {
  const [value, setValue] = React.useState('');
  return (
    <div>
      <MentionsInput value={value} onChange={setValue} placeholder="Mention people @ or topics #">
        <Mention trigger="@" data={users} displayProp="display" />
        <Mention trigger="#" data={topics} displayProp="label" />
      </MentionsInput>
    </div>
  );
}
```

- Data fetching example with remote data
  - You can fetch suggestions from an API and supply them to the data prop. Debounce requests to avoid excessive calls.

```ts
function useUsersQuery(query: string) {
  // Debounced fetch from your API
  // Return a list of users
  // This is a conceptual example
}
```

- Accessibility example with ARIA
  - Ensure appropriate labeling and roles for screen readers.

Theming and design system alignment
- You can align with a design system by:
  - Providing tokens for colors, border radii, typography, and shadows.
  - Using CSS variables or a theme provider to switch themes at runtime.
  - Exposing a simple API to override class names and inline styles.

Deployment and release process
- Releases page
  - The repository’s releases page hosts build artifacts and versioned assets. If you need a specific asset for your environment (browser, node, or server), check the releases page for the latest version and platform-specific assets.
  - If the link changes or the page is updated, search the Releases section for the latest version and download the asset that matches your environment.
- How to download and execute
  - From the releases page, download the appropriate asset. After downloading, follow the instructions included with the asset to install or run it. The exact steps depend on the asset type (zip, tar.gz, npm package, etc.). For a typical npm-based workflow, you would install the package and then import it into your project.

Notes about the releases link
- The link at the top provides direct access to the releases page for quick reference and download. The same link is provided again elsewhere in this README to meet the requirement of using the link twice in the text.

Open source collaboration and contribution
- How to contribute
  - Start by reading the Contribution Guide.
  - Open an issue if you find a bug or have a feature request.
  - Submit a PR with a clear description, tests, and documentation updates.
- Code quality
  - Follow the project’s linting and formatting rules.
  - Add unit tests for new features or bug fixes.
  - Include documentation updates for any public API changes.
- Testing locally
  - Run the test suite locally to verify changes.
  - Use TypeScript checks if you’re contributing typed code.
  - Ensure accessibility checks pass.

Changelog and versioning
- The project uses semantic versioning. Version numbers carry meaning about the scope of changes.
- The changelog lists new features, improvements, deprecations, and fixes. It is updated with each release.

Roadmap and future directions
- The roadmap outlines planned enhancements and potential breaking changes.
- Areas of focus usually include:
  - Performance improvements for very large user datasets.
  - Expanded theming capabilities.
  - Additional triggers and multi-mention support.
  - Better accessibility and keyboard control refinements.
  - Improved integration with form libraries and rich text editors.

FAQ
- Do mentions render differently on small screens?
  - Yes. The dropdown and tokens adjust layout for readability. If you need a specific behavior, customize the CSS to maintain a consistent look.
- Can I use this with server-rendered React apps?
  - Yes, with care. Ensure the data for suggestions is available on the client, or fetch it on the client before the input is used.
- Is it possible to support non-ASCII characters in mentions?
  - Yes. The implementation is designed to handle a broad set of characters. If you run into edge cases, you can customize the data parsing logic.
- How do I customize the look of the dropdown?
  - Use className props and CSS to override visuals. For more control, render custom items via renderItem and renderMention.

Images and visuals
- Overview image: https://placehold.co/1200x400?text=React+Simple+Mentions
- Screenshot example: https://placehold.co/800x450?text=Mentions+Dropdown
- Branding and icons are kept minimal to avoid visual clutter while still providing a friendly look.

Contributing guidelines in brief
- Start with an issue to propose your idea.
- Create a branch with a descriptive name.
- Write tests for your changes.
- Update documentation and examples.
- Run the test suite and lint checks before submitting a PR.
- Seek reviews from maintainers and iterate on feedback.

Changelog and releases (continues)
- For the latest changes, review the Releases section. The link at the top of this document will take you there again for quick access: https://github.com/TTtshepiso/react-simple-mentions/releases
- If you are exploring historical versions, you can browse the tags and the release notes to see how the API evolved over time.

License
- This project is released under an open-source license. You can use, modify, and distribute the code with the terms of the license. Always check the LICENSE file in the repository for the exact terms and obligations.

Appendix: Practical integration tips
- When integrating with form libraries
  - If you use Formik, React Hook Form, or similar, connect the value and onChange props to the form state.
  - Ensure the form’s submit handler can capture the final content with mentions and any associated IDs.
- Server-side considerations
  - If your backend stores mentions, ensure you normalize mention tokens to IDs and include the necessary metadata.
  - Validate the content on the server to ensure mentions refer to valid users or entities.
- Internationalization
  - If your app supports multiple languages, ensure mentions render correctly for your locale and consider localizing display strings in the dropdown.

Accessibility and international considerations
- For non-English apps, ensure the display strings support the target languages.
- Keyboard navigation should remain consistent across languages.
- Screen reader narration should clearly describe mention tokens and their context to avoid confusion.

Final notes
- This README aims to be a complete, practical guide that helps you adopt React Simple Mentions quickly while offering paths for advanced customization. The structure emphasizes clarity, maintainability, and real-world usage. It is designed to serve both new projects and mature apps that need a dependable mentions experience inside React-based inputs and textareas.

Release assets and further references
- For the latest asset details and download options, visit the Releases page: https://github.com/TTtshepiso/react-simple-mentions/releases
- If the page changes or you’re unsure which asset to choose, refer to the Releases section in the repository to locate the appropriate file and follow the included setup instructions.

Images, badges, and visuals embedded here are used to illustrate the concepts and align with the repository theme. They help communicate the ideas quickly and keep the README visually engaging while staying focused on practical guidance for developers.
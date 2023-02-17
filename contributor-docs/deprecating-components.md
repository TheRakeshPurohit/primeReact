# Deprecating and promoting components in Primer React

Primer components may occasionally be deprecated when they are no longer recommended for use. In some cases, Primer team may recommend replacing a deprecated component with a new one. New replacement components are typically built in a parallel bundle to avoid breaking existing components, and are promoted to the main bundle when it's time for migration.

If there is not a one-to-one replacement for the newly deprecated component, Primer maintainers will recommend the use of another, different component in Primer instead. This will be clearly communicated in the [Primer changelog](https://github.com/github/primer/discussions/categories/primer-changelog) (GitHub staff only) and deprecated component docs.

## Deprecating a component

When Primer maintainers are to deprecate a component, they will issue `@deprecated` notice in a minor/patch release. This gives feature teams time to prepare for the migration to the replacement component (if there is one) or to the suggested alternative component.

Issuing a `@deprecated` notice in a minor/patch release includes:

- [ ] Adding a `@deprecated` annotation in the component's source code.
- [ ] Adding a `Deprecation` section to the documentation of the component with the link of the recommended component and provide a diff. See [deprecated ActionList docs](https://primer.style/react/deprecated/ActionList#deprecation) as an example.

## Developing a replacement component

If you are developing a replacement component, start building the new component outside of the main bundle. This includes the source code of the component being under the `src/drafts` folder and the component being exported in the draft bundle (`src/drafts/index.ts`). That way, folks who
would like to try the draft version of the component can export it from the draft bundle.

```
import { ActionList } from "@primer/react/drafts"
```

If it is a 1:1 replacement, it's useful to keep the component name the same for consumers. For example, naming the folder `ActionList2` and docs `ActionMenu v2`.

### Promoting the replacement component

When Primer team is ready to promote the newly developed component in the main bundle, they also plan to move the current one to the deprecated bundle and this change is released as a major change as it is introducing breaking changes. I.e. changing the components' import paths.

### Developer checklist for the promotion

Here is a checklist for developers who are going through the promotion process. Although this is a step-by-step guide, it is not a strict process and please use this as a reference.

Note: Component v1 is refered to the component that is going to be moved to the deprecated bundle and component v2 is the one that is going to be promoted to the main bundle.

#### Source Code

- [ ] Move the component v1's source code under the `src/deprecated` folder.
- [ ] Remove the component v1's export in the main bundle to be added to the deprecated one.
- [ ] Export the component v1 in the deprecated bundle `src/deprecated/index.ts`.
- [ ] Rename the component v2 to its neutral version if it includes `2` or `v2`. I.e. `ActionList2` -> `ActionList`.
- [ ] Move the component v2's source code to the `src` folder if it is under `src/drafts`.
- [ ] Export the component v2 in the main bundle `src/index.ts`.

#### Storybook

- [ ] Update the component v2's storybook title from `Drafts/Components/<Component-Name>` to `Components/<Component-Name>`.
- [ ] Move the component v1's stories under `src/stories/deprecated`.

#### Tests

- [ ] Move the component v1's tests under `src/__tests__/deprecated`.
- [ ] Update `script/generate-e2e-tests.js` to reflect the component v2's component ID is generated by the storybook title.
- [ ] Update the snapshots using the command `npm run test -- -u`.

#### Docs

- [ ] Move the deprecated component's docs to the `src/docs/deprecated` folder and update the title by adding `(legacy)`, status as well as the storybook and the source code link.

  - [ ] Make sure to update `jsx live` -> `jsx live deprecated`
  - [ ] Make sure to update the import code block. I.e. `import { ActionList } from "@primer/react/deprecated"`.

- [ ] Move the new components docs from draft folder to the main docs folder `docs/content/` and update the title by removing `v2`, status as well as the storybook and the source code link.
  - [ ] Make sure to update `jsx live drafts` -> `jsx live`
  - [ ] Make sure to update the import code block. I.e. `import { ActionList } from "@primer/react"`.
  - [ ] Update the navigation on `docs/src/@primer/gatsby-theme-doctocat/nav.yml` accordingly.

### Communicating the promotion

Primer team announces the upcoming major changes in the [Primer changelog](https://github.com/github/primer/discussions/categories/primer-changelog) (GitHub staff only) under the `Coming soon` section and release a technical preview. Please see an example of the [technical preview announcement for the v35](https://github.com/primer/react/discussions/1918).

To ensure the impending deprecation is included in the Primer changelog, Primer maintainers should highlight any upcoming deprecations in their [weekly status updates](https://github.com/github/design-infrastructure/blob/main/how-we-work/planning-and-tracking-work/updates.md#weekly-status-updates-required) (GitHub staff only).

Once the major release is out, Primer team provides support on how to switch using the newly develop component as well as how to continue to use the deprecated component for folks who prefer to migrate later on. They may also provide codemods to deprecate the component v1 and use the new component under [our migration repo](https://github.com/primer/react-migrate#readme).

### Primer maintainers to alert Accessibility team about deprecations

As GitHub teams onboard to the [accessibility scorecard](https://github.com/github/engineering/discussions/2443) (GitHub staff only), Primer team has a new opportunity to encourage teams to remove deprecated components and adopt new, more accessible ones.

Primer maintainers should reach out to #accessibility any time a component is planned for deprecation, or if there is a new component that we want to enforce usage around.

### Removing the deprecated component

After about 6 months of living in the deprecated bundle, a component is retired/deleted from the codebase. This is also a breaking change and Primer team releases it in the upcoming major release.
At this point, consumers are expected to plan migration work and Primer team annouces the deletion in Primer Changelog as they do for the deprecation.

## FAQ

- Does the deprecated component accept new feature requests?
  - No, once a component is deprecated the only changes it may receive are bug fixes.
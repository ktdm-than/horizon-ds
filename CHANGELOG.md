# Changelog

## @morethanthings/horizon-ds 0.1.0

First release. There is no earlier `v*` tag, so every line traces to a first-parent commit on `main`
up to the release commit `d1860fe`.

### Added

- `Button`, with `state` (default, hover, focus, disabled), `shape` (fill, outline), and
  `showLeadingIcon` / `showTrailingIcon`; types `ButtonProps`, `ButtonShape`, `ButtonState`
  (2ff301c, #13; fixes in 2742f12, #24 and 99e2239, #26).
- `Card` and its subcomponents `CardContainer`, `CardLayout`, `CardImage`, `CardText`, with their
  `*Props` types and `CardLayoutImageProps` (7232406, #14; 5940f78, #25).
- `IconBtn` and `IconBtnProps`, exported as public API under the project owner's one-release waiver,
  2026-11-20 (7232406, #14).
- Stylesheet entry points `styles.css`, `tokens.css` (light, dark, English, Burmese modes) and
  `fonts.css` (4ebc502, #17; token pipeline dbbad89, #1, #2, #4, #5, #8).
- React 19 as a peer dependency (`react`, `react-dom` ^19.3.0) (4ebc502, #17).
- Intent files for Button and Card (14a76fd, #19; 8557d7b, #20; c15aa72, #21).
- `VERSIONING.md`, which says what a version number promises (b61eb78, #18).

Changed, Fixed, Deprecated and Removed are left out: this is the first release, so nothing was
published before it to change, fix, deprecate or remove.

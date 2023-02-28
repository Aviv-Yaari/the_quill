import styled from "styled-components";
import { breakpoints } from "./theme";

export const AppLayout = styled.div`

  display: grid;
  grid-template-columns: 1fr minmax(auto, ${breakpoints.largeDesktopBreakpoint}) 1fr;
  padding-inline: 1em;
  > * {
    grid-column: 2;
  }
`;

export const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 300px minmax(auto, ${breakpoints.tabletBreakpoint});
  grid-column-gap: 50px;
`;
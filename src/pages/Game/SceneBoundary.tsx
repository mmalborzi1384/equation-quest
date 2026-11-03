import { Component, type ReactNode } from 'react';
/** Keep a renderer error inside the workshop instead of losing the entire route. */
export class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? (
      <p role="status">نمای سه‌بعدی متوقف شد؛ نقشهٔ متنی در حال آماده‌شدن است.</p>
    ) : (
      this.props.children
    );
  }
}

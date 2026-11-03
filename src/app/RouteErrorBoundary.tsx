import { Component, type ErrorInfo, type ReactNode } from 'react';

type State = { hasError: boolean };

export class RouteErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Route rendering failed', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          lang="fa"
          dir="rtl"
          style={{ padding: '3rem', fontFamily: 'Vazirmatn, sans-serif' }}
          role="alert"
        >
          <h1>این مسیر بارگذاری نشد.</h1>
          <p>می‌توانی صفحه را دوباره باز کنی یا به خانه برگردی.</p>
          <a href={`${import.meta.env.BASE_URL}#/`}>بازگشت به خانه</a>
        </div>
      );
    }
    return this.props.children;
  }
}

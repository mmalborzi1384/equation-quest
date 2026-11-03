import { useEffect, useRef, useState } from 'react';
import styles from './ResetAction.module.css';
export function ResetAction({
  label,
  scope,
  onConfirm,
}: {
  label: string;
  scope: string;
  onConfirm: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const opened = useRef(false);
  useEffect(() => {
    if (confirming) {
      opened.current = true;
      cancel.current?.focus();
    } else if (opened.current) trigger.current?.focus();
  }, [confirming]);
  return (
    <div className={styles.action}>
      {!confirming ? (
        <button
          ref={trigger}
          type="button"
          onClick={() => {
            setDone(false);
            setConfirming(true);
          }}
        >
          {label}
        </button>
      ) : (
        <div
          role="group"
          aria-label={`تأیید ${label}`}
          className={styles.confirm}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.stopPropagation();
              setConfirming(false);
            }
          }}
        >
          <p>{scope} این کار برگشت‌پذیر نیست؛ مطمئنی؟</p>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              setConfirming(false);
              setDone(true);
            }}
          >
            بله، حذف شود
          </button>
          <button ref={cancel} type="button" onClick={() => setConfirming(false)}>
            انصراف
          </button>
        </div>
      )}
      {done && <span role="status">داده‌های انتخاب‌شده حذف و وضعیت پیش‌فرض بازگردانده شد.</span>}
    </div>
  );
}

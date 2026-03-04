import { notification } from 'antd';

export interface NotificationFailedProps {
  message: string | any[];
}

export function notificationFailed(props: NotificationFailedProps): void {
  const message = props?.message;
  if (Array.isArray(message)) {
    return message?.forEach((item) => {
      notification.error({
        title: `${item?.message}${item?.field ? ` (${item?.field})` : ''}`,
      });
    });
  }
  return notification.error({
    title: message,
  });
}

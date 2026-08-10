export function getAlertColor(alert: string): string {
  switch (alert) {
    case "positive":
      return "007A33";
    case "warning":
      return "#FF9F43";
    case "danger":
      return "#EE3135";
    default:
      return "#FFFFFF"; // fallback color
  }
}

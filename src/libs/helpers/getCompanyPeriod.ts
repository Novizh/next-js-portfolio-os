import { ExperienceRole } from "libs/interfaces/user";

export default function getCompanyPeriod(roles: ExperienceRole[]): string {
    if (roles.length === 0) {
        return "";
      }
    
      const [, endRaw] = roles[0].period.split(" - ");
      const [startRaw] = roles[roles.length - 1].period.split(" - ");
    
      if (!startRaw || !endRaw) {
        return "";
      }
    
      return `${startRaw} - ${endRaw}`;
}
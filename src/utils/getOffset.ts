// src/utils/getOffset.ts
import { DateTime } from 'luxon';

function getOffset(timeZone: string): number {
    const now = DateTime.now().setZone(timeZone);
    const offsetInHours = now.offset / 60;
    return offsetInHours;
}

export default getOffset;
